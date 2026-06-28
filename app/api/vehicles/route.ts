import { NextResponse } from "next/server"

import {
    getSupabaseServerClient
} from "@/lib/supabase/server"

import {
    VehicleRepository
} from "@/lib/repositories/VehicleRepository"

import {
    VehicleService
} from "@/lib/services/VehicleService"

export async function GET() {

    try {

        console.log("STEP 1 - Route entered")

        const supabase =
            getSupabaseServerClient()

        console.log("STEP 2 - Supabase client created")

        const repository =
            new VehicleRepository(
                supabase
            )

        console.log("STEP 3 - Repository created")

        const service =
            new VehicleService(
                repository
            )

        console.log("STEP 4 - Service created")

        const vehicles =
            await service.loadVehicles()

        console.log("STEP 5 - Vehicles loaded")

        return NextResponse.json({

            success: true,

            count:
                vehicles.length,

            data:
                vehicles

        })

    }

    catch (error: any) {

        console.error(

            "ROUTE FAILURE",

            error

        )

        return NextResponse.json(

            {

                success: false,

                error:
                    error?.message

            },

            {

                status: 500

            }

        )

    }

}