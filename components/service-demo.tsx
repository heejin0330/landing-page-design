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
import { Button } from "@/components/ui/button"
import { matchSchools, type School } from "@/actions/school"
import { INTERESTS, REGIONS, type Interest } from "@/lib/school-data"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  interest1: z.enum(INTERESTS as [Interest, ...Interest[]], {
    required_error: "1순위 관심사를 선택해주세요",
  }),
  interest2: z.enum(INTERESTS as [Interest, ...Interest[]]).optional(),
  interest3: z.enum(INTERESTS as [Interest, ...Interest[]]).optional(),
  region: z.string().min(1, "희망 지역을 선택해주세요"),
})

type FormValues = z.infer<typeof formSchema>

export default function ServiceDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [matchedSchools, setMatchedSchools] = useState<School[]>([])
  const [showResults, setShowResults] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interest1: undefined,
      interest2: undefined,
      interest3: undefined,
      region: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      const interests: [Interest, Interest?, Interest?] = [
        data.interest1,
        data.interest2,
        data.interest3,
      ]

      const result = await matchSchools({
        interests,
        region: data.region,
      })

      if (result.success && result.schools) {
        setMatchedSchools(result.schools)
        setShowResults(true)
      } else {
        alert(result.error || "학교 매칭 중 오류가 발생했습니다.")
      }
    } catch (error) {
      console.error("폼 제출 오류:", error)
      alert("오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setShowResults(false)
    form.reset()
    setMatchedSchools([])
  }

  return (
    <>
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">당신을 배우는 스마트 검색</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                당신의 행동에 따라 추천사항을 세밀하게 조정하는 지능형 알고리즘으로 당신이 좋아할 학교들을 발견할 수
                있습니다.
              </p>
              <button 
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all"
              >
                탐색 시작하기
              </button>
            </div>

          <div className="relative bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl p-8 border border-border">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">프로필 작성하기</h4>
                  <p className="text-sm text-muted-foreground">당신의 관심사와 선호도를 알려주세요</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">매칭된 학교 둘러보기</h4>
                  <p className="text-sm text-muted-foreground">맞춤형 추천사항을 탐색하세요</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">학교와 연결 및 결정</h4>
                  <p className="text-sm text-muted-foreground">학교와 대화하고 지혜롭게 결정하세요</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 탐색 모달 */}
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        {!showResults ? (
          <>
            <DialogHeader>
              <DialogTitle>학교 탐색하기</DialogTitle>
              <DialogDescription>
                관심사와 희망 지역을 선택하면 맞춤형 학교를 추천해드립니다.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="interest1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>1순위 관심사 *</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">선택하세요</option>
                          {INTERESTS.map((interest) => (
                            <option key={interest} value={interest}>
                              {interest}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interest2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>2순위 관심사 (선택)</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          value={field.value || ""}
                          onChange={field.onChange}
                          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">선택하지 않음</option>
                          {INTERESTS.filter((i) => i !== form.watch("interest1")).map((interest) => (
                            <option key={interest} value={interest}>
                              {interest}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interest3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>3순위 관심사 (선택)</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          value={field.value || ""}
                          onChange={field.onChange}
                          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">선택하지 않음</option>
                          {INTERESTS.filter(
                            (i) => i !== form.watch("interest1") && i !== form.watch("interest2")
                          ).map((interest) => (
                            <option key={interest} value={interest}>
                              {interest}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>희망 지역 *</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">선택하세요</option>
                          {REGIONS.map((region) => (
                            <option key={region.value} value={region.value}>
                              {region.label}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                  >
                    취소
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        검색 중...
                      </>
                    ) : (
                      "학교 찾기"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>추천 학교</DialogTitle>
              <DialogDescription>
                선택하신 관심사와 지역에 맞는 학교를 추천해드립니다.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {matchedSchools.length > 0 ? (
                matchedSchools.map((school) => (
                  <Card key={school.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg">{school.name}</h3>
                          <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                            {school.type}
                          </span>
                          {school.matchScore && (
                            <span className="px-2 py-1 text-xs rounded-full bg-secondary/20">
                              적합도: {school.matchScore}점
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {school.region} {school.district && `· ${school.district}`}
                        </p>
                        {school.majors.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {school.majors.map((major, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs rounded bg-muted"
                              >
                                {major}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2 flex-wrap">
                          <Link
                            href={school.hifiveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            하이파이브에서 자세히 보기 →
                          </Link>
                          {school.homepage && (
                            <Link
                              href={school.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-secondary hover:underline"
                            >
                              학교 홈페이지 →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  조건에 맞는 학교를 찾을 수 없습니다.
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowResults(false)
                  form.reset()
                }}
                className="flex-1"
              >
                다시 검색
              </Button>
              <Button
                type="button"
                onClick={handleClose}
                className="flex-1"
              >
                닫기
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
    </>
  )
}
