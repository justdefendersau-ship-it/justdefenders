<#
JustDefenders© Engineering Library
PR-011.1 Runtime Fix Pack
Component: RT-1 Notification-State
Timestamp: 1 August 2026, 06:16

Engineering Fixes
-----------------
- StrictMode-safe runtime initialisation.
- Removed Export-ModuleMember from private module.
- Preserved runtime API.
#>


<#
JustDefenders© Engineering Library
PR-011 – Notification Managed Service Recovery
Runtime Component: RT-1
File: tooling\engineering\Services\Private\Notification-State.ps1
Timestamp: 31 July 2026, 21:55

Purpose:
    Maintains the in-memory runtime state for the Notification managed
    service. This module is the canonical state store used by the
    Notification runtime components.
#>

Set-StrictMode -Version Latest

if (-not (Get-Variable -Name JDNotificationRuntime -Scope Script -ErrorAction SilentlyContinue)) {
    $script:JDNotificationRuntime = [ordered]@{
        Service       = 'Notification'
        Initialised   = $false
        Running       = $false
        Healthy       = $true
        Version       = '1.0.0'
        StartedAt     = $null
        LastHeartbeat = $null
        QueueDepth    = 0
        Notifications = 0
        Errors        = 0
        Lock          = New-Object object
        Context       = @{}
    }
}

function Get-JDNotificationRuntimeState {
    [CmdletBinding()]
    param()

    return [pscustomobject]$script:JDNotificationRuntime
}

function Initialize-JDNotificationRuntimeState {
    [CmdletBinding()]
    param()

    [System.Threading.Monitor]::Enter($script:JDNotificationRuntime.Lock)
    try {
        $script:JDNotificationRuntime.Initialised = $true
        $script:JDNotificationRuntime.Running = $false
        $script:JDNotificationRuntime.Healthy = $true
        $script:JDNotificationRuntime.StartedAt = $null
        $script:JDNotificationRuntime.LastHeartbeat = Get-Date
        $script:JDNotificationRuntime.QueueDepth = 0
        $script:JDNotificationRuntime.Notifications = 0
        $script:JDNotificationRuntime.Errors = 0
        $script:JDNotificationRuntime.Context = @{}
    }
    finally {
        [System.Threading.Monitor]::Exit($script:JDNotificationRuntime.Lock)
    }

    if (Get-Command Write-JDEngineeringLog -ErrorAction SilentlyContinue) {
        Write-JDEngineeringLog -Level Information -Message "Notification runtime state initialised."
    }

    return Get-JDNotificationRuntimeState
}

function Set-JDNotificationRuntimeState {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Property,

        [Parameter(Mandatory)]
        $Value
    )

    [System.Threading.Monitor]::Enter($script:JDNotificationRuntime.Lock)
    try {
        if (-not $script:JDNotificationRuntime.Contains($Property)) {
            throw "Unknown runtime property '$Property'."
        }

        $script:JDNotificationRuntime[$Property] = $Value
        $script:JDNotificationRuntime.LastHeartbeat = Get-Date
    }
    finally {
        [System.Threading.Monitor]::Exit($script:JDNotificationRuntime.Lock)
    }

    return Get-JDNotificationRuntimeState
}

function Reset-JDNotificationRuntimeState {
    [CmdletBinding()]
    param()

    $script:JDNotificationRuntime.Initialised = $false
    $script:JDNotificationRuntime.Running = $false
    $script:JDNotificationRuntime.QueueDepth = 0
    $script:JDNotificationRuntime.Notifications = 0
    $script:JDNotificationRuntime.Errors = 0
    $script:JDNotificationRuntime.Context = @{}

    return Get-JDNotificationRuntimeState
}

# Export-ModuleMember removed - private module is dot-sourced by Operational-ServiceHost.psm1
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQU/h/rpeHuMrZBDYBo1LxcCJIB
# 9EygggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFLyB6gzjXuJ2/cwh4Rq5IK6G
# bvNSMA0GCSqGSIb3DQEBAQUABIIBgB6NuMGKYwqhT9e1uE1FLOzbBpsE1W6ymgC/
# YIrw/4zfpclFJhawrA2iY1ou6NxvD3tWtPVd1giWwXp9AUluSDQzc8TaH3UOq/bX
# DFPV0r7DEfcNdr9FzJ5KPrB2NHrwMa545gBVBAPY5JkPgklwxM88I7smR2RLbPxZ
# q3hF28MyPzE+vic6wixw6ftt/RjDL/d2IR/8v3pRjkoXXl328bC8ISYw/TBa4l2n
# qJNHX7Rgke2TLBwyikXrLMeeWqm10oCn6FAVL8WHCwGrnRwU7Vr+PLMXIBEzOB6l
# St/RWZCKg2Bw9rFq9XhSJvzyKTPLLKwwQJcDTfK5wjqbPVodbDmXpglkrjjvIIoR
# OwYljMQdWUbnvdaCm9EY9ADQXJdcfMKrBqhSw1auGGcfi+xxIIkNYruzhT8ihgGb
# GDbRjSSYWPNRq8jx6fKfJoqA1+i087mQkcgSJtL2myoBzoqm6oTlfeJWIbnwsvHS
# NQjRGjCb3XdVpbgXtZwa5JYg94TO8Q==
# SIG # End signature block
