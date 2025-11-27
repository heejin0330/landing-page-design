import { NextResponse } from "next/server";
import { collectNews } from "@/actions/news";

export async function GET(request: Request) {
  // Vercel Cron Job에서 호출할 때 Authorization 헤더 확인
  const authHeader = request.headers.get("authorization");
  
  // Vercel Cron Job은 자동으로 Authorization 헤더를 추가하지만,
  // 추가 보안을 위해 환경 변수로 확인할 수 있습니다
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await collectNews();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `${result.count}개의 뉴스가 수집되었습니다.`,
        count: result.count,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Cron Job 오류:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "알 수 없는 오류",
      },
      { status: 500 }
    );
  }
}



