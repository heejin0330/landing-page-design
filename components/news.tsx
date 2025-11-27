import Link from "next/link"
import { Card } from "@/components/ui/card"
import { getNews } from "@/actions/news"

interface NewsItem {
  id: string
  category: "고교입시" | "마이스터고" | "특성화고"
  title: string
  summary: string
  date: string
  link: string
}

const categoryColors = {
  고교입시: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  마이스터고: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  특성화고: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
}

export default async function News() {
  const result = await getNews(6);
  const newsItems: NewsItem[] = result.success && result.news ? result.news : [];

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}.${month}.${day}`;
    } catch {
      return dateString;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            최신 뉴스
          </h2>
          <p className="text-lg text-muted-foreground">
            고교입시, 마이스터고, 특성화고 관련 최신 소식을 확인하세요
          </p>
        </div>

        {newsItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((item) => (
                <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[item.category]}`}
                    >
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {item.summary}
                  </p>
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    자세히 보기 →
                  </Link>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="#"
                className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-all"
              >
                더 많은 뉴스 보기
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {result.error || "뉴스를 불러올 수 없습니다."}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}


