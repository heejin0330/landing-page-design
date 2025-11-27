"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface UserInfo {
  name: string
  email: string
  phone: string
  userType?: string
}

export default function MyPage() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // localStorage에서 사용자 정보 가져오기
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setUserInfo(user)
        setIsLoading(false)
      } catch (error) {
        console.error("사용자 정보 파싱 오류:", error)
        localStorage.removeItem("user")
        router.push("/")
      }
    } else {
      // 로그인하지 않은 경우 홈으로 리다이렉트
      router.push("/")
    }
  }, [router])

  if (isLoading || !userInfo) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">마이페이지</h1>

          {/* 내 정보 섹션 */}
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">내 정보</h2>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-border">
                <span className="text-sm font-medium text-muted-foreground mb-1 sm:mb-0">사용자 유형</span>
                <span className="text-foreground font-medium">
                  {userInfo.userType || "미설정"}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-border">
                <span className="text-sm font-medium text-muted-foreground mb-1 sm:mb-0">이름</span>
                <span className="text-foreground font-medium">{userInfo.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-border">
                <span className="text-sm font-medium text-muted-foreground mb-1 sm:mb-0">이메일</span>
                <span className="text-foreground font-medium">{userInfo.email}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3">
                <span className="text-sm font-medium text-muted-foreground mb-1 sm:mb-0">전화번호</span>
                <span className="text-foreground font-medium">{userInfo.phone}</span>
              </div>
            </div>
          </Card>

          {/* 문의내역 섹션 */}
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">문의내역</h2>
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">아직 문의내역이 없습니다.</p>
              <p className="text-sm text-muted-foreground mb-6">
                문의사항이 있으시면 고객센터로 연락해주세요.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  // 문의하기 기능은 추후 구현
                  alert("문의하기 기능은 준비 중입니다.")
                }}
              >
                문의하기
              </Button>
            </div>
          </Card>

          {/* 추가 기능 섹션 */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">추가 기능</h2>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/self-assessment")}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all text-left"
              >
                <div className="font-bold text-lg mb-1">직업능력 자가진단</div>
                <div className="text-sm opacity-90">나의 직업능력을 진단해보세요</div>
              </button>
              <button
                onClick={() => {
                  window.open(
                    "https://www.hifive.go.kr/stats/schInfoList.do?rootMenuId=01&menuId=010101&titledepth=3",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all text-left"
              >
                <div className="font-bold text-lg mb-1">학교 탐색하기</div>
                <div className="text-sm opacity-90">다양한 학교 정보를 확인하세요</div>
              </button>
            </div>
          </Card>
        </div>
      </section>
      <Footer />
    </main>
  )
}

