<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Scheduler-State.ps1

Timestamp
10 July 2026 17:00

Work Package
WP-S001-04

Component
Scheduler Runtime

Purpose
Maintains the authoritative runtime state for the Operational Scheduler.

This module owns all Scheduler runtime state including execution cycles,
heartbeat, recovery statistics, queue metrics and execution metrics.

Scheduler execution logic is implemented elsewhere. This module owns state
only.

Dependencies
- Engineering-Common

Notes
- Private module
- Dot-sourced by Operational-ServiceHost.psm1
- Single authoritative Scheduler state owner

==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# INITIALISE SCHEDULER STATE
# ============================================================================

$existingState = Get-Variable `
    -Name JDSchedulerState `
    -Scope Script `
    -ErrorAction SilentlyContinue

if ($null -eq $existingState)
{
    $Script:JDSchedulerState = [PSCustomObject]@{

        Name                    = "JustDefenders Operational Scheduler"

        Version                 = "0.1.0"

        WorkPackage             = "WP-S001-04"

        Initialised             = $false

        Running                 = $false

        StartedAt               = $null

        StoppedAt               = $null

        LastHeartbeat           = $null

        LastCycleStarted        = $null

        LastCycleCompleted      = $null

        LastRecovery            = $null

        QueueDepth              = 0

        ActiveJobs              = 0

        Statistics = [PSCustomObject]@{

            CycleCount                  = 0

            SuccessfulCycles           = 0

            FailedCycles               = 0

            Executions                 = 0

            RecoveryEvents             = 0

            QueuePeak                  = 0

            AverageCycleMilliseconds   = 0

            LongestCycleMilliseconds   = 0

        }

    }
}

# ============================================================================
# GET SCHEDULER STATE
# ============================================================================

function Get-JDSchedulerState
{
    [CmdletBinding()]
    param()

    return $Script:JDSchedulerState
}

# ============================================================================
# RESET SCHEDULER STATE
# ============================================================================

function Reset-JDSchedulerState
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    $state.Initialised        = $false
    $state.Running            = $false

    $state.StartedAt          = $null
    $state.StoppedAt          = $null

    $state.LastHeartbeat      = $null

    $state.LastCycleStarted   = $null
    $state.LastCycleCompleted = $null

    $state.LastRecovery       = $null

    $state.QueueDepth         = 0
    $state.ActiveJobs         = 0

    $state.Statistics.CycleCount                = 0
    $state.Statistics.SuccessfulCycles          = 0
    $state.Statistics.FailedCycles              = 0
    $state.Statistics.Executions                = 0
    $state.Statistics.RecoveryEvents            = 0
    $state.Statistics.QueuePeak                 = 0
    $state.Statistics.AverageCycleMilliseconds  = 0
    $state.Statistics.LongestCycleMilliseconds  = 0

    return $state
}

# ============================================================================
# UPDATE HEARTBEAT
# ============================================================================

function Update-JDSchedulerHeartbeat
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    $state.LastHeartbeat = Get-Date

    return $state.LastHeartbeat
}

# ============================================================================
# START CYCLE
# ============================================================================

function Start-JDSchedulerCycle
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    $state.LastCycleStarted = Get-Date

    $state.Statistics.CycleCount++

    return $state.LastCycleStarted
}

# ============================================================================
# COMPLETE CYCLE
# ============================================================================

function Complete-JDSchedulerCycle
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    $completed = Get-Date

    $state.LastCycleCompleted = $completed

    if($null -ne $state.LastCycleStarted)
    {
        $duration =
            ($completed - $state.LastCycleStarted).TotalMilliseconds

        if($state.Statistics.AverageCycleMilliseconds -eq 0)
        {
            $state.Statistics.AverageCycleMilliseconds = $duration
        }
        else
        {
            $count = $state.Statistics.SuccessfulCycles

            $state.Statistics.AverageCycleMilliseconds =
                (
                    (
                        $state.Statistics.AverageCycleMilliseconds * $count
                    ) + $duration
                ) / ($count + 1)
        }

        if($duration -gt $state.Statistics.LongestCycleMilliseconds)
        {
            $state.Statistics.LongestCycleMilliseconds =
                $duration
        }
    }

    $state.Statistics.SuccessfulCycles++

    return $completed
}

# ============================================================================
# RECORD EXECUTION
# ============================================================================

function Record-JDSchedulerExecution
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    $state.Statistics.Executions++

    return $state.Statistics.Executions
}

# ============================================================================
# RECORD FAILURE
# ============================================================================

function Record-JDSchedulerFailure
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    $state.Statistics.FailedCycles++

    return $state.Statistics.FailedCycles
}

# ============================================================================
# UPDATE QUEUE DEPTH
# ============================================================================

function Update-JDSchedulerQueueDepth
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateRange(0,[int]::MaxValue)]
        [int]
        $Depth
    )

    $state = Get-JDSchedulerState

    $state.QueueDepth = $Depth

    if($Depth -gt $state.Statistics.QueuePeak)
    {
        $state.Statistics.QueuePeak = $Depth
    }

    return $state.QueueDepth
}

# ============================================================================
# RECORD RECOVERY
# ============================================================================

function Record-JDSchedulerRecovery
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    $state.LastRecovery = Get-Date

    $state.Statistics.RecoveryEvents++

    return $state.LastRecovery
}

# ============================================================================
# GET STATISTICS
# ============================================================================

function Get-JDSchedulerStatistics
{
    [CmdletBinding()]
    param()

    return (Get-JDSchedulerState).Statistics
}

# ============================================================================
# GET METRICS
# ============================================================================

function Get-JDSchedulerMetrics
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    [PSCustomObject]@{

        Name =
            $state.Name

        Version =
            $state.Version

        Running =
            $state.Running

        Initialised =
            $state.Initialised

        QueueDepth =
            $state.QueueDepth

        ActiveJobs =
            $state.ActiveJobs

        CycleCount =
            $state.Statistics.CycleCount

        SuccessfulCycles =
            $state.Statistics.SuccessfulCycles

        FailedCycles =
            $state.Statistics.FailedCycles

        Executions =
            $state.Statistics.Executions

        RecoveryEvents =
            $state.Statistics.RecoveryEvents

        AverageCycleMilliseconds =
            $state.Statistics.AverageCycleMilliseconds

        LongestCycleMilliseconds =
            $state.Statistics.LongestCycleMilliseconds

        LastHeartbeat =
            $state.LastHeartbeat

        LastCycleStarted =
            $state.LastCycleStarted

        LastCycleCompleted =
            $state.LastCycleCompleted

        LastRecovery =
            $state.LastRecovery

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================