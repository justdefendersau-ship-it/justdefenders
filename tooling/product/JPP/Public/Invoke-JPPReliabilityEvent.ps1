# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPReliabilityEvent.ps1
# Programme : PP-001
# WorkPack  : WP-006
# Unit      : EU-002
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPReliabilityEvent {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$ReliabilityEventIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$ReliabilityIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [datetime]$EventDate,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Reliability Improvement',
            'Reliability Degradation',
            'Maintenance Event',
            'Parts Event',
            'Health Event',
            'Failure Event',
            'Reliability Observation',
            'Unknown'
        )]
        [string]$EventType,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Detected',
            'Confirmed',
            'Active',
            'Resolved',
            'Reviewed',
            'Unknown'
        )]
        [string]$EventStatus,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Critical',
            'High',
            'Medium',
            'Low',
            'Informational',
            'Unknown'
        )]
        [string]$EventSeverity,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$EventSummary,

        [object]$PartsReference,

        [object]$MaintenanceReference,

        [object]$VehicleHealthReference,

        [object]$FailureReference,

        [hashtable]$EventMetadata = @{},

        [datetime]$RecordedAt = (Get-Date)
    )

    $partsReference = if ($null -eq $PartsReference) {
        $null
    }
    elseif ($PartsReference -is [string]) {
        if ([string]::IsNullOrWhiteSpace($PartsReference)) {
            $null
        }
        else {
            [pscustomobject]@{
                PartIdentifier = $PartsReference
            }
        }
    }
    else {
        $PartsReference
    }

    $maintenanceReference = if ($null -eq $MaintenanceReference) {
        $null
    }
    elseif ($MaintenanceReference -is [string]) {
        if ([string]::IsNullOrWhiteSpace($MaintenanceReference)) {
            $null
        }
        else {
            [pscustomobject]@{
                MaintenanceIdentifier = $MaintenanceReference
            }
        }
    }
    else {
        $MaintenanceReference
    }

    $vehicleHealthReference = if ($null -eq $VehicleHealthReference) {
        $null
    }
    elseif ($VehicleHealthReference -is [string]) {
        if ([string]::IsNullOrWhiteSpace($VehicleHealthReference)) {
            $null
        }
        else {
            [pscustomobject]@{
                VehicleHealthIdentifier = $VehicleHealthReference
            }
        }
    }
    else {
        $VehicleHealthReference
    }

    $failureReference = if ($null -eq $FailureReference) {
        $null
    }
    elseif ($FailureReference -is [string]) {
        if ([string]::IsNullOrWhiteSpace($FailureReference)) {
            $null
        }
        else {
            [pscustomobject]@{
                FailureIdentifier = $FailureReference
            }
        }
    }
    else {
        $FailureReference
    }

    [pscustomobject]@{
        PSTypeName = 'JPP.Reliability.Event'

        ReliabilityEventIdentifier = $ReliabilityEventIdentifier

        ReliabilityIdentifier = $ReliabilityIdentifier

        VehicleIdentifier = $VehicleIdentifier

        EventDate = $EventDate

        EventType = $EventType

        EventStatus = $EventStatus

        EventSeverity = $EventSeverity

        EventSummary = $EventSummary

        PartsReference = $partsReference

        MaintenanceReference = $maintenanceReference

        VehicleHealthReference = $vehicleHealthReference

        FailureReference = $failureReference

        EventMetadata = [pscustomobject]$EventMetadata

        RecordedAt = $RecordedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPReliabilityEvent
