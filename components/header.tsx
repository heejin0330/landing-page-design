"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { submitWaitlistForm, verifyLogin } from "@/actions/notion"

const signupFormSchema = z.object({
  userType: z.enum(["선생님", "학생", "학부모"], {
    required_error: "사용자 유형을 선택해주세요",
  }),
  name: z.string().min(2, "이름을 입력해주세요"),
  email: z.string().email("올바른 이메일을 입력해주세요"),
  phone: z.string().min(10, "올바른 전화번호를 입력해주세요"),
})

const loginFormSchema = z.object({
  name: z.string().min(2, "이름을 입력해주세요"),
  email: z.string().email("올바른 이메일을 입력해주세요"),
  phone: z.string().min(10, "올바른 전화번호를 입력해주세요"),
})

type SignupFormValues = z.infer<typeof signupFormSchema>
type LoginFormValues = z.infer<typeof loginFormSchema>

export default function Header() {
  const router = useRouter()
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false)
  const [step, setStep] = useState<"select" | "form">("select")
  const [selectedUserType, setSelectedUserType] = useState<"선생님" | "학생" | "학부모" | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState<string>("")

  useEffect(() => {
    // localStorage에서 로그인 상태 확인
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setIsLoggedIn(true)
        setUserName(user.name)
      } catch (error) {
        console.error("사용자 정보 파싱 오류:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      userType: undefined,
      name: "",
      email: "",
      phone: "",
    },
  })

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  const handleUserTypeSelect = (userType: "선생님" | "학생" | "학부모") => {
    setSelectedUserType(userType)
    signupForm.setValue("userType", userType)
    setStep("form")
  }

  const onSignupSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true)
    try {
      const result = await submitWaitlistForm(data.name, data.email, data.phone, data.userType)
      
      if (result.success) {
        alert("회원가입이 완료되었습니다!")
        signupForm.reset()
        setStep("select")
        setSelectedUserType(null)
        setIsSignupModalOpen(false)
      } else {
        alert(`회원가입 중 오류가 발생했습니다: ${result.error || "알 수 없는 오류"}`)
      }
    } catch (error) {
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.")
      console.error("폼 제출 오류:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoginSubmitting(true)
    try {
      const result = await verifyLogin(data.name, data.email, data.phone)
      
      if (result.success) {
        // 사용자 정보를 localStorage에 저장
        const userInfo = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          userType: result.userType,
        }
        localStorage.setItem("user", JSON.stringify(userInfo))
        setIsLoggedIn(true)
        setUserName(data.name)
        
        alert(`로그인 성공! 환영합니다, ${data.name}님!`)
        loginForm.reset()
        setIsLoginModalOpen(false)
        
        // 페이지 새로고침하여 헤더 업데이트
        router.refresh()
      } else {
        alert("정보를 확인해주세요.\n\n회원가입이 필요하신가요? 회원가입을 진행해주세요.")
        // 회원가입 모달로 전환
        setIsLoginModalOpen(false)
        setIsSignupModalOpen(true)
      }
    } catch (error) {
      alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.")
      console.error("로그인 오류:", error)
    } finally {
      setIsLoginSubmitting(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUserName("")
    alert("안녕히 가세요.")
    router.push("/")
    router.refresh()
  }

  const handleSignupClose = () => {
    setIsSignupModalOpen(false)
    setStep("select")
    setSelectedUserType(null)
    signupForm.reset()
  }

  const handleLoginClose = () => {
    setIsLoginModalOpen(false)
    loginForm.reset()
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">HI</span>
            </div>
            <span className="font-bold text-lg text-foreground">HI-Special</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-foreground hover:text-primary transition-colors">
              특징
            </a>
            <a href="/self-assessment" className="text-sm text-foreground hover:text-primary transition-colors">
              자가진단
            </a>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/my-page"
                  className="px-4 py-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                  마이페이지
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                  로그인
                </button>
                <button 
                  onClick={() => setIsSignupModalOpen(true)}
                  className="px-6 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  시작하기
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* 로그인 모달 */}
      <Dialog open={isLoginModalOpen} onOpenChange={handleLoginClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>로그인</DialogTitle>
            <DialogDescription>
              이름, 이메일, 전화번호를 입력해주세요.
            </DialogDescription>
          </DialogHeader>

          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input placeholder="이름을 입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="이메일을 입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>전화번호</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="전화번호를 입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleLoginClose}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoginSubmitting}>
                  {isLoginSubmitting ? "처리 중..." : "로그인"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* 회원가입 모달 */}
      <Dialog open={isSignupModalOpen} onOpenChange={handleSignupClose}>
        <DialogContent className="sm:max-w-md">
          {step === "select" ? (
            <>
              <DialogHeader>
                <DialogTitle>회원가입</DialogTitle>
                <DialogDescription>
                  사용자 유형을 선택해주세요.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-4">
                <button
                  onClick={() => handleUserTypeSelect("선생님")}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all text-left"
                >
                  <div className="font-bold text-lg mb-1">선생님</div>
                  <div className="text-sm opacity-90">교육자 및 교사</div>
                </button>

                <button
                  onClick={() => handleUserTypeSelect("학생")}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all text-left"
                >
                  <div className="font-bold text-lg mb-1">학생</div>
                  <div className="text-sm opacity-90">고등학교 진학을 고민하는 중학생</div>
                </button>

                <button
                  onClick={() => handleUserTypeSelect("학부모")}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all text-left"
                >
                  <div className="font-bold text-lg mb-1">학부모</div>
                  <div className="text-sm opacity-90">학생의 부모님</div>
                </button>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSignupClose}
                >
                  취소
                </Button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>회원가입</DialogTitle>
                <DialogDescription>
                  {selectedUserType}으로 회원가입을 진행합니다. 아래 정보를 입력해주세요.
                </DialogDescription>
              </DialogHeader>

              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                  <FormField
                    control={signupForm.control}
                    name="userType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>사용자 유형</FormLabel>
                        <FormControl>
                          <div className="p-3 bg-muted rounded-md text-foreground">
                            {selectedUserType}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이름</FormLabel>
                        <FormControl>
                          <Input placeholder="이름을 입력하세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="이메일을 입력하세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>전화번호</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="전화번호를 입력하세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setStep("select")
                        setSelectedUserType(null)
                        signupForm.setValue("userType", undefined as any)
                      }}
                      className="flex-1"
                    >
                      이전
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting ? "처리 중..." : "가입하기"}
                    </Button>
                  </div>
                </form>
              </Form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
