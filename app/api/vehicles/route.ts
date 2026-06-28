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

        
        const supabase =
            getSupabaseServerClient()

                const repository =
            new VehicleRepository(
                supabase
            )

        
        const service =
            new VehicleService(
                repository
            )

        
        const vehicles =
            await service.loadVehicles()

        
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