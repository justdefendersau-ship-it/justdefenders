<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-ServiceLookup.ps1

Timestamp
10 July 2026 09:15

Work Package
WP-S001-03

Component
Operational Service Host

Purpose
Provides all internal service lookup operations for the Operational Service
Host. This module is responsible only for locating services registered in the
Operational Registry. It never changes service state.

Dependencies
- Host-State.ps1
- Operational-Registry.psm1

NOTES
- Private module.
- Dot-sourced by Operational-ServiceHost.psm1.
- Uses only the public Operational Registry API.
==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# GET ALL REGISTERED SERVICES
# ============================================================================

function Get-JDHostRegisteredServices
{
    [CmdletBinding()]
    param()

    $services = Get-JDOperationalServices

    if ($null -eq $services)
    {
        return @()
    }

    return @($services)
}

# ============================================================================
# GET REGISTERED SERVICE
# ============================================================================

function Get-JDHostRegisteredService
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    return Get-JDOperationalService -Name $Name
}

# ============================================================================
# TEST SERVICE EXISTS
# ============================================================================

function Test-JDHostServiceExists
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    return Test-JDOperationalServiceExists -Name $Name
}

# ============================================================================
# GET REGISTERED SERVICE COUNT
# ============================================================================

function Get-JDHostRegisteredServiceCount
{
    [CmdletBinding()]
    param()

    return @(Get-JDHostRegisteredServices).Count
}

# ============================================================================
# UPDATE HOST STATISTICS
# ============================================================================

function Update-JDHostManagedServiceCount
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    $state.Statistics.ManagedServices =
        Get-JDHostRegisteredServiceCount

    return $state.Statistics.ManagedServices
}

# ============================================================================
# FIND SERVICES BY STATE
# ============================================================================

function Get-JDHostServicesByState
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $State
    )

    $services = Get-JDHostRegisteredServices

    foreach ($service in $services)
    {
        if ($null -eq $service.RuntimeStatus)
        {
            continue
        }

        if ($service.RuntimeStatus.State -eq $State)
        {
            $service
        }
    }
}

# ============================================================================
# FIND ENABLED SERVICES
# ============================================================================

function Get-JDHostEnabledServices
{
    [CmdletBinding()]
    param()

    $services = Get-JDHostRegisteredServices

    foreach ($service in $services)
    {
        if ($null -eq $service.RuntimeStatus)
        {
            continue
        }

        if ($service.RuntimeStatus.Enabled)
        {
            $service
        }
    }
}

# ============================================================================
# FIND DISABLED SERVICES
# ============================================================================

function Get-JDHostDisabledServices
{
    [CmdletBinding()]
    param()

    $services = Get-JDHostRegisteredServices

    foreach ($service in $services)
    {
        if ($null -eq $service.RuntimeStatus)
        {
            continue
        }

        if (-not $service.RuntimeStatus.Enabled)
        {
            $service
        }
    }
}

# ============================================================================
# END OF FILE
# ============================================================================