"use client"

const features = [
  {
    icon: "🎯",
    title: "스마트 매칭",
    description: "AI 기반의 매칭 알고리즘이 당신의 고유한 프로필과 목표에 완벽하게 맞는 학교들을 찾아줍니다.",
  },
  {
    icon: "📊",
    title: "상세한 분석",
    description: "학력, 스포츠, 예술 등 포괄적인 데이터로 학교들을 나란히 비교할 수 있습니다.",
  },
  {
    icon: "👥",
    title: "전문가 상담",
    description: "교육 상담가의 조언을 받고 현재 학생 및 졸업생들과 연결될 수 있습니다.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">당신의 검색과 함께 성장하는 경험</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            당신의 이상적인 고등학교를 찾기 쉽고 스트레스 없이 만들어주는 포괄적인 도구들
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
