# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPMaintenanceDomain.ps1
# Programme : PP-001
# WorkPack  : WP-003
# Unit      : EU-001
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPMaintenanceDomain {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$MaintenanceIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$MaintenanceType,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$MaintenanceCategory,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Planned',
            'Scheduled',
            'In Progress',
            'Completed',
            'Deferred',
            'Cancelled',
            'Overdue',
            'Unknown'
        )]
        [string]$MaintenanceStatus,

        [string]$MaintenanceSummary,

        [string]$MaintenanceDescription,

        [hashtable]$MaintenanceMetadata = @{},

        [datetime]$CreatedAt = (Get-Date)
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Maintenance.Domain'

        MaintenanceIdentifier = $MaintenanceIdentifier

        VehicleIdentifier = $VehicleIdentifier

        MaintenanceType = $MaintenanceType

        MaintenanceCategory = $MaintenanceCategory

        MaintenanceStatus = $MaintenanceStatus

        MaintenanceSummary = $MaintenanceSummary

        MaintenanceDescription = $MaintenanceDescription

        MaintenanceMetadata = [pscustomobject]$MaintenanceMetadata

        CreatedAt = $CreatedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPMaintenanceDomain