```tsx
/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\contexts\DigitalTwinContext.tsx
 *
 * Timestamp:
 * 26 June 2026 16:45 Sydney
 *
 * PURPOSE:
 * Canonical Digital Twin Runtime Context.
 *
 * M3.6
 * Sprint 1 – Digital Twin Runtime
 *
 * PASS 1
 *
 * CHANGE SUMMARY
 * ------------------------------------------------------------
 * Introduces the canonical Digital Twin runtime context.
 *
 * This context will become the primary runtime source for
 * all Digital Twin operations across:
 *
 * • Garage
 * • Command Centre
 * • Fuel Intelligence
 * • Supplier Intelligence
 * • Parts Intelligence
 * • Predictive Maintenance
 * • Mobile Platform
 *
 * Pass 1 establishes:
 *
 * • Context definition
 * • Provider
 * • Runtime state
 * • Public hook
 *
 * ============================================================
 */

"use client"

import {

    createContext,
    useContext,
    useMemo,
    useState

} from "react"

import type {

    DigitalTwin

} from "@/lib/domain/vehicle"

// ============================================================
// TYPES
// ============================================================

export interface DigitalTwinContextValue {

    /**
     * All Digital Twins currently loaded.
     */
    digitalTwins: DigitalTwin[]

    /**
     * Active VIN.
     */
    selectedVin?: string

    /**
     * Currently selected Digital Twin.
     */
    selectedTwin?: DigitalTwin

    /**
     * Runtime operations.
     *
     * Implemented during Pass 2.
     */
selectVehicle(vin: string): void

addDigitalTwin(
    twin: DigitalTwin
): void

updateDigitalTwin(
    twin: DigitalTwin
): void

removeDigitalTwin(
    vin: string
): void

replaceDigitalTwins(
    twins: DigitalTwin[]
): void

archiveVehicle(
    vin: string
): void

refreshTwin(
    vin: string
): void

}

// ============================================================
// CONTEXT
// ============================================================

const DigitalTwinContext =
    createContext<
        DigitalTwinContextValue | null
    >(null)

// ============================================================
// PROVIDER
// ============================================================

export function DigitalTwinProvider({

    children

}: {

    children: React.ReactNode

}) {

    // ========================================================
    // RUNTIME STATE
    // ========================================================

    const [

        digitalTwins,
        setDigitalTwins

    ] = useState<DigitalTwin[]>([])

    const [

        selectedVin,
        setSelectedVin

    ] = useState<string>()

    // ========================================================
    // DERIVED STATE
    // ========================================================

    const selectedTwin =
        digitalTwins.find(

            twin =>

                twin.identity.vin ===
                selectedVin

        )

    // ========================================================
    // PLACEHOLDER OPERATIONS
    //
    // Implemented in Pass 2.
    // ========================================================

    function selectVehicle(

        vin: string

    ) {

        setSelectedVin(vin)

    }

function addDigitalTwin(

    twin: DigitalTwin

) {

    setDigitalTwins(previous => [

        ...previous,

        twin

    ])

}

function updateDigitalTwin(

    twin: DigitalTwin

) {

    setDigitalTwins(previous =>

        previous.map(existing =>

            existing.identity.vin === twin.identity.vin

                ? twin

                : existing

        )

    )

}

function removeDigitalTwin(

    vin: string

) {

    setDigitalTwins(previous =>

        previous.filter(

            twin =>

                twin.identity.vin !== vin

        )

    )

}

function replaceDigitalTwins(

    twins: DigitalTwin[]

) {

    setDigitalTwins(twins)

}

function archiveVehicle(

    vin: string

) {

    setDigitalTwins(previous =>

        previous.map(twin =>

            twin.identity.vin === vin

                ? {

                    ...twin,

                    operational: {

                        ...twin.operational,

                        archived: true

                    }

                }

                : twin

        )

    )

}

function refreshTwin(

    vin: string

) {

    /**
     * Repository integration arrives during M3.9.
     *
     * For now this is intentionally a runtime placeholder.
     */

    console.debug(

        "Refresh requested for Digital Twin:",

        vin

    )

}

    // ========================================================
    // CONTEXT VALUE
    // ========================================================

    const value =
        useMemo(() => ({

            digitalTwins,

            selectedVin,

            selectedTwin,

selectVehicle,

addDigitalTwin,

updateDigitalTwin,

removeDigitalTwin,

replaceDigitalTwins,

archiveVehicle,

refreshTwin

        }), [

            digitalTwins,

            selectedVin,

            selectedTwin

        ])

    // ========================================================
    // PROVIDER
    // ========================================================

    return (

        <DigitalTwinContext.Provider
            value={value}
        >

            {children}

        </DigitalTwinContext.Provider>

    )

}

// ============================================================
// PUBLIC HOOK
// ============================================================

export function useDigitalTwin() {

    const context =
        useContext(
            DigitalTwinContext
        )

    if (!context) {

        throw new Error(

            "useDigitalTwin must be used within DigitalTwinProvider."

        )

    }

    return context

}
```
