<#
==============================================================================
JustDefenders©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-ServiceState.ps1

Timestamp
12 July 2026 08:50

Work Package
WP-S004B-01B — Host-ServiceState

Component
Operational Service Host

Purpose

Maintains the authoritative Operational Service Registry for the
JustDefenders Operational Service Host.

Responsibilities

    • Initialise the registry
    • Store registered services
    • Retrieve registered services
    • Remove registered services
    • Maintain registry consistency

Dependencies

    • Host-State.ps1
    • Engineering-Common

Notes

    • Private implementation
    • Single source of truth for RegisteredServices
    • No lifecycle logic
    • No health logic
    • No scheduler logic

==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# INITIALISE REGISTRY
# ============================================================================

function Initialize-JDHostServiceRegistry
{
    [CmdletBinding()]
    param()

    $state =
        Get-JDHostState

    if(-not $state.PSObject.Properties["RegisteredServices"])
    {
        $state |
            Add-Member `
                -MemberType NoteProperty `
                -Name RegisteredServices `
                -Value @()
    }

    if($null -eq $state.RegisteredServices)
    {
        $state.RegisteredServices = @()
    }

    return $state.RegisteredServices
}

# ============================================================================
# GET REGISTRY
# ============================================================================

function Get-JDHostServiceRegistry
{
    [CmdletBinding()]
    param()

    return (Initialize-JDHostServiceRegistry)
}

# ============================================================================
# GET REGISTERED SERVICES
# ============================================================================

function Get-JDHostRegisteredServices
{
    [CmdletBinding()]
    param()

    return @(Get-JDHostServiceRegistry)
}

# ============================================================================
# PART 1 CONTINUES
# ============================================================================

# ============================================================================
# ADD REGISTERED SERVICE
# ============================================================================

function Add-JDHostRegisteredService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [PSCustomObject]
        $Service
    )

    $registry =
        Initialize-JDHostServiceRegistry

Write-Host ""
Write-Host "===== REGISTRY DEBUG ====="
Write-Host "Registry is null : $($null -eq $registry)"

if ($null -ne $registry)
{
    Write-Host "Registry Type    : $($registry.GetType().FullName)"
    Write-Host "Registry Count   : $(@($registry).Count)"
}

$state = Get-JDHostState
Write-Host "Has RegisteredServices property: $($null -ne $state.PSObject.Properties['RegisteredServices'])"

if ($null -ne $state.PSObject.Properties['RegisteredServices'])
{
    Write-Host "RegisteredServices Count: $($state.RegisteredServices.Count)"
}

Write-Host "=========================="
Write-Host ""

    if (
    @(
        $registry |
            Where-Object { $_.Name -eq $Service.Name }
    ).Count -gt 0
)
{
    throw (
        "Operational Service '{0}' is already registered." -f
        $Service.Name
    )
}

Write-Host ""
Write-Host "===== JDHostState DEBUG ====="

if ($null -eq $state)
{
    Write-Host "JDHostState is NULL"
}
else
{
    Write-Host "LifecycleState : $($state.LifecycleState)"
    Write-Host "Running        : $($state.Running)"
    Write-Host "Initialised    : $($state.Initialised)"
}
Write-Host "===== JDHostState DEBUG ====="

if ($null -eq $state)
{
    Write-Host "JDHostState is NULL"
}
else
{
    Write-Host "LifecycleState : $($state.LifecycleState)"
    Write-Host "Running        : $($state.Running)"
    Write-Host "Initialised    : $($state.Initialised)"
}

Write-Host "============================="
Write-Host ""

$state.RegisteredServices += $Service

Update-JDHostManagedServiceCount | Out-Null

return $Service
Write-Host "============================="
Write-Host ""
    $state.RegisteredServices += $Service

Update-JDHostManagedServiceCount | Out-Null

    return $Service
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
        [string]
        $Name
    )

    $registry =
        Get-JDHostServiceRegistry

    $service =
        $registry |
            Where-Object Name -EQ $Name |
            Select-Object -First 1

    return $service
}

# ============================================================================
# REMOVE REGISTERED SERVICE
# ============================================================================

function Remove-JDHostRegisteredService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $registry =
        Get-JDHostServiceRegistry

    if(-not ($registry | Where-Object Name -EQ $Name))
    {
        throw (
            "Operational Service '{0}' is not registered." -f
            $Name
        )
    }

    $state = Get-JDHostState

$state.RegisteredServices =
    @(
        $registry |
            Where-Object Name -NE $Name
    )
        @(
            $registry |
                Where-Object Name -NE $Name
        )

    Update-JDHostManagedServiceCount | Out-Null

    return $true
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
# PART 2 CONTINUES
# ============================================================================

# ============================================================================
# UPDATE MANAGED SERVICE COUNT
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
# TEST REGISTERED SERVICE
# ============================================================================

function Test-JDHostRegisteredService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    return ($null -ne (Get-JDHostRegisteredService -Name $Name))
}

# ============================================================================
# VALIDATE REGISTRY
# ============================================================================

function Assert-JDHostServiceRegistry
{
    [CmdletBinding()]
    param()

    $registry =
        Get-JDHostServiceRegistry

    if ($null -eq $registry)
    {
        throw "Operational Service Registry is not initialised."
    }

    foreach($service in $registry)
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
                    "Registered service contract violation. Missing property '{0}'." -f
                    $property
                )
            }
        }
    }

    return $true
}

# ============================================================================
# RESET REGISTRY
# ============================================================================

function Reset-JDHostServiceRegistry
{
    [CmdletBinding()]
    param()

    $state =
        Get-JDHostState

    if(-not $state.PSObject.Properties["RegisteredServices"])
    {
        $state |
            Add-Member `
                -MemberType NoteProperty `
                -Name RegisteredServices `
                -Value @()
    }
    else
    {
        $state.RegisteredServices = @()
    }

    Update-JDHostManagedServiceCount | Out-Null

    return $true
}

# ============================================================================
# END OF FILE
# ============================================================================