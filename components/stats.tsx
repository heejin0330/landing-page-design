"use client";

const stats = [
  { number: "250+", label: "등록된 학교" },
  { number: "50K+", label: "활성 사용자" },
  { number: "95%", label: "만족도" },
];

export default function Stats() {
  return (
    <section className="relative bg-primary text-primary-foreground py-16 lg:py-24 overflow-hidden">
      {/* 배경 이미지 - opacity 10% */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{
          backgroundImage: "url('/color-bg.jpg')",
        }}
      />

      {/* 콘텐츠 */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
          전국 학생과 가족들의 신뢰
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-3">
                {stat.number}
              </div>
              <p className="text-lg opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
