# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPServiceHistory.ps1
# Programme : PP-001
# WorkPack  : WP-003
# Unit      : EU-004
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPServiceHistory {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$ServiceHistoryIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [object[]]$ServiceEvents,

        [ValidateRange(0, [long]::MaxValue)]
        [long]$CurrentOdometer = 0,

        [string]$HistorySummary,

        [hashtable]$HistoryMetadata = @{},

        [datetime]$GeneratedAt = (Get-Date)
    )

    $vehicleEvents = @(
        $ServiceEvents |
            Where-Object {
                $_.VehicleIdentifier -eq $VehicleIdentifier
            } |
            Sort-Object ServiceDate, ServiceEventIdentifier |
            Group-Object ServiceEventIdentifier |
            ForEach-Object {
                $_.Group[0]
            } |
            Sort-Object ServiceDate, ServiceEventIdentifier
    )

    $serviceEventReferences = @(
        $vehicleEvents |
            ForEach-Object {
                [pscustomobject]@{
                    ServiceEventIdentifier = $_.ServiceEventIdentifier
                    ServiceDate            = $_.ServiceDate
                }
            }
    )

    $firstServiceDate = $null
    $lastServiceDate = $null

    if ($serviceEventReferences.Count -gt 0) {
        $firstServiceDate = $serviceEventReferences[0].ServiceDate
        $lastServiceDate = $serviceEventReferences[-1].ServiceDate
    }

    [pscustomobject]@{
        PSTypeName = 'JPP.Maintenance.ServiceHistory'

        ServiceHistoryIdentifier = $ServiceHistoryIdentifier

        VehicleIdentifier = $VehicleIdentifier

        ServiceEventReferences = $serviceEventReferences

        ServiceEventCount = $serviceEventReferences.Count

        FirstServiceDate = $firstServiceDate

        LastServiceDate = $lastServiceDate

        CurrentOdometer = $CurrentOdometer

        HistorySummary = $HistorySummary

        HistoryMetadata = [pscustomobject]$HistoryMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPServiceHistory