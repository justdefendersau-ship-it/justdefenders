<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-Scheduler.ps1

Timestamp
10 July 2026 17:20

Work Package
WP-S001-04

Component
Operational Scheduler Runtime

Purpose
Provides scheduler orchestration for the Operational Service Host.

This module coordinates scheduler lifecycle and delegates all scheduler
runtime state management to Scheduler-State.ps1.

Scheduler execution, queue management and recovery are orchestrated here,
while Scheduler-State.ps1 remains the single authoritative owner of all
scheduler runtime state.

Dependencies
- Host-State.ps1
- Scheduler-State.ps1
- Host-ServiceLookup.ps1
- Host-ServiceManager.ps1
- Host-ServiceValidation.ps1

Notes
- Private module
- Dot-sourced by Operational-ServiceHost.psm1
- Owns scheduler orchestration only
==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# INITIALISE SCHEDULER
# ============================================================================

function Initialize-JDHostScheduler
{
    [CmdletBinding()]
    param()

    $scheduler = Get-JDSchedulerState

    if($scheduler.Initialised)
    {
        return $scheduler
    }

    $scheduler.Initialised = $true

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Scheduler initialised."

    return $scheduler
}

# ============================================================================
# START SCHEDULER
# ============================================================================

function Start-JDHostScheduler
{
    [CmdletBinding()]
    param()

    Assert-JDHostRunning

    $scheduler = Initialize-JDHostScheduler

    if($scheduler.Running)
    {
        return $scheduler
    }

    $scheduler.Running = $true

    $scheduler.StartedAt = Get-Date

    $scheduler.StoppedAt = $null

    Update-JDSchedulerHeartbeat | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Scheduler started."

    return $scheduler
}

# ============================================================================
# STOP SCHEDULER
# ============================================================================

function Stop-JDHostScheduler
{
    [CmdletBinding()]
    param()

    $scheduler = Get-JDSchedulerState

    if(-not $scheduler.Running)
    {
        return $scheduler
    }

    $scheduler.Running = $false

    $scheduler.StoppedAt = Get-Date

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Scheduler stopped."

    return $scheduler
}

# ============================================================================
# GET SCHEDULER STATUS
# ============================================================================

function Get-JDHostSchedulerStatus
{
    [CmdletBinding()]
    param()

    $scheduler = Get-JDSchedulerState

    [PSCustomObject]@{

        Name =
            $scheduler.Name

        Version =
            $scheduler.Version

        Running =
            $scheduler.Running

        Initialised =
            $scheduler.Initialised

        QueueDepth =
            $scheduler.QueueDepth

        ActiveJobs =
            $scheduler.ActiveJobs

        CycleCount =
            $scheduler.Statistics.CycleCount

        SuccessfulCycles =
            $scheduler.Statistics.SuccessfulCycles

        FailedCycles =
            $scheduler.Statistics.FailedCycles

        LastHeartbeat =
            $scheduler.LastHeartbeat

        StartedAt =
            $scheduler.StartedAt

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# INVOKE SCHEDULER CYCLE
# ============================================================================

function Invoke-JDHostSchedulerCycle
{
    [CmdletBinding()]
    param()

    Assert-JDHostRunning

    $scheduler = Get-JDSchedulerState

    if(-not $scheduler.Running)
    {
        return $false
    }

    Start-JDSchedulerCycle | Out-Null

    try
    {
        Update-JDSchedulerHeartbeat | Out-Null

        foreach($service in Get-JDHostEnabledServices)
        {
            if($service.RuntimeStatus.State -ne "RUNNING")
            {
                continue
            }

            Invoke-JDHostServiceCommand `
                -Service $service `
                -Operation Health | Out-Null

            Record-JDSchedulerExecution | Out-Null

            Write-JDEngineeringLog `
                -Level Verbose `
                -Message ("Scheduler executed [{0}]." -f $service.Name)
        }

        Complete-JDSchedulerCycle | Out-Null

        return $true
    }
    catch
    {
        Record-JDSchedulerFailure | Out-Null

        Write-JDEngineeringLog `
            -Level Error `
            -Message ("Scheduler cycle failed. {0}" -f $_.Exception.Message)

        throw
    }
}

# ============================================================================
# START ALL AUTO SERVICES
# ============================================================================

function Start-JDHostAutoServices
{
    [CmdletBinding()]
    param()

    Assert-JDHostRunning

    $started = 0

    foreach($service in Get-JDHostEnabledServices)
    {
        if($service.RuntimeStatus.State -eq "RUNNING")
        {
            continue
        }

        Start-JDHostService `
            -Name $service.Name | Out-Null

        $started++
    }

    Update-JDHostManagedServiceCount | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Scheduler started {0} service(s)." -f $started)

    return $started
}

# ============================================================================
# STOP ALL RUNNING SERVICES
# ============================================================================

function Stop-JDHostAllServices
{
    [CmdletBinding()]
    param()

    Assert-JDHostRunning

    $stopped = 0

    foreach($service in Get-JDHostServicesByState `
        -State "RUNNING")
    {
        Stop-JDHostService `
            -Name $service.Name | Out-Null

        $stopped++
    }

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Scheduler stopped {0} running service(s)." -f $stopped)

    return $stopped
}

# ============================================================================
# UPDATE QUEUE DEPTH
# ============================================================================

function Update-JDHostSchedulerQueueDepth
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateRange(0,[int]::MaxValue)]
        [int]
        $Depth
    )

    Update-JDSchedulerQueueDepth `
        -Depth $Depth | Out-Null

    return Get-JDHostSchedulerStatus
}

# ============================================================================
# RECORD SCHEDULER RECOVERY
# ============================================================================

function Invoke-JDHostSchedulerRecovery
{
    [CmdletBinding()]
    param()

    Record-JDSchedulerRecovery | Out-Null

    Write-JDEngineeringLog `
        -Level Warning `
        -Message "Operational Scheduler recovery recorded."

    return Get-JDHostSchedulerStatus
}

# ============================================================================
# GET SCHEDULER METRICS
# ============================================================================

function Get-JDHostSchedulerMetrics
{
    [CmdletBinding()]
    param()

    return Get-JDSchedulerMetrics
}

# ============================================================================
# END OF FILE
# ============================================================================
