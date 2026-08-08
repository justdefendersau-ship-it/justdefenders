# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPFailureHistory.ps1
# Programme : PP-001
# WorkPack  : WP-004
# Unit      : EU-004
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPFailureHistory {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$FailureHistoryIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [object[]]$FailureReferences,

        [string]$FailureHistorySummary,

        [hashtable]$FailureHistoryMetadata = @{},

        [datetime]$GeneratedAt = (Get-Date)
    )

    $normalizedReferences = @(
        $FailureReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        FailureIdentifier = $_
                        FailureDate       = $null
                    }
                }
                else {
                    [pscustomobject]@{
                        FailureIdentifier = $_.FailureIdentifier
                        FailureDate       = if ($null -ne $_.FailureDate) {
                            [datetime]$_.FailureDate
                        }
                        else {
                            $null
                        }
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.FailureIdentifier)
            }
    )

    $references = @(
        $normalizedReferences |
            Sort-Object `
                @{ Expression = {
                    if ($null -eq $_.FailureDate) {
                        [datetime]::MaxValue
                    }
                    else {
                        $_.FailureDate
                    }
                } }, `
                @{ Expression = 'FailureIdentifier' } |
            Group-Object FailureIdentifier |
            ForEach-Object {
                $_.Group[0]
            } |
            Sort-Object `
                @{ Expression = {
                    if ($null -eq $_.FailureDate) {
                        [datetime]::MaxValue
                    }
                    else {
                        $_.FailureDate
                    }
                } }, `
                @{ Expression = 'FailureIdentifier' }
    )

    $firstFailureDate = $null
    $lastFailureDate = $null

    $datedReferences = @(
        $references |
            Where-Object {
                $null -ne $_.FailureDate
            }
    )

    if ($datedReferences.Count -gt 0) {
        $firstFailureDate = $datedReferences[0].FailureDate
        $lastFailureDate = $datedReferences[-1].FailureDate
    }

    [pscustomobject]@{
        PSTypeName = 'JPP.Vehicle.FailureHistory'

        FailureHistoryIdentifier = $FailureHistoryIdentifier

        VehicleIdentifier = $VehicleIdentifier

        FailureReferences = $references

        FailureCount = $references.Count

        FirstFailureDate = $firstFailureDate

        LastFailureDate = $lastFailureDate

        FailureHistorySummary = $FailureHistorySummary

        FailureHistoryMetadata = [pscustomobject]$FailureHistoryMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPFailureHistory