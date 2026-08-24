<#
JustDefenders© Engineering Library
PR-011.1 Runtime Fix Pack
Component: RT-5 Notification-Lifecycle
Timestamp: 1 August 2026, 06:55

Engineering Fixes
-----------------
* StrictMode-safe lifecycle operations.
* Defensive dependency validation.
* Idempotent start/stop/restart.
* Safe shutdown sequence.
* Private module (no Export-ModuleMember).
#>

Set-StrictMode -Version Latest

function Start-JDNotificationLifecycle {
    [CmdletBinding()]
    param()

    if (-not (Get-Command Initialize-JDNotificationManager -ErrorAction SilentlyContinue)) {
        throw "Notification Manager is unavailable."
    }

    Initialize-JDNotificationManager
}

function Stop-JDNotificationLifecycle {
    [CmdletBinding()]
    param()

    if (Get-Command Stop-JDNotificationManager -ErrorAction SilentlyContinue) {
        Stop-JDNotificationManager | Out-Null
    }

    if (Get-Command Clear-JDNotificationQueue -ErrorAction SilentlyContinue) {
        Clear-JDNotificationQueue | Out-Null
    }

    if (Get-Command Reset-JDNotificationRuntimeState -ErrorAction SilentlyContinue) {
        Reset-JDNotificationRuntimeState | Out-Null
    }

    [pscustomobject]@{
        Service = 'Notification'
        Status  = 'Stopped'
        Time    = Get-Date
    }
}

function Restart-JDNotificationLifecycle {
    [CmdletBinding()]
    param()

    Stop-JDNotificationLifecycle | Out-Null
    Start-JDNotificationLifecycle
}

function Invoke-JDNotificationHeartbeat {
    [CmdletBinding()]
    param()

    if (Get-Command Set-JDNotificationRuntimeState -ErrorAction SilentlyContinue) {
        Set-JDNotificationRuntimeState -Property LastHeartbeat -Value (Get-Date) | Out-Null
    }

    Get-JDNotificationRuntimeState
}

function Close-JDNotificationLifecycle {
    [CmdletBinding()]
    param()

    Stop-JDNotificationLifecycle
}

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUGoIFLTpCD4Ati5jI6zKWrjSU
# wSKgggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFEIj8ocdAy19TGt32HGOQHbU
# 4TSzMA0GCSqGSIb3DQEBAQUABIIBgKexI4LONw9NVLs6BTMBA5Pj/PtTuM/f9YZJ
# QNm4nS4DDIalEEY7J53DEzTI3U2lKSQJaV3Fxs0XW58YVAiGKhbfecKJKZ0lZEET
# NvmwV4XSRZaPGtRnp4uouSv3AGr6pu8A+qTceswxpQsd/FSigiPoOkGBp8bH496g
# IjcOJm03IPzPpGeE6hObRLRfoR2G78Aft+fiuYTqr0II0O2GtoiCZnlQ8pvv9kf+
# 9BEyZ9HgYO4rlAhP/C6e540tIBLIWnulH+UmO6kE73guqed4HMW2KqHj8DEJziSv
# jr8/lYCU/r4qgZZ4XuAOUzXnHRJkqGif5uMdWqgA3GbxIUW/6EFnLTLPky4We6/r
# ruWDPou22J2yz+aMzLvALmRYNh2dYRfbR7M2wH2BMgOP01wDgGqxjXwiZ21J+d3Q
# y1rctH9k/AaxejTNWi19NifGoAv5NuIFDX2MkJh7DHCrwsxLuDbP3kFHgpWI5lUq
# 7KK3JiMdtBaE8XBoDCue5NDWzyUOHA==
# SIG # End signature block
