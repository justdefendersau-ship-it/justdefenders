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
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUS+jmzkKgm1MSbwAeoFG1VV9X
# 6VagggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFIVZivqMvYzZohnTdZYeGdjd
# QHfDMA0GCSqGSIb3DQEBAQUABIIBgL6z+TJQQxnmd3JXS4oPafQcDXzsFSkmrtEz
# Vd0f8R+JKTzm7yo17t+gkcE+INk+Qo3DhNFwg+6COwEfRzoDr4DkddO8K9yHpkk5
# VJlFA50GM5oATHPfhfR+B4pNOy5HIKhYPLoFdl/p7iY7t6dY53fYX+Xm8goVhEhu
# SSu5S6HqddIZYAypwVIyz5Nb/fJfHxDOr5m8CT5bXFjlT5SuRhYrI1SEMqoBkRQb
# bTHen4agqDy88ef+K5nEFZvOG2694hxxbVwRo6t+whOW9ul2lcwVHfESeNSEsMoo
# XciKPTJ3OiAJWkvN193A6GMXvB+heanspechgeDNZHzlxAmBxw7qxy8fllOlm1fN
# SDTEmYLBFay/h0YiNLJWFJHrF65SSyYQ0+GiBTBuDDFe1+v4/xUhluReykrDAF9q
# fRzuV/5JhZwZbwhoGg0XLojaKwVmA4yF5Z2umFfJfyAyy+Kbx6QewUc2T4unHe73
# VTVSj3245F2mHrqnb09OIqawrYKgbA==
# SIG # End signature block
