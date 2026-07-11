<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Harvester-Cycle.ps1

Timestamp
10 July 2026 19:40

Work Package
WP-S002-05

Component
Harvester Runtime

Purpose
Coordinates a complete Harvester execution cycle.

This module orchestrates source execution, queue processing and runtime
statistics. It owns no runtime state.

Dependencies

    • Harvester-State.ps1
    • Harvester-Manager.ps1
    • Harvester-Queue.ps1
    • Harvester-Sources.ps1
    • Engineering-Common

Notes

    • Private module
    • Dot-sourced by the Harvester Runtime
    • No persistence
    • No scheduler ownership
==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# INVOKE HARVESTER CYCLE
# ============================================================================

function Invoke-JDHarvesterCycle
{
    [CmdletBinding()]
    param()

    Assert-JDHarvesterReady

    $started = Get-Date

    $state = Get-JDHarvesterState

    Start-JDHarvesterExecution `
        -Phase "Harvest" | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester cycle started."

    $sources =
        Get-JDHarvesterSources |
        Where-Object {
            $_.Enabled -and
            $_.Connected
        }

    foreach($source in $sources)
    {
        Invoke-JDHarvesterSource `
            -Source $source
    }

    Process-JDHarvesterQueue

    $elapsed =
        ((Get-Date) - $started).TotalMilliseconds

    Complete-JDHarvesterExecution `
        -ElapsedMilliseconds ([int]$elapsed) | Out-Null

    return Get-JDHarvesterCycleSummary
}

# ============================================================================
# INVOKE SOURCE
# ============================================================================

function Invoke-JDHarvesterSource
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [pscustomobject]
        $Source
    )

    Write-JDEngineeringLog `
        -Level Verbose `
        -Message ("Harvesting [{0}]." -f $Source.Name)

    #
    # Placeholder
    #
    # Future connector modules will populate queue items here.
    #

    Update-JDHarvesterSourceExecution `
        -Name $Source.Name `
        -Documents 0 | Out-Null
}

# ============================================================================
# PART 1 END
# ============================================================================

# ============================================================================
# PROCESS QUEUE
# ============================================================================

function Process-JDHarvesterQueue
{
    [CmdletBinding()]
    param()

    while(-not (Test-JDHarvesterQueueEmpty))
    {
        $item = Remove-JDHarvesterQueueItem

        if($null -eq $item)
        {
            continue
        }

        try
        {
            Process-JDHarvesterQueueItem `
                -Item $item | Out-Null
        }
        catch
        {
            Register-JDHarvesterFailure `
                -Reason $_.Exception.Message | Out-Null

            Add-JDHarvesterRetryItem `
                -Item $item | Out-Null
        }
    }

    return $true
}

# ============================================================================
# PROCESS SINGLE QUEUE ITEM
# ============================================================================

function Process-JDHarvesterQueueItem
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [pscustomobject]
        $Item
    )

    $state = Get-JDHarvesterState

    $state.CurrentJob = $Item

    $state.CurrentPhase = "Processing"

    Update-JDHarvesterHeartbeat | Out-Null

    #
    # ------------------------------------------------------------------------
    # Placeholder
    #
    # WP-S003
    #
    # Document parsing
    # HTML extraction
    # Metadata extraction
    # AI enrichment
    # Supabase persistence
    #
    # ------------------------------------------------------------------------
    #

    $state.Statistics.DocumentsProcessed++

    if($Item.PSObject.Properties.Match("Inserted").Count -gt 0)
    {
        if($Item.Inserted)
        {
            $state.Statistics.DocumentsInserted++
        }
    }

    if($Item.PSObject.Properties.Match("Updated").Count -gt 0)
    {
        if($Item.Updated)
        {
            $state.Statistics.DocumentsUpdated++
        }
    }

    if($Item.PSObject.Properties.Match("Duplicate").Count -gt 0)
    {
        if($Item.Duplicate)
        {
            $state.Statistics.DuplicatesSkipped++
        }
    }

    Update-JDHarvesterHeartbeat | Out-Null

    return $true
}

# ============================================================================
# UPDATE CYCLE STATISTICS
# ============================================================================

function Update-JDHarvesterCycleStatistics
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [int]
        $DocumentsDiscovered
    )

    $state = Get-JDHarvesterState

    $state.Statistics.DocumentsDiscovered +=
        $DocumentsDiscovered

    Update-JDHarvesterHeartbeat | Out-Null

    return $state.Statistics
}

# ============================================================================
# HANDLE CYCLE FAILURE
# ============================================================================

function Invoke-JDHarvesterCycleFailure
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Reason
    )

    Register-JDHarvesterFailure `
        -Reason $Reason | Out-Null

    Write-JDEngineeringLog `
        -Level Error `
        -Message ("Harvester cycle failed: {0}" -f $Reason)

    return $false
}

# ============================================================================
# PART 2 END
# ============================================================================

# ============================================================================
# GET CYCLE SUMMARY
# ============================================================================

function Get-JDHarvesterCycleSummary
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    [PSCustomObject]@{

        Success =
            ($state.HealthState -ne "FAILED")

        Running =
            $state.Running

        Health =
            $state.HealthState

        CurrentPhase =
            $state.CurrentPhase

        QueueDepth =
            $state.Queue.QueueDepth

        ActiveWorkers =
            $state.Queue.ActiveWorkers

        CrawlCount =
            $state.Statistics.CrawlCount

        SchedulerExecutions =
            $state.Statistics.SchedulerExecutions

        DocumentsDiscovered =
            $state.Statistics.DocumentsDiscovered

        DocumentsProcessed =
            $state.Statistics.DocumentsProcessed

        DocumentsInserted =
            $state.Statistics.DocumentsInserted

        DocumentsUpdated =
            $state.Statistics.DocumentsUpdated

        DuplicatesSkipped =
            $state.Statistics.DuplicatesSkipped

        FailedDocuments =
            $state.Statistics.FailedDocuments

        RetryCount =
            $state.Statistics.RetryCount

        AverageRunMilliseconds =
            $state.Statistics.AverageRunMilliseconds

        LongestRunMilliseconds =
            $state.Statistics.LongestRunMilliseconds

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
# VALIDATE CYCLE
# ============================================================================

function Test-JDHarvesterCycle
{
    [CmdletBinding()]
    param()

    if(-not (Test-JDHarvesterHealthy))
    {
        return $false
    }

    if(-not (Test-JDHarvesterQueue))
    {
        return $false
    }

    if(-not (Test-JDHarvesterSourceRegistry))
    {
        return $false
    }

    return $true
}

# ============================================================================
# RESET CYCLE
# ============================================================================

function Reset-JDHarvesterCycle
{
    [CmdletBinding()]
    param()

    Clear-JDHarvesterQueue | Out-Null

    $state = Get-JDHarvesterState

    $state.CurrentJob = $null

    $state.CurrentSource = $null

    $state.CurrentPhase = "Idle"

    Update-JDHarvesterHeartbeat | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester cycle reset."

    return Get-JDHarvesterCycleSummary
}

# ============================================================================
# GET CYCLE METRICS
# ============================================================================

function Get-JDHarvesterCycleMetrics
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    [PSCustomObject]@{

        CrawlCount =
            $state.Statistics.CrawlCount

        SchedulerExecutions =
            $state.Statistics.SchedulerExecutions

        QueueDepth =
            $state.Queue.QueueDepth

        ActiveWorkers =
            $state.Queue.ActiveWorkers

        DocumentsDiscovered =
            $state.Statistics.DocumentsDiscovered

        DocumentsProcessed =
            $state.Statistics.DocumentsProcessed

        DocumentsInserted =
            $state.Statistics.DocumentsInserted

        DocumentsUpdated =
            $state.Statistics.DocumentsUpdated

        DuplicatesSkipped =
            $state.Statistics.DuplicatesSkipped

        FailedDocuments =
            $state.Statistics.FailedDocuments

        RetryCount =
            $state.Statistics.RetryCount

        AverageRunMilliseconds =
            $state.Statistics.AverageRunMilliseconds

        LongestRunMilliseconds =
            $state.Statistics.LongestRunMilliseconds

        LastHeartbeat =
            $state.LastHeartbeat

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================