# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPFailureEvent.ps1
# Programme : PP-001
# WorkPack  : WP-005
# Unit      : EU-002
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPFailureEvent {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$FailureEventIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$FailureIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [datetime]$FailureDate,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$FailureStatus,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$FailureSeverity,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$FailureSummary,

        [string]$FailureNotes,

        [object]$PartReference,

        [object]$MaintenanceReference,

        [hashtable]$FailureMetadata = @{},

        [datetime]$RecordedAt = (Get-Date)
    )

    $canonicalPartReference = if ($null -eq $PartReference) {
        $null
    }
    elseif ($PartReference -is [string]) {
        [pscustomobject]@{
            PartIdentifier = $PartReference
        }
    }
    else {
        $PartReference
    }

    $canonicalMaintenanceReference = if ($null -eq $MaintenanceReference) {
        $null
    }
    elseif ($MaintenanceReference -is [string]) {
        [pscustomobject]@{
            MaintenanceIdentifier = $MaintenanceReference
        }
    }
    else {
        $MaintenanceReference
    }

    [pscustomobject]@{
        PSTypeName = 'JPP.Failure.Event'

        FailureEventIdentifier = $FailureEventIdentifier

        FailureIdentifier = $FailureIdentifier

        VehicleIdentifier = $VehicleIdentifier

        FailureDate = $FailureDate

        FailureStatus = $FailureStatus

        FailureSeverity = $FailureSeverity

        FailureSummary = $FailureSummary

        FailureNotes = $FailureNotes

        PartReference = $canonicalPartReference

        MaintenanceReference = $canonicalMaintenanceReference

        FailureMetadata = [pscustomobject]$FailureMetadata

        RecordedAt = $RecordedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPFailureEvent