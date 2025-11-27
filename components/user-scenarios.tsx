"use client"

const scenarios = [
  {
    title: "학생을 위해",
    description: "당신의 학력 목표와 관심사에 맞는 학교들을 발견하세요",
    color: "primary",
    icon: "student",
  },
  {
    title: "학부모를 위해",
    description: "상세한 학교 비교와 안전 정보로 지혜로운 결정을 내리세요",
    color: "secondary",
    icon: "parent",
  },
  {
    title: "교육자를 위해",
    description: "신뢰할 수 있는 데이터와 맞춤형 추천으로 학생을 지도하세요",
    color: "accent",
    icon: "teacher",
  },
]

const IconStudent = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M 12 12 Q 8 14 6 18 L 18 18 Q 16 14 12 12" />
    <path d="M 7 18 L 7 20 Q 7 22 9 22 L 15 22 Q 17 22 17 20 L 17 18" />
  </svg>
)

const IconParent = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="7" r="3" />
    <circle cx="15" cy="7" r="3" />
    <path d="M 6 10 Q 4 12 4 16 L 4 20 Q 4 22 6 22 L 12 22" />
    <path d="M 18 10 Q 20 12 20 16 L 20 20 Q 20 22 18 22 L 12 22" />
    <path d="M 12 10 Q 12 14 12 22" />
  </svg>
)

const IconTeacher = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="7" r="4" />
    <path d="M 9 12 L 9 18 L 15 18 L 15 12" />
    <path d="M 5 18 L 5 20 Q 5 22 7 22 L 17 22 Q 19 22 19 20 L 19 18" />
    <path d="M 12 12 L 12 4 M 12 4 L 10 6 M 12 4 L 14 6" />
  </svg>
)

export default function UserScenarios() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-16">
          교육 여정의 모든 사람을 위해 만들어졌습니다
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {scenarios.map((scenario, index) => (
            <div key={index} className="p-8 bg-card border border-border rounded-xl">
              <div
                className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                  scenario.color === "primary"
                    ? "bg-primary/20 text-primary"
                    : scenario.color === "secondary"
                      ? "bg-secondary/20 text-secondary"
                      : "bg-accent/20 text-accent"
                }`}
              >
                {scenario.icon === "student" && <IconStudent />}
                {scenario.icon === "parent" && <IconParent />}
                {scenario.icon === "teacher" && <IconTeacher />}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{scenario.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{scenario.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
