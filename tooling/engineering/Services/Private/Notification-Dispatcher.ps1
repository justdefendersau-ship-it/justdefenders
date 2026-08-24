<#
JustDefenders© Engineering Library
PR-011.1 Runtime Fix Pack
Component: RT-3 Notification-Dispatcher
Timestamp: 1 August 2026, 06:35

Engineering Fixes
-----------------
* StrictMode-safe dependency checks.
* Queue acquisition through Get-JDNotificationQueue.
* Defensive runtime updates.
* Private module - no Export-ModuleMember.
#>

Set-StrictMode -Version Latest

function Invoke-JDNotificationDispatcher {
    [CmdletBinding()]
    param(
        [int]$MaxItems = 100
    )

    if (-not (Get-Command Get-JDNotificationQueue -ErrorAction SilentlyContinue)) {
        throw "Notification queue runtime is unavailable."
    }

    $queue = Get-JDNotificationQueue
    $processed = 0
    $failed = 0

    while ($queue.Count -gt 0 -and $processed -lt $MaxItems) {

        $item = $queue.Dequeue()

        try {

            if (Get-Command Set-JDNotificationRuntimeState -ErrorAction SilentlyContinue) {

                $runtime = Get-JDNotificationRuntimeState

                Set-JDNotificationRuntimeState `
                    -Property Notifications `
                    -Value ($runtime.Notifications + 1) | Out-Null

                Set-JDNotificationRuntimeState `
                    -Property LastHeartbeat `
                    -Value (Get-Date) | Out-Null
            }

            $processed++
        }
        catch {

            $failed++

            if (Get-Command Get-JDNotificationRuntimeState -ErrorAction SilentlyContinue) {

                $runtime = Get-JDNotificationRuntimeState

                Set-JDNotificationRuntimeState `
                    -Property Errors `
                    -Value ($runtime.Errors + 1) | Out-Null
            }

            if (Get-Command Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
                Write-JDEngineeringLog -Level Error -Message $_.Exception.Message
            }
        }
    }

    [pscustomobject]@{
        Processed = $processed
        Failed    = $failed
        Remaining = $queue.Count
        Completed = Get-Date
    }
}

function Test-JDNotificationDispatcher {

    if (-not (Get-Command Get-JDNotificationRuntimeState -ErrorAction SilentlyContinue)) {
        throw "Notification runtime state is unavailable."
    }

    $runtime = Get-JDNotificationRuntimeState

    [pscustomobject]@{
        Healthy       = $runtime.Healthy
        Running       = $runtime.Running
        QueueDepth    = $runtime.QueueDepth
        LastHeartbeat = $runtime.LastHeartbeat
    }
}

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUVFp4flaO0r3Bpx8kELf8rhpU
# fJagggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFENJcr0nyCVPHrpnoL7zQh8j
# a+UZMA0GCSqGSIb3DQEBAQUABIIBgDrbUhRxQYpKQ1bYiPN3+bexxwql3WDktY5i
# Qupp/LrljeeS5jbLThwTQfghOb8dmzsKlbY+lhS6goDvH/s1s1hdK4SFLh3KWgOh
# D/bwO3IYF/Z1ObDehKnaPzOu/Dq+h0SUFtLV+Qbi1eE1CHysYpTiBCCtPII45tT6
# jXH9eV5XnQR3vPyoq/PqF648M8F1qSNB+HDcsjUhiDkXPaJ8Ycn/u7jjpC5sP9Uy
# kXHXP4Dq3p6PmG2+FfbhW5dUimhRfsCZknXsvUXvjmGosbfITa/7yHQLqCx8YOjF
# fLsupMozrs7qz8eke4lG6+Eq4TjW5uA/TzCwNz2BxgHFuSiIywWBtSZH66hO2sg4
# ijkZmkmNQ7b0j6LccN/ebJJ9lu/xjiAAyehaiPHYWwHGWaj5WjzHmUHWFqQNuH9L
# H3tRFqHzZJqzW9IKudTsgx3tSm7njc3HALVrmbFA+rwtoa4Mu5PMAggHGlDK4/28
# qMPjPOokiqxUCYQEvF9slpWn557evg==
# SIG # End signature block
