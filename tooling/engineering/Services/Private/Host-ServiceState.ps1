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
# UPDATE REGISTERED SERVICE
# ============================================================================

function Update-JDHostRegisteredService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name,

        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [hashtable]
        $Properties
    )

    if($Properties.Count -eq 0)
    {
        throw (
            "Operational Service '{0}' update requires at least one property." -f
            $Name
        )
    }

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    if($null -eq $service)
    {
        throw (
            "Operational Service '{0}' is not registered." -f
            $Name
        )
    }

    # Runtime state and registration identity are not mutable through this
    # contract. They remain owned by the existing Host Service runtime.
    foreach($protectedProperty in @(
        "Name",
        "RuntimeStatus",
        "RegisteredAt"
    ))
    {
        if($Properties.ContainsKey($protectedProperty))
        {
            throw (
                "Operational Service '{0}' property '{1}' is protected and " +
                "cannot be updated through Update-JDHostRegisteredService." -f
                $Name,
                $protectedProperty
            )
        }
    }

    $originalRuntimeStatus =
        $service.PSObject.Properties["RuntimeStatus"].Value

    $originalRegisteredAt =
        $service.PSObject.Properties["RegisteredAt"].Value

    foreach($key in $Properties.Keys)
    {
        if([string]::IsNullOrWhiteSpace([string]$key))
        {
            throw "Operational Service update property name cannot be empty."
        }

        $property =
            $service.PSObject.Properties[$key]

        if($null -ne $property)
        {
            $property.Value = $Properties[$key]
        }
        else
        {
            $service |
                Add-Member `
                    -MemberType NoteProperty `
                    -Name $key `
                    -Value $Properties[$key]
        }
    }

    # Preserve authoritative registration/runtime identity.
    if($service.RuntimeStatus -ne $originalRuntimeStatus)
    {
        throw (
            "Operational Service '{0}' RuntimeStatus changed during update." -f
            $Name
        )
    }

    if($service.RegisteredAt -ne $originalRegisteredAt)
    {
        throw (
            "Operational Service '{0}' RegisteredAt changed during update." -f
            $Name
        )
    }

    if($service.PSObject.Properties["UpdatedAt"])
    {
        $service.UpdatedAt = Get-Date
    }
    else
    {
        $service |
            Add-Member `
                -MemberType NoteProperty `
                -Name UpdatedAt `
                -Value (Get-Date)
    }

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
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUlpJho869vibsXcx2nJEeBJyk
# DLugggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
# AQsFADAxMS8wLQYDVQQDDCZKdXN0RGVmZW5kZXJzIEVuZ2luZWVyaW5nIENvZGUg
# U2lnbmluZzAeFw0yNjA4MTgwNzQzMjBaFw0yOTA4MTgwNzUzMjBaMDExLzAtBgNV
# BAMMJkp1c3REZWZlbmRlcnMgRW5naW5lZXJpbmcgQ29kZSBTaWduaW5nMIIBojAN
# BgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEAv9IMoIFNr6yFN3YrhKFM/OwF+Adn
# cEASw7j1RpghwtHyC/Of95kDXKYH5iorn7wjRrQaIpjI3SwSjSPVyeNPv9BwnEWf
# og9RFegtkcpbDmVEdDStaLKcurAWNPePaQLjM37OJcDhZq7Xt6o0M4P560gTpugT
# qXmzBmBJm8esfNlrvpvyb1kWHHwExhWKiOJLITN1DwzVtKp1iIsLVaSGfFYOoyTZ
# d5M2btm3//gM+UVgIv8OL0b1+FA0LPO6w+r/wsETvkE6gA2Yp1XEMBnVrM+82GyA
# ULNSaiOCRHmIvvWd7ae42hd49iNb448zI6o5dd+7UwuW2IgN+4dUBJj6/xKnVaqP
# ogS5w859W633Rw2oREVPHR7aXVC/5O6HRARb3J+GBB8aONmNIagpmIlO80yno3sD
# VeRI2jldaMrn82y6ekg3Vg5WTTN3LWuCAtdgQZXwEiZhddcLKR0c78LLQ2fOAX2E
# Ke8VMbDucbKrXo9WK0NuOyD8UZ2oFfeD8UulAgMBAAGjRjBEMA4GA1UdDwEB/wQE
# AwIHgDATBgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUMb5aRWwHL790fjoR
# 9BLuJCqudeswDQYJKoZIhvcNAQELBQADggGBAIxqgLtL/oLQX0G73w1odkDFk/ln
# 6qQ9Sq3EblYSgcgx7W5i62YHCAfN5dL6q8rwY+5M0JzKV3P0d8aV8HUqBhmJse3/
# YqH219aNYGgEDIFH9zw2oQ6+vV3L3J1RPf1qewGEpemRGCJJ0e7MRW9MIcmn68yD
# 4s9udhiDMlBYVaM1KeKc8lseJE8JSNZST5q+foPAeDJ7lpIX6a48dL7tMqYhV3sa
# G2QTtXsZLykIZWc7c6LPAbN13zAu8O15K0oZ9uzF7skToPf1Oycz70ALjMRS4j09
# ytSJpkEyyJcrdwsugfqWVviQzTnZm4JwejtsyKwwJacU353PkanMPE+RSv5ivTnc
# RdfUy5zX1nlXez21X0a1uDwvDbdz8vZf7OJ22iRvYIMx/vLLgt64wxtB7KDHK3tx
# V9f6KOTsDzGBnmzD6hVltnHtfK4ePqInezXSOGQwyJjZcACO5RfXsL0iemOXM4sy
# Q7nXcW7dmS/h/7l76i58v9f7wPFEk7ZYyM8QTjGCAmYwggJiAgEBMEUwMTEvMC0G
# A1UEAwwmSnVzdERlZmVuZGVycyBFbmdpbmVlcmluZyBDb2RlIFNpZ25pbmcCECU2
# Ao5/UVWGQFSqUiaNwrowCQYFKw4DAhoFAKB4MBgGCisGAQQBgjcCAQwxCjAIoAKA
# AKECgAAwGQYJKoZIhvcNAQkDMQwGCisGAQQBgjcCAQQwHAYKKwYBBAGCNwIBCzEO
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFFO+0/JpDQUNbCCnVlzVMBn5
# zHU/MA0GCSqGSIb3DQEBAQUABIIBgHJPrEfA4ti5ulMMFkDK/3MP01Sa5zeHyrFz
# s3bqdpNgygjw4t4CsS61tt84BEkI4aNnIj6K4eFJCfI9EpBST2s7d7sAZSBAhz6c
# t1dyc3Yqb/16SS5LttzLPv7as8zab7p0LouMsJps4QkO/hUCIMmJobA9Cn0yh+hp
# TM0t3O13wkjPlqTsqvsM83aFmR4nz9EZd6jVlA+XWSoMjOBOTFMSdQ/s3g1QguwB
# /Jh0ILJZfLbs9sPVlfrNnjneZIfC5a7uw1pPdiILNJqggtmun+DBJ9V8BYP0aSPc
# wZrnZq9/hY0OwRMHQ0eOXGMqJjbxMyRkJEe6F4Ejs2f/lTqI0YYJONzUySg/vxGf
# GBAAVOKpFEK43QkQg4jWQ4q69+4iljoL0RRtnAwC/QZVPVijW8f5hDP+nvgzVgCv
# olynjZ2r7/gjr2y7U5uVJxziirY6O9viV9tXSSl+J4A+/QsVOIc1qEBv+MdUhsrv
# pmJy0AuBhe68pZxav6m+g6tF72Bx2w==
# SIG # End signature block
