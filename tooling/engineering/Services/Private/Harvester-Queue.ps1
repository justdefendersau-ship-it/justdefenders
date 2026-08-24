<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Harvester-Queue.ps1

Timestamp
10 July 2026 18:55

Work Package
WP-S002-03

Component
Harvester Runtime

Purpose
Implements the authoritative Harvester work queue.

This module owns all queue operations for the Harvester Runtime.

Responsibilities

    • Queue initialisation
    • Enqueue work
    • Dequeue work
    • Queue statistics
    • Queue lifecycle

Dependencies

    • Harvester-State.ps1
    • Engineering-Common

Notes

    • Private module
    • Dot-sourced by Harvester Runtime
    • Owns all queue state
    • Contains no harvesting logic
    • Contains no scheduler logic

==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# INITIALISE QUEUE
# ============================================================================

$existingQueue = Get-Variable `
    -Name JDHarvesterQueue `
    -Scope Script `
    -ErrorAction SilentlyContinue

if(
    $null -eq $existingQueue -or
    $null -eq $Script:JDHarvesterQueue -or
    $Script:JDHarvesterQueue -isnot [System.Collections.Generic.Queue[object]]
)
{
    Write-JDEngineeringLog `
        -Level Warning `
        -Message "[PR-003F] Rebuilding invalid harvester queue."

    $Script:JDHarvesterQueue =
        [System.Collections.Generic.Queue[object]]::new()
}

Write-JDEngineeringLog `
    -Level Information `
    -Message ("[PR-003F] Queue initialised type: {0}" -f $Script:JDHarvesterQueue.GetType().FullName)

# ============================================================================
# GET QUEUE
# ============================================================================

function Get-JDHarvesterQueueState
{
    [CmdletBinding()]
    param()

    return $Script:JDHarvesterQueue
}

# ============================================================================
# CLEAR QUEUE
# ============================================================================

function Clear-JDHarvesterQueue
{
    [CmdletBinding()]
    param()

    $Script:JDHarvesterQueue.Clear()

    Set-JDHarvesterQueueDepth `
        -QueueDepth 0 | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Queue cleared."

    return $true
}

# ============================================================================
# ENQUEUE WORK ITEM
# ============================================================================

function Add-JDHarvesterQueueItem
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [pscustomobject]
        $Item
    )

    $queue = Get-JDHarvesterQueueState

    if(
        $null -eq $queue -or
        $queue -isnot [System.Collections.Generic.Queue[object]]
    )
    {
        Write-JDEngineeringLog `
            -Level Warning `
            -Message "[PR-003F] Queue getter returned an invalid object. Rebuilding queue."

        $Script:JDHarvesterQueue = [System.Collections.Generic.Queue[object]]::new()
        $queue = $Script:JDHarvesterQueue
    }

    Write-JDEngineeringLog `
    -Level Information `
    -Message ("[PR-003F] Queue variable null: {0}" -f ($null -eq $queue))

if($null -ne $queue)
{
    Write-JDEngineeringLog `
        -Level Information `
        -Message ("[PR-003F] Queue type: {0}" -f $queue.GetType().FullName)

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("[PR-003F] Count property: {0}" -f ($queue.PSObject.Properties.Name -contains 'Count'))

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("[PR-003F] Dequeue method: {0}" -f ($queue.PSObject.Methods.Name -contains 'Dequeue'))
}

    $queue.Enqueue($Item)

    Set-JDHarvesterQueueDepth `
        -QueueDepth $queue.Count | Out-Null

    Write-JDEngineeringLog `
        -Level Verbose `
        -Message ("Queued [{0}]." -f $Item.Source)

    return $queue.Count
}

# ============================================================================
# PART 1 END
# ============================================================================

# ============================================================================
# DEQUEUE WORK ITEM
# ============================================================================

function Remove-JDHarvesterQueueItem
{
    [CmdletBinding()]
    param()

    $queue = Get-JDHarvesterQueueState

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("[PR-003F] Remove queue type: {0}" -f $(if($null -eq $queue){"<null>"}else{$queue.GetType().FullName}))

    if($null -eq $queue)
    {
        throw "Harvester queue is null."
    }

    if($queue.Count -eq 0)
    {
        return $null
    }

    $item = $queue.Dequeue()

    Set-JDHarvesterQueueDepth `
        -QueueDepth $queue.Count | Out-Null

    Write-JDEngineeringLog `
        -Level Verbose `
        -Message ("Dequeued [{0}]." -f $item.Source)

    return $item
}

# ============================================================================
# PEEK NEXT WORK ITEM
# ============================================================================

function Get-JDHarvesterNextQueueItem
{
    [CmdletBinding()]
    param()

    $queue = Get-JDHarvesterQueueState

    if($queue.Count -eq 0)
    {
        return $null
    }

    return $queue.Peek()
}

# ============================================================================
# GET QUEUE COUNT
# ============================================================================

function Get-JDHarvesterQueueCount
{
    [CmdletBinding()]
    param()

    return (Get-JDHarvesterQueueState).Count
}

# ============================================================================
# TEST QUEUE EMPTY
# ============================================================================

function Test-JDHarvesterQueueEmpty
{
    [CmdletBinding()]
    param()

    $queue = Get-JDHarvesterQueueState

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("[PR-003F] Empty test queue type: {0}" -f $(if($null -eq $queue){"<null>"}else{$queue.GetType().FullName}))

    if($null -eq $queue)
    {
        return $true
    }

    return ($queue.Count -eq 0)
}

# ============================================================================
# GET QUEUE SNAPSHOT
# ============================================================================

function Get-JDHarvesterQueueSnapshot
{
    [CmdletBinding()]
    param()

    $queue = Get-JDHarvesterQueueState

    [PSCustomObject]@{

        QueueDepth =
            $queue.Count

        ActiveWorkers =
            (Get-JDHarvesterState).Queue.ActiveWorkers

        Items =
            @($queue.ToArray())

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# GET NEXT BATCH
# ============================================================================

function Get-JDHarvesterQueueBatch
{
    [CmdletBinding()]
    param
    (
        [Parameter()]
        [ValidateRange(1,1000)]
        [int]
        $BatchSize = 100
    )

    $batch = @()

    while(
        ($batch.Count -lt $BatchSize) -and
        (-not (Test-JDHarvesterQueueEmpty))
    )
    {
        $item = Remove-JDHarvesterQueueItem

        if($null -ne $item)
        {
            $batch += $item
        }
    }

    return $batch
}

# ============================================================================
# PART 2 END
# ============================================================================

# ============================================================================
# GET QUEUE METRICS
# ============================================================================

function Get-JDHarvesterQueueMetrics
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    $queue = Get-JDHarvesterQueueState

    [PSCustomObject]@{

        QueueDepth =
            $queue.Count

        ActiveWorkers =
            $state.Queue.ActiveWorkers

        CrawlCount =
            $state.Statistics.CrawlCount

        DocumentsProcessed =
            $state.Statistics.DocumentsProcessed

        DocumentsInserted =
            $state.Statistics.DocumentsInserted

        FailedDocuments =
            $state.Statistics.FailedDocuments

        RetryCount =
            $state.Statistics.RetryCount

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# RETRY WORK ITEM
# ============================================================================

function Add-JDHarvesterRetryItem
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [pscustomobject]
        $Item
    )

    $state = Get-JDHarvesterState

    $state.Statistics.RetryCount++

    Add-JDHarvesterQueueItem `
        -Item $Item | Out-Null

    Write-JDEngineeringLog `
        -Level Warning `
        -Message ("Retry queued [{0}]." -f $Item.Source)

    return $true
}

# ============================================================================
# RESET QUEUE
# ============================================================================

function Reset-JDHarvesterQueue
{
    [CmdletBinding()]
    param()

    Clear-JDHarvesterQueue | Out-Null

    Set-JDHarvesterActiveWorkers `
        -ActiveWorkers 0 | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Queue reset."

    return Get-JDHarvesterQueueSnapshot
}

# ============================================================================
# VALIDATE QUEUE
# ============================================================================

function Test-JDHarvesterQueue
{
    [CmdletBinding()]
    param()

    $queue = Get-JDHarvesterQueueState

    if($null -eq $queue)
    {
        return $false
    }

    if($queue.Count -lt 0)
    {
        return $false
    }

    return $true
}

# ============================================================================
# GET QUEUE SUMMARY
# ============================================================================

function Get-JDHarvesterQueueSummary
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    $queue = Get-JDHarvesterQueueState

    [PSCustomObject]@{

        QueueDepth =
            $queue.Count

        ActiveWorkers =
            $state.Queue.ActiveWorkers

        Empty =
            ($queue.Count -eq 0)

        Healthy =
            (Test-JDHarvesterQueue)

        CrawlCount =
            $state.Statistics.CrawlCount

        RetryCount =
            $state.Statistics.RetryCount

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
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUTUmMWGGrArfFOPEm/K5djptT
# 4zKgggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFAbV4xsUBYP5+oEUEOdVyz4B
# /A3NMA0GCSqGSIb3DQEBAQUABIIBgJ9OByAJ+eLIyb4kjVWLj/6gbcMYR4331hsE
# v1hwdcaRbfWxpVGe19B3b4oCTZ890r9m1VfLBZpPlEq85/WRydSv4Tiaid44N/qO
# NMtKyVSZvmO7/+pMjgOiuulUWj8kImRdyru/7TomyrrtwBlI17N5Ud+mZ61Y54gu
# ruwNbKjZ2z/Sdjp1Ja4mr4k5W/51pn7uByAgN2VZpmO7M+FTdrE21yuGZ0grj9UB
# 39XXmdw4r9tQ/nof3LLUC/QkL6pIfFONLFnW+3xPt8LuxaHxBLJtAqjK6qNQA8Nw
# ZWjFUI4olaG6H//Y/CJl5coikVda0AYkIyzeuzoRIEy5RZudPbGybtNhz2VeekHD
# +/YcL/40UYPquKdybXmsZXCtkJkXTHdx/Eb+nNRcot7pDhERJG3XizgWSPHzM/H9
# JdSPcPorULYRYUHcAfONBnZ0rvPjOOU+2Pc8nF7UZrKY7wYuTZK3+9V5FmhEkIZY
# DejnB2eDl84ghTGq/0ZKrxyr6+VExA==
# SIG # End signature block
