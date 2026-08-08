# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPVehicleIntelligenceDashboard.ps1
# Programme : PP-001
# WorkPack  : WP-004
# Unit      : EU-006
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPVehicleIntelligenceDashboard {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$DashboardIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [object]$VehicleIntelligenceDomainReference,

        [object]$VehicleHealthReference,

        [object]$VehicleReliabilityReference,

        [object]$FailureHistoryReference,

        [object[]]$VehicleIntelligenceSearchReferences = @(),

        [hashtable]$DashboardSummary = @{},

        [string[]]$DashboardActions = @(
            'View Vehicle',
            'View Vehicle Health',
            'View Vehicle Reliability',
            'View Failure History',
            'Search Vehicle Intelligence'
        ),

        [hashtable]$DashboardMetadata = @{},

        [datetime]$GeneratedAt = (Get-Date)
    )

    $intelligenceSearchReferences = @(
        $VehicleIntelligenceSearchReferences |
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
        PSTypeName = 'JPP.Vehicle.IntelligenceDashboard'

        DashboardIdentifier = $DashboardIdentifier

        VehicleIdentifier = $VehicleIdentifier

        VehicleIntelligenceDomainReference = $VehicleIntelligenceDomainReference

        VehicleHealthReference = $VehicleHealthReference

        VehicleReliabilityReference = $VehicleReliabilityReference

        FailureHistoryReference = $FailureHistoryReference

        VehicleIntelligenceSearchReferences = $intelligenceSearchReferences

        DashboardSummary = [pscustomobject]$DashboardSummary

        DashboardActions = @(
            $DashboardActions |
                Sort-Object -Unique
        )

        DashboardMetadata = [pscustomobject]$DashboardMetadata

        GeneratedAt = $GeneratedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPVehicleIntelligenceDashboard