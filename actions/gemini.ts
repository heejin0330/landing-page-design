"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function sendChatMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<ChatResponse> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY가 설정되지 않았습니다.");
      return {
        success: false,
        error: "서버 설정 오류: API 키가 없습니다.",
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 히스토리에서 초기 assistant 메시지 제외
    // 첫 번째 메시지가 assistant인 경우 제외 (초기 인사 메시지)
    const filteredHistory = history.filter((msg, index) => {
      if (index === 0 && msg.role === "assistant") {
        return false;
      }
      return true;
    });

    // 채팅 히스토리를 Gemini 형식으로 변환
    // 첫 번째 메시지는 반드시 user여야 함
    const chatHistory = filteredHistory
      .map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }))
      .filter((msg, index) => {
        // 첫 번째 메시지가 user가 아니면 제외
        if (index === 0 && msg.role !== "user") {
          return false;
        }
        return true;
      });

    // 채팅 시작 (히스토리가 있으면 전달, 없으면 빈 배열)
    const chat = model.startChat({
      history: chatHistory.length > 0 ? chatHistory : undefined,
    });

    // 메시지 전송 및 응답 받기
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return {
      success: true,
      message: text,
    };
  } catch (error) {
    console.error("Gemini API 오류:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}

