"use server";

interface SubmitWaitlistFormResult {
  success: boolean;
  error?: string;
}

interface LoginResult {
  success: boolean;
  error?: string;
  userType?: string;
}

export async function submitWaitlistForm(
  name: string,
  email: string,
  phone: string,
  userType?: string
): Promise<SubmitWaitlistFormResult> {
  try {
    const notionApiKey = process.env.NOTION_API_KEY;
    const notionDatabaseId = process.env.NOTION_DATABASE_ID;

    // 환경변수 검증
    if (!notionApiKey) {
      console.error("NOTION_API_KEY가 설정되지 않았습니다.");
      return {
        success: false,
        error: "서버 설정 오류: API 키가 없습니다.",
      };
    }

    if (!notionDatabaseId) {
      console.error("NOTION_DATABASE_ID가 설정되지 않았습니다.");
      return {
        success: false,
        error: "서버 설정 오류: 데이터베이스 ID가 없습니다.",
      };
    }

    // 기본 속성 구성
    const properties: Record<string, any> = {
      이름: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      이메일: {
        email: email,
      },
      전화번호: {
        phone_number: phone,
      },
    };

    // 사용자유형이 있으면 속성에 추가
    // 노션 데이터베이스에 속성이 없으면 오류가 발생할 수 있으므로
    // 오류 발생 시 사용자유형 없이 재시도
    if (userType) {
      properties.사용자유형 = {
        select: {
          name: userType,
        },
      };
    }

    // Notion API 호출
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: {
          database_id: notionDatabaseId,
        },
        properties,
      }),
    });

    // 응답 처리
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Notion API 오류 응답:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });

      // 사용자유형 속성 오류인 경우, 사용자유형 없이 재시도
      if (
        userType &&
        (errorData.message?.includes("사용자유형") ||
          errorData.message?.includes("is not a property"))
      ) {
        console.log("사용자유형 속성이 없어 기본 속성만으로 저장 시도");
        const propertiesWithoutUserType: Record<string, any> = {
          이름: {
            title: [
              {
                text: {
                  content: name,
                },
              },
            ],
          },
          이메일: {
            email: email,
          },
          전화번호: {
            phone_number: phone,
          },
        };

        const retryResponse = await fetch("https://api.notion.com/v1/pages", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${notionApiKey}`,
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28",
          },
          body: JSON.stringify({
            parent: {
              database_id: notionDatabaseId,
            },
            properties: propertiesWithoutUserType,
          }),
        });

        if (retryResponse.ok) {
          const retryResult = await retryResponse.json().catch(() => null);
          if (retryResult) {
            console.log(
              "사용자유형 없이 데이터베이스에 성공적으로 저장되었습니다:",
              retryResult.id
            );
          }
          return {
            success: true,
          };
        }
      }

      // 에러 메시지 추출
      let errorMessage = `API 오류 (${response.status})`;
      if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.code) {
        errorMessage = `오류 코드: ${errorData.code}`;
      }

      return {
        success: false,
        error: errorMessage,
      };
    }

    // 성공 응답 확인
    const result = await response.json().catch(() => null);
    if (result) {
      console.log(
        "Notion 데이터베이스에 성공적으로 저장되었습니다:",
        result.id
      );
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("폼 제출 중 예외 발생:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
    };
  }
}

export async function verifyLogin(
  name: string,
  email: string,
  phone: string
): Promise<LoginResult> {
  try {
    const notionApiKey = process.env.NOTION_API_KEY;
    const notionDatabaseId = process.env.NOTION_DATABASE_ID;

    // 환경변수 검증
    if (!notionApiKey) {
      console.error("NOTION_API_KEY가 설정되지 않았습니다.");
      return {
        success: false,
        error: "서버 설정 오류: API 키가 없습니다.",
      };
    }

    if (!notionDatabaseId) {
      console.error("NOTION_DATABASE_ID가 설정되지 않았습니다.");
      return {
        success: false,
        error: "서버 설정 오류: 데이터베이스 ID가 없습니다.",
      };
    }

    // Notion API로 데이터베이스 쿼리
    const response = await fetch(
      `https://api.notion.com/v1/databases/${notionDatabaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${notionApiKey}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
        body: JSON.stringify({
          filter: {
            and: [
              {
                property: "이름",
                title: {
                  contains: name,
                },
              },
              {
                property: "이메일",
                email: {
                  equals: email,
                },
              },
              {
                property: "전화번호",
                phone_number: {
                  equals: phone,
                },
              },
            ],
          },
        }),
      }
    );

    // 응답 처리
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Notion API 오류 응답:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });

      return {
        success: false,
        error: "로그인 확인 중 오류가 발생했습니다.",
      };
    }

    const result = await response.json().catch(() => null);

    if (!result || !result.results || result.results.length === 0) {
      return {
        success: false,
        error: "일치하는 사용자 정보를 찾을 수 없습니다.",
      };
    }

    // 모든 결과를 확인하여 정확히 일치하는 사용자 찾기
    for (const user of result.results) {
      const userName = user.properties?.이름?.title?.[0]?.text?.content || "";
      const userEmail = user.properties?.이메일?.email || "";
      const userPhone = user.properties?.전화번호?.phone_number || "";

      // 정확히 일치하는지 확인 (contains로 필터링했지만 정확한 일치 확인)
      if (userName === name && userEmail === email && userPhone === phone) {
        const userType = user.properties?.사용자유형?.select?.name || undefined;

        return {
          success: true,
          userType,
        };
      }
    }

    // 필터링된 결과가 있지만 정확히 일치하지 않음
    return {
      success: false,
      error: "일치하는 사용자 정보를 찾을 수 없습니다.",
    };
  } catch (error) {
    console.error("로그인 검증 중 예외 발생:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
    };
  }
}
