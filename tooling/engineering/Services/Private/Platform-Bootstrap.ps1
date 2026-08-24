<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-PLATFORM-001
Production Revision: PR-006F
Component          : Platform Bootstrap
Timestamp          : 22 July 2026 09:05
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Platform-Bootstrap.ps1

Purpose:
    Initialises and validates the JustDefenders Platform environment.

    PR-006F integrates the Operational Service Host singleton runtime.
    This module validates platform dependencies only.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Test-JDPlatformDependency
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$ModuleName
    )

    $module = Get-Module -Name $ModuleName -ErrorAction SilentlyContinue

    if (-not $module)
    {
        throw "Required module '$ModuleName' has not been imported."
    }

    return $true
}

function Initialize-JDPlatform
{
    [CmdletBinding()]
    param()

    $requiredModules = @(
        'Operational-ServiceHost',
        'Harvester-Runtime'
    )

    foreach ($module in $requiredModules)
    {
        Test-JDPlatformDependency -ModuleName $module | Out-Null
    }

    #
    # Verify singleton runtime.
    #
    if (-not (Get-Command Start-JDOperationalHost -ErrorAction SilentlyContinue))
{
    throw "Operational-ServiceHost runtime is unavailable."
}

   
    $privateFolder = Join-Path $PSScriptRoot ''
    $publicFolder  = Join-Path (Split-Path $PSScriptRoot -Parent) 'Public'

    if (-not (Test-Path $privateFolder))
    {
        throw "Private folder not found: $privateFolder"
    }

    if (-not (Test-Path $publicFolder))
    {
        throw "Public folder not found: $publicFolder"
    }

    return [pscustomobject]@{

        PlatformVersion = '0.1.0-pr006f'
        Status          = 'Ready'
        InitialisedAt   = Get-Date

        Modules         = $requiredModules

        
        PrivateFolder   = $privateFolder
        PublicFolder    = $publicFolder
    }
}

#==============================================================================
# END OF WP-PLATFORM-001 PR-006F
#==============================================================================
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUXVDBddV3Us2/imbaw63kyW8L
# hU+gggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFFQWj99x6IhIE3zUZ1/FP0GH
# AzwiMA0GCSqGSIb3DQEBAQUABIIBgGmskI5D/hgEefE++SObzw3L8FknKXpL56k3
# /EtNwWPaRNIfzGX81LGjejUJp+c1yUl+79ODKKdahFA40My0I5nzfvZk6oW2Fqm6
# 6XvhbbCrQAoX43hH6zeMyggAUHCJdqo0CmCy+YzXrUpg/lLhCyJe/M9adIPme7zZ
# Sp8GfIhmzdOhPOgRXwh0ctrUjNQ5m6z9TmCaYn6dIyct2GOKylbURYzLDLUy8O+n
# rbMr23yWAChbLhkmuni6a0GRLOOjMXStV2v27qcsdB1H7OVdLH7Z6n5etIQ6Dqgg
# scEuKx1ZcW0Xl+xwTl6R0MeA8LF1xx+bRed+889l0eBuBn1ikLFwLGZWPZDZqH/i
# yNR8Urg1eeRshTM31bcdr4zB+BMOdJkXQotmBZcVf9V5IVr8iD2hQ48Hthq+52LJ
# wE0EDWIFeSQ60zSNVlAjLvk8mkCWO4lq+cQiYBGGuIXSBoyQsgoLrGRSemD9IP5E
# 9BfMdxNfBlGPvl7JZAlwVKYYkpfItA==
# SIG # End signature block
