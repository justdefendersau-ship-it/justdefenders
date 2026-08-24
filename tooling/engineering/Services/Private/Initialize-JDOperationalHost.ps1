<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-S001-05
Production Revision: PR-008A
Component          : Operational Host Initialisation Compatibility Layer
Timestamp          : 22 July 2026, 11:30
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Initialize-JDOperationalHost.ps1

------------------------------------------------------------------------------
DESCRIPTION
------------------------------------------------------------------------------

Compatibility entry point for the Operational Host initialisation lifecycle.

The authoritative lifecycle implementation is Initialize-JDHost in
Host-Lifecycle.ps1.

This function preserves the public startup contract expected by
Start-JDOperationalHost without duplicating lifecycle logic.

==============================================================================
#>

Set-StrictMode -Version Latest

$ErrorActionPreference = 'Stop'

function Initialize-JDOperationalHost
{
    [CmdletBinding()]
    param()

    Write-Verbose "Initialising Operational Host."

    return Initialize-JDHost
}
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUrNorbjfCoNJI6XrL7kR2Pn4p
# UyqgggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFJV46SKaCR8eIM0xom328lWI
# 0zxfMA0GCSqGSIb3DQEBAQUABIIBgDPILZKCJe2xctiuavUS4N1P5C3r5BEnCfP5
# gVl2Mv7Ll+CZpEglclKUi1kSwtUs7Uwqp8dxOvpJm1SPSZDBtWhM7dYFRphDdFLU
# xH740E8mMB8U6MsPL4XZa4qsWWSzfDc1FrxC/AoBkTOEc3y+rEAniHhG/d9yM5vF
# sn7pQXvir475Dzs8Lj7XOsU2/yrxoSP6CQzemlLO5e3fmQOmlUmGpo83WV/0PVZh
# 5b8hyW2il0+A78EP+2d3Jb7thqhpxhdDfNTgrA3tYSP1TQrH7eeFZL/hdCsOTfzX
# vq9BqW9tMkBpPGUf6dlpOTP98QhfXatObnMUOaasxB6jJCh6jTsY0qtkcu40X+5p
# fN2mWuv5H1XES+TI0hA1wBRcDk1mDLuq22vjviJnQlsUsslMtFvHyk8nloxe+4JP
# NkdfPWWGDpZ2XYute2DuUUtn2/cmfY7rnx9gHVRXvYmArhG+Ai0pBip1ain8zk54
# JyGnXbbcXpvkeH8+1TySMlHzIKldWQ==
# SIG # End signature block
