"use server";

import Parser from "rss-parser";

interface NewsItem {
  id: string;
  category: "고교입시" | "마이스터고" | "특성화고";
  title: string;
  summary: string;
  date: string;
  link: string;
}

interface CollectNewsResult {
  success: boolean;
  count?: number;
  error?: string;
}

interface GetNewsResult {
  success: boolean;
  news?: NewsItem[];
  error?: string;
}

// RSS 피드 URL 목록
const RSS_FEEDS = [
  // 교육부 공식 RSS (예시 - 실제 URL로 변경 필요)
  // "https://www.moe.go.kr/rss/rss.jsp",
  // 연합뉴스 교육 섹션 (예시)
  // "https://www.yna.co.kr/rss/education.xml",
  // 뉴시스 교육 섹션 (예시)
  // "https://www.newsis.com/rss/education.xml",
];

// 키워드 매칭 함수
function categorizeNews(title: string, summary: string): "고교입시" | "마이스터고" | "특성화고" | null {
  const text = (title + " " + summary).toLowerCase();
  
  const keywords = {
    고교입시: ["고교입시", "고등학교 입시", "입학전형", "학생부", "내신", "입시", "고입"],
    마이스터고: ["마이스터고", "마이스터", "특성화고", "기술고", "전문계고"],
    특성화고: ["특성화고", "특성화 고등학교", "전문계", "실업계", "상업고", "공업고", "농업고"],
  };

  // 마이스터고 키워드가 있으면 마이스터고로 분류
  if (keywords.마이스터고.some((kw) => text.includes(kw))) {
    return "마이스터고";
  }
  
  // 특성화고 키워드가 있으면 특성화고로 분류
  if (keywords.특성화고.some((kw) => text.includes(kw))) {
    return "특성화고";
  }
  
  // 고교입시 키워드가 있으면 고교입시로 분류
  if (keywords.고교입시.some((kw) => text.includes(kw))) {
    return "고교입시";
  }

  return null;
}

// Notion에 뉴스 저장
async function saveNewsToNotion(news: {
  title: string;
  category: string;
  summary: string;
  link: string;
  date: string;
}): Promise<boolean> {
  try {
    const notionApiKey = process.env.NOTION_API_KEY;
    const notionNewsDatabaseId = process.env.NOTION_NEWS_DATABASE_ID;

    if (!notionApiKey || !notionNewsDatabaseId) {
      console.error("Notion API 키 또는 데이터베이스 ID가 설정되지 않았습니다.");
      return false;
    }

    const properties: Record<string, any> = {
      제목: {
        title: [
          {
            text: {
              content: news.title,
            },
          },
        ],
      },
      카테고리: {
        select: {
          name: news.category,
        },
      },
      요약: {
        rich_text: [
          {
            text: {
              content: news.summary,
            },
          },
        ],
      },
      링크: {
        url: news.link,
      },
      날짜: {
        date: {
          start: news.date,
        },
      },
      수집일시: {
        date: {
          start: new Date().toISOString(),
        },
      },
    };

    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: {
          database_id: notionNewsDatabaseId,
        },
        properties,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Notion API 오류:", errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error("뉴스 저장 오류:", error);
    return false;
  }
}

// 중복 체크 (링크 기준)
async function checkDuplicate(link: string): Promise<boolean> {
  try {
    const notionApiKey = process.env.NOTION_API_KEY;
    const notionNewsDatabaseId = process.env.NOTION_NEWS_DATABASE_ID;

    if (!notionApiKey || !notionNewsDatabaseId) {
      return false;
    }

    const response = await fetch(
      `https://api.notion.com/v1/databases/${notionNewsDatabaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${notionApiKey}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
        body: JSON.stringify({
          filter: {
            property: "링크",
            url: {
              equals: link,
            },
          },
        }),
      }
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.results && data.results.length > 0;
  } catch (error) {
    console.error("중복 체크 오류:", error);
    return false;
  }
}

// 뉴스 수집 서버 액션
export async function collectNews(): Promise<CollectNewsResult> {
  try {
    const notionApiKey = process.env.NOTION_API_KEY;
    const notionNewsDatabaseId = process.env.NOTION_NEWS_DATABASE_ID;

    if (!notionApiKey || !notionNewsDatabaseId) {
      return {
        success: false,
        error: "Notion API 키 또는 데이터베이스 ID가 설정되지 않았습니다.",
      };
    }

    if (RSS_FEEDS.length === 0) {
      return {
        success: false,
        error: "RSS 피드 URL이 설정되지 않았습니다.",
      };
    }

    const parser = new Parser();
    let collectedCount = 0;

    // 각 RSS 피드에서 뉴스 수집
    for (const feedUrl of RSS_FEEDS) {
      try {
        const feed = await parser.parseURL(feedUrl);

        for (const item of feed.items || []) {
          // 카테고리 분류
          const category = categorizeNews(item.title || "", item.contentSnippet || item.content || "");
          
          if (!category) {
            continue; // 관련 없는 뉴스는 건너뛰기
          }

          // 중복 체크
          const link = item.link || "";
          if (!link) {
            continue;
          }

          const isDuplicate = await checkDuplicate(link);
          if (isDuplicate) {
            continue; // 이미 저장된 뉴스는 건너뛰기
          }

          // 뉴스 저장
          const summary = item.contentSnippet || item.content || item.title || "";
          const date = item.pubDate ? new Date(item.pubDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];

          const saved = await saveNewsToNotion({
            title: item.title || "",
            category,
            summary: summary.substring(0, 500), // 요약 길이 제한
            link,
            date,
          });

          if (saved) {
            collectedCount++;
          }

          // API 호출 제한을 고려하여 약간의 지연
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error(`RSS 피드 파싱 오류 (${feedUrl}):`, error);
        continue;
      }
    }

    return {
      success: true,
      count: collectedCount,
    };
  } catch (error) {
    console.error("뉴스 수집 오류:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}

// 뉴스 조회 서버 액션
export async function getNews(limit: number = 6): Promise<GetNewsResult> {
  try {
    const notionApiKey = process.env.NOTION_API_KEY;
    const notionNewsDatabaseId = process.env.NOTION_NEWS_DATABASE_ID;

    if (!notionApiKey || !notionNewsDatabaseId) {
      return {
        success: false,
        error: "Notion API 키 또는 데이터베이스 ID가 설정되지 않았습니다.",
      };
    }

    const response = await fetch(
      `https://api.notion.com/v1/databases/${notionNewsDatabaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${notionApiKey}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
        body: JSON.stringify({
          sorts: [
            {
              property: "날짜",
              direction: "descending",
            },
          ],
          page_size: limit,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Notion API 오류:", errorData);
      return {
        success: false,
        error: "뉴스를 불러오는 중 오류가 발생했습니다.",
      };
    }

    const data = await response.json();
    const newsItems: NewsItem[] = data.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        category: props.카테고리?.select?.name || "고교입시",
        title: props.제목?.title?.[0]?.text?.content || "",
        summary: props.요약?.rich_text?.[0]?.text?.content || "",
        date: props.날짜?.date?.start || "",
        link: props.링크?.url || "#",
      };
    });

    return {
      success: true,
      news: newsItems,
    };
  } catch (error) {
    console.error("뉴스 조회 오류:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}



