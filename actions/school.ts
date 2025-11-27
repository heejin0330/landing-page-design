"use server";

import * as XLSX from "xlsx";
import { readFileSync } from "fs";
import { join } from "path";
import { matchInterestToMajor, type Interest } from "@/lib/school-data";

export interface School {
  id: string;
  name: string;
  type: "특성화고" | "마이스터고";
  region: string; // 시/도
  district?: string; // 시/군/구
  educationOffice?: string; // 교육청
  majors: string[]; // 과/전공 목록
  hifiveLink: string;
  homepage?: string; // 학교 홈페이지 URL
  matchScore?: number; // 적합도 점수
}

interface LoadSchoolDataResult {
  success: boolean;
  schools?: School[];
  error?: string;
}

interface MatchSchoolsResult {
  success: boolean;
  schools?: School[];
  error?: string;
}

// 엑셀 파일에서 학교 데이터 로드
export async function loadSchoolDataFromExcel(): Promise<LoadSchoolDataResult> {
  try {
    // 엑셀 파일 경로 (public 폴더에 저장된 파일)
    const filePath = join(process.cwd(), "public", "data", "school-list.xls");

    // 파일이 없으면 에러 반환
    try {
      const fileBuffer = readFileSync(filePath);
      const workbook = XLSX.read(fileBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet) as any[];

      // 데이터 변환 및 정규화
      const schools: School[] = data
        .map((row, index) => {
          const schoolName = row["학교명"] || "";
          const schoolType = row["학교유형"] || "";
          const educationOffice = row["교육청"] || "";
          const majorType = row["학과유형"] || "";
          const homepage =
            row["홈페이지"] || row["학교홈페이지"] || row["웹사이트"] || "";

          // 교육청에서 지역 추출
          const region = extractRegionFromEducationOffice(educationOffice);

          // 학교 유형 판단
          const type: "특성화고" | "마이스터고" = schoolType.includes(
            "마이스터"
          )
            ? "마이스터고"
            : "특성화고";

          // 홈페이지 URL 정규화 (http:// 또는 https://가 없으면 추가)
          let normalizedHomepage = homepage;
          if (
            homepage &&
            !homepage.startsWith("http://") &&
            !homepage.startsWith("https://")
          ) {
            normalizedHomepage = `http://${homepage}`;
          }

          const school: School = {
            id: `school-${index}`,
            name: schoolName,
            type,
            region,
            educationOffice,
            majors: parseMajors(majorType),
            hifiveLink: `https://www.hifive.go.kr/stats/schList.do?rootMenuId=01&menuId=010203&schoolName=${encodeURIComponent(
              schoolName
            )}`,
            homepage: normalizedHomepage || undefined,
          };

          return school;
        })
        .filter((school) => school.name && school.region); // 유효한 데이터만 필터링

      return {
        success: true,
        schools,
      };
    } catch (fileError) {
      return {
        success: false,
        error: `엑셀 파일을 읽을 수 없습니다. 파일 경로를 확인하세요: ${filePath}`,
      };
    }
  } catch (error) {
    console.error("학교 데이터 로드 오류:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
    };
  }
}

// 교육청명에서 지역 추출
function extractRegionFromEducationOffice(educationOffice: string): string {
  if (!educationOffice) return "";

  // 교육청명에서 지역 추출
  // 예: "서울특별시교육청" -> "서울", "경기도교육청" -> "경기"
  const regionMap: Record<string, string> = {
    서울특별시교육청: "서울",
    부산광역시교육청: "부산",
    대구광역시교육청: "대구",
    인천광역시교육청: "인천",
    광주광역시교육청: "광주",
    대전광역시교육청: "대전",
    울산광역시교육청: "울산",
    세종특별자치시교육청: "세종",
    경기도교육청: "경기",
    강원특별자치도교육청: "강원",
    충청북도교육청: "충북",
    충청남도교육청: "충남",
    전북특별자치도교육청: "전북",
    전라남도교육청: "전남",
    경상북도교육청: "경북",
    경상남도교육청: "경남",
    제주특별자치도교육청: "제주",
  };

  // 정확한 매칭 시도
  if (regionMap[educationOffice]) {
    return regionMap[educationOffice];
  }

  // 부분 매칭 시도
  for (const [key, value] of Object.entries(regionMap)) {
    if (educationOffice.includes(key.replace("교육청", ""))) {
      return value;
    }
  }

  // 매칭 실패 시 원본 반환 (빈 문자열)
  return "";
}

// 학과 문자열 파싱 (쉼표, 슬래시 등으로 구분된 문자열을 배열로 변환)
function parseMajors(majorString: string): string[] {
  if (!majorString) return [];

  return majorString
    .split(/[,/|]/)
    .map((major) => major.trim())
    .filter((major) => major.length > 0);
}

// 학교 매칭 알고리즘
export async function matchSchools(params: {
  interests: [Interest, Interest?, Interest?]; // 1-3순위 관심사
  region: string; // 희망 지역
}): Promise<MatchSchoolsResult> {
  try {
    // 학교 데이터 로드
    const dataResult = await loadSchoolDataFromExcel();

    if (!dataResult.success || !dataResult.schools) {
      return {
        success: false,
        error: dataResult.error || "학교 데이터를 불러올 수 없습니다.",
      };
    }

    const schools = dataResult.schools;

    // 매칭 점수 계산
    const scoredSchools: School[] = schools.map((school) => {
      let score = 0;

      // 관심사 매칭 점수 계산
      params.interests.forEach((interest, index) => {
        if (!interest) return;

        const weight = [3, 2, 1][index]; // 1순위: 3점, 2순위: 2점, 3순위: 1점

        // 학교의 학과 중 하나라도 관심사와 매칭되면 점수 추가
        const matched = school.majors.some((major) =>
          matchInterestToMajor(interest, major)
        );

        if (matched) {
          score += weight;
        }
      });

      // 지역 매칭 점수 계산
      if (school.region === params.region) {
        score += 5; // 지역 일치 시 추가 점수
      }

      return {
        ...school,
        matchScore: score,
      };
    });

    // 점수가 0보다 큰 학교만 필터링하고 정렬
    const matchedSchools = scoredSchools
      .filter((school) => school.matchScore && school.matchScore > 0)
      .sort((a, b) => {
        // 1순위: 지역 일치 여부 (지역 일치가 먼저)
        const aRegionMatch = a.region === params.region;
        const bRegionMatch = b.region === params.region;

        if (aRegionMatch && !bRegionMatch) return -1; // a가 지역 일치, b가 불일치 -> a가 앞
        if (!aRegionMatch && bRegionMatch) return 1; // a가 지역 불일치, b가 일치 -> b가 앞

        // 2순위: 지역이 같으면 점수 순으로 정렬
        return (b.matchScore || 0) - (a.matchScore || 0);
      });

    return {
      success: true,
      schools: matchedSchools,
    };
  } catch (error) {
    console.error("학교 매칭 오류:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
    };
  }
}
