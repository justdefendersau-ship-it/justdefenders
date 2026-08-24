<#
JustDefenders© Engineering Library
PR-011.1 Runtime Fix Pack
Component: RT-4 Notification-Manager
Timestamp: 1 August 2026, 06:45

Engineering Fixes
-----------------
* StrictMode-safe manager initialisation.
* Defensive dependency validation.
* Idempotent startup/shutdown.
* Private module (no Export-ModuleMember).
#>

Set-StrictMode -Version Latest

function Initialize-JDNotificationManager {
    [CmdletBinding()]
    param()

    foreach($fn in @(
        'Initialize-JDNotificationRuntimeState',
        'Initialize-JDNotificationQueue',
        'Set-JDNotificationRuntimeState'))
    {
        if(-not (Get-Command $fn -ErrorAction SilentlyContinue)){
            throw "Required runtime function '$fn' is unavailable."
        }
    }

    Initialize-JDNotificationRuntimeState | Out-Null
    Initialize-JDNotificationQueue | Out-Null

    Set-JDNotificationRuntimeState -Property Running -Value $true | Out-Null
    Set-JDNotificationRuntimeState -Property StartedAt -Value (Get-Date) | Out-Null
    Set-JDNotificationRuntimeState -Property LastHeartbeat -Value (Get-Date) | Out-Null

    Get-JDNotificationManagerStatus
}

function Invoke-JDNotificationManager {
    [CmdletBinding()]
    param([int]$BatchSize = 100)

    if(-not (Get-Command Invoke-JDNotificationDispatcher -ErrorAction SilentlyContinue)){
        throw "Notification dispatcher is unavailable."
    }

    Invoke-JDNotificationDispatcher -MaxItems $BatchSize
}

function Get-JDNotificationManagerStatus {
    [CmdletBinding()]
    param()

    [pscustomobject]@{
        Runtime    = Get-JDNotificationRuntimeState
        Queue      = Get-JDNotificationQueue
        CheckedAt  = Get-Date
    }
}

function Stop-JDNotificationManager {
    [CmdletBinding()]
    param()

    Set-JDNotificationRuntimeState -Property Running -Value $false | Out-Null
    Set-JDNotificationRuntimeState -Property LastHeartbeat -Value (Get-Date) | Out-Null

    Get-JDNotificationManagerStatus
}

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUmlgk9EIRjZrloalf+TvQ+8/L
# fwWgggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFBVcetIHDwVg1CONRud4t2q8
# KJZkMA0GCSqGSIb3DQEBAQUABIIBgHqGc4SkUS4At0k5uc9/j3cGQY3RRntQtbcq
# l7GMXXFuPLwoqvFTnGWXHt1s78dkcHo2GXuBb84501Hcgzqxe1AmEkgWvx7mvixR
# owM9bCPGlEF6Eg8Y7TyPGp35xUE7XE7S9ujw5PhRne7NGHhoh9f+85eTTxmFAc75
# lghsoSrW9+I5wNpKBCREEdEf1Gii/DF6Sgy4hh43JAR8uu9khlbTSpj4OI04jxGv
# kNL4VMphq2+7WTy03jSBcsm+CsIAvHEanQrpdOlwYfpxURLPlm3ybntBrL8+6XDz
# SU/bj/jnqUiz05yHFeASMew1osnRI5lHUO/7n+sNKxX4rP6vygla8VrpA/nv2MRV
# YHYJLVJ5m+5fTg9nDbJT7g1qXGCFNn0kkdbRioEQ6rZCUI9NcL2wY0RtpVrznoXH
# BxgKWEfQdtE0umAKJWnoeYDjXqcdY7Dz2eT/87TH1hB8yshwll44Pzk6mhL2Q6pq
# a2ebFJZK5XY18Qp2IlnHYxUZwoa//Q==
# SIG # End signature block
