module.exports = [
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
                properties: {
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
                    },
                    ...userType && {
                        사용자유형: {
                            select: {
                                name: userType
                            }
                        }
                    }
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
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/notion.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$notion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/notion.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/notion.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "70d459a2e42df3de227639d653795394176f4096ee",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$notion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyLogin"],
    "78a333388d3e2db9241a5de54a510b23b3813ec8e2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$notion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["submitWaitlistForm"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$notion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/notion.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$notion$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/notion.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=_73bd7d71._.js.map