<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Harvester-RuntimeKernel.ps1

Timestamp
18 July 2026

Component
Harvester Runtime Kernel

Purpose
Provides the canonical runtime access layer for the JustDefenders Harvester.

Responsibilities

    • Runtime bootstrap
    • Runtime access
    • Runtime reset
    • Queue access
    • State access

Notes

    • Private module
    • Dot-sourced by Harvester-Runtime.psm1
    • Contains no harvesting logic
    • Contains no scheduler logic
==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# RUNTIME STORAGE
# ============================================================================

if (-not (Get-Variable -Name JDHarvesterRuntime `
                       -Scope Script `
                       -ErrorAction SilentlyContinue))
{
    $Script:JDHarvesterRuntime = $null
}

# ============================================================================
# INITIALISE RUNTIME
# ============================================================================

function Initialize-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    if ($null -ne $Script:JDHarvesterRuntime)
    {
        return $Script:JDHarvesterRuntime
    }

    $Script:JDHarvesterRuntime = [ordered]@{

        Initialised     = $true

        Created         = Get-Date

        Version         = "1.0.0"

        RuntimeState    = $null

        Queue           = $null

        Manager         = $null

        Cycle           = $null

        Diagnostics     = [ordered]@{

            LastHeartbeat = $null

            StartupTime   = Get-Date

            RestartCount  = 0

        }

    }

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Runtime Kernel initialised."

    return $Script:JDHarvesterRuntime
}

# ============================================================================
# GET RUNTIME
# ============================================================================

function Get-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    if ($null -eq $Script:JDHarvesterRuntime)
    {
        Initialize-JDHarvesterRuntime | Out-Null
    }

    return $Script:JDHarvesterRuntime
}

# ============================================================================
# RESET RUNTIME
# ============================================================================

function Reset-JDHarvesterRuntime
{
    [CmdletBinding(SupportsShouldProcess)]
    param()

    if ($PSCmdlet.ShouldProcess(
            "Harvester Runtime",
            "Reset Runtime"))
    {
        $Script:JDHarvesterRuntime = $null

        Initialize-JDHarvesterRuntime | Out-Null

        Write-JDEngineeringLog `
            -Level Warning `
            -Message "Harvester Runtime Kernel reset."

        return $Script:JDHarvesterRuntime
    }
}

# ============================================================================
# STATE ACCESS
# ============================================================================

function Get-JDHarvesterRuntimeState
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    return $runtime.RuntimeState
}

function Set-JDHarvesterRuntimeState
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [object]
        $State
    )

    $runtime = Get-JDHarvesterRuntime

    $runtime.RuntimeState = $State

    return $runtime.RuntimeState
}

function Clear-JDHarvesterRuntimeState
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    $runtime.RuntimeState = $null

    return $null
}

# ============================================================================
# QUEUE ACCESS
# ============================================================================

function Get-JDHarvesterRuntimeQueue
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    return $runtime.Queue
}

function Set-JDHarvesterRuntimeQueue
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [object]
        $Queue
    )

    $runtime = Get-JDHarvesterRuntime

    $runtime.Queue = $Queue

    return $runtime.Queue
}

function Clear-JDHarvesterRuntimeQueue
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    $runtime.Queue = $null

    return $null
}

# ============================================================================
# MANAGER ACCESS
# ============================================================================

function Get-JDHarvesterRuntimeManager
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    return $runtime.Manager
}

function Set-JDHarvesterRuntimeManager
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [object]
        $Manager
    )

    $runtime = Get-JDHarvesterRuntime

    $runtime.Manager = $Manager

    return $runtime.Manager
}

function Clear-JDHarvesterRuntimeManager
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    $runtime.Manager = $null

    return $null
}

# ============================================================================
# CYCLE ACCESS
# ============================================================================

function Get-JDHarvesterRuntimeCycle
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    return $runtime.Cycle
}

function Set-JDHarvesterRuntimeCycle
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [object]
        $Cycle
    )

    $runtime = Get-JDHarvesterRuntime

    $runtime.Cycle = $Cycle

    return $runtime.Cycle
}

function Clear-JDHarvesterRuntimeCycle
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    $runtime.Cycle = $null

    return $null
}

# ============================================================================
# HEARTBEAT
# ============================================================================

function Update-JDHarvesterRuntimeHeartbeat
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    $runtime.Diagnostics.LastHeartbeat = Get-Date

    return $runtime.Diagnostics.LastHeartbeat
}

function Get-JDHarvesterRuntimeHeartbeat
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    return $runtime.Diagnostics.LastHeartbeat
}

# ============================================================================
# RUNTIME STATUS
# ============================================================================

function Test-JDHarvesterRuntimeInitialised
{
    [CmdletBinding()]
    param()

    return ($null -ne $Script:JDHarvesterRuntime)
}

function Get-JDHarvesterRuntimeStatus
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    return [pscustomobject]@{

        Initialised  = $runtime.Initialised

        Created      = $runtime.Created

        Version      = $runtime.Version

        HasState     = ($null -ne $runtime.RuntimeState)

        HasQueue     = ($null -ne $runtime.Queue)

        HasManager   = ($null -ne $runtime.Manager)

        HasCycle     = ($null -ne $runtime.Cycle)

        Heartbeat    = $runtime.Diagnostics.LastHeartbeat

        RestartCount = $runtime.Diagnostics.RestartCount
    }
}

# ============================================================================
# VALIDATION
# ============================================================================

function Test-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    $result = [ordered]@{

        Success = $true

        Errors  = @()

    }

    if ($null -eq $runtime)
    {
        $result.Success = $false
        $result.Errors += "Runtime not initialised."
    }

    if (-not $runtime.Initialised)
    {
        $result.Success = $false
        $result.Errors += "Runtime Initialised flag is false."
    }

    if ($null -eq $runtime.Diagnostics)
    {
        $result.Success = $false
        $result.Errors += "Diagnostics object missing."
    }

    return [pscustomobject]$result
}

# ============================================================================
# DIAGNOSTICS
# ============================================================================

function Get-JDHarvesterRuntimeDiagnostics
{
    [CmdletBinding()]
    param()

    $runtime = Get-JDHarvesterRuntime

    return [pscustomobject]$runtime.Diagnostics
}

function Set-JDHarvesterRuntimeDiagnosticsValue
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name,

        [Parameter()]
        $Value
    )

    $runtime = Get-JDHarvesterRuntime

    $runtime.Diagnostics[$Name] = $Value

    return $runtime.Diagnostics
}

# ============================================================================
# INFORMATION
# ============================================================================

function Get-JDHarvesterRuntimeVersion
{
    [CmdletBinding()]
    param()

    return (Get-JDHarvesterRuntime).Version
}

function Get-JDHarvesterRuntimeCreationTime
{
    [CmdletBinding()]
    param()

    return (Get-JDHarvesterRuntime).Created
}

# ============================================================================
# EXPORT METADATA
# ============================================================================

$Script:JDHarvesterRuntimeKernelMetadata = [pscustomobject]@{

    Name        = "Harvester Runtime Kernel"

    Version     = "1.0.0"

    Component   = "Private"

    Created     = Get-Date

    Initialised = {
        Test-JDHarvesterRuntimeInitialised
    }

}

Write-JDEngineeringLog `
    -Level Information `
    -Message "Harvester Runtime Kernel loaded."

# ============================================================================
# END OF FILE
# ============================================================================
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUAHBzOHtN/qNx7bW9511MWE5v
# cWOgggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFB/Z6gLECs8Q8mtJa619/Y9v
# fq05MA0GCSqGSIb3DQEBAQUABIIBgLc3qiYhwcJtafqIUggcC75uuaXOjcy2BRvJ
# upidd+MSTHx2ZGSjywOHJJqwqV7qpP6b5f3//fhkq9vIzzQ40tcdw2wioE65zLkg
# Nh9GMG2pWBHKA8JKYjUzwG1BIH7QA7UoSfq7yxb1NAZQ08VKvpZuQorK9MbgfPpm
# TBsdi9kr1oH/RKfj1119zLBzj1DA4FFdW6kMoFurIUvGUs1dO3xlwDCkINb7f50n
# pT+2RHBu8kMJEkgL1w6KgzsMx+u09JSJeDv6XiWjMIrUhIatrGE5FWgFCSywwnAa
# fDZllatYOE+z/4RITef2WccU6FBtkVCoc73lerUWU9H0CdqA+DV81zPumm8MrAgk
# bS7esTNuh36EQXWsV18RsGgC40sVX07eZ4WCurtb8BcHVNAOPtpZhg+x7LEteBdV
# 0/6g8zPovrwAM/JgXbpyA5OZDfTOwAyIcQmw+z231p9eH+VQ7kRzCUBXsvmlcFkM
# nvHYf+RAvKTtrOdAKqXk8qMpwpwTtA==
# SIG # End signature block
