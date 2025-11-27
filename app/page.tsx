import type { Metadata } from "next"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import UserScenarios from "@/components/user-scenarios"
import ServiceDemo from "@/components/service-demo"
import Stats from "@/components/stats"
import CTA from "@/components/cta"
import News from "@/components/news"
import Footer from "@/components/footer"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hi-special.com";

export const metadata: Metadata = {
  title: "홈",
  description: "HI-Special에서 당신에게 맞는 고등학교를 찾아보세요. 250개 이상의 등록된 학교, 50,000명 이상의 활성 사용자, 95% 만족도를 자랑하는 신뢰할 수 있는 고등학교 검색 플랫폼입니다.",
  openGraph: {
    title: "HI-Special - 당신에게 맞는 고등학교를 찾아보세요",
    description: "250개 이상의 등록된 학교, 50,000명 이상의 활성 사용자, 95% 만족도를 자랑하는 신뢰할 수 있는 고등학교 검색 플랫폼입니다.",
    url: siteUrl,
    siteName: "HI-Special",
    images: [
      {
        url: `${siteUrl}/tagbanner.png`,
        width: 1200,
        height: 630,
        alt: "HI-Special - 고등학교 찾기 서비스",
        type: "image/png",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  other: {
    "og:image:secure_url": `${siteUrl}/tagbanner.png`,
    "og:image:width": "1200",
    "og:image:height": "630",
  },
  twitter: {
    card: "summary_large_image",
    title: "HI-Special - 당신에게 맞는 고등학교를 찾아보세요",
    description: "250개 이상의 등록된 학교, 50,000명 이상의 활성 사용자, 95% 만족도를 자랑하는 신뢰할 수 있는 고등학교 검색 플랫폼입니다.",
    images: [`${siteUrl}/tagbanner.png`],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <UserScenarios />
      <ServiceDemo />
      <Stats />
      <CTA />
      <News />
      <Footer />
    </main>
  )
}
