<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-PLATFORM-001
Production Revision: PR-006
Component          : Platform Diagnostics
Timestamp          : 15 July 2026 10:30
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Platform-Diagnostics.ps1

Purpose:
    Provides common diagnostics and structured logging for the
    JustDefenders Platform orchestration layer.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'

function Write-JDPlatformLog {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][ValidateSet('Information','Warning','Error','Verbose')]
        [string]$Level,
        [Parameter(Mandatory)][string]$Message
    )

    $entry=[pscustomobject]@{
        Timestamp=Get-Date
        Level=$Level
        Message=$Message
    }

    switch($Level){
        'Information' { Write-Information $Message -InformationAction Continue }
        'Warning' { Write-Warning $Message }
        'Error' { Write-Error $Message }
        'Verbose' { Write-Verbose $Message }
    }

    return $entry
}

function Get-JDPlatformDiagnostics {
    [CmdletBinding()]
    param()

    $status = if (Get-Command Get-JDPlatformStatus -ErrorAction SilentlyContinue) {
        Get-JDPlatformStatus
    } else { $null }

    [pscustomobject]@{
        PlatformVersion='0.1.0-pr006'
        Timestamp=Get-Date
        PowerShellVersion=$PSVersionTable.PSVersion.ToString()
        Status=$status
        LoadedModules=(Get-Module | Select-Object -ExpandProperty Name)
    }
}

#==============================================================================
# END OF WP-PLATFORM-001 PR-006
#==============================================================================

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQU7+ovz6PPDtbmk4lJgDbAPL8K
# TfGgggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFKFFWkhrAK9o+XJjA58kkh4n
# 5Ps7MA0GCSqGSIb3DQEBAQUABIIBgHGgNrrgunZddN5N6D03dR/JqclxZmL8gNhF
# AckAjRV0Px3pDKPRhme6Cw7GdOqwVe3XWlSvd42+D+giUV5Ur+fHps/Xe375skDn
# +IjAh3OfKUE9tvppYTKBuTU4PUe0Zi35froUxlW+QwFJj/2lcOanp60hemfUJKI1
# j8cF8icQW5j7Bmp2d7LKh7844+N2fwJnVTbfxy888vfsKvqM8qFLJ6CNFG+Pjadv
# E3BxvAXx+qSE4MyYifTyJLUHTR3ED/3SySvrqjTRNkqPgCgcZF0DHzqzYlEgkAnn
# XhvHZbX9kJ1HDWHXl42i3Z1QDrfd+/NS3BCj3+k58PHDg8Wy4sI0O/+vFivU9+P/
# S6SP8kPDt4dKAQA/6qCZ3iWNbCk+6RHN8ZpxFMVgPMDnT8Vl/5hDRP6udouOGU9D
# XfqbAF+tL4i+vgwYVqYSkQkmgwb/c0JbwbIE98rcoJ/jH4kOFDUKxAlD2iAHGUfo
# GPAkEEmu8roMJzOvzZTgh4/fJ+bbmA==
# SIG # End signature block
