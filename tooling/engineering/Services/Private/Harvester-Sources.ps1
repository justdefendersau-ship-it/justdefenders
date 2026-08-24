<#
==============================================================================
JustDefenders Â©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Harvester-Sources.ps1

Timestamp
16 August 2026 13:07 Sydney

Work Package
WP-S002-04

Component
Harvester Runtime

Purpose
Implements the Harvester Source Registry.

This module is the authoritative owner of all registered Harvester
connectors.

Responsibilities

    â€¢ Register Sources
    â€¢ Unregister Sources
    â€¢ Source Discovery
    â€¢ Source Enable/Disable
    â€¢ Source Metadata

Dependencies

    â€¢ Harvester-State.ps1
    â€¢ Engineering-Common

Notes

    â€¢ Private module
    â€¢ Dot-sourced by Harvester Runtime
    â€¢ Contains no harvesting logic
==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# INITIALISE SOURCE REGISTRY
# ============================================================================

$existingSources = Get-Variable `
    -Name JDHarvesterSources `
    -Scope Script `
    -ErrorAction SilentlyContinue

if($null -eq $existingSources)
{
    $Script:JDHarvesterSources = @{}
}

# ============================================================================
# GET SOURCES
# ============================================================================

function Get-JDHarvesterSources
{
    [CmdletBinding()]
    param()

    return @($Script:JDHarvesterSources.Values)
}

# ============================================================================
# GET SOURCE
# ============================================================================

function Get-JDHarvesterSource
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    if($Script:JDHarvesterSources.ContainsKey($Name))
    {
        return $Script:JDHarvesterSources[$Name]
    }

    return $null
}

# ============================================================================
# REGISTER SOURCE
# ============================================================================

function Register-JDHarvesterSource
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [pscustomobject]
        $Registration
    )

    if([string]::IsNullOrWhiteSpace($Registration.Name))
    {
        throw "Registration.Name is required."
    }

    if($Script:JDHarvesterSources.ContainsKey($Registration.Name))
    {
        throw "Harvester Source '$($Registration.Name)' already exists."
    }

    $source = [PSCustomObject]@{

        Name          = $Registration.Name

        Type          = $Registration.Type

        Query         = $Registration.Query
        Enabled       = $true

        Connected     = $false

        Health        = "UNKNOWN"

        LastRun       = $null

        LastSuccess   = $null

        LastFailure   = $null

        Statistics    = [PSCustomObject]@{

            Executions = 0

            Documents  = 0

            Failures   = 0

        }

    }

    $Script:JDHarvesterSources[$source.Name] = $source

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Registered Harvester Source [{0}]." -f $source.Name)

    return $source
}

# ============================================================================
# PART 1 END
# ============================================================================

# ============================================================================
# UNREGISTER SOURCE
# ============================================================================

function Unregister-JDHarvesterSource
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    if(-not $Script:JDHarvesterSources.ContainsKey($Name))
    {
        return $false
    }

    $null = $Script:JDHarvesterSources.Remove($Name)

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Unregistered Harvester Source [{0}]." -f $Name)

    return $true
}

# ============================================================================
# ENABLE SOURCE
# ============================================================================

function Enable-JDHarvesterSource
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $source = Get-JDHarvesterSource `
        -Name $Name

    if($null -eq $source)
    {
        throw "Harvester Source '$Name' not found."
    }

    $source.Enabled = $true

    return $source
}

# ============================================================================
# DISABLE SOURCE
# ============================================================================

function Disable-JDHarvesterSource
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $source = Get-JDHarvesterSource `
        -Name $Name

    if($null -eq $source)
    {
        throw "Harvester Source '$Name' not found."
    }

    $source.Enabled = $false

    return $source
}

# ============================================================================
# CONNECT SOURCE
# ============================================================================

function Connect-JDHarvesterSource
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $source = Get-JDHarvesterSource `
        -Name $Name

    if($null -eq $source)
    {
        throw "Harvester Source '$Name' not found."
    }

    if(-not $source.Enabled)
    {
        throw "Harvester Source '$Name' is disabled."
    }

    $source.Connected = $true

    $source.Health = "HEALTHY"

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Connected Harvester Source [{0}]." -f $Name)

    return $source
}

# ============================================================================
# DISCONNECT SOURCE
# ============================================================================

function Disconnect-JDHarvesterSource
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $source = Get-JDHarvesterSource `
        -Name $Name

    if($null -eq $source)
    {
        throw "Harvester Source '$Name' not found."
    }

    $source.Connected = $false

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Disconnected Harvester Source [{0}]." -f $Name)

    return $source
}

# ============================================================================
# TEST SOURCE
# ============================================================================

function Test-JDHarvesterSource
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $source = Get-JDHarvesterSource `
        -Name $Name

    if($null -eq $source)
    {
        return $false
    }

    if(-not $source.Enabled)
    {
        return $false
    }

    if(-not $source.Connected)
    {
        return $false
    }

    return $true
}

# ============================================================================
# UPDATE SOURCE EXECUTION
# ============================================================================

function Update-JDHarvesterSourceExecution
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name,

        [int]
        $Documents = 0
    )

    $source = Get-JDHarvesterSource `
        -Name $Name

    if($null -eq $source)
    {
        throw "Harvester Source '$Name' not found."
    }

    $source.LastRun = Get-Date

    $source.LastSuccess = Get-Date

    $source.Statistics.Executions++

    $source.Statistics.Documents += $Documents

    return $source
}

# ============================================================================
# PART 2 END
# ============================================================================

# ============================================================================
# RECORD SOURCE FAILURE
# ============================================================================

function Register-JDHarvesterSourceFailure
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name,

        [string]
        $Reason = "Unknown"
    )

    $source = Get-JDHarvesterSource `
        -Name $Name

    if($null -eq $source)
    {
        throw "Harvester Source '$Name' not found."
    }

    $source.Health = "FAILED"

    $source.LastFailure = Get-Date

    $source.Statistics.Failures++

    Write-JDEngineeringLog `
        -Level Warning `
        -Message ("Harvester Source [{0}] failed: {1}" -f $Name, $Reason)

    return $source
}

# ============================================================================
# GET SOURCE METRICS
# ============================================================================

function Get-JDHarvesterSourceMetrics
{
    [CmdletBinding()]
    param()

    $sources = Get-JDHarvesterSources

    [PSCustomObject]@{

        TotalSources =
            $sources.Count

        EnabledSources =
            @($sources | Where-Object Enabled).Count

        ConnectedSources =
            @($sources | Where-Object Connected).Count

        HealthySources =
            @($sources | Where-Object Health -eq "HEALTHY").Count

        FailedSources =
            @($sources | Where-Object Health -eq "FAILED").Count

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# GET SOURCE SUMMARY
# ============================================================================

function Get-JDHarvesterSourceSummary
{
    [CmdletBinding()]
    param()

    Get-JDHarvesterSources |
        Sort-Object Name |
        ForEach-Object {

            [PSCustomObject]@{

                Name =
                    $_.Name

                Type =
                    $_.Type

                Enabled =
                    $_.Enabled

                Connected =
                    $_.Connected

                Health =
                    $_.Health

                Executions =
                    $_.Statistics.Executions

                Documents =
                    $_.Statistics.Documents

                Failures =
                    $_.Statistics.Failures

                LastRun =
                    $_.LastRun

                LastSuccess =
                    $_.LastSuccess

                LastFailure =
                    $_.LastFailure

            }

        }
}

# ============================================================================
# RESET SOURCE REGISTRY
# ============================================================================

function Reset-JDHarvesterSources
{
    [CmdletBinding()]
    param()

    $Script:JDHarvesterSources.Clear()

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Source Registry reset."

    return $true
}

# ============================================================================
# VALIDATE SOURCE REGISTRY
# ============================================================================

function Test-JDHarvesterSourceRegistry
{
    [CmdletBinding()]
    param()

    if($null -eq $Script:JDHarvesterSources)
    {
        return $false
    }

    return $true
}

# ============================================================================
# END OF FILE

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUu1uSXJK9Ewin/n2HCX+CsYK+
# 7gegggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFE+HQgHnc2jalP9qw0/8IXjI
# dTCeMA0GCSqGSIb3DQEBAQUABIIBgHYNOO3amF/xUJJjD54lgsRR7HcMJsLmWnzq
# dkugFbh/OQPpglbAaKun3fa3vmap2gd8lZdgaB7ctyeQKJuxe3eI5mS6k5UyvQF3
# 9FWsmaOEtTzVtvmag2ypkK2t/kE6fsvsSBSMHPg291C77qXENyKAzC2qe8nLXErY
# X7su1pXn8oWb286flWP5a/LvcwDGEuupj6y1AUkW1IrlWLjtoQvpoxsaSOryd4Pg
# V1NFGFskoTSKMFEs8r3je+qLzdZPw6I1bhIVFgRfejHsZUPl3hy1XPlNa9MMSB+6
# fKmq/NtV/BOTAR70WLCw1njwdj/08Pba3JJzlzh5Fzx9zGppA6RO+X8S+ucbQvgm
# FjZY6V5RXh1iIQoRuoOM5No3KgbS111MrYo3bOePPOygbNyKhmo5gTnsYQHmHojg
# 27pdm0D4BxaesgXj838BMbV61D6LnPLv1mI9qdT2BGWCLOdOFBKVkZbAHohI343Q
# zjdKEHAP15NQNEHJK9fVgASYJwSYsA==
# SIG # End signature block
