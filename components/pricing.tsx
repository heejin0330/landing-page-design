"use client"

const plans = [
  {
    name: "스타터",
    price: "무료",
    features: ["250+개 학교 탐색", "기본 필터링", "학교 평점", "즐겨찾기 5개까지 저장"],
  },
  {
    name: "프리미엄",
    price: "₩9.99",
    period: "/월",
    features: ["무제한 학교 저장", "고급 필터링", "학교와의 직접 메시지", "전문 상담가 지원", "우선 학교 응답"],
    highlighted: true,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-4">간단하고 명확한 요금제</h2>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          당신에게 맞는 요금제를 선택하세요
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl border transition-all ${
                plan.highlighted ? "border-secondary bg-secondary/5 ring-2 ring-secondary" : "border-border bg-card"
              }`}
            >
              <h3 className="text-2xl font-bold text-foreground mb-3">{plan.name}</h3>
              <div className="mb-8">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <button
                className={`w-full py-3 rounded-full font-medium mb-8 transition-all ${
                  plan.highlighted
                    ? "bg-secondary text-secondary-foreground hover:opacity-90"
                    : "border border-border text-foreground hover:bg-muted"
                }`}
              >
                시작하기
              </button>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-secondary/30 flex items-center justify-center text-xs text-secondary-foreground">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
