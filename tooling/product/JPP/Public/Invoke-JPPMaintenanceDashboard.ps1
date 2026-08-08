# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPMaintenanceDashboard.ps1
# Programme : PP-001
# WorkPack  : WP-003
# Unit      : EU-006
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPMaintenanceDashboard {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$DashboardIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [hashtable]$MaintenanceSummary = @{},

        [ValidateRange(0, [long]::MaxValue)]
        [long]$CurrentOdometer = 0,

        [object[]]$MaintenanceScheduleReferences = @(),

        [object[]]$ServiceEventReferences = @(),

        [object[]]$MaintenanceSearchReferences = @(),

        [string]$ServiceHistoryIdentifier,

        [string[]]$DashboardActions = @(
            'View Maintenance',
            'View Service History',
            'View Schedule',
            'Search Maintenance',
            'Record Service Event'
        ),

        [hashtable]$DashboardMetadata = @{},

        [datetime]$GeneratedAt = (Get-Date)
    )

    $scheduleReferences = @(
        $MaintenanceScheduleReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        ScheduleIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        ScheduleIdentifier = $_.ScheduleIdentifier
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.ScheduleIdentifier)
            } |
            Sort-Object ScheduleIdentifier -Unique
    )

    $serviceReferences = @(
        $ServiceEventReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        ServiceEventIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        ServiceEventIdentifier = $_.ServiceEventIdentifier
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.ServiceEventIdentifier)
            } |
            Sort-Object ServiceEventIdentifier -Unique
    )

    $searchReferences = @(
        $MaintenanceSearchReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        SearchIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        SearchIdentifier = $_.SearchIdentifier
                    }
                }
            } |
            Where-Object {
                -not [string]::IsNullOrWhiteSpace($_.SearchIdentifier)
            } |
            Sort-Object SearchIdentifier -Unique
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Maintenance.Dashboard'

        DashboardIdentifier = $DashboardIdentifier

        VehicleIdentifier = $VehicleIdentifier

        MaintenanceSummary = [pscustomobject]$MaintenanceSummary

        CurrentOdometer = $CurrentOdometer

        MaintenanceScheduleReferences = $scheduleReferences

        ServiceEventReferences = $serviceReferences

        MaintenanceSearchReferences = $searchReferences

        ServiceHistoryIdentifier = $ServiceHistoryIdentifier

        DashboardActions = @(
            $DashboardActions |
                Sort-Object -Unique
        )

        DashboardMetadata = [pscustomobject]$DashboardMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPMaintenanceDashboard