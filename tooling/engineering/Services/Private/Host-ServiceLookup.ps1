<#
==============================================================================
JustDefenders©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-ServiceLookup.ps1

Timestamp
12 July 2026 08:50

Work Package
WP-S004B-02 — Host-ServiceLookup Contract Alignment

Component
Operational Service Host

Purpose

Provides all internal lookup operations for the Operational Service Host.

This module provides read-only access to the Host Service Registry.
It never creates, updates or removes registered services.

Responsibilities

    • Retrieve registered services
    • Locate individual services
    • Test service existence
    • Maintain Managed Service statistics
    • Provide filtered service views

Dependencies

    • Host-State.ps1
    • Host-ServiceState.ps1

Notes

    • Private module
    • Dot-sourced by Operational-ServiceHost.psm1
    • Reads ONLY from the Host Service Registry
    • Owns no runtime state
    • Owns no lifecycle logic

==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# GET ALL REGISTERED SERVICES
# ============================================================================

function Get-JDHostRegisteredServices
{
    [CmdletBinding()]
    param()

    $registry =
        Get-JDHostServiceRegistry

    if($null -eq $registry)
    {
        return @()
    }

    return @($registry)
}

# ============================================================================
# GET REGISTERED SERVICE
# ============================================================================

function Get-JDHostRegisteredService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    $registry =
        Get-JDHostServiceRegistry

    return (
        $registry |
            Where-Object Name -EQ $Name |
            Select-Object -First 1
    )
}

# ============================================================================
# PART 1 CONTINUES
# ============================================================================

# ============================================================================
# TEST SERVICE EXISTS
# ============================================================================

function Test-JDHostServiceExists
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    return ($null -ne (
        Get-JDHostRegisteredService `
            -Name $Name
    ))
}

# ============================================================================
# GET REGISTERED SERVICE COUNT
# ============================================================================

function Get-JDHostRegisteredServiceCount
{
    [CmdletBinding()]
    param()

    return @(
        Get-JDHostRegisteredServices
    ).Count
}

# ============================================================================
# UPDATE HOST MANAGED SERVICE COUNT
# ============================================================================

function Update-JDHostManagedServiceCount
{
    [CmdletBinding()]
    param()

    $state =
        Get-JDHostState

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
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $State
    )

    foreach($service in Get-JDHostRegisteredServices)
    {
        if(
            $null -ne $service.RuntimeStatus -and
            $service.RuntimeStatus.State -eq $State
        )
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

    foreach($service in Get-JDHostRegisteredServices)
    {
        if(
            $null -ne $service.RuntimeStatus -and
            $service.RuntimeStatus.Enabled
        )
        {
            $service
        }
    }
}

# ============================================================================
# PART 2 CONTINUES
# ============================================================================

# ============================================================================
# FIND DISABLED SERVICES
# ============================================================================

function Get-JDHostDisabledServices
{
    [CmdletBinding()]
    param()

    foreach($service in Get-JDHostRegisteredServices)
    {
        if(
            $null -ne $service.RuntimeStatus -and
            -not $service.RuntimeStatus.Enabled
        )
        {
            $service
        }
    }
}

# ============================================================================
# VALIDATE LOOKUP CONTRACT
# ============================================================================

function Assert-JDHostLookupContract
{
    [CmdletBinding()]
    param()

    $services =
        Get-JDHostRegisteredServices

    foreach($service in $services)
    {
        foreach($property in @(
            "Name",
            "RuntimeStatus",
            "RegisteredAt"
        ))
        {
            if(-not $service.PSObject.Properties[$property])
            {
                throw (
                    "Host lookup contract violation. " +
                    "Missing property '{0}'." -f
                    $property
                )
            }
        }

        foreach($property in @(
            "State",
            "Health",
            "Enabled",
            "Running"
        ))
        {
            if(-not $service.RuntimeStatus.PSObject.Properties[$property])
            {
                throw (
                    "RuntimeStatus contract violation. " +
                    "Missing property '{0}'." -f
                    $property
                )
            }
        }
    }

    return $true
}

# ============================================================================
# TEST LOOKUP LAYER
# ============================================================================

function Test-JDHostLookup
{
    [CmdletBinding()]
    param()

    Assert-JDHostLookupContract | Out-Null

    [PSCustomObject]@{

        RegisteredServices =
            Get-JDHostRegisteredServiceCount

        EnabledServices =
            @(Get-JDHostEnabledServices).Count

        DisabledServices =
            @(Get-JDHostDisabledServices).Count

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================