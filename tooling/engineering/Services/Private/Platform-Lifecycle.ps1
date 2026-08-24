<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-PLATFORM-001
Production Revision: PR-006F
Component          : Platform Lifecycle
Timestamp          : 22 July 2026 09:15
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Platform-Lifecycle.ps1

Purpose:
    Coordinates the platform lifecycle without owning runtime state.

    PR-006F integrates the Operational Service Host singleton runtime
    introduced by Runtime-State.ps1.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Test-JDPlatformReadiness {
    [CmdletBinding()]
    param()

    #
    # Verify singleton runtime.
    #
    $hostState = Get-JDHostState

    $checks = [ordered]@{
        PlatformInitialised = [bool](Get-Command Initialize-JDPlatform -ErrorAction SilentlyContinue)
        HostAvailable       = [bool](Get-Command Start-JDOperationalHost -ErrorAction SilentlyContinue)
        HarvesterAvailable  = [bool](Get-Command Start-JDHarvester -ErrorAction SilentlyContinue)
        RuntimeAvailable    = ($null -ne $hostState)
        HostRunning         = $hostState.Running
    }

    [pscustomobject]@{
        Ready          = ($checks.Values -notcontains $false)
        Timestamp      = Get-Date
        RuntimeHash    = [System.Runtime.CompilerServices.RuntimeHelpers]::GetHashCode($hostState)
        HostHealth     = $hostState.HealthState
        LastHeartbeat  = $hostState.LastHeartbeat
        Checks         = $checks
    }
}

function Invoke-JDPlatformStartup {
    [CmdletBinding()]
    param()

    $bootstrap = Initialize-JDPlatform

    $host = Start-JDOperationalHost

    $harvester = Start-JDHarvester

    $readiness = Test-JDPlatformReadiness

    [pscustomobject]@{
        PlatformVersion = '0.1.0-pr006f'
        StartupTime     = Get-Date
        Bootstrap       = $bootstrap
        Host            = $host
        Harvester       = $harvester
        Readiness       = $readiness
        RuntimeState    = Get-JDHostState
    }
}

function Invoke-JDPlatformShutdown {
    [CmdletBinding()]
    param()

    if (Get-Command Stop-JDHarvester -ErrorAction SilentlyContinue) {
        Stop-JDHarvester | Out-Null
    }

    if (Get-Command Stop-JDOperationalHost -ErrorAction SilentlyContinue) {
        Stop-JDOperationalHost | Out-Null
    }

    $hostState = Get-JDHostState

    $hostState.Running   = $false
    $hostState.StoppedAt = Get-Date

    [pscustomobject]@{
        PlatformVersion = '0.1.0-pr006f'
        Status          = 'Stopped'
        Timestamp       = Get-Date
        RuntimeState    = $hostState
    }
}

#==============================================================================
# END OF WP-PLATFORM-001 PR-006F
#==============================================================================
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQU9ddKyqhTcLaAO7bAdO6Trwub
# jW2gggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFO6/9gMlR54jp8VEXqle/Pmu
# h4O5MA0GCSqGSIb3DQEBAQUABIIBgFEk9NekhdC8i0f3pxQV4DFIhkaIn6KBRNJl
# a26LpFZcdqJPn3lcjyT/kAdpN0f6bQDUqE6YL+m0mtJvGqYchzVfN+I5nYt8kV9K
# FZ3E/l35ppe9jncJOE5uEL6wtBpfPCO1HgpYhQQJo2vjGsOq0NWzMsEEQbIAkQhE
# u0NTESSpShg2TG9aIOKMQIsZ5su/KO0TU2pr4DBw8yYNbjhWW8q2i0DBWF+QBGzM
# XU6Pp9aWdXFGyR96uEOA+JPwGveU/BBz7I1iW+UyIfkhlic3ADUTqE1YDJKWYw4s
# bUz7L1GkshEOOdv8deHMouvCm/FxhkBmkVY7D7DYAc8xN600Z9Fb6kL3++Dx4iUl
# K7beWHr1XPL6v6zwGSHuQygJ7+ei/Uxa4KixzdRoEdt2DfoCL1CxIBULj9Y/jiBY
# gwuFJq257uLBhNc9Km/LVnHHY8mYdXywcjodMwQevTKPP2W4UeD5dxvSM3vjYTT0
# kJLEEg9wTSv4YXBYR91thCUla0L9Og==
# SIG # End signature block
