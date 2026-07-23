# ============================================================================
# START RUNTIME
# ============================================================================

function Start-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    #
    # Already running
    #

    if ($state.Running)
    {
        return $state
    }

    #
    # Initialise runtime if required
    #

    if (-not $state.Initialised)
    {
        Initialize-JDHarvesterState | Out-Null

        #
        # Refresh authoritative state
        #

        $state = Get-JDHarvesterState
    }

    #
    # Transition to Running
    #

    $state.Running      = $true
    $state.Paused       = $false
    $state.CurrentPhase = "Running"

    if ($null -eq $state.StartedAt)
    {
        $state.StartedAt = Get-Date
    }

    $state.LastRun = Get-Date

    Update-JDHarvesterHeartbeat | Out-Null

    Update-JDHarvesterHealth `
        -Health "HEALTHY" | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Runtime started."

    return $state
}

# ============================================================================
# STOP RUNTIME
# ============================================================================

function Stop-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    #
    # Already stopped
    #

    if (-not $state.Running)
    {
        return $state
    }

    #
    # Transition to Stopped
    #

    $state.Running      = $false
    $state.Paused       = $false
    $state.CurrentPhase = "Stopped"
    $state.StoppedAt    = Get-Date

    Update-JDHarvesterHeartbeat | Out-Null

    Update-JDHarvesterHealth `
        -Health "UNKNOWN" | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Runtime stopped."

    return $state
}

# ============================================================================
# PART 1 END
# ============================================================================

# ============================================================================
# RESTART RUNTIME
# ============================================================================

function Restart-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    #
    # Stop only if currently running.
    #

    if ($state.Running)
    {
        Stop-JDHarvesterRuntime | Out-Null
    }

    #
    # Start runtime.
    #

    Start-JDHarvesterRuntime | Out-Null

    #
    # Refresh authoritative state.
    #

    $state = Get-JDHarvesterState

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Runtime restarted."

    return $state
}

# ============================================================================
# PAUSE RUNTIME
# ============================================================================

function Pause-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    #
    # Runtime must be running.
    #

    if (-not $state.Running)
    {
        return $state
    }

    #
    # Already paused.
    #

    if ($state.Paused)
    {
        return $state
    }

    #
    # Transition to Paused.
    #

    $state.Paused = $true
    $state.CurrentPhase = "Paused"

    Update-JDHarvesterHeartbeat | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Runtime paused."

    return $state
}

# ============================================================================
# RESUME RUNTIME
# ============================================================================

function Resume-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    #
    # Runtime must be running.
    #

    if (-not $state.Running)
    {
        return $state
    }

    #
    # Runtime must currently be paused.
    #

    if (-not $state.Paused)
    {
        return $state
    }

    #
    # Transition back to Running.
    #

    $state.Paused = $false
    $state.CurrentPhase = "Running"

    Update-JDHarvesterHeartbeat | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Runtime resumed."

    return $state
}

# ============================================================================
# TEST RUNTIME
# ============================================================================

function Test-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    if (-not $state.Initialised)
    {
        return $false
    }

    if (-not $state.Running)
    {
        return $false
    }

    if ($state.HealthState -eq "FAILED")
    {
        return $false
    }

    return $true
}

# ============================================================================
# PART 2 END
# ============================================================================

# ============================================================================
# RECOVER RUNTIME
# ============================================================================

function Invoke-JDHarvesterRuntimeRecovery
{
    [CmdletBinding()]
    param()

    Write-JDEngineeringLog `
        -Level Warning `
        -Message "Harvester Runtime recovery initiated."

    Restart-JDHarvesterRuntime | Out-Null

    return Get-JDHarvesterState
}

# ============================================================================
# ASSERT RUNTIME RUNNING
# ============================================================================

function Assert-JDHarvesterRunning
{
    [CmdletBinding()]
    param()

    if (-not (Test-JDHarvesterRuntime))
    {
        throw "Harvester Runtime is not running."
    }

    return $true
}

# ============================================================================
# ASSERT RUNTIME PAUSED
# ============================================================================

function Assert-JDHarvesterPaused
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    if (-not $state.Paused)
    {
        throw "Harvester Runtime is not paused."
    }

    return $true
}

# ============================================================================
# ASSERT RUNTIME ACTIVE
# ============================================================================

function Assert-JDHarvesterActive
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    if (-not $state.Running)
    {
        throw "Harvester Runtime is not running."
    }

    if ($state.Paused)
    {
        throw "Harvester Runtime is paused."
    }

    return $true
}

# ============================================================================
# END OF FILE
# ============================================================================