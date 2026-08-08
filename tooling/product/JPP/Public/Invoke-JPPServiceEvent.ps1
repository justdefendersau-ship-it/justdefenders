# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPServiceEvent.ps1
# Programme : PP-001
# WorkPack  : WP-003
# Unit      : EU-002
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPServiceEvent {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$ServiceEventIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$MaintenanceIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [datetime]$ServiceDate,

        [ValidateRange(0, [long]::MaxValue)]
        [long]$Odometer = 0,

        [string]$ServiceProvider,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Planned',
            'In Progress',
            'Completed',
            'Deferred',
            'Cancelled',
            'Unknown'
        )]
        [string]$ServiceStatus,

        [string]$ServiceSummary,

        [string]$ServiceNotes,

        [object[]]$PerformedPartsReferences = @(),

        [hashtable]$ServiceMetadata = @{},

        [datetime]$RecordedAt = (Get-Date)
    )

    $partReferences = @(
        $PerformedPartsReferences |
            ForEach-Object {
                if ($_ -is [string]) {
                    [pscustomobject]@{
                        PartIdentifier = $_
                    }
                }
                else {
                    [pscustomobject]@{
                        PartIdentifier = $_.PartIdentifier
                    }
                }
            } |
            Sort-Object PartIdentifier -Unique
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Maintenance.ServiceEvent'

        ServiceEventIdentifier = $ServiceEventIdentifier

        MaintenanceIdentifier = $MaintenanceIdentifier

        VehicleIdentifier = $VehicleIdentifier

        ServiceDate = $ServiceDate

        Odometer = $Odometer

        ServiceProvider = $ServiceProvider

        ServiceStatus = $ServiceStatus

        ServiceSummary = $ServiceSummary

        ServiceNotes = $ServiceNotes

        PerformedPartsReferences = $partReferences

        ServiceMetadata = [pscustomobject]$ServiceMetadata

        RecordedAt = $RecordedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPServiceEvent