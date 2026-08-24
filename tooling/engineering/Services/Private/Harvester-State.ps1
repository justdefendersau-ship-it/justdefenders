<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Harvester-State.ps1

Timestamp
10 July 2026 18:15

Work Package
WP-S002-01

Component
Harvester Runtime

Purpose
Maintains the authoritative runtime state for the JustDefenders Harvester
Runtime.

This module is the single owner of all Harvester runtime state. No other
component may directly own or persist Harvester lifecycle information.

Responsibilities

    • Runtime lifecycle
    • Runtime health
    • Runtime statistics
    • Queue summary
    • Runtime configuration
    • Current execution state

Dependencies

    • Engineering-Common

Notes

    • Private module
    • Dot-sourced by Harvester Runtime
    • Contains no harvesting logic
    • Contains no scheduler logic
==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# INITIALISE HARVESTER STATE
# ============================================================================

$existingState = Get-Variable `
    -Name JDHarvesterState `
    -Scope Script `
    -ErrorAction SilentlyContinue

if ($null -eq $existingState)
{
    $Script:JDHarvesterState = [PSCustomObject]@{

        Name                = "JustDefenders Harvester Runtime"

        Version             = "0.1.0"

        WorkPackage         = "WP-S002-01"

        Initialised         = $false

        Running             = $false

        Paused              = $false

        Stopping            = $false

        HealthState         = "UNKNOWN"

        StartedAt           = $null

        StoppedAt           = $null

        LastRun             = $null

        LastSuccessfulRun   = $null

        LastFailure         = $null

        LastHeartbeat       = $null

        LastHealthCheck     = $null

        CurrentJob          = $null

        CurrentSource       = $null

        CurrentPhase        = $null

        Queue = [PSCustomObject]@{

            QueueDepth      = 0

            ActiveWorkers   = 0

        }

        Configuration = [PSCustomObject]@{

            CrawlIntervalSeconds = 300

            MaxWorkers           = 2

            BatchSize            = 100

            RetryLimit           = 3

        }

        Statistics = [PSCustomObject]@{

            CrawlCount                  = 0

            SchedulerExecutions         = 0

            DocumentsDiscovered         = 0

            DocumentsProcessed          = 0

            DocumentsInserted           = 0

            DocumentsUpdated            = 0

            DuplicatesSkipped           = 0

            FailedDocuments             = 0

            RetryCount                  = 0

            AverageRunMilliseconds      = 0

            LongestRunMilliseconds      = 0

        }

    }
}

# ============================================================================
# GET HARVESTER STATE
# ============================================================================

function Get-JDHarvesterState
{
    [CmdletBinding()]
    param()

    #
    # Diagnostics
    #

    Write-JDHarvesterStateSnapshot `
        -Event "StateRetrieved" `
        -State $Script:JDHarvesterState

    return $Script:JDHarvesterState
}

# ============================================================================
# RESET HARVESTER STATE
# ============================================================================

function Reset-JDHarvesterState
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    $state.Initialised = $false

    $state.Running = $false

    $state.Paused = $false

    $state.Stopping = $false

    $state.HealthState = "UNKNOWN"

    $state.StartedAt = $null

    $state.StoppedAt = $null

    $state.LastRun = $null

    $state.LastSuccessfulRun = $null

    $state.LastFailure = $null

    $state.LastHeartbeat = $null

    $state.LastHealthCheck = $null

    $state.CurrentJob = $null

    $state.CurrentSource = $null

    $state.CurrentPhase = $null

    $state.Queue.QueueDepth = 0

    $state.Queue.ActiveWorkers = 0

    $state.Statistics.CrawlCount = 0

    $state.Statistics.SchedulerExecutions = 0

    $state.Statistics.DocumentsDiscovered = 0

    $state.Statistics.DocumentsProcessed = 0

    $state.Statistics.DocumentsInserted = 0

    $state.Statistics.DocumentsUpdated = 0

    $state.Statistics.DuplicatesSkipped = 0

    $state.Statistics.FailedDocuments = 0

    $state.Statistics.RetryCount = 0

    $state.Statistics.AverageRunMilliseconds = 0

    $state.Statistics.LongestRunMilliseconds = 0

        #
    # Diagnostics
    #

    Write-JDHarvesterStateSnapshot `
        -Event "StateReset" `
        -State $state

    return $state
}

# ============================================================================
# PART 1 END
# ============================================================================

# ============================================================================
# UPDATE HARVESTER HEARTBEAT
# ============================================================================

function Update-JDHarvesterHeartbeat
{
    [CmdletBinding()]
    param()

    $state.LastHeartbeat = Get-Date

#
# Diagnostics
#

Write-JDHarvesterStateSnapshot `
    -Event "HeartbeatUpdated" `
    -State $state

return $state.LastHeartbeat
}

# ============================================================================
# UPDATE HARVESTER HEALTH
# ============================================================================

function Update-JDHarvesterHealth
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateSet(
            "UNKNOWN",
            "HEALTHY",
            "DEGRADED",
            "FAILED"
        )]
        [string]
        $Health
    )

    $state = Get-JDHarvesterState

    $state.HealthState = $Health

$state.LastHealthCheck = Get-Date

#
# Diagnostics
#

Write-JDHarvesterStateSnapshot `
    -Event "HealthUpdated" `
    -State $state

return $state.HealthState
}

# ============================================================================
# START HARVESTER EXECUTION
# ============================================================================

function Start-JDHarvesterExecution
{
    [CmdletBinding()]
    param
    (
        [string]
        $Source,

        [string]
        $Phase = "Harvest"
    )

    $state = Get-JDHarvesterState

    $state.Running = $true

    $state.Paused = $false

    $state.Stopping = $false

    if ($null -eq $state.StartedAt)
    {
        $state.StartedAt = Get-Date
    }

    $state.LastRun = Get-Date

    $state.CurrentSource = $Source

    $state.CurrentPhase = $Phase

    $state.Statistics.SchedulerExecutions++

    Update-JDHarvesterHeartbeat | Out-Null

#
# Diagnostics
#

Write-JDHarvesterStateSnapshot `
    -Event "ExecutionStarted" `
    -State $state

return $state
}

# ============================================================================
# COMPLETE HARVESTER EXECUTION
# ============================================================================

function Complete-JDHarvesterExecution
{
    [CmdletBinding()]
    param
    (
        [int]
        $ElapsedMilliseconds = 0
    )

    $state = Get-JDHarvesterState

    $state.LastSuccessfulRun = Get-Date

    $state.CurrentPhase = "Idle"

    $state.CurrentJob = $null

    $state.CurrentSource = $null

    if ($ElapsedMilliseconds -gt
        $state.Statistics.LongestRunMilliseconds)
    {
        $state.Statistics.LongestRunMilliseconds =
            $ElapsedMilliseconds
    }

    if ($state.Statistics.CrawlCount -eq 0)
    {
        $state.Statistics.AverageRunMilliseconds =
            $ElapsedMilliseconds
    }
    else
    {
        $total =
            $state.Statistics.AverageRunMilliseconds *
            $state.Statistics.CrawlCount

        $total += $ElapsedMilliseconds

        $state.Statistics.AverageRunMilliseconds =
            [math]::Round(
                $total /
                ($state.Statistics.CrawlCount + 1),
                2
            )
    }

    $state.Statistics.CrawlCount++

    Update-JDHarvesterHeartbeat | Out-Null

#
# Diagnostics
#

Write-JDHarvesterStateSnapshot `
    -Event "ExecutionCompleted" `
    -State $state

return $state
}

# ============================================================================
# RECORD HARVESTER FAILURE
# ============================================================================

function Register-JDHarvesterFailure
{
    [CmdletBinding()]
    param
    (
        [string]
        $Reason
    )

    $state = Get-JDHarvesterState

    $state.LastFailure = Get-Date

    $state.HealthState = "FAILED"

    $state.CurrentPhase = "Failed"

    $state.Statistics.FailedDocuments++

    Write-JDEngineeringLog `
    -Level Warning `
    -Message ("Harvester failure: {0}" -f $Reason)

#
# Diagnostics
#

Write-JDHarvesterStateSnapshot `
    -Event "ExecutionFailed" `
    -State $state

return $state
}

# ============================================================================
# GET HARVESTER STATISTICS
# ============================================================================

function Get-JDHarvesterStatistics
{
    [CmdletBinding()]
    param()

    return (Get-JDHarvesterState).Statistics
}

# ============================================================================
# RESET HARVESTER STATISTICS
# ============================================================================

function Reset-JDHarvesterStatistics
{
    [CmdletBinding()]
    param()

    $stats = (Get-JDHarvesterState).Statistics

    $stats.CrawlCount = 0

    $stats.SchedulerExecutions = 0

    $stats.DocumentsDiscovered = 0

    $stats.DocumentsProcessed = 0

    $stats.DocumentsInserted = 0

    $stats.DocumentsUpdated = 0

    $stats.DuplicatesSkipped = 0

    $stats.FailedDocuments = 0

    $stats.RetryCount = 0

    $stats.AverageRunMilliseconds = 0

    $stats.LongestRunMilliseconds = 0

    return $stats
}

# ============================================================================
# PART 2 END
# ============================================================================

# ============================================================================
# GET HARVESTER CONFIGURATION
# ============================================================================

function Get-JDHarvesterConfiguration
{
    [CmdletBinding()]
    param()

    return (Get-JDHarvesterState).Configuration
}

# ============================================================================
# SET HARVESTER CONFIGURATION
# ============================================================================

function Set-JDHarvesterConfiguration
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [hashtable]
        $Configuration
    )

    $config = (Get-JDHarvesterState).Configuration

    foreach($key in $Configuration.Keys)
    {
        if($config.PSObject.Properties.Match($key).Count -gt 0)
        {
            $config.$key = $Configuration[$key]
        }
    }

    return $config
}

# ============================================================================
# GET HARVESTER QUEUE
# ============================================================================

function Get-JDHarvesterQueue
{
    [CmdletBinding()]
    param()

    return (Get-JDHarvesterState).Queue
}

# ============================================================================
# SET HARVESTER QUEUE DEPTH
# ============================================================================

function Set-JDHarvesterQueueDepth
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateRange(0,[int]::MaxValue)]
        [int]
        $QueueDepth
    )

    $queue = (Get-JDHarvesterState).Queue

    $queue.QueueDepth = $QueueDepth

#
# Diagnostics
#

Write-JDHarvesterStateSnapshot `
    -Event "QueueDepthUpdated" `
    -State $state

    return $queue
}

# ============================================================================
# SET ACTIVE WORKERS
# ============================================================================

function Set-JDHarvesterActiveWorkers
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateRange(0,[int]::MaxValue)]
        [int]
        $ActiveWorkers
    )

    $queue = (Get-JDHarvesterState).Queue

    $queue.ActiveWorkers = $ActiveWorkers

#
# Diagnostics
#

Write-JDHarvesterStateSnapshot `
    -Event "ActiveWorkersUpdated" `
    -State $state

    return $queue
}

# ============================================================================
# GET HARVESTER RUNTIME SUMMARY
# ============================================================================

function Get-JDHarvesterRuntimeSummary
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

$summary = [PSCustomObject]@{

        Name =
            $state.Name

        Version =
            $state.Version

        WorkPackage =
            $state.WorkPackage

        Running =
            $state.Running

        Paused =
            $state.Paused

        Initialised =
            $state.Initialised

        Health =
            $state.HealthState

        CurrentSource =
            $state.CurrentSource

        CurrentPhase =
            $state.CurrentPhase

        QueueDepth =
    $State.Queue.QueueDepth

        ActiveWorkers =
    $State.Queue.ActiveWorkers

        CrawlCount =
    $State.Statistics.CrawlCount

        DocumentsProcessed =
    $State.Statistics.DocumentsProcessed

        DocumentsInserted =
    $State.Statistics.DocumentsInserted

        FailedDocuments =
    $State.Statistics.FailedDocuments

        LastRun =
            $state.LastRun

        LastSuccessfulRun =
            $state.LastSuccessfulRun

        LastHeartbeat =
            $state.LastHeartbeat

        Timestamp =
            Get-Date

       }

    #
    # Diagnostics
    #

    Write-JDHarvesterSummarySnapshot `
        -Event "RuntimeSummaryRequested" `
        -Summary $summary

    return $summary
}

# ============================================================================
# INITIALISE HARVESTER
# ============================================================================

function Initialize-JDHarvesterState
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    if($state.Initialised)
    {
        return $state
    }

    $state.Initialised = $true

    $state.HealthState = "HEALTHY"

    $state.CurrentPhase = "Idle"

    Update-JDHarvesterHeartbeat | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Runtime initialised."

    return $state
}

# ============================================================================
# STOP HARVESTER
# ============================================================================



# ============================================================================
# ASSERT HARVESTER READY
# ============================================================================
function Assert-JDHarvesterReady
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    if ($null -eq $state)
    {
        throw "Harvester runtime state has not been initialised."
    }

    if (-not $state.Initialised)
    {
        Initialize-JDHarvesterState | Out-Null
        $state = Get-JDHarvesterState
    }

    Update-JDHarvesterHeartbeat | Out-Null

    if ($state.HealthState -eq "UNKNOWN")
    {
        Update-JDHarvesterHealth -Health "HEALTHY" | Out-Null
    }

    return $true
}

function Stop-JDHarvesterState
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    $state.Running = $false

    $state.Paused = $false

    $state.Stopping = $false

    $state.StoppedAt = Get-Date

    $state.CurrentJob = $null

    $state.CurrentSource = $null

    $state.CurrentPhase = "Stopped"

    Update-JDHarvesterHeartbeat | Out-Null

    return $state
}

# ============================================================================
# END OF FILE
# ============================================================================
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUN9b9DrLqSzmbOAxtjuPCR9+m
# 2FagggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFMpa6v9eHXSVR4IQK7RX3ROw
# u7H/MA0GCSqGSIb3DQEBAQUABIIBgIZQdvieH2e66EdxJ3/A1uBz7+frzwa0vFgJ
# ihNuI8HALUZWUnDXYHbbwpeEHkgXPd8tMYASqtzxz34XdqVNDvyDBUDaspqmyNuv
# 0APvpH2OSTym/2F/17Qlqp8e6IECFgSPpPKjhBzxc4TEX4QegVqW0ViCk03FIoaX
# 3JrK2gIcaz38oVjfnDNorrfawAVEuunPBKv3AXJ/MmwxPTaF7tSlCdSLRZABoor/
# dskZw4cA1bBAK9pgQ4OfzK7NUmfBbl4uRECciWWZ0/sil40mQ6H3cRV9Uh8LoO/V
# Uj2C4Yk2qwaIqMyl/6fwVks7b263iwyg6OdYKIS1CRpm33PyQIkzbrKKgAS2mx73
# bxnBuPftEKw9TZsygAU4EG1jwe/s5YhJk4pBpy64tKAnz15y/E1j7XA4nhHzQftV
# P9/lk8xd/BTWAZQiyD365htHZW5HQ0qcmsl48//0wP1MocaWzRpbIYpbnnB/uts5
# rZchEy998Idh7qGj266VLt7/BihpfQ==
# SIG # End signature block
