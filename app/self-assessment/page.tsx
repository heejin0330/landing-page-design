import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "직업능력 자가진단",
  description: "직업기초능력 자가진단평가를 통해 자신의 직업기초능력을 확인하고 진로를 설계하세요.",
}

export default function SelfAssessmentPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              직업기초능력 자가진단
            </h1>
            <p className="text-lg text-muted-foreground">
              자신의 직업기초능력을 확인하고 진로를 설계하세요
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">직업기초능력 자가진단평가란?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              직업기초능력평가 자가진단평가는 전국 직업계고 1,2학년 학생들을 대상으로 실시하는 평가이며, 
              모든 직무자들에게 요구되는 공통적이고 핵심적인 역량(기초, 업무처리, 직장적응)을 평가하기 위해 개발되었습니다. 
              NCS 직업기초능력에서 규정한 10개의 능력을 모두 포함하여 실무중심, 체계성을 갖춘 문항(5개 영역, 총 262개 문항)으로 구성되어 있습니다.
            </p>

            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold text-foreground">직업기초능력평가의 특징</h3>
              
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">
                    1. '무엇을 아는가'가 아닌 "무엇을 할 수 있는가"를 평가합니다
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    직업기초능력은 '있다', '없다'로 구분되는 것이 아닌 직무나 직급에서 요구하는 수준이 어느 정도인지가 중요합니다.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">
                    2. 직무 맥락과 현실적인 제약이 존재하는 상황에서 평가합니다
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    의사소통의 주제나 소재는 직무에 따라 달라질 수 있지만, 모두 상대방의 말을 이해하고 자신이 의도하는 바를 표현할 수 있는 능력을 갖추어야 합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4">2025학년도 자가진단 문항 수 안내</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold text-foreground">영역/시간</th>
                      <th className="text-center p-3 font-semibold text-foreground">1학년</th>
                      <th className="text-center p-3 font-semibold text-foreground">2학년</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-3 text-muted-foreground">의사소통 국어 (50분)</td>
                      <td className="p-3 text-center text-foreground">40문항</td>
                      <td className="p-3 text-center text-foreground">50문항</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 text-muted-foreground">의사소통 영어 (50분)</td>
                      <td className="p-3 text-center text-foreground">40문항</td>
                      <td className="p-3 text-center text-foreground">50문항</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 text-muted-foreground">수리활용 (50분)</td>
                      <td className="p-3 text-center text-foreground">25문항</td>
                      <td className="p-3 text-center text-foreground">50문항</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 text-muted-foreground">문제해결 (50분)</td>
                      <td className="p-3 text-center text-foreground">30문항</td>
                      <td className="p-3 text-center text-foreground">32문항</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-muted-foreground">직무적응 (20분)</td>
                      <td className="p-3 text-center text-foreground">80문항</td>
                      <td className="p-3 text-center text-foreground">80문항</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4">2025학년도 자가진단 일정 안내</h3>
              <div className="space-y-2 text-muted-foreground">
                <p><strong className="text-foreground">1학년:</strong> 2025.06.02.(월) ~ 2025.06.11.(수)</p>
                <p><strong className="text-foreground">2학년:</strong> 2025.06.12.(목) ~ 2025.06.21.(토)</p>
                <p><strong className="text-foreground">1·2학년:</strong> 2025.06.22.(일) ~ 2025.06.27.(금)</p>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                ※ 학생별 평가 시스템(self.teenup.or.kr)에 PC 접속 후 응시
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="px-8 py-6 text-lg"
              >
                <a
                  href="https://self.teenup.or.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  자가진단 시작하기
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg"
              >
                <a
                  href="https://teenup.or.kr/homeHigh/highIntro.do"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  자세히 알아보기
                </a>
              </Button>
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">응시자 유의사항</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>평가는 PC 환경에서만 응시 가능합니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>평가 시간 내에 모든 문항을 완료해야 합니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>평가 중 이탈 시 결과가 저장되지 않을 수 있습니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>평가 결과는 마이페이지에서 확인할 수 있습니다.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}




