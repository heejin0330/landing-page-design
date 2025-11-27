"use client"

const footerLinks = {
  제품: ["특징", "보안", "로드맵"],
  회사: ["소개", "블로그", "채용", "문의"],
  자료: ["도움말 센터", "문서", "API", "커뮤니티"],
}

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <span className="font-bold text-sm">HI</span>
              </div>
              <span className="font-bold">HI-Special</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              모두를 위한 간단하고 접근성 있는 고등학교 검색을 만들고 있습니다.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-background mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-background/60 text-sm">© 2025 HI-Special. 모든 권리 보유.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-background/60 hover:text-background transition-colors">
              Twitter
            </a>
            <a href="#" className="text-background/60 hover:text-background transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-background/60 hover:text-background transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
