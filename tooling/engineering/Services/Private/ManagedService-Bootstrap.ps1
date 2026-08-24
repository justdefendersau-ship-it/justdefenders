#
# =====================================================
# JustDefenders ©
# File: C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\ManagedService-Bootstrap.ps1
# Work Package: PR-006F – Host State Singleton Integration
# Timestamp: 22 July 2026, 08:45
# =====================================================

function Initialize-JDManagedServiceEngineBootstrap
{
    <#
        .SYNOPSIS
        Initialises the Managed Service Engine bootstrap context.

        .DESCRIPTION
        Performs bootstrap validation and verifies the
        Operational Service Host singleton runtime state.

        Service discovery, lifecycle orchestration, health monitoring,
        and recovery remain delegated to their respective components.
    #>

    [CmdletBinding()]
    param()

    $requiredModules = @(
        'Engineering-Common',
        'Operational-ServiceHost'
    )

    $loaded = foreach ($module in $requiredModules)
    {
        $present = Get-Module -Name $module -ErrorAction SilentlyContinue

        [PSCustomObject]@{
            Name   = $module
            Loaded = ($null -ne $present)
        }
    }

    #
    # Ensure the runtime singleton exists.
    #
    if (-not (Get-Command Get-JDRuntimeState -ErrorAction SilentlyContinue))
    {
        throw "Runtime-State.ps1 has not been loaded."
    }

    $hostState = Get-JDRuntimeState

    $context = [PSCustomObject]@{

        Name              = 'JustDefenders Managed Service Engine'
        Version           = '1.0.0'
        Build             = 'PR-006F'
        Status            = 'Ready'
        InitialisedAt     = Get-Date

        Dependencies      = $loaded

        RuntimeState      = $hostState

        RuntimeObjectHash = [System.Runtime.CompilerServices.RuntimeHelpers]::GetHashCode($hostState)

        PrivateFolder     = Join-Path $PSScriptRoot ''

        PublicFolder      = Join-Path (Split-Path $PSScriptRoot -Parent) 'Public'
    }

    $script:ManagedServiceEngineContext = $context

    return $context
}
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUd6rZ8oWuiiRrOY9zjY/LCk31
# UMGgggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFAJGtZhOim5pWq5hAENcLG30
# Eef/MA0GCSqGSIb3DQEBAQUABIIBgGmWrORZjS456PCIPJiC+dmklA27YMZl+ROp
# ivYaXvK0RxTra2iYtWFHHfHEOb2P/QwvGMq6LvBOxUH1dBMVEj/Qjmr2sYpYZ9hU
# 05tPFcK7x3vbJ5N7m3k798lzAQ7AGW+7RoiguYRYn7h2NhdV6R/is9rUxBG6YBSD
# +D+SuYVBLhGshWCUiP/g9x+l0eijMqP36cmBC8stgTM7y4un1jpeBKP/3bM7u1hO
# dt3Wc7cnxP6PAzKP44uWVRsURMSn2wgoU6VvWj/2niikcAVlacqTvxSbApo3Bwas
# eR7reyewXzv63yB/csDjqfolWfM3qkUEjrGW90gVhCVhb7uSwSc5kQC2daIEMYcz
# axtwDEsOLAMlfo33uoCmWWjr7K2rzavLt0K7sLNT8KXH9JLRXjOu8XYn0A9QdNzy
# tkpjP+rqJ9ivnitr8arpAeQ9W1VpjRho1M4bqQhLfEZwrCiQsFNvYlyOZ4+jP9mc
# wmDUWXv/PtR/2kns/xUDPFmpdPvW3A==
# SIG # End signature block
