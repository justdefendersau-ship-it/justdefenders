<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Harvester-RuntimeKernel.ps1

Timestamp
18 July 2026

Component
Harvester Runtime Kernel

Purpose
Provides the canonical runtime access layer for the JustDefenders Harvester.

Responsibilities

    • Runtime bootstrap
    • Runtime access
    • Runtime reset
    • Queue access
    • State access

Notes

    • Private module
    • Dot-sourced by Harvester-Runtime.psm1
    • Contains no harvesting logic
    • Contains no scheduler logic
==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# RUNTIME STORAGE
# ============================================================================

if (-not (Get-Variable -Name JDHarvesterRuntime `
                       -Scope Script `
                       -ErrorAction SilentlyContinue))
{
    $Script:JDHarvesterRuntime = $null
}

# ============================================================================
# INITIALISE RUNTIME
# ============================================================================

function Initialize-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    if ($null -ne $Script:JDHarvesterRuntime)
    {
        return $Script:JDHarvesterRuntime
    }

    $Script:JDHarvesterRuntime = [ordered]@{

        Initialised     = $true

        Created         = Get-Date

        Version         = "1.0.0"

        RuntimeState    = $null

        Queue           = $null

        Manager         = $null

        Cycle           = $null

        Diagnostics     = [ordered]@{

            LastHeartbeat = $null

            StartupTime   = Get-Date

            RestartCount  = 0

        }

    }

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Runtime Kernel initialised."

    return $Script:JDHarvesterRuntime
}

# ============================================================================
# GET RUNTIME
# ============================================================================

function Get-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    if ($null -eq $Script:JDHarvesterRuntime)
    {
        Initialize-JDHarvesterRuntime | Out-Null
    }

    return $Script:JDHarvesterRuntime
}

# ============================================================================
# RESET RUNTIME
# ============================================================================

function Reset-JDHarvesterRuntime
{
    [CmdletBinding(SupportsShouldProcess)]
    param()

    if ($PSCmdlet.ShouldProcess(
            "Harvester Runtime",
            "Reset Runtime"))
    {
        $Script:JDHarvesterRuntime = $null

        Initialize-JDHarvesterRuntime | Out-Null

        Write-JDEngineeringLog `
            -Level Warning `
            -Message "Harvester Runtime Kernel reset."

        return $Script:JDHarvesterRuntime
    }
}

# ============================================================================
# STATE ACCESS
# ============================================================================

function Get-JDHarvesterRuntimeState
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    return $runtime.RuntimeState
}

function Set-JDHarvesterRuntimeState
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [object]
        $State
    )

    $runtime = Get-JDHarvesterRuntime

    $runtime.RuntimeState = $State

    return $runtime.RuntimeState
}

function Clear-JDHarvesterRuntimeState
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    $runtime.RuntimeState = $null

    return $null
}

# ============================================================================
# QUEUE ACCESS
# ============================================================================

function Get-JDHarvesterRuntimeQueue
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    return $runtime.Queue
}

function Set-JDHarvesterRuntimeQueue
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [object]
        $Queue
    )

    $runtime = Get-JDHarvesterRuntime

    $runtime.Queue = $Queue

    return $runtime.Queue
}

function Clear-JDHarvesterRuntimeQueue
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    $runtime.Queue = $null

    return $null
}

# ============================================================================
# MANAGER ACCESS
# ============================================================================

function Get-JDHarvesterRuntimeManager
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    return $runtime.Manager
}

function Set-JDHarvesterRuntimeManager
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [object]
        $Manager
    )

    $runtime = Get-JDHarvesterRuntime

    $runtime.Manager = $Manager

    return $runtime.Manager
}

function Clear-JDHarvesterRuntimeManager
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    $runtime.Manager = $null

    return $null
}

# ============================================================================
# CYCLE ACCESS
# ============================================================================

function Get-JDHarvesterRuntimeCycle
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    return $runtime.Cycle
}

function Set-JDHarvesterRuntimeCycle
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [object]
        $Cycle
    )

    $runtime = Get-JDHarvesterRuntime

    $runtime.Cycle = $Cycle

    return $runtime.Cycle
}

function Clear-JDHarvesterRuntimeCycle
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    $runtime.Cycle = $null

    return $null
}

# ============================================================================
# HEARTBEAT
# ============================================================================

function Update-JDHarvesterRuntimeHeartbeat
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    $runtime.Diagnostics.LastHeartbeat = Get-Date

    return $runtime.Diagnostics.LastHeartbeat
}

function Get-JDHarvesterRuntimeHeartbeat
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    return $runtime.Diagnostics.LastHeartbeat
}

# ============================================================================
# RUNTIME STATUS
# ============================================================================

function Test-JDHarvesterRuntimeInitialised
{
    [CmdletBinding()]
    param()

    return ($null -ne $Script:JDHarvesterRuntime)
}

function Get-JDHarvesterRuntimeStatus
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    return [pscustomobject]@{

        Initialised  = $runtime.Initialised

        Created      = $runtime.Created

        Version      = $runtime.Version

        HasState     = ($null -ne $runtime.RuntimeState)

        HasQueue     = ($null -ne $runtime.Queue)

        HasManager   = ($null -ne $runtime.Manager)

        HasCycle     = ($null -ne $runtime.Cycle)

        Heartbeat    = $runtime.Diagnostics.LastHeartbeat

        RestartCount = $runtime.Diagnostics.RestartCount
    }
}

# ============================================================================
# VALIDATION
# ============================================================================

function Test-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    $result = [ordered]@{

        Success = $true

        Errors  = @()

    }

    if ($null -eq $runtime)
    {
        $result.Success = $false
        $result.Errors += "Runtime not initialised."
    }

    if (-not $runtime.Initialised)
    {
        $result.Success = $false
        $result.Errors += "Runtime Initialised flag is false."
    }

    if ($null -eq $runtime.Diagnostics)
    {
        $result.Success = $false
        $result.Errors += "Diagnostics object missing."
    }

    return [pscustomobject]$result
}

# ============================================================================
# DIAGNOSTICS
# ============================================================================

function Get-JDHarvesterRuntimeDiagnostics
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    return [pscustomobject]$runtime.Diagnostics
}

function Set-JDHarvesterRuntimeDiagnosticsValue
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name,

        [Parameter()]
        $Value
    )

    $runtime = Get-JDHarvesterRuntime

    $runtime.Diagnostics[$Name] = $Value

    return $runtime.Diagnostics
}

# ============================================================================
# INFORMATION
# ============================================================================

function Get-JDHarvesterRuntimeVersion
{
    [CmdletBinding()]
    param()

    return (Get-JDHarvesterRuntime).Version
}

function Get-JDHarvesterRuntimeCreationTime
{
    [CmdletBinding()]
    param()

    return (Get-JDHarvesterRuntime).Created
}

# ============================================================================
# EXPORT METADATA
# ============================================================================

$Script:JDHarvesterRuntimeKernelMetadata = [pscustomobject]@{

    Name        = "Harvester Runtime Kernel"

    Version     = "1.0.0"

    Component   = "Private"

    Created     = Get-Date

    Initialised = {
        Test-JDHarvesterRuntimeInitialised
    }

}

Write-JDEngineeringLog `
    -Level Information `
    -Message "Harvester Runtime Kernel loaded."

# ============================================================================
# END OF FILE
# ============================================================================