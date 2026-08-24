<#
JustDefenders© Engineering Library
PR-011.1 Runtime Fix Pack
Component: RT-2 Notification-Queue
Timestamp: 1 August 2026, 06:25

Engineering Fixes
-----------------
* StrictMode-safe queue initialisation.
* Removed Export-ModuleMember from private module.
* Queue created only after existence check.
#>

Set-StrictMode -Version Latest

if (-not (Get-Variable -Name JDNotificationQueue -Scope Script -ErrorAction SilentlyContinue))
{
    $script:JDNotificationQueue = [System.Collections.Queue]::Synchronized(
        (New-Object System.Collections.Queue)
    )
}

function Get-JDNotificationQueue
{
    if (-not (Get-Variable -Name JDNotificationQueue -Scope Script -ErrorAction SilentlyContinue))
    {
        throw "Notification queue has not been initialised."
    }

    return $script:JDNotificationQueue
}

function Initialize-JDNotificationQueue
{
    if (-not (Get-Variable -Name JDNotificationQueue -Scope Script -ErrorAction SilentlyContinue))
    {
        $script:JDNotificationQueue = [System.Collections.Queue]::Synchronized(
            (New-Object System.Collections.Queue)
        )
    }

    while($script:JDNotificationQueue.Count -gt 0)
    {
        $null = $script:JDNotificationQueue.Dequeue()
    }

    if (Get-Command Set-JDNotificationRuntimeState -ErrorAction SilentlyContinue)
    {
        Set-JDNotificationRuntimeState -Property QueueDepth -Value 0 | Out-Null
    }

    return $script:JDNotificationQueue
}

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUlahHGhMjYGFhsMZ+dqn/ih9I
# 0DegggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFJ8NmPZgMKXJ8KE/4xPxAf7D
# mnovMA0GCSqGSIb3DQEBAQUABIIBgJIQWsK5Z/kn0PKgVhi8Kw65J/EXKTeJ0mLC
# SUF5FrVX5IfIds6MxTZ/He2nAbefEkQi0WAWhZDMxaKqtjhE7mUW+r+oCE1XTjuq
# OdlJHLERnubUjBKcaF2FJoxse3lmKd65gBJlpQh6WgxLl1fbb7sWbUtPAjizBYog
# oPlDEIVGqX7Rq1RZg6YsOSOoOwbVpXuxiYetG3sOIJ9Bs4P24plzxXfw+xuVQvI5
# eFDhGfPURDNyqiIgQalGlH53a1A+L6wzuwxKr0elyb4mjlmvAzRMTG4+pIQdkbeW
# 2iYmbsXoslHi6qZkqZuHwRJKvZT0JK6pejTaK3igvsTrZbyToxzv1+eNXw3JB9tg
# kq+avtsuufQ0a5/NglTyU2UrPveeEVLXFYyGw3Ww3xwn2FjU6DXhpaY35T/S/IJD
# Klwxp6X5oDZa14hur0m41HuX3AucUoiBc7CfoN51e9FOIN7Hie3k9bJKYSQMXi6n
# /tDGCnifHT4mypFEbKbRBosgQcuxTw==
# SIG # End signature block
