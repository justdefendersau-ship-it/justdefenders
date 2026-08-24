<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-State.ps1

Timestamp
22 July 2026 08:15

Work Package
PR-006F — Host State Singleton Refactor

Component
Private Runtime State

Purpose
Maintains the authoritative runtime state for the Operational Service Host.

Runtime ownership is delegated to Runtime-State.ps1, which provides the
process-wide singleton. This file preserves the existing public API.
==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# VERIFY SINGLETON PROVIDER
# ============================================================================

if (-not (Get-Command Get-JDRuntimeState -ErrorAction SilentlyContinue))
{
    throw "Runtime-State.ps1 must be loaded before Host-State.ps1."
}

# ============================================================================
# GET HOST STATE
# ============================================================================

function Get-JDHostState
{
    [CmdletBinding()]
    param()

    return Get-JDRuntimeState
}

# ============================================================================
# RESET HOST STATE
# ============================================================================

function Reset-JDHostState
{
    [CmdletBinding()]
    param()

    return Reset-JDRuntimeState
}

# ============================================================================
# UPDATE HEARTBEAT
# ============================================================================

function Update-JDHostHeartbeat
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    $state.LastHeartbeat = Get-Date

    return $state.LastHeartbeat
}

# ============================================================================
# UPDATE HEALTH
# ============================================================================

function Update-JDHostHealth
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateSet(
            "UNKNOWN",
            "HEALTHY",
            "DEGRADED",
            "FAILED"
        )]
        [string]
        $Health
    )

    $state = Get-JDHostState

    $state.HealthState = $Health
    $state.LastHealthCheck = Get-Date
    $state.Statistics.HealthChecks++

    return $state.HealthState
}

# ============================================================================
# GET HOST STATISTICS
# ============================================================================

function Get-JDHostStateStatistics
{
    [CmdletBinding()]
    param()

    return (Get-JDHostState).Statistics
}

# ============================================================================
# END OF FILE
# ============================================================================
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUlHBvbDk1LF/YUS7Xy6OglFi4
# vWmgggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFKGIzcD2n1Tp8uO2kRA4miWV
# wvbxMA0GCSqGSIb3DQEBAQUABIIBgLjZo3415lRzdNIa9Pr4SJAIaamDhZ7vUP4Y
# COYUF8UMkn3kt/0wSYp1W7Gt1uiy9ZTjSas2hxyPI41occek2g+cKmVHxJPh2wyW
# R1fMsgiAMm5znwi4fPW1ykMNkY42Urwqy1z0Tjac53MeNRZezQuW2+uxO3/fa1gm
# Z7MjYI6tSNKesckk9q4lJ25S/l+c8XBd0k5Ncw/PC3GpXpc9zO/c7PDLszwEh7Uw
# YzLKb/dChDG0pgH0ffjMzEDsD8UJObc/+KF3gV/qwQTacdFQeGhRp0UBlfU9WdmM
# lIVw8WKB06TDfsof/rvKhWbCoEE/vJZ/xEvPO/WKetEBu4VgQvTAQTiMgwIrs6oZ
# p7a9spOTEfEAdHP9bHvSca+4mi7mroib9oup55S1eQ35i+TmAhbgnc8ZNUHvGv7R
# lyU8P378qg7sFqJUEu5xFHm3n1Ctl0Z7uwjxO2I8t83Gt9qzbRjvnhWACqwoqrMQ
# kl+i5VMAa4hiQhc04ezhMU3wkEM9ig==
# SIG # End signature block
