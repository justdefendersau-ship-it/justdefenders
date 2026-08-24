#
# JustDefenders©
# File: tooling\engineering\Services\Private\ManagedService-Lifecycle.ps1
# Work Package: WP-SERVICE-006A
# Module: Managed Service Lifecycle
#
# Purpose:
#   Provides the shared lifecycle implementation for all managed services.
#

Set-StrictMode -Version Latest

function Invoke-JDManagedServiceStart {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$Name
    )

    $service = Get-JDManagedServiceRegistration -Name $Name
    $meta = $service.Metadata

    Set-JDManagedServiceState -Name $Name -RuntimeState Starting | Out-Null

    try {
        if ($meta.StartupCommand) {
            & $meta.StartupCommand
        }

        Set-JDManagedServiceState -Name $Name -RuntimeState Running | Out-Null
    }
    catch {
        Set-JDManagedServiceState -Name $Name -RuntimeState Failed | Out-Null
        throw
    }

    return Get-JDManagedServiceState -Name $Name
}

function Invoke-JDManagedServiceStop {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$Name
    )

    $service = Get-JDManagedServiceRegistration -Name $Name
    $meta = $service.Metadata

    Set-JDManagedServiceState -Name $Name -RuntimeState Stopping | Out-Null

    try {
        if ($meta.StopCommand) {
            & $meta.StopCommand
        }

        Set-JDManagedServiceState -Name $Name -RuntimeState Stopped | Out-Null
    }
    catch {
        Set-JDManagedServiceState -Name $Name -RuntimeState Failed | Out-Null
        throw
    }

    return Get-JDManagedServiceState -Name $Name
}

function Invoke-JDManagedServiceRestart {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$Name
    )

    Invoke-JDManagedServiceStop -Name $Name | Out-Null
    return Invoke-JDManagedServiceStart -Name $Name
}

function Get-JDManagedServiceStatus {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$Name
    )

    return Get-JDManagedServiceState -Name $Name
}

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUe+XWWTT4Mi7BdkbmaFG4ASA7
# BG+gggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFFrZzgpymTswDtDgr9/RBTrZ
# EzLKMA0GCSqGSIb3DQEBAQUABIIBgDrhxniBBc35HAXeI27jTzfxCeUurtUs8YpP
# rO3+tZwjRomUbZlJ+QDDWZkj0Y+YQSr0THQsUivrpKBVwMjI+s4APbxiz1XxviY7
# kymURTHyjLc6cbxyu1BpOPaXYNdZVMj5T95n5pzcHsuejYMdvBJ8UNkaozZItX8i
# zLOTSU759EAjNgDBgEzs7x+rj8u+6p4rHKP4ptkCbULIqM7F5cDrwWQyftGpg3mb
# lEF4kBOqxVDavwCAiWggeSX8BzyL2p6vduWdzuUnyH+q7ozjzo8ZORvZMCmCfhFL
# 0MavCYkvhBvG9xrYT/+185Ulfz65foKMmTI/8N0k39bZm5KUZqHl7x5NrU9JYo3F
# e7vUIagBDnl7P7rAq3kefEaDx486yetv1NSOWWHAr0wYDezqnL4OusDIWgvRBNPy
# LABX6uEJZPHw9peNteBStRve7COp/EKG0gXlisjzqT6w+V1XDqOiWcNgxRaWb1Bk
# Dm6q+wD82tjuYdW6kgGVSbeHvWpbMQ==
# SIG # End signature block
