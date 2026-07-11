<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-Recovery.ps1

Timestamp
10 July 2026 10:50

Work Package
WP-S001-03

Component
Operational Service Host

Purpose
Implements recovery operations for the Operational Service Host. Responsible
for recovering failed services, restarting services when appropriate and
maintaining recovery statistics.

Dependencies
- Host-State.ps1
- Host-ServiceLookup.ps1
- Host-ServiceState.ps1
- Host-ServiceManager.ps1
- Host-Health.ps1

Notes
- Private module
- Dot-sourced by Operational-ServiceHost.psm1
==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# TEST SERVICE RECOVERY REQUIRED
# ============================================================================

function Test-JDHostServiceRecoveryRequired
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    Assert-JDHostServiceExists `
        -Name $Name

    $runtime = Get-JDHostServiceState `
        -Name $Name

    return ($runtime.Health -eq "FAILED")
}

# ============================================================================
# RECOVER SERVICE
# ============================================================================

function Invoke-JDHostServiceRecovery
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    if (-not (Test-JDHostServiceRecoveryRequired -Name $Name))
    {
        return $false
    }

    Restart-JDHostService `
        -Name $Name | Out-Null

    Set-JDHostServiceHealth `
        -Name $Name `
        -Health "HEALTHY" | Out-Null

    $state = Get-JDHostState

    $state.LastRecoveryAttempt =
        Get-Date

    $state.Statistics.RecoveryEvents++

    Write-JDEngineeringLog `
        -Level Warning `
        -Message ("Recovered Operational Service [{0}]." -f $Name)

    return $true
}

# ============================================================================
# RECOVER ALL FAILED SERVICES
# ============================================================================

function Invoke-JDHostRecovery
{
    [CmdletBinding()]
    param()

    $recovered = 0

    foreach($service in Get-JDHostRegisteredServices)
    {
        if(Test-JDHostServiceRecoveryRequired `
            -Name $service.Name)
        {
            Invoke-JDHostServiceRecovery `
                -Name $service.Name | Out-Null

            $recovered++
        }
    }

    return $recovered
}

# ============================================================================
# GET RECOVERY STATUS
# ============================================================================

function Get-JDHostRecoveryStatus
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    [pscustomobject]@{

        RecoveryEnabled =
            $state.RecoveryEnabled

        LastRecoveryAttempt =
            $state.LastRecoveryAttempt

        RecoveryEvents =
            $state.Statistics.RecoveryEvents

    }
}

# ============================================================================
# ENABLE RECOVERY
# ============================================================================

function Enable-JDHostRecovery
{
    [CmdletBinding()]
    param()

    (Get-JDHostState).RecoveryEnabled = $true

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational recovery enabled."

    return $true
}

# ============================================================================
# DISABLE RECOVERY
# ============================================================================

function Disable-JDHostRecovery
{
    [CmdletBinding()]
    param()

    (Get-JDHostState).RecoveryEnabled = $false

    Write-JDEngineeringLog `
        -Level Warning `
        -Message "Operational recovery disabled."

    return $true
}

# ============================================================================
# EXECUTE HOST RECOVERY CYCLE
# ============================================================================

function Invoke-JDHostRecoveryCycle
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    if(-not $state.RecoveryEnabled)
    {
        return
    }

    Invoke-JDHostRecovery | Out-Null

    return $true
}

# ============================================================================
# END OF FILE
# ============================================================================