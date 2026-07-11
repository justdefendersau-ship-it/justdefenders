<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Harvester-State.ps1

Timestamp
10 July 2026 18:15

Work Package
WP-S002-01

Component
Harvester Runtime

Purpose
Maintains the authoritative runtime state for the JustDefenders Harvester
Runtime.

This module is the single owner of all Harvester runtime state. No other
component may directly own or persist Harvester lifecycle information.

Responsibilities

    • Runtime lifecycle
    • Runtime health
    • Runtime statistics
    • Queue summary
    • Runtime configuration
    • Current execution state

Dependencies

    • Engineering-Common

Notes

    • Private module
    • Dot-sourced by Harvester Runtime
    • Contains no harvesting logic
    • Contains no scheduler logic
==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# INITIALISE HARVESTER STATE
# ============================================================================

$existingState = Get-Variable `
    -Name JDHarvesterState `
    -Scope Script `
    -ErrorAction SilentlyContinue

if ($null -eq $existingState)
{
    $Script:JDHarvesterState = [PSCustomObject]@{

        Name                = "JustDefenders Harvester Runtime"

        Version             = "0.1.0"

        WorkPackage         = "WP-S002-01"

        Initialised         = $false

        Running             = $false

        Paused              = $false

        Stopping            = $false

        HealthState         = "UNKNOWN"

        StartedAt           = $null

        StoppedAt           = $null

        LastRun             = $null

        LastSuccessfulRun   = $null

        LastFailure         = $null

        LastHeartbeat       = $null

        LastHealthCheck     = $null

        CurrentJob          = $null

        CurrentSource       = $null

        CurrentPhase        = $null

        Queue = [PSCustomObject]@{

            QueueDepth      = 0

            ActiveWorkers   = 0

        }

        Configuration = [PSCustomObject]@{

            CrawlIntervalSeconds = 300

            MaxWorkers           = 2

            BatchSize            = 100

            RetryLimit           = 3

        }

        Statistics = [PSCustomObject]@{

            CrawlCount                  = 0

            SchedulerExecutions         = 0

            DocumentsDiscovered         = 0

            DocumentsProcessed          = 0

            DocumentsInserted           = 0

            DocumentsUpdated            = 0

            DuplicatesSkipped           = 0

            FailedDocuments             = 0

            RetryCount                  = 0

            AverageRunMilliseconds      = 0

            LongestRunMilliseconds      = 0

        }

    }
}

# ============================================================================
# GET HARVESTER STATE
# ============================================================================

function Get-JDHarvesterState
{
    [CmdletBinding()]
    param()

    return $Script:JDHarvesterState
}

# ============================================================================
# RESET HARVESTER STATE
# ============================================================================

function Reset-JDHarvesterState
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    $state.Initialised = $false

    $state.Running = $false

    $state.Paused = $false

    $state.Stopping = $false

    $state.HealthState = "UNKNOWN"

    $state.StartedAt = $null

    $state.StoppedAt = $null

    $state.LastRun = $null

    $state.LastSuccessfulRun = $null

    $state.LastFailure = $null

    $state.LastHeartbeat = $null

    $state.LastHealthCheck = $null

    $state.CurrentJob = $null

    $state.CurrentSource = $null

    $state.CurrentPhase = $null

    $state.Queue.QueueDepth = 0

    $state.Queue.ActiveWorkers = 0

    $state.Statistics.CrawlCount = 0

    $state.Statistics.SchedulerExecutions = 0

    $state.Statistics.DocumentsDiscovered = 0

    $state.Statistics.DocumentsProcessed = 0

    $state.Statistics.DocumentsInserted = 0

    $state.Statistics.DocumentsUpdated = 0

    $state.Statistics.DuplicatesSkipped = 0

    $state.Statistics.FailedDocuments = 0

    $state.Statistics.RetryCount = 0

    $state.Statistics.AverageRunMilliseconds = 0

    $state.Statistics.LongestRunMilliseconds = 0

    return $state
}

# ============================================================================
# PART 1 END
# ============================================================================

# ============================================================================
# UPDATE HARVESTER HEARTBEAT
# ============================================================================

function Update-JDHarvesterHeartbeat
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    $state.LastHeartbeat = Get-Date

    return $state.LastHeartbeat
}

# ============================================================================
# UPDATE HARVESTER HEALTH
# ============================================================================

function Update-JDHarvesterHealth
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateSet(
            "UNKNOWN",
            "HEALTHY",
            "DEGRADED",
            "FAILED"
        )]
        [string]
        $Health
    )

    $state = Get-JDHarvesterState

    $state.HealthState = $Health

    $state.LastHealthCheck = Get-Date

    return $state.HealthState
}

# ============================================================================
# START HARVESTER EXECUTION
# ============================================================================

function Start-JDHarvesterExecution
{
    [CmdletBinding()]
    param
    (
        [string]
        $Source,

        [string]
        $Phase = "Harvest"
    )

    $state = Get-JDHarvesterState

    $state.Running = $true

    $state.Paused = $false

    $state.Stopping = $false

    if ($null -eq $state.StartedAt)
    {
        $state.StartedAt = Get-Date
    }

    $state.LastRun = Get-Date

    $state.CurrentSource = $Source

    $state.CurrentPhase = $Phase

    $state.Statistics.SchedulerExecutions++

    Update-JDHarvesterHeartbeat | Out-Null

    return $state
}

# ============================================================================
# COMPLETE HARVESTER EXECUTION
# ============================================================================

function Complete-JDHarvesterExecution
{
    [CmdletBinding()]
    param
    (
        [int]
        $ElapsedMilliseconds = 0
    )

    $state = Get-JDHarvesterState

    $state.LastSuccessfulRun = Get-Date

    $state.CurrentPhase = "Idle"

    $state.CurrentJob = $null

    $state.CurrentSource = $null

    if ($ElapsedMilliseconds -gt
        $state.Statistics.LongestRunMilliseconds)
    {
        $state.Statistics.LongestRunMilliseconds =
            $ElapsedMilliseconds
    }

    if ($state.Statistics.CrawlCount -eq 0)
    {
        $state.Statistics.AverageRunMilliseconds =
            $ElapsedMilliseconds
    }
    else
    {
        $total =
            $state.Statistics.AverageRunMilliseconds *
            $state.Statistics.CrawlCount

        $total += $ElapsedMilliseconds

        $state.Statistics.AverageRunMilliseconds =
            [math]::Round(
                $total /
                ($state.Statistics.CrawlCount + 1),
                2
            )
    }

    $state.Statistics.CrawlCount++

    Update-JDHarvesterHeartbeat | Out-Null

    return $state
}

# ============================================================================
# RECORD HARVESTER FAILURE
# ============================================================================

function Register-JDHarvesterFailure
{
    [CmdletBinding()]
    param
    (
        [string]
        $Reason
    )

    $state = Get-JDHarvesterState

    $state.LastFailure = Get-Date

    $state.HealthState = "FAILED"

    $state.CurrentPhase = "Failed"

    $state.Statistics.FailedDocuments++

    Write-JDEngineeringLog `
        -Level Warning `
        -Message ("Harvester failure: {0}" -f $Reason)

    return $state
}

# ============================================================================
# GET HARVESTER STATISTICS
# ============================================================================

function Get-JDHarvesterStatistics
{
    [CmdletBinding()]
    param()

    return (Get-JDHarvesterState).Statistics
}

# ============================================================================
# RESET HARVESTER STATISTICS
# ============================================================================

function Reset-JDHarvesterStatistics
{
    [CmdletBinding()]
    param()

    $stats = (Get-JDHarvesterState).Statistics

    $stats.CrawlCount = 0

    $stats.SchedulerExecutions = 0

    $stats.DocumentsDiscovered = 0

    $stats.DocumentsProcessed = 0

    $stats.DocumentsInserted = 0

    $stats.DocumentsUpdated = 0

    $stats.DuplicatesSkipped = 0

    $stats.FailedDocuments = 0

    $stats.RetryCount = 0

    $stats.AverageRunMilliseconds = 0

    $stats.LongestRunMilliseconds = 0

    return $stats
}

# ============================================================================
# PART 2 END
# ============================================================================

# ============================================================================
# GET HARVESTER CONFIGURATION
# ============================================================================

function Get-JDHarvesterConfiguration
{
    [CmdletBinding()]
    param()

    return (Get-JDHarvesterState).Configuration
}

# ============================================================================
# SET HARVESTER CONFIGURATION
# ============================================================================

function Set-JDHarvesterConfiguration
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [hashtable]
        $Configuration
    )

    $config = (Get-JDHarvesterState).Configuration

    foreach($key in $Configuration.Keys)
    {
        if($config.PSObject.Properties.Match($key).Count -gt 0)
        {
            $config.$key = $Configuration[$key]
        }
    }

    return $config
}

# ============================================================================
# GET HARVESTER QUEUE
# ============================================================================

function Get-JDHarvesterQueue
{
    [CmdletBinding()]
    param()

    return (Get-JDHarvesterState).Queue
}

# ============================================================================
# SET HARVESTER QUEUE DEPTH
# ============================================================================

function Set-JDHarvesterQueueDepth
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateRange(0,[int]::MaxValue)]
        [int]
        $QueueDepth
    )

    $queue = (Get-JDHarvesterState).Queue

    $queue.QueueDepth = $QueueDepth

    return $queue
}

# ============================================================================
# SET ACTIVE WORKERS
# ============================================================================

function Set-JDHarvesterActiveWorkers
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateRange(0,[int]::MaxValue)]
        [int]
        $ActiveWorkers
    )

    $queue = (Get-JDHarvesterState).Queue

    $queue.ActiveWorkers = $ActiveWorkers

    return $queue
}

# ============================================================================
# GET HARVESTER RUNTIME SUMMARY
# ============================================================================

function Get-JDHarvesterRuntimeSummary
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    [PSCustomObject]@{

        Name =
            $state.Name

        Version =
            $state.Version

        WorkPackage =
            $state.WorkPackage

        Running =
            $state.Running

        Paused =
            $state.Paused

        Initialised =
            $state.Initialised

        Health =
            $state.HealthState

        CurrentSource =
            $state.CurrentSource

        CurrentPhase =
            $state.CurrentPhase

        QueueDepth =
            $state.Queue.QueueDepth

        ActiveWorkers =
            $state.Queue.ActiveWorkers

        CrawlCount =
            $state.Statistics.CrawlCount

        DocumentsProcessed =
            $state.Statistics.DocumentsProcessed

        DocumentsInserted =
            $state.Statistics.DocumentsInserted

        FailedDocuments =
            $state.Statistics.FailedDocuments

        LastRun =
            $state.LastRun

        LastSuccessfulRun =
            $state.LastSuccessfulRun

        LastHeartbeat =
            $state.LastHeartbeat

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# INITIALISE HARVESTER
# ============================================================================

function Initialize-JDHarvesterState
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    if($state.Initialised)
    {
        return $state
    }

    $state.Initialised = $true

    $state.HealthState = "HEALTHY"

    $state.CurrentPhase = "Idle"

    Update-JDHarvesterHeartbeat | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Runtime initialised."

    return $state
}

# ============================================================================
# STOP HARVESTER
# ============================================================================

function Stop-JDHarvesterState
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    $state.Running = $false

    $state.Paused = $false

    $state.Stopping = $false

    $state.StoppedAt = Get-Date

    $state.CurrentJob = $null

    $state.CurrentSource = $null

    $state.CurrentPhase = "Stopped"

    Update-JDHarvesterHeartbeat | Out-Null

    return $state
}

# ============================================================================
# END OF FILE
# ============================================================================