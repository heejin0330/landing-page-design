import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Chatbot from "@/components/chatbot";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hi-special.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HI-Special - 당신에게 맞는 고등학교를 찾아보세요",
    template: "%s | HI-Special",
  },
  description:
    "당신의 필요에 맞는 고등학교를 발견하고 비교해보세요. AI 기반 스마트 매칭, 상세한 학교 분석, 전문가 상담 서비스를 통해 학생, 학부모, 교육자를 위한 맞춤형 고등학교 찾기 가이드를 제공합니다.",
  keywords: [
    "고등학교 찾기",
    "학교 검색",
    "고등학교 비교",
    "학교 정보",
    "입시 상담",
    "학교 매칭",
    "교육 상담",
    "학생 맞춤 학교",
    "학부모 가이드",
  ],
  authors: [{ name: "HI-Special" }],
  creator: "HI-Special",
  publisher: "HI-Special",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "HI-Special",
    title: "HI-Special - 당신에게 맞는 고등학교를 찾아보세요",
    description:
      "당신의 필요에 맞는 고등학교를 발견하고 비교해보세요. AI 기반 스마트 매칭, 상세한 학교 분석, 전문가 상담 서비스를 통해 학생, 학부모, 교육자를 위한 맞춤형 고등학교 찾기 가이드를 제공합니다.",
    images: [
      {
        url: `${siteUrl}/tagbanner.png`,
        width: 1200,
        height: 630,
        alt: "HI-Special - 고등학교 찾기 서비스",
        type: "image/png",
      },
    ],
  },
  other: {
    "og:image:url": `${siteUrl}/tagbanner.png`,
    "og:image:secure_url": `${siteUrl}/tagbanner.png`,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/png",
  },
  twitter: {
    card: "summary_large_image",
    title: "HI-Special - 당신에게 맞는 고등학교를 찾아보세요",
    description:
      "당신의 필요에 맞는 고등학교를 발견하고 비교해보세요. AI 기반 스마트 매칭, 상세한 학교 분석, 전문가 상담 서비스를 제공합니다.",
    images: [`${siteUrl}/tagbanner.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
        <Chatbot />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
