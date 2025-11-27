"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
import { submitWaitlistForm } from "@/actions/notion"

const formSchema = z.object({
  userType: z.enum(["선생님", "학생", "학부모"], {
    required_error: "사용자 유형을 선택해주세요",
  }),
  name: z.string().min(2, "이름을 입력해주세요"),
  email: z.string().email("올바른 이메일을 입력해주세요"),
  phone: z.string().min(10, "올바른 전화번호를 입력해주세요"),
})

type FormValues = z.infer<typeof formSchema>

export default function CTA() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<"select" | "form">("select")
  const [selectedUserType, setSelectedUserType] = useState<"선생님" | "학생" | "학부모" | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userType: undefined,
      name: "",
      email: "",
      phone: "",
    },
  })

  const handleUserTypeSelect = (userType: "선생님" | "학생" | "학부모") => {
    setSelectedUserType(userType)
    form.setValue("userType", userType)
    setStep("form")
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      const result = await submitWaitlistForm(data.name, data.email, data.phone, data.userType)
      
      if (result.success) {
        alert("대기명단 신청이 완료되었습니다!")
        form.reset()
        setStep("select")
        setSelectedUserType(null)
        setIsOpen(false)
      } else {
        alert(`신청 중 오류가 발생했습니다: ${result.error || "알 수 없는 오류"}`)
      }
    } catch (error) {
      alert("신청 중 오류가 발생했습니다. 다시 시도해주세요.")
      console.error("폼 제출 오류:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setStep("select")
    setSelectedUserType(null)
    form.reset()
  }

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">당신에게 맞는 학교를 찾을 준비가 되셨나요?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            자신의 이상적인 고등학교를 발견한 수천명의 학생과 가족들과 함께하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsSearchModalOpen(true)}
              className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-medium hover:opacity-90 transition-all text-center"
            >
              학교 탐색하기
            </button>
            <button 
              onClick={() => setIsOpen(true)}
              className="px-8 py-3 border-2 border-primary-foreground/30 text-primary-foreground rounded-full font-medium hover:border-primary-foreground/60 transition-all"
            >
              대기명단 신청하기
            </button>
          </div>
        </div>
      </section>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          {step === "select" ? (
            <>
              <DialogHeader>
                <DialogTitle>대기명단 신청</DialogTitle>
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
                  onClick={handleClose}
                >
                  취소
                </Button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>대기명단 신청</DialogTitle>
                <DialogDescription>
                  {selectedUserType}으로 대기명단 신청을 진행합니다. 아래 정보를 입력해주세요.
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                        form.setValue("userType", undefined as any)
                      }}
                      className="flex-1"
                    >
                      이전
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting ? "처리 중..." : "신청하기"}
                    </Button>
                  </div>
                </form>
              </Form>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 학교 유형 선택 모달 */}
      <Dialog open={isSearchModalOpen} onOpenChange={setIsSearchModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>학교 유형 선택</DialogTitle>
            <DialogDescription>
              탐색하고 싶은 학교 유형을 선택해주세요.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            <button
              onClick={() => {
                // 하이파이브 사이트로 이동 (특성화고 필터링은 사이트에서 가능)
                window.open(
                  "https://www.hifive.go.kr/stats/schInfoList.do?rootMenuId=01&menuId=010101&titledepth=3",
                  "_blank",
                  "noopener,noreferrer"
                )
                setIsSearchModalOpen(false)
              }}
              className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all text-left"
            >
              <div className="font-bold text-lg mb-1">특성화고</div>
              <div className="text-sm opacity-90">전문 분야 특성화 고등학교</div>
            </button>

            <button
              onClick={() => {
                window.open(
                  "https://www.hifive.go.kr/stats/schInfoList.do?rootMenuId=01&menuId=010101&titledepth=3",
                  "_blank",
                  "noopener,noreferrer"
                )
                setIsSearchModalOpen(false)
              }}
              className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all text-left"
            >
              <div className="font-bold text-lg mb-1">마이스터고</div>
              <div className="text-sm opacity-90">마이스터 고등학교</div>
            </button>

            <button
              onClick={() => {
                window.open(
                  "https://www.hifive.go.kr/stats/schInfoList.do?rootMenuId=01&menuId=010101&titledepth=3",
                  "_blank",
                  "noopener,noreferrer"
                )
                setIsSearchModalOpen(false)
              }}
              className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all text-left"
            >
              <div className="font-bold text-lg mb-1">일반고(종합고)</div>
              <div className="text-sm opacity-90">일반 고등학교 및 종합 고등학교</div>
            </button>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSearchModalOpen(false)}
            >
              취소
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
