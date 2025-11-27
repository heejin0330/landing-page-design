module.exports = [
"[project]/actions/gemini.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"60da9626967c432fb7b5f35c996fffe514b45031ed":"sendChatMessage"},"",""] */ __turbopack_context__.s([
    "sendChatMessage",
    ()=>sendChatMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$generative$2d$ai$40$0$2e$24$2e$1$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@google+generative-ai@0.24.1/node_modules/@google/generative-ai/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function sendChatMessage(message, history = []) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY가 설정되지 않았습니다.");
            return {
                success: false,
                error: "서버 설정 오류: API 키가 없습니다."
            };
        }
        const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$generative$2d$ai$40$0$2e$24$2e$1$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });
        // 히스토리에서 초기 assistant 메시지 제외
        // 첫 번째 메시지가 assistant인 경우 제외 (초기 인사 메시지)
        const filteredHistory = history.filter((msg, index)=>{
            if (index === 0 && msg.role === "assistant") {
                return false;
            }
            return true;
        });
        // 채팅 히스토리를 Gemini 형식으로 변환
        // 첫 번째 메시지는 반드시 user여야 함
        const chatHistory = filteredHistory.map((msg)=>({
                role: msg.role === "user" ? "user" : "model",
                parts: [
                    {
                        text: msg.content
                    }
                ]
            })).filter((msg, index)=>{
            // 첫 번째 메시지가 user가 아니면 제외
            if (index === 0 && msg.role !== "user") {
                return false;
            }
            return true;
        });
        // 채팅 시작 (히스토리가 있으면 전달, 없으면 빈 배열)
        const chat = model.startChat({
            history: chatHistory.length > 0 ? chatHistory : undefined
        });
        // 메시지 전송 및 응답 받기
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();
        return {
            success: true,
            message: text
        };
    } catch (error) {
        console.error("Gemini API 오류:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    sendChatMessage
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendChatMessage, "60da9626967c432fb7b5f35c996fffe514b45031ed", null);
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/timers [external] (timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("timers", () => require("timers"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[project]/actions/news.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00d17b4b1da97279cdc73a668fc1e8474570adec9b":"collectNews","407f1564b5ff55eb1c9dc3eaa2df65efd22c87db84":"getNews"},"",""] */ __turbopack_context__.s([
    "collectNews",
    ()=>collectNews,
    "getNews",
    ()=>getNews
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$rss$2d$parser$40$3$2e$13$2e$0$2f$node_modules$2f$rss$2d$parser$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/rss-parser@3.13.0/node_modules/rss-parser/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
// RSS 피드 URL 목록
const RSS_FEEDS = [];
// 키워드 매칭 함수
function categorizeNews(title, summary) {
    const text = (title + " " + summary).toLowerCase();
    const keywords = {
        고교입시: [
            "고교입시",
            "고등학교 입시",
            "입학전형",
            "학생부",
            "내신",
            "입시",
            "고입"
        ],
        마이스터고: [
            "마이스터고",
            "마이스터",
            "특성화고",
            "기술고",
            "전문계고"
        ],
        특성화고: [
            "특성화고",
            "특성화 고등학교",
            "전문계",
            "실업계",
            "상업고",
            "공업고",
            "농업고"
        ]
    };
    // 마이스터고 키워드가 있으면 마이스터고로 분류
    if (keywords.마이스터고.some((kw)=>text.includes(kw))) {
        return "마이스터고";
    }
    // 특성화고 키워드가 있으면 특성화고로 분류
    if (keywords.특성화고.some((kw)=>text.includes(kw))) {
        return "특성화고";
    }
    // 고교입시 키워드가 있으면 고교입시로 분류
    if (keywords.고교입시.some((kw)=>text.includes(kw))) {
        return "고교입시";
    }
    return null;
}
// Notion에 뉴스 저장
async function saveNewsToNotion(news) {
    try {
        const notionApiKey = process.env.NOTION_API_KEY;
        const notionNewsDatabaseId = process.env.NOTION_NEWS_DATABASE_ID;
        if (!notionApiKey || !notionNewsDatabaseId) {
            console.error("Notion API 키 또는 데이터베이스 ID가 설정되지 않았습니다.");
            return false;
        }
        const properties = {
            제목: {
                title: [
                    {
                        text: {
                            content: news.title
                        }
                    }
                ]
            },
            카테고리: {
                select: {
                    name: news.category
                }
            },
            요약: {
                rich_text: [
                    {
                        text: {
                            content: news.summary
                        }
                    }
                ]
            },
            링크: {
                url: news.link
            },
            날짜: {
                date: {
                    start: news.date
                }
            },
            수집일시: {
                date: {
                    start: new Date().toISOString()
                }
            }
        };
        const response = await fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${notionApiKey}`,
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28"
            },
            body: JSON.stringify({
                parent: {
                    database_id: notionNewsDatabaseId
                },
                properties
            })
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            console.error("Notion API 오류:", errorData);
            return false;
        }
        return true;
    } catch (error) {
        console.error("뉴스 저장 오류:", error);
        return false;
    }
}
// 중복 체크 (링크 기준)
async function checkDuplicate(link) {
    try {
        const notionApiKey = process.env.NOTION_API_KEY;
        const notionNewsDatabaseId = process.env.NOTION_NEWS_DATABASE_ID;
        if (!notionApiKey || !notionNewsDatabaseId) {
            return false;
        }
        const response = await fetch(`https://api.notion.com/v1/databases/${notionNewsDatabaseId}/query`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${notionApiKey}`,
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28"
            },
            body: JSON.stringify({
                filter: {
                    property: "링크",
                    url: {
                        equals: link
                    }
                }
            })
        });
        if (!response.ok) {
            return false;
        }
        const data = await response.json();
        return data.results && data.results.length > 0;
    } catch (error) {
        console.error("중복 체크 오류:", error);
        return false;
    }
}
async function collectNews() {
    try {
        const notionApiKey = process.env.NOTION_API_KEY;
        const notionNewsDatabaseId = process.env.NOTION_NEWS_DATABASE_ID;
        if (!notionApiKey || !notionNewsDatabaseId) {
            return {
                success: false,
                error: "Notion API 키 또는 데이터베이스 ID가 설정되지 않았습니다."
            };
        }
        if (RSS_FEEDS.length === 0) {
            return {
                success: false,
                error: "RSS 피드 URL이 설정되지 않았습니다."
            };
        }
        const parser = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$rss$2d$parser$40$3$2e$13$2e$0$2f$node_modules$2f$rss$2d$parser$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]();
        let collectedCount = 0;
        // 각 RSS 피드에서 뉴스 수집
        for (const feedUrl of RSS_FEEDS){
            try {
                const feed = await parser.parseURL(feedUrl);
                for (const item of feed.items || []){
                    // 카테고리 분류
                    const category = categorizeNews(item.title || "", item.contentSnippet || item.content || "");
                    if (!category) {
                        continue; // 관련 없는 뉴스는 건너뛰기
                    }
                    // 중복 체크
                    const link = item.link || "";
                    if (!link) {
                        continue;
                    }
                    const isDuplicate = await checkDuplicate(link);
                    if (isDuplicate) {
                        continue; // 이미 저장된 뉴스는 건너뛰기
                    }
                    // 뉴스 저장
                    const summary = item.contentSnippet || item.content || item.title || "";
                    const date = item.pubDate ? new Date(item.pubDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
                    const saved = await saveNewsToNotion({
                        title: item.title || "",
                        category,
                        summary: summary.substring(0, 500),
                        link,
                        date
                    });
                    if (saved) {
                        collectedCount++;
                    }
                    // API 호출 제한을 고려하여 약간의 지연
                    await new Promise((resolve)=>setTimeout(resolve, 100));
                }
            } catch (error) {
                console.error(`RSS 피드 파싱 오류 (${feedUrl}):`, error);
                continue;
            }
        }
        return {
            success: true,
            count: collectedCount
        };
    } catch (error) {
        console.error("뉴스 수집 오류:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."
        };
    }
}
async function getNews(limit = 6) {
    try {
        const notionApiKey = process.env.NOTION_API_KEY;
        const notionNewsDatabaseId = process.env.NOTION_NEWS_DATABASE_ID;
        if (!notionApiKey || !notionNewsDatabaseId) {
            return {
                success: false,
                error: "Notion API 키 또는 데이터베이스 ID가 설정되지 않았습니다."
            };
        }
        const response = await fetch(`https://api.notion.com/v1/databases/${notionNewsDatabaseId}/query`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${notionApiKey}`,
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28"
            },
            body: JSON.stringify({
                sorts: [
                    {
                        property: "날짜",
                        direction: "descending"
                    }
                ],
                page_size: limit
            })
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            console.error("Notion API 오류:", errorData);
            return {
                success: false,
                error: "뉴스를 불러오는 중 오류가 발생했습니다."
            };
        }
        const data = await response.json();
        const newsItems = data.results.map((page)=>{
            const props = page.properties;
            return {
                id: page.id,
                category: props.카테고리?.select?.name || "고교입시",
                title: props.제목?.title?.[0]?.text?.content || "",
                summary: props.요약?.rich_text?.[0]?.text?.content || "",
                date: props.날짜?.date?.start || "",
                link: props.링크?.url || "#"
            };
        });
        return {
            success: true,
            news: newsItems
        };
    } catch (error) {
        console.error("뉴스 조회 오류:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    collectNews,
    getNews
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(collectNews, "00d17b4b1da97279cdc73a668fc1e8474570adec9b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getNews, "407f1564b5ff55eb1c9dc3eaa2df65efd22c87db84", null);
}),
"[project]/actions/notion.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"70d459a2e42df3de227639d653795394176f4096ee":"verifyLogin","78a333388d3e2db9241a5de54a510b23b3813ec8e2":"submitWaitlistForm"},"",""] */ __turbopack_context__.s([
    "submitWaitlistForm",
    ()=>submitWaitlistForm,
    "verifyLogin",
    ()=>verifyLogin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function submitWaitlistForm(name, email, phone, userType) {
    try {
        const notionApiKey = process.env.NOTION_API_KEY;
        const notionDatabaseId = process.env.NOTION_DATABASE_ID;
        // 환경변수 검증
        if (!notionApiKey) {
            console.error("NOTION_API_KEY가 설정되지 않았습니다.");
            return {
                success: false,
                error: "서버 설정 오류: API 키가 없습니다."
            };
        }
        if (!notionDatabaseId) {
            console.error("NOTION_DATABASE_ID가 설정되지 않았습니다.");
            return {
                success: false,
                error: "서버 설정 오류: 데이터베이스 ID가 없습니다."
            };
        }
        // 기본 속성 구성
        const properties = {
            이름: {
                title: [
                    {
                        text: {
                            content: name
                        }
                    }
                ]
            },
            이메일: {
                email: email
            },
            전화번호: {
                phone_number: phone
            }
        };
        // 사용자유형이 있으면 속성에 추가
        // 노션 데이터베이스에 속성이 없으면 오류가 발생할 수 있으므로
        // 오류 발생 시 사용자유형 없이 재시도
        if (userType) {
            properties.사용자유형 = {
                select: {
                    name: userType
                }
            };
        }
        // Notion API 호출
        const response = await fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${notionApiKey}`,
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28"
            },
            body: JSON.stringify({
                parent: {
                    database_id: notionDatabaseId
                },
                properties
            })
        });
        // 응답 처리
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            console.error("Notion API 오류 응답:", {
                status: response.status,
                statusText: response.statusText,
                error: errorData
            });
            // 사용자유형 속성 오류인 경우, 사용자유형 없이 재시도
            if (userType && (errorData.message?.includes("사용자유형") || errorData.message?.includes("is not a property"))) {
                console.log("사용자유형 속성이 없어 기본 속성만으로 저장 시도");
                const propertiesWithoutUserType = {
                    이름: {
                        title: [
                            {
                                text: {
                                    content: name
                                }
                            }
                        ]
                    },
                    이메일: {
                        email: email
                    },
                    전화번호: {
                        phone_number: phone
                    }
                };
                const retryResponse = await fetch("https://api.notion.com/v1/pages", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${notionApiKey}`,
                        "Content-Type": "application/json",
                        "Notion-Version": "2022-06-28"
                    },
                    body: JSON.stringify({
                        parent: {
                            database_id: notionDatabaseId
                        },
                        properties: propertiesWithoutUserType
                    })
                });
                if (retryResponse.ok) {
                    const retryResult = await retryResponse.json().catch(()=>null);
                    if (retryResult) {
                        console.log("사용자유형 없이 데이터베이스에 성공적으로 저장되었습니다:", retryResult.id);
                    }
                    return {
                        success: true
                    };
                }
            }
            // 에러 메시지 추출
            let errorMessage = `API 오류 (${response.status})`;
            if (errorData.message) {
                errorMessage = errorData.message;
            } else if (errorData.code) {
                errorMessage = `오류 코드: ${errorData.code}`;
            }
            return {
                success: false,
                error: errorMessage
            };
        }
        // 성공 응답 확인
        const result = await response.json().catch(()=>null);
        if (result) {
            console.log("Notion 데이터베이스에 성공적으로 저장되었습니다:", result.id);
        }
        return {
            success: true
        };
    } catch (error) {
        console.error("폼 제출 중 예외 발생:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "네트워크 오류가 발생했습니다. 다시 시도해주세요."
        };
    }
}
async function verifyLogin(name, email, phone) {
    try {
        const notionApiKey = process.env.NOTION_API_KEY;
        const notionDatabaseId = process.env.NOTION_DATABASE_ID;
        // 환경변수 검증
        if (!notionApiKey) {
            console.error("NOTION_API_KEY가 설정되지 않았습니다.");
            return {
                success: false,
                error: "서버 설정 오류: API 키가 없습니다."
            };
        }
        if (!notionDatabaseId) {
            console.error("NOTION_DATABASE_ID가 설정되지 않았습니다.");
            return {
                success: false,
                error: "서버 설정 오류: 데이터베이스 ID가 없습니다."
            };
        }
        // Notion API로 데이터베이스 쿼리
        const response = await fetch(`https://api.notion.com/v1/databases/${notionDatabaseId}/query`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${notionApiKey}`,
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28"
            },
            body: JSON.stringify({
                filter: {
                    and: [
                        {
                            property: "이름",
                            title: {
                                contains: name
                            }
                        },
                        {
                            property: "이메일",
                            email: {
                                equals: email
                            }
                        },
                        {
                            property: "전화번호",
                            phone_number: {
                                equals: phone
                            }
                        }
                    ]
                }
            })
        });
        // 응답 처리
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            console.error("Notion API 오류 응답:", {
                status: response.status,
                statusText: response.statusText,
                error: errorData
            });
            return {
                success: false,
                error: "로그인 확인 중 오류가 발생했습니다."
            };
        }
        const result = await response.json().catch(()=>null);
        if (!result || !result.results || result.results.length === 0) {
            return {
                success: false,
                error: "일치하는 사용자 정보를 찾을 수 없습니다."
            };
        }
        // 모든 결과를 확인하여 정확히 일치하는 사용자 찾기
        for (const user of result.results){
            const userName = user.properties?.이름?.title?.[0]?.text?.content || "";
            const userEmail = user.properties?.이메일?.email || "";
            const userPhone = user.properties?.전화번호?.phone_number || "";
            // 정확히 일치하는지 확인 (contains로 필터링했지만 정확한 일치 확인)
            if (userName === name && userEmail === email && userPhone === phone) {
                const userType = user.properties?.사용자유형?.select?.name || undefined;
                return {
                    success: true,
                    userType
                };
            }
        }
        // 필터링된 결과가 있지만 정확히 일치하지 않음
        return {
            success: false,
            error: "일치하는 사용자 정보를 찾을 수 없습니다."
        };
    } catch (error) {
        console.error("로그인 검증 중 예외 발생:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "네트워크 오류가 발생했습니다. 다시 시도해주세요."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    submitWaitlistForm,
    verifyLogin
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitWaitlistForm, "78a333388d3e2db9241a5de54a510b23b3813ec8e2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(verifyLogin, "70d459a2e42df3de227639d653795394176f4096ee", null);
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/lib/school-data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// 관심사 목록
__turbopack_context__.s([
    "INTERESTS",
    ()=>INTERESTS,
    "INTEREST_TO_MAJOR_MAPPING",
    ()=>INTEREST_TO_MAJOR_MAPPING,
    "REGIONS",
    ()=>REGIONS,
    "matchInterestToMajor",
    ()=>matchInterestToMajor
]);
const INTERESTS = [
    "IT/소프트웨어",
    "요리/제과",
    "자동차/기계",
    "건축/인테리어",
    "디자인/미술",
    "패션/뷰티",
    "항공/조선",
    "전기/전자",
    "금융/회계",
    "의료/간호",
    "농업/축산",
    "해양/수산",
    "경영/마케팅",
    "호텔/관광",
    "스포츠/레크리에이션"
];
const REGIONS = [
    {
        value: "서울",
        label: "서울특별시"
    },
    {
        value: "부산",
        label: "부산광역시"
    },
    {
        value: "대구",
        label: "대구광역시"
    },
    {
        value: "인천",
        label: "인천광역시"
    },
    {
        value: "광주",
        label: "광주광역시"
    },
    {
        value: "대전",
        label: "대전광역시"
    },
    {
        value: "울산",
        label: "울산광역시"
    },
    {
        value: "세종",
        label: "세종특별자치시"
    },
    {
        value: "경기",
        label: "경기도"
    },
    {
        value: "강원",
        label: "강원특별자치도"
    },
    {
        value: "충북",
        label: "충청북도"
    },
    {
        value: "충남",
        label: "충청남도"
    },
    {
        value: "전북",
        label: "전북특별자치도"
    },
    {
        value: "전남",
        label: "전라남도"
    },
    {
        value: "경북",
        label: "경상북도"
    },
    {
        value: "경남",
        label: "경상남도"
    },
    {
        value: "제주",
        label: "제주특별자치도"
    }
];
const INTEREST_TO_MAJOR_MAPPING = {
    "IT/소프트웨어": [
        "정보기술",
        "소프트웨어",
        "컴퓨터",
        "IT",
        "정보통신",
        "게임",
        "웹",
        "모바일",
        "프로그래밍",
        "네트워크"
    ],
    "요리/제과": [
        "조리",
        "제과제빵",
        "한식",
        "양식",
        "중식",
        "일식",
        "제과",
        "제빵",
        "식품",
        "외식"
    ],
    "자동차/기계": [
        "자동차",
        "기계",
        "기계공학",
        "자동차정비",
        "메카트로닉스",
        "산업기계",
        "생산기계"
    ],
    "건축/인테리어": [
        "건축",
        "인테리어",
        "건축설계",
        "실내건축",
        "건축공학",
        "목공",
        "가구"
    ],
    "디자인/미술": [
        "디자인",
        "미술",
        "시각디자인",
        "산업디자인",
        "영상디자인",
        "애니메이션",
        "만화"
    ],
    "패션/뷰티": [
        "패션",
        "의상",
        "뷰티",
        "미용",
        "화장품",
        "섬유",
        "의류"
    ],
    "항공/조선": [
        "항공",
        "조선",
        "항공정비",
        "항공기계",
        "조선공학",
        "선박"
    ],
    "전기/전자": [
        "전기",
        "전자",
        "전기공학",
        "전자공학",
        "전기전자",
        "전기설비"
    ],
    "금융/회계": [
        "금융",
        "회계",
        "경영",
        "세무",
        "금융정보",
        "회계정보"
    ],
    "의료/간호": [
        "의료",
        "간호",
        "보건",
        "의료정보",
        "의료기기"
    ],
    "농업/축산": [
        "농업",
        "축산",
        "원예",
        "축산경영",
        "농업경영"
    ],
    "해양/수산": [
        "해양",
        "수산",
        "해양공학",
        "수산경영",
        "어업"
    ],
    "경영/마케팅": [
        "경영",
        "마케팅",
        "유통",
        "물류",
        "경영정보"
    ],
    "호텔/관광": [
        "호텔",
        "관광",
        "레저",
        "여행",
        "서비스"
    ],
    "스포츠/레크리에이션": [
        "스포츠",
        "레크리에이션",
        "체육",
        "운동"
    ]
};
function matchInterestToMajor(interest, major) {
    const keywords = INTEREST_TO_MAJOR_MAPPING[interest] || [];
    const majorLower = major.toLowerCase();
    return keywords.some((keyword)=>majorLower.includes(keyword.toLowerCase()));
}
}),
"[project]/actions/school.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"001bb8ec49e49fb5b3553e49fa904b2886eec28c9c":"loadSchoolDataFromExcel","403c82b8bf08cb9ee7a7bf969703c2173e559fea76":"matchSchools"},"",""] */ __turbopack_context__.s([
    "loadSchoolDataFromExcel",
    ()=>loadSchoolDataFromExcel,
    "matchSchools",
    ()=>matchSchools
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$xlsx$40$0$2e$18$2e$5$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/xlsx@0.18.5/node_modules/xlsx/xlsx.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$school$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/school-data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function loadSchoolDataFromExcel() {
    try {
        // 엑셀 파일 경로 (public 폴더에 저장된 파일)
        const filePath = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])(process.cwd(), "public", "data", "school-list.xls");
        // 파일이 없으면 에러 반환
        try {
            const fileBuffer = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readFileSync"])(filePath);
            const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$xlsx$40$0$2e$18$2e$5$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["read"](fileBuffer, {
                type: "buffer"
            });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$xlsx$40$0$2e$18$2e$5$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["utils"].sheet_to_json(worksheet);
            // 데이터 변환 및 정규화
            const schools = data.map((row, index)=>{
                const schoolName = row["학교명"] || "";
                const schoolType = row["학교유형"] || "";
                const educationOffice = row["교육청"] || "";
                const majorType = row["학과유형"] || "";
                const homepage = row["홈페이지"] || row["학교홈페이지"] || row["웹사이트"] || "";
                // 교육청에서 지역 추출
                const region = extractRegionFromEducationOffice(educationOffice);
                // 학교 유형 판단
                const type = schoolType.includes("마이스터") ? "마이스터고" : "특성화고";
                // 홈페이지 URL 정규화 (http:// 또는 https://가 없으면 추가)
                let normalizedHomepage = homepage;
                if (homepage && !homepage.startsWith("http://") && !homepage.startsWith("https://")) {
                    normalizedHomepage = `http://${homepage}`;
                }
                const school = {
                    id: `school-${index}`,
                    name: schoolName,
                    type,
                    region,
                    educationOffice,
                    majors: parseMajors(majorType),
                    hifiveLink: `https://www.hifive.go.kr/stats/schList.do?rootMenuId=01&menuId=010203&schoolName=${encodeURIComponent(schoolName)}`,
                    homepage: normalizedHomepage || undefined
                };
                return school;
            }).filter((school)=>school.name && school.region); // 유효한 데이터만 필터링
            return {
                success: true,
                schools
            };
        } catch (fileError) {
            return {
                success: false,
                error: `엑셀 파일을 읽을 수 없습니다. 파일 경로를 확인하세요: ${filePath}`
            };
        }
    } catch (error) {
        console.error("학교 데이터 로드 오류:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."
        };
    }
}
// 교육청명에서 지역 추출
function extractRegionFromEducationOffice(educationOffice) {
    if (!educationOffice) return "";
    // 교육청명에서 지역 추출
    // 예: "서울특별시교육청" -> "서울", "경기도교육청" -> "경기"
    const regionMap = {
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
        제주특별자치도교육청: "제주"
    };
    // 정확한 매칭 시도
    if (regionMap[educationOffice]) {
        return regionMap[educationOffice];
    }
    // 부분 매칭 시도
    for (const [key, value] of Object.entries(regionMap)){
        if (educationOffice.includes(key.replace("교육청", ""))) {
            return value;
        }
    }
    // 매칭 실패 시 원본 반환 (빈 문자열)
    return "";
}
// 학과 문자열 파싱 (쉼표, 슬래시 등으로 구분된 문자열을 배열로 변환)
function parseMajors(majorString) {
    if (!majorString) return [];
    return majorString.split(/[,/|]/).map((major)=>major.trim()).filter((major)=>major.length > 0);
}
async function matchSchools(params) {
    try {
        // 학교 데이터 로드
        const dataResult = await loadSchoolDataFromExcel();
        if (!dataResult.success || !dataResult.schools) {
            return {
                success: false,
                error: dataResult.error || "학교 데이터를 불러올 수 없습니다."
            };
        }
        const schools = dataResult.schools;
        // 매칭 점수 계산
        const scoredSchools = schools.map((school)=>{
            let score = 0;
            // 관심사 매칭 점수 계산
            params.interests.forEach((interest, index)=>{
                if (!interest) return;
                const weight = [
                    3,
                    2,
                    1
                ][index]; // 1순위: 3점, 2순위: 2점, 3순위: 1점
                // 학교의 학과 중 하나라도 관심사와 매칭되면 점수 추가
                const matched = school.majors.some((major)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$school$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["matchInterestToMajor"])(interest, major));
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
                matchScore: score
            };
        });
        // 점수가 0보다 큰 학교만 필터링하고 정렬
        const matchedSchools = scoredSchools.filter((school)=>school.matchScore && school.matchScore > 0).sort((a, b)=>{
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
            schools: matchedSchools
        };
    } catch (error) {
        console.error("학교 매칭 오류:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    loadSchoolDataFromExcel,
    matchSchools
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loadSchoolDataFromExcel, "001bb8ec49e49fb5b3553e49fa904b2886eec28c9c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(matchSchools, "403c82b8bf08cb9ee7a7bf969703c2173e559fea76", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/gemini.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/news.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/notion.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/actions/school.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$gemini$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/gemini.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$news$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/news.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$notion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/notion.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$school$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/school.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/gemini.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/news.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/notion.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/actions/school.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00d17b4b1da97279cdc73a668fc1e8474570adec9b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$news$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collectNews"],
    "403c82b8bf08cb9ee7a7bf969703c2173e559fea76",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$school$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["matchSchools"],
    "407f1564b5ff55eb1c9dc3eaa2df65efd22c87db84",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$news$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getNews"],
    "60da9626967c432fb7b5f35c996fffe514b45031ed",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$gemini$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendChatMessage"],
    "70d459a2e42df3de227639d653795394176f4096ee",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$notion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyLogin"],
    "78a333388d3e2db9241a5de54a510b23b3813ec8e2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$notion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["submitWaitlistForm"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$gemini$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$actions$2f$news$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$actions$2f$notion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$actions$2f$school$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/gemini.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/actions/news.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/actions/notion.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/actions/school.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$gemini$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/gemini.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$news$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/news.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$notion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/notion.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$school$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/school.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cfb9bf93._.js.map