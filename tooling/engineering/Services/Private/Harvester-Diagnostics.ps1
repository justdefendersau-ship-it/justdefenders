
<#
==============================================================================
JustDefenders©

File
C:\dev\justdefenders\frontend\
tooling\
engineering\
Services\
Private\
Harvester-Diagnostics.ps1

Timestamp
13 July 2026 08:40

Work Package
WP-S005A-03A

Component
Harvester Diagnostics Framework

Purpose

Provides engineering diagnostics for the JustDefenders Harvester Runtime.

Responsibilities

    • Runtime diagnostics
    • Runtime state tracing
    • Runtime summary tracing
    • Invocation tracing
    • Object identity tracking

Notes

    • Internal module
    • Read-only diagnostics
    • Zero runtime side-effects.

==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# WRITE HARVESTER TRACE
# ============================================================================
#
# JustDefenders©
#
# Purpose
#
# Writes a structured engineering trace record when Harvester Diagnostics
# are enabled.
#
# Responsibilities
#
#   • Honour diagnostics enable/disable state.
#   • Build a consistent engineering trace record.
#   • Include execution context.
#   • Include correlation information.
#   • Forward output through the Engineering logging framework.
#
# Notes
#
#   • Produces NO runtime side-effects.
#   • Safe for production use.
#   • No-op when diagnostics are disabled.
#
# ============================================================================

function Write-JDHarvesterTrace
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Category,

        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Event,

        [Parameter()]
        [AllowNull()]
        [object]
        $State,

        [Parameter()]
        [hashtable]
        $Data = @{}
    )

    #
    # Diagnostics disabled
    #

    if (
        -not (Get-Variable `
            -Name JDHarvesterDiagnostics `
            -Scope Script `
            -ErrorAction SilentlyContinue)
    )
    {
        return
    }

    if (-not $Script:JDHarvesterDiagnostics.Enabled)
    {
        return
    }

    #
    # Build trace payload
    #

    $trace = [ordered]@{

        Timestamp =
            Get-Date

        SessionId =
            $Script:JDHarvesterDiagnostics.SessionId

        CorrelationId =
            $Script:JDHarvesterDiagnostics.CorrelationId

        Category =
            $Category

        Event =
            $Event

        Caller =
            $MyInvocation.InvocationName

        Command =
            $MyInvocation.MyCommand.Name

        Module =
            $MyInvocation.MyCommand.ModuleName

        Thread =
    [System.Threading.Thread]::CurrentThread.ManagedThreadId

RunspaceId =
    [System.Management.Automation.Runspaces.Runspace]::DefaultRunspace.InstanceId

    }

    #
    # Runtime State
    #

    if ($null -ne $State)
    {
        foreach ($property in @(
            "Running",
            "Initialised",
            "Paused",
            "HealthState",
            "CurrentPhase",
            "StartedAt",
            "StoppedAt",
            "LastHeartbeat"
        ))
        {
            if ($State.PSObject.Properties.Match($property).Count -gt 0)
            {
                $trace[$property] = $State.$property
            }
        }

        #
        # Runtime identity
        #

        try
        {
            $trace["ObjectIdentity"] =
    Get-JDHarvesterObjectIdentity `
        -InputObject $State

        }
        catch
        {
            $trace["ObjectIdentity"] = "Unavailable"
        }
    }

    #
    # Additional data
    #

    if ($null -ne $Data)
{
    foreach ($key in $Data.Keys)
    {
        $trace[$key] = $Data[$key]
    }
}

    
    #
    # Emit engineering log
    #

    $message =
        ($trace.GetEnumerator() |
            ForEach-Object {

                "{0}={1}" -f $_.Key,$_.Value

            }) -join "; "

#
# Update diagnostics statistics
#

$Script:JDHarvesterDiagnostics.TraceCount++

$Script:JDHarvesterDiagnostics.LastTrace =
    Get-Date


    Write-JDEngineeringLog `
        -Level Information `
        -Message "[TRACE] $message"

    return [PSCustomObject]$trace
}

# ============================================================================
# END FUNCTION
# ============================================================================

# ============================================================================
# ENABLE HARVESTER DIAGNOSTICS
# ============================================================================

function Enable-JDHarvesterDiagnostics
{
    [CmdletBinding()]
    param()

    $Script:JDHarvesterDiagnostics = [PSCustomObject]@{

        Enabled        = $true
        SessionId      = [guid]::NewGuid().Guid
        CorrelationId  = [guid]::NewGuid().Guid

        EnabledAt      = Get-Date
        DisabledAt     = $null

        TraceCount     = 0
        LastTrace      = $null

        TraceLevel     = "Information"

        Version        = "1.0.0-alpha"
        WorkPackage    = "WP-S005A-03A"

        CreatedBy      = $env:USERNAME
        ComputerName   = $env:COMPUTERNAME

    }

    Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Harvester Diagnostics enabled. Session [{0}]." -f
            $Script:JDHarvesterDiagnostics.SessionId
        )

    return $Script:JDHarvesterDiagnostics
}

# ============================================================================
# END FUNCTION
# ============================================================================

# ============================================================================
# DISABLE HARVESTER DIAGNOSTICS
# ============================================================================
#
# JustDefenders©
#
# Purpose
#
# Disables the Harvester Diagnostics Framework.
#
# ============================================================================

function Disable-JDHarvesterDiagnostics
{
    [CmdletBinding()]
    param()

    if (
        -not (Get-Variable `
            -Name JDHarvesterDiagnostics `
            -Scope Script `
            -ErrorAction SilentlyContinue)
    )
    {
        return $null
    }

    if (-not $Script:JDHarvesterDiagnostics.Enabled)
    {
        return $Script:JDHarvesterDiagnostics
    }

    $Script:JDHarvesterDiagnostics.Enabled = $false

    $Script:JDHarvesterDiagnostics.DisabledAt =
        Get-Date

    Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Harvester Diagnostics disabled. Session [{0}] completed with {1} trace(s)." -f
            $Script:JDHarvesterDiagnostics.SessionId,
            $Script:JDHarvesterDiagnostics.TraceCount
        )

    return $Script:JDHarvesterDiagnostics
}

# ============================================================================
# END FUNCTION
# ============================================================================

# ============================================================================
# GET HARVESTER DIAGNOSTICS STATUS
# ============================================================================
#
# JustDefenders©
#
# Purpose
#
# Returns the current status of the Harvester Diagnostics Framework.
#
# Responsibilities
#
#   • Report whether diagnostics are enabled.
#   • Report the current diagnostics session.
#   • Report diagnostics statistics.
#   • Never modify diagnostics state.
#
# Notes
#
#   • Read-only.
#   • Safe to call at any time.
#
# ============================================================================

function Get-JDHarvesterDiagnosticsStatus
{
    [CmdletBinding()]
    param()

    #
    # Diagnostics not initialised
    #

    if (
        -not (Get-Variable `
            -Name JDHarvesterDiagnostics `
            -Scope Script `
            -ErrorAction SilentlyContinue)
    )
    {
        return [PSCustomObject]@{

            Enabled =
                $false

            Initialised =
                $false

            Timestamp =
                Get-Date

        }
    }

    return [PSCustomObject]@{

        Enabled =
            $Script:JDHarvesterDiagnostics.Enabled

        Initialised =
            $true

        SessionId =
            $Script:JDHarvesterDiagnostics.SessionId

        CorrelationId =
            $Script:JDHarvesterDiagnostics.CorrelationId

        EnabledAt =
            $Script:JDHarvesterDiagnostics.EnabledAt

        DisabledAt =
            $Script:JDHarvesterDiagnostics.DisabledAt

        TraceCount =
            $Script:JDHarvesterDiagnostics.TraceCount

        LastTrace =
            $Script:JDHarvesterDiagnostics.LastTrace

        TraceLevel =
            $Script:JDHarvesterDiagnostics.TraceLevel

        Version =
            $Script:JDHarvesterDiagnostics.Version

        WorkPackage =
            $Script:JDHarvesterDiagnostics.WorkPackage

        CreatedBy =
            $Script:JDHarvesterDiagnostics.CreatedBy

        ComputerName =
            $Script:JDHarvesterDiagnostics.ComputerName

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END FUNCTION
# ============================================================================

# ============================================================================
# GET HARVESTER OBJECT IDENTITY
# ============================================================================
#
# JustDefenders©
#
# Purpose
#
# Returns a stable engineering identity for a PowerShell object during the
# current process lifetime.
#
# Responsibilities
#
#   • Safely handle null objects.
#   • Return a consistent object identity.
#   • Provide a standard hexadecimal identifier.
#   • Never throw an exception.
#
# Notes
#
#   • Object identities are only valid for the current PowerShell process.
#   • Used exclusively for engineering diagnostics.
#
# ============================================================================

function Get-JDHarvesterObjectIdentity
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory = $false)]
        [AllowNull()]
        [object]
        $InputObject
    )

    #
    # Null object
    #

    if ($null -eq $InputObject)
    {
        return "NULL"
    }

    #
    # Calculate runtime identity
    #

    try
    {
        $identity =
            [System.Runtime.CompilerServices.RuntimeHelpers]::GetHashCode(
                $InputObject
            )

        return ("0x{0:X8}" -f $identity)
    }
    catch
    {
        return "UNAVAILABLE"
    }
}

# ============================================================================
# END FUNCTION
# ============================================================================

# ============================================================================
# WRITE HARVESTER STATE SNAPSHOT
# ============================================================================
#
# JustDefenders©
#
# Purpose
#
# Records a structured snapshot of the current Harvester Runtime state for
# engineering diagnostics.
#
# Responsibilities
#
#   • Capture the authoritative runtime state.
#   • Build a consistent diagnostics payload.
#   • Delegate trace output to Write-JDHarvesterTrace.
#   • Never modify runtime state.
#
# Notes
#
#   • Read-only helper.
#   • Safe to call repeatedly.
#   • No-op when diagnostics are disabled.
#
# ============================================================================

function Write-JDHarvesterStateSnapshot
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Event,

        [Parameter(Mandatory)]
        [object]
        $State
    )

    if ($null -eq $State)
    {
        return
    }

    Write-JDHarvesterTrace `
        -Category "RuntimeState" `
        -Event $Event `
        -State $State `
        -Data @{

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

        }
}

# ============================================================================
# END FUNCTION
# ============================================================================

# ============================================================================
# WRITE HARVESTER SUMMARY SNAPSHOT
# ============================================================================
#
# JustDefenders©
#
# Purpose
#
# Records a diagnostics snapshot of the public Harvester Runtime summary.
#
# Responsibilities
#
#   • Capture the public runtime summary.
#   • Delegate trace output to the diagnostics engine.
#   • Preserve read-only behaviour.
#
# Notes
#
#   • Safe to call repeatedly.
#   • Produces no runtime side-effects.
#   • No-op when diagnostics are disabled.
#
# ============================================================================

function Write-JDHarvesterSummarySnapshot
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Event,

        [Parameter(Mandatory)]
        [object]
        $Summary
    )

    if ($null -eq $Summary)
    {
        return
    }

    Write-JDHarvesterTrace `
        -Category "RuntimeSummary" `
        -Event $Event `
        -State $Summary `
        -Data @{

            QueueDepth =
                $Summary.QueueDepth

            ActiveWorkers =
                $Summary.ActiveWorkers

            CrawlCount =
                $Summary.CrawlCount

            DocumentsProcessed =
                $Summary.DocumentsProcessed

            DocumentsInserted =
                $Summary.DocumentsInserted

            FailedDocuments =
                $Summary.FailedDocuments

            CurrentSource =
                $Summary.CurrentSource

        }
}

# ============================================================================
# END FUNCTION
# ============================================================================

# ============================================================================
# WRITE HARVESTER INVOCATION TRACE
# ============================================================================
#
# JustDefenders©
#
# Purpose
#
# Records diagnostics for Operational Host invocation of the Harvester Runtime.
#
# Responsibilities
#
#   • Capture the managed command being invoked.
#   • Capture the returned runtime object.
#   • Delegate logging to Write-JDHarvesterTrace.
#   • Never modify runtime behaviour.
#
# Notes
#
#   • Read-only diagnostics helper.
#   • Safe for production use.
#   • Used during WP-S005A-03 Runtime State Synchronisation Diagnostics.
#
# ============================================================================

function Write-JDHarvesterInvocationTrace
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Operation,

        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Command,

        [Parameter()]
        [AllowNull()]
        [object]
        $Result
    )

    $data = @{

    Timestamp =
        Get-Date

    Operation =
        $Operation

    Command =
        $Command

    ResultType =
        if ($null -eq $Result)
        {
            "NULL"
        }
        else
        {
            $Result.GetType().FullName
        }

}

    if ($null -ne $Result)
    {
        foreach ($property in @(
            "Running",
            "Initialised",
            "Paused",
            "Health",
            "HealthState",
            "CurrentPhase"
        ))
        {
            if ($Result.PSObject.Properties.Match($property).Count -gt 0)
            {
                $data[$property] = $Result.$property
            }
        }
    }

    Write-JDHarvesterTrace `
        -Category "Invocation" `
        -Event "ManagedCommand" `
        -State $Result `
        -Data $data
}

# ============================================================================
# END FUNCTION
# ============================================================================

# ============================================================================
# END OF FILE
# ============================================================================

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUzRKpkRngCzMD/gqmf2JMV5yr
# xQygggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFGx8Vfe9eYoSBQwOgpKb9VYY
# yIcnMA0GCSqGSIb3DQEBAQUABIIBgIK/GXT+1U9jxRu5uupEq0Q4KPBpgvQDztmU
# nFxEBRiRaxrIEgOmRXUozrQabZZ/BS3ihAtrn5Th4Uht+MLPtJMK2WxD9iYT0879
# 1k4TiLWS7JRMxU3pS190b23O3HrhWSblFbf104WtZuHXFS1GaYSbaWUGlMoAxjom
# m+fJSHBxdveZ9QRT25k6qiCaB1hFoBhyhozDZM5jhplb8hDlBLJzyzYfUbSW0++/
# Bf+SFn3EGSExLHcbLJMK1g9xh8w110qg/jTmyHjevs430AOm1+2DUyHMgxLQu3n8
# EysyymMIevpmo3S353ZevkiOiROLqKu0UPflsCXABPYxWuAzR8IJW+9OC6uwlS91
# /+Xk0xzVn7CSnj3W1fQIJ+pRpvRkHXsOl8n6xzL/3LCMvKiIQPfNILH2rXBhnID6
# sWgXJy9LFWB7+7V9oKKr/vnhErXx7tNsqeI4pBZkN2yuLThHvzHCeyNOqjykBh9z
# zCssBioRvghbDEpVv6Dn0BB2jjh2bw==
# SIG # End signature block
