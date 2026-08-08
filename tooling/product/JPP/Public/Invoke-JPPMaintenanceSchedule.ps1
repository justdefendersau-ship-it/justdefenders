# ==================================================================================================
# JustDefenders Product Platform (JPP)
#
# File      : tooling/product/JPP/Public/Invoke-JPPMaintenanceSchedule.ps1
# Programme : PP-001
# WorkPack  : WP-003
# Unit      : EU-003
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JPPMaintenanceSchedule {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9-]+$')]
        [string]$ScheduleIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$MaintenanceIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z0-9\-]+$')]
        [string]$VehicleIdentifier,

        [Parameter(Mandatory)]
        [ValidateSet(
            'One Time',
            'Recurring',
            'Inspection',
            'Preventive',
            'Unknown'
        )]
        [string]$ScheduleType,

        [Parameter(Mandatory)]
        [ValidateSet(
            'Scheduled',
            'Due',
            'Overdue',
            'Completed',
            'Deferred',
            'Cancelled',
            'Unknown'
        )]
        [string]$ScheduleStatus,

        [datetime]$DueDate,

        [ValidateRange(0, [long]::MaxValue)]
        [long]$DueOdometer,

        [ValidateRange(0, [int]::MaxValue)]
        [int]$RecurrenceIntervalDays = 0,

        [ValidateRange(0, [long]::MaxValue)]
        [long]$RecurrenceIntervalKilometres = 0,

        [string]$LastServiceEventIdentifier,

        [string]$ScheduleSummary,

        [hashtable]$ScheduleMetadata = @{},

        [datetime]$CreatedAt = (Get-Date)
    )

    [pscustomobject]@{
        PSTypeName = 'JPP.Maintenance.Schedule'

        ScheduleIdentifier = $ScheduleIdentifier

        MaintenanceIdentifier = $MaintenanceIdentifier

        VehicleIdentifier = $VehicleIdentifier

        ScheduleType = $ScheduleType

        ScheduleStatus = $ScheduleStatus

        DueDate = $DueDate

        DueOdometer = $DueOdometer

        RecurrenceIntervalDays = $RecurrenceIntervalDays

        RecurrenceIntervalKilometres = $RecurrenceIntervalKilometres

        LastServiceEventIdentifier = $LastServiceEventIdentifier

        ScheduleSummary = $ScheduleSummary

        ScheduleMetadata = [pscustomobject]$ScheduleMetadata

        CreatedAt = $CreatedAt

        Success = $true
    }
}

Export-ModuleMember -Function Invoke-JPPMaintenanceSchedule