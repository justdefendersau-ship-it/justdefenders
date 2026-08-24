<#
==============================================================================
JustDefenders Â©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-Scheduler.ps1

Timestamp
10 July 2026 17:20

Work Package
WP-S001-04

Component
Operational Scheduler Runtime

Purpose
Provides scheduler orchestration for the Operational Service Host.

This module coordinates scheduler lifecycle and delegates all scheduler
runtime state management to Scheduler-State.ps1.

Scheduler execution, queue management and recovery are orchestrated here,
while Scheduler-State.ps1 remains the single authoritative owner of all
scheduler runtime state.

Dependencies
- Host-State.ps1
- Scheduler-State.ps1
- Host-ServiceLookup.ps1
- Host-ServiceManager.ps1
- Host-ServiceValidation.ps1

Notes
- Private module
- Dot-sourced by Operational-ServiceHost.psm1
- Owns scheduler orchestration only
==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# INITIALISE SCHEDULER
# ============================================================================

function Initialize-JDHostScheduler
{
    [CmdletBinding()]
    param()

    $scheduler = Get-JDSchedulerState

    if($scheduler.Initialised)
    {
        return $scheduler
    }

    $scheduler.Initialised = $true

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Scheduler initialised."

    return $scheduler
}

# ============================================================================
# START SCHEDULER
# ============================================================================

function Start-JDHostScheduler
{
    [CmdletBinding()]
    param()

    Assert-JDHostRunning

    $scheduler = Initialize-JDHostScheduler

    if($scheduler.Running)
    {
        return $scheduler
    }

    $scheduler.Running = $true

    $scheduler.StartedAt = Get-Date

    $scheduler.StoppedAt = $null

    Update-JDSchedulerHeartbeat | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Scheduler started."

    return $scheduler
}

# ============================================================================
# STOP SCHEDULER
# ============================================================================

function Stop-JDHostScheduler
{
    [CmdletBinding()]
    param()

    $scheduler = Get-JDSchedulerState

    if(-not $scheduler.Running)
    {
        return $scheduler
    }

    $scheduler.Running = $false

    $scheduler.StoppedAt = Get-Date

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Scheduler stopped."

    return $scheduler
}

# ============================================================================
# GET SCHEDULER STATUS
# ============================================================================

function Get-JDHostSchedulerStatus
{
    [CmdletBinding()]
    param()

    $scheduler = Get-JDSchedulerState

    [PSCustomObject]@{

        Name =
            $scheduler.Name

        Version =
            $scheduler.Version

        Running =
            $scheduler.Running

        Initialised =
            $scheduler.Initialised

        QueueDepth =
            $scheduler.QueueDepth

        ActiveJobs =
            $scheduler.ActiveJobs

        CycleCount =
            $scheduler.Statistics.CycleCount

        SuccessfulCycles =
            $scheduler.Statistics.SuccessfulCycles

        FailedCycles =
            $scheduler.Statistics.FailedCycles

        LastHeartbeat =
            $scheduler.LastHeartbeat

        StartedAt =
            $scheduler.StartedAt

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# INVOKE SCHEDULER CYCLE
# ============================================================================

function Invoke-JDHostSchedulerCycle
{
    [CmdletBinding()]
    param()

    Assert-JDHostRunning

    $scheduler = Get-JDSchedulerState

    if(-not $scheduler.Running)
    {
        return $false
    }

    Start-JDSchedulerCycle | Out-Null

    try
    {
        Update-JDSchedulerHeartbeat | Out-Null

        foreach($service in Get-JDHostEnabledServices)
        {
            if($service.RuntimeStatus.State -ne "RUNNING")
            {
                continue
            }

                        Invoke-JDHostServiceWork 
                -Name $service.Name | Out-Null
Record-JDSchedulerExecution | Out-Null

            Write-JDEngineeringLog `
                -Level Verbose `
                -Message ("Scheduler executed [{0}]." -f $service.Name)
        }

        Complete-JDSchedulerCycle | Out-Null

        return $true
    }
    catch
    {
        Record-JDSchedulerFailure | Out-Null

        Write-JDEngineeringLog `
            -Level Error `
            -Message ("Scheduler cycle failed. {0}" -f $_.Exception.Message)

        throw
    }
}

# ============================================================================
# START ALL AUTO SERVICES
# ============================================================================

function Start-JDHostAutoServices
{
    [CmdletBinding()]
    param()

    Assert-JDHostRunning

    $started = 0

    foreach($service in Get-JDHostEnabledServices)
    {
        if($service.RuntimeStatus.State -eq "RUNNING")
        {
            continue
        }

        Start-JDHostService `
            -Name $service.Name | Out-Null

        $started++
    }

    Update-JDHostManagedServiceCount | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Scheduler started {0} service(s)." -f $started)

    return $started
}

# ============================================================================
# STOP ALL RUNNING SERVICES
# ============================================================================

function Stop-JDHostAllServices
{
    [CmdletBinding()]
    param()

    Assert-JDHostRunning

    $stopped = 0

    foreach($service in Get-JDHostServicesByState `
        -State "RUNNING")
    {
        Stop-JDHostService `
            -Name $service.Name | Out-Null

        $stopped++
    }

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Scheduler stopped {0} running service(s)." -f $stopped)

    return $stopped
}

# ============================================================================
# UPDATE QUEUE DEPTH
# ============================================================================

function Update-JDHostSchedulerQueueDepth
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateRange(0,[int]::MaxValue)]
        [int]
        $Depth
    )

    Update-JDSchedulerQueueDepth `
        -Depth $Depth | Out-Null

    return Get-JDHostSchedulerStatus
}

# ============================================================================
# RECORD SCHEDULER RECOVERY
# ============================================================================

function Invoke-JDHostSchedulerRecovery
{
    [CmdletBinding()]
    param()

    Record-JDSchedulerRecovery | Out-Null

    Write-JDEngineeringLog `
        -Level Warning `
        -Message "Operational Scheduler recovery recorded."

    return Get-JDHostSchedulerStatus
}

# ============================================================================
# GET SCHEDULER METRICS
# ============================================================================

function Get-JDHostSchedulerMetrics
{
    [CmdletBinding()]
    param()

    return Get-JDSchedulerMetrics
}

# ============================================================================
# END OF FILE
# ============================================================================

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUqbeXgAtscYWyv0NaDMqnyLOs
# B4+gggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFLdnYHTgU60WM+KSfO7qxQTo
# 36GZMA0GCSqGSIb3DQEBAQUABIIBgC/OggvNj2/TpwsDqDlSKJ8+mLskLk4OJGFe
# MbhkC6JRYTzKnKb/VHF9k1jM09MZT4s6z5eKJUt0IsOmqmCglLCukmZBj9fnww9D
# 3qtGNSxfTv31AGEhs+lLZCnWKCaUS975/lzABSiXcEYQCtNUZ0f9egI/vjKKTdWs
# K8lnx69qt1/2q6vQsGTCiZCflt1NpgHJEwRB3O2PkLCwbKSFwCxuROrrCV1UmF5o
# l1Zequqn6ySeoBor2wLrMTuKz5SP0ti7aRNH7ZIO8Z2GgczOIwYpDfb3FYwG1zuK
# yPf1QZZ7TNevBtBJ8Sn9gwiTn8CKTtdX7+S28sD6lE5Ps7FqDxbTtJmWl2PtBf3m
# JtVntXBx7ss6WyiZk+eWsX168FGZZU3KCzChAJzibpwslGSdYv0WPtHUuXEhyvg3
# plkc2TQP2/TOW3wAcJ/eohFqDjYZte+LPS1bSr9lK7pQl8GLj6JnDl7IH8+oABfI
# j2Nds3jofR4Cx7WReeBmOANc6eaj1Q==
# SIG # End signature block


