<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-S001-04
Production Revision: PR-007A
Component          : Operational Host Startup
Timestamp          : 22 July 2026, 10:20
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Start-JDOperationalHost.ps1

------------------------------------------------------------------------------
DESCRIPTION
------------------------------------------------------------------------------

Starts the JustDefenders Operational Host runtime.

Responsibilities

    • Validate Host Runtime
    • Execute Bootstrap Engine
    • Start Host
    • Start Scheduler
    • Start AutoStart Services
    • Validate Runtime
    • Return Operational Status

The bootstrap process is manifest driven through:

    BuiltInServices.psd1

No services are hard-coded within this module.

------------------------------------------------------------------------------
CHANGE HISTORY
------------------------------------------------------------------------------

PR-007A

    Initial bootstrap-integrated implementation.

==============================================================================
#>

Set-StrictMode -Version Latest

$ErrorActionPreference = 'Stop'

function Start-JDOperationalHost
{
    [CmdletBinding()]
    param
    (
        [switch]
        $Force,

        [switch]
        $EnableDiscovery
    )

    Write-Verbose "Starting JustDefenders Operational Host."

    #
    # Ensure runtime exists.
    #

    Initialize-JDOperationalHost

    #
    # Bootstrap service registry.
    #

    $bootstrap =
        Initialize-JDOperationalServiceBootstrap `
            -EnableDiscovery:$EnableDiscovery `
            -Force:$Force

    #
    # Start host runtime.
    #

    $host =
        Start-JDHost

    if (-not $host.Running)
    {
        throw "Operational Host failed to start."
    }

    Write-Verbose "Operational Host started."

    #
    # Start scheduler.
    #

    Start-JDHostScheduler

    Write-Verbose "Scheduler started."

    #
    # Retrieve registered services.
    #

    $services =
        Get-JDHostRegisteredServices |
            Sort-Object StartupOrder

$services =
    Get-JDHostRegisteredServices |
        Sort-Object StartupOrder

Write-Host ""
Write-Host "===== STARTUP SERVICES ====="

foreach($svc in $services)
{
    Write-Host "Type: $($svc.GetType().FullName)"

    if($svc -is [psobject])
    {
        Write-Host "Properties:"
        $svc.PSObject.Properties.Name | Sort-Object | ForEach-Object {
            Write-Host "  $_"
        }
    }

    Write-Host ""
}

Write-Host "============================"
Write-Host ""

    #
    # Start AutoStart services.
    #

    foreach ($service in $services)
    {
        if (-not $service.Enabled)
        {
            Write-Verbose ("Skipping disabled service [{0}]." -f $service.Name)

            continue
        }

        if (-not $service.AutoStart)
        {
            Write-Verbose ("Skipping manual service [{0}]." -f $service.Name)

            continue
        }

$service | Format-List *
        if ([string]::IsNullOrWhiteSpace($service.StartupCommand))
        {
            Write-Warning ("Service [{0}] does not define a startup command." -f $service.Name)

            continue
        }

        Write-Verbose ("Starting service [{0}]." -f $service.Name)

        try
        {
            $command =
                Get-Command `
                    -Name $service.StartupCommand `
                    -ErrorAction Stop

            & $command.Name

            Set-JDHostServiceState `
                -Name $service.Name `
                -State 'Running'

            Write-Verbose ("Service [{0}] started successfully." -f $service.Name)
        }
        catch
        {
            Set-JDHostServiceState `
                -Name $service.Name `
                -State 'Failed'

            Write-Error ("Failed to start service [{0}]. {1}" -f `
                $service.Name,
                $_.Exception.Message)

            throw
        }
    }

    #
    # Synchronise runtime state.
    #

    Update-JDHostManagedServiceCount

    #
    # Perform runtime validation.
    #

    $status =
        Get-JDOperationalHostStatus

    if (-not $status.Running)
    {
        throw "Operational Host validation failed."
    }

    if (-not $status.SchedulerRunning)
    {
        throw "Operational Scheduler failed validation."
    }

    Write-Verbose "Operational Host validation successful."

    return $status
}

# =============================================================================
# STARTUP VALIDATION
# =============================================================================

function Test-JDOperationalHostStartup
{
    [CmdletBinding()]
    param()

    $status =
        Get-JDOperationalHostStatus

    if (-not $status.Running)
    {
        throw "Operational Host is not running."
    }

    if (-not $status.Initialised)
    {
        throw "Operational Host has not been initialised."
    }

    if (-not $status.SchedulerRunning)
    {
        throw "Operational Scheduler is not running."
    }

    if ($status.ManagedServices -lt 0)
    {
        throw "Managed service count is invalid."
    }

    return [PSCustomObject]@{

        Passed = $true

        Timestamp = Get-Date

        ManagedServices = $status.ManagedServices

        SchedulerRunning = $status.SchedulerRunning

        Health = $status.Health
    }
}

# =============================================================================
# STARTUP DIAGNOSTICS
# =============================================================================

function Get-JDOperationalHostStartupReport
{
    [CmdletBinding()]
    param()

    $status =
        Get-JDOperationalHostStatus

    $services =
        Get-JDHostRegisteredServices |
            Sort-Object StartupOrder

    [PSCustomObject]@{

        Timestamp =
            Get-Date

        Host =
            $status

        Bootstrap =
            Get-JDOperationalBootstrapStatus

        RegisteredServices =
            $services.Count

        RunningServices =
            @($services | Where-Object State -eq 'Running').Count

        FailedServices =
            @($services | Where-Object State -eq 'Failed').Count

        DisabledServices =
            @($services | Where-Object Enabled -eq $false).Count

        Services =
            $services
    }
}

# =============================================================================
# MODULE INITIALISATION
# =============================================================================

Write-Verbose "Start-JDOperationalHost module loaded."

# =============================================================================
# EXPORTS
# =============================================================================

Export-ModuleMember `
    -Function `
        Start-JDOperationalHost,
        Test-JDOperationalHostStartup,
        Get-JDOperationalHostStartupReport

#------------------------------------------------------------------------------
# END OF FILE
#
# JustDefenders ©
#
# Work Package       : WP-S001-04
# Production Revision: PR-007A
#
# File:
# C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Start-JDOperationalHost.ps1
#
# End of Production File
#------------------------------------------------------------------------------