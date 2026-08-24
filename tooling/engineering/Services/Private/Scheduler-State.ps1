<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Scheduler-State.ps1

Timestamp
10 July 2026 17:00

Work Package
WP-S001-04

Component
Scheduler Runtime

Purpose
Maintains the authoritative runtime state for the Operational Scheduler.

This module owns all Scheduler runtime state including execution cycles,
heartbeat, recovery statistics, queue metrics and execution metrics.

Scheduler execution logic is implemented elsewhere. This module owns state
only.

Dependencies
- Engineering-Common

Notes
- Private module
- Dot-sourced by Operational-ServiceHost.psm1
- Single authoritative Scheduler state owner

==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# INITIALISE SCHEDULER STATE
# ============================================================================

$existingState = Get-Variable `
    -Name JDSchedulerState `
    -Scope Script `
    -ErrorAction SilentlyContinue

if ($null -eq $existingState)
{
    $Script:JDSchedulerState = [PSCustomObject]@{

        Name                    = "JustDefenders Operational Scheduler"

        Version                 = "0.1.0"

        WorkPackage             = "WP-S001-04"

        Initialised             = $false

        Running                 = $false

        StartedAt               = $null

        StoppedAt               = $null

        LastHeartbeat           = $null

        LastCycleStarted        = $null

        LastCycleCompleted      = $null

        LastRecovery            = $null

        QueueDepth              = 0

        ActiveJobs              = 0

        Statistics = [PSCustomObject]@{

            CycleCount                  = 0

            SuccessfulCycles           = 0

            FailedCycles               = 0

            Executions                 = 0

            RecoveryEvents             = 0

            QueuePeak                  = 0

            AverageCycleMilliseconds   = 0

            LongestCycleMilliseconds   = 0

        }

    }
}

# ============================================================================
# GET SCHEDULER STATE
# ============================================================================

function Get-JDSchedulerState
{
    [CmdletBinding()]
    param()

    return $Script:JDSchedulerState
}

# ============================================================================
# RESET SCHEDULER STATE
# ============================================================================

function Reset-JDSchedulerState
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    $state.Initialised        = $false
    $state.Running            = $false

    $state.StartedAt          = $null
    $state.StoppedAt          = $null

    $state.LastHeartbeat      = $null

    $state.LastCycleStarted   = $null
    $state.LastCycleCompleted = $null

    $state.LastRecovery       = $null

    $state.QueueDepth         = 0
    $state.ActiveJobs         = 0

    $state.Statistics.CycleCount                = 0
    $state.Statistics.SuccessfulCycles          = 0
    $state.Statistics.FailedCycles              = 0
    $state.Statistics.Executions                = 0
    $state.Statistics.RecoveryEvents            = 0
    $state.Statistics.QueuePeak                 = 0
    $state.Statistics.AverageCycleMilliseconds  = 0
    $state.Statistics.LongestCycleMilliseconds  = 0

    return $state
}

# ============================================================================
# UPDATE HEARTBEAT
# ============================================================================

function Update-JDSchedulerHeartbeat
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    $state.LastHeartbeat = Get-Date

    return $state.LastHeartbeat
}

# ============================================================================
# START CYCLE
# ============================================================================

function Start-JDSchedulerCycle
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    $state.LastCycleStarted = Get-Date

    $state.Statistics.CycleCount++

    return $state.LastCycleStarted
}

# ============================================================================
# COMPLETE CYCLE
# ============================================================================

function Complete-JDSchedulerCycle
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    $completed = Get-Date

    $state.LastCycleCompleted = $completed

    if($null -ne $state.LastCycleStarted)
    {
        $duration =
            ($completed - $state.LastCycleStarted).TotalMilliseconds

        if($state.Statistics.AverageCycleMilliseconds -eq 0)
        {
            $state.Statistics.AverageCycleMilliseconds = $duration
        }
        else
        {
            $count = $state.Statistics.SuccessfulCycles

            $state.Statistics.AverageCycleMilliseconds =
                (
                    (
                        $state.Statistics.AverageCycleMilliseconds * $count
                    ) + $duration
                ) / ($count + 1)
        }

        if($duration -gt $state.Statistics.LongestCycleMilliseconds)
        {
            $state.Statistics.LongestCycleMilliseconds =
                $duration
        }
    }

    $state.Statistics.SuccessfulCycles++

    return $completed
}

# ============================================================================
# RECORD EXECUTION
# ============================================================================

function Record-JDSchedulerExecution
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    $state.Statistics.Executions++

    return $state.Statistics.Executions
}

# ============================================================================
# RECORD FAILURE
# ============================================================================

function Record-JDSchedulerFailure
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    $state.Statistics.FailedCycles++

    return $state.Statistics.FailedCycles
}

# ============================================================================
# UPDATE QUEUE DEPTH
# ============================================================================

function Update-JDSchedulerQueueDepth
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateRange(0,[int]::MaxValue)]
        [int]
        $Depth
    )

    $state = Get-JDSchedulerState

    $state.QueueDepth = $Depth

    if($Depth -gt $state.Statistics.QueuePeak)
    {
        $state.Statistics.QueuePeak = $Depth
    }

    return $state.QueueDepth
}

# ============================================================================
# RECORD RECOVERY
# ============================================================================

function Record-JDSchedulerRecovery
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    $state.LastRecovery = Get-Date

    $state.Statistics.RecoveryEvents++

    return $state.LastRecovery
}

# ============================================================================
# GET STATISTICS
# ============================================================================

function Get-JDSchedulerStatistics
{
    [CmdletBinding()]
    param()

    return (Get-JDSchedulerState).Statistics
}

# ============================================================================
# GET METRICS
# ============================================================================

function Get-JDSchedulerMetrics
{
    [CmdletBinding()]
    param()

    $state = Get-JDSchedulerState

    [PSCustomObject]@{

        Name =
            $state.Name

        Version =
            $state.Version

        Running =
            $state.Running

        Initialised =
            $state.Initialised

        QueueDepth =
            $state.QueueDepth

        ActiveJobs =
            $state.ActiveJobs

        CycleCount =
            $state.Statistics.CycleCount

        SuccessfulCycles =
            $state.Statistics.SuccessfulCycles

        FailedCycles =
            $state.Statistics.FailedCycles

        Executions =
            $state.Statistics.Executions

        RecoveryEvents =
            $state.Statistics.RecoveryEvents

        AverageCycleMilliseconds =
            $state.Statistics.AverageCycleMilliseconds

        LongestCycleMilliseconds =
            $state.Statistics.LongestCycleMilliseconds

        LastHeartbeat =
            $state.LastHeartbeat

        LastCycleStarted =
            $state.LastCycleStarted

        LastCycleCompleted =
            $state.LastCycleCompleted

        LastRecovery =
            $state.LastRecovery

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
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUK4FDLYwFzKyMOXmCLzZ9+CWf
# rkmgggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFPXNdCCdANp2ZkamX6EI7ebL
# 1lsyMA0GCSqGSIb3DQEBAQUABIIBgJajDfoIgdCL9dFSR8hDXR1tIjPhmxnTWthr
# tgAV+SQ3zjCSX2aXT0ntp8PS3DyW7nYBY1Gy7QTRe0BqUN+F/7JH3V01ryf2xnpb
# pPw+7yi62E+V98uzcbX4DI9CsxN85XAjYRxzguEiHqPfikuZnc9X/oI0rsEMdqSX
# T6MHI0g1cQlo3SmKCBKboVuG8tzU7vPuZmNa6HgVI4wsCp6vEAwAAjfp5Q/2Imkf
# +FuTzPSo8CQdtzpFvI7QgYOwwL9cArKqPVqjZ6uGxk6z8a8OFWK88uJPAyK62sPc
# Eax+qe3tVXdkTIYYobY53MLjmA8/7J31Uy8I1IohvaWRloHTll9yWPW5tjzKIH6+
# 44aEzOFyHoMIKoN5YrxtglDkUa3buSuOC3zDbVnvqXBigEqCiqCSLMVdCBzErMyq
# 4igO0yinaV7/dLjzYL72LRDvSbbvgDvcq3Ugl/+mVTVDNI5LN+oc5JIzluLywHcf
# wNUMsn0hV7UZ3jRN1fPHjkVt/J/BSg==
# SIG # End signature block
