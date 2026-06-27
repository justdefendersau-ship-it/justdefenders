/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\app\api\vehicles\route.ts
 *
 * Timestamp:
 * 27 June 2026 14:15 Sydney
 *
 * PURPOSE:
 * Vehicle API Validation
 *
 * Wave 5C
 * Platform Validation
 *
 * ============================================================
 */

import { NextResponse } from "next/server"

import {
    getSupabaseServerClient
} from "@/lib/supabase/server"

export async function GET() {

    try {

        const supabase =
            getSupabaseServerClient()

/*
const {
  data: { user },
  error: authError
} = await supabase.auth.getUser()

console.log("=== API AUTH ===")
console.log("User:", user)
console.log("Auth Error:", authError)
console.log("================")
*/

        const {

            data,

            error

        } = await supabase

            .from("vehicles")

            .select("*")

            .limit(5)

        if (error) {

            console.error(

                "Vehicle API Error:",

                error

            )

            return NextResponse.json(

                {

                    success: false,

                    error: error.message

                },

                {

                    status: 500

                }

            )

        }

        return NextResponse.json(

            {

                success: true,

                diagnostics: {

                    returnedRows:
                        data?.length ?? 0,

                    query:
                        "vehicles",

                    validation:
                        "Wave 5C"

                },

                data

            }

        )

    }

    catch (err: any) {

        console.error(

            "Vehicle API Exception:",

            err

        )

        return NextResponse.json(

            {

                success: false,

                error:
                    err?.message ??
                    "Unexpected server error."

            },

            {

                status: 500

            }

        )

    }

}