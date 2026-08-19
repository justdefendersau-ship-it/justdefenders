<#
==============================================================================
JustDefenders Â©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Harvester-Runtime.psm1

Timestamp
14 August 2026 16:50

Work Package
WP-S003-00

Component
Harvester Runtime

Purpose
Bootstrap module for the JustDefenders Harvester Runtime.

Responsibilities

    â€¢ Load Engineering Common
    â€¢ Load all Private Harvester modules
    â€¢ Load all Public Harvester modules
    â€¢ Export the complete Harvester public API

Notes

    â€¢ Consumers interact exclusively with the Public Harvester API.
    â€¢ Internal modules remain private.
    â€¢ No runtime initialisation occurs during module import.

==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# IMPORT DEPENDENCIES
# ============================================================================

Import-Module `
    (Join-Path $PSScriptRoot "..\Engineering-Common.psm1") `
    -Force

# ============================================================================
# LOAD PRIVATE MODULES
# ============================================================================

$privateFolder = Join-Path $PSScriptRoot "Private"

if (Test-Path $privateFolder)
{
    Get-ChildItem `
        -Path $privateFolder `
        -Filter "Harvester-*.ps1" |
    Where-Object {
        $_.Name -notmatch '\.backup\.ps1$' -and
        $_.Name -notmatch '\.empty\.ps1$'
    } |
    Sort-Object Name |
    ForEach-Object {

        . $_.FullName

    }
}

# ============================================================================
# LOAD PUBLIC MODULES
# ============================================================================

$publicFolder = Join-Path $PSScriptRoot "Public"

if (Test-Path $publicFolder)
{
    Get-ChildItem `
        -Path $publicFolder `
        -Filter "*Harvester*.ps1" |
    Sort-Object Name |
    ForEach-Object {

        . $_.FullName

    }
}

# ============================================================================
# EXPORT PUBLIC HARVESTER API
# ============================================================================

# ==================================================================================================
# JUSTDEFENDERS_PUBLIC_HARVESTER_API_LOAD_BOUNDARY
#
# Existing approved Services\Public Harvester API scripts.
# These scripts are loaded into this module scope before Export-ModuleMember.
#
# The source-discovery script is intentionally excluded from this public API boundary.
#
# ==================================================================================================

$publicRoot = Join-Path $PSScriptRoot '..\Public'

Get-ChildItem `
    -LiteralPath $publicRoot `
    -Filter '*Harvester*.ps1' `
    -File |
Where-Object {
    $_.Name -ne 'Invoke-JDHarvesterSourceDiscovery.ps1'
} |
Sort-Object Name |
ForEach-Object {
    . $_.FullName
}

# ==================================================================================================
# END JUSTDEFENDERS_PUBLIC_HARVESTER_API_LOAD_BOUNDARY
# ==================================================================================================

Export-ModuleMember -Function @(

    #
    # Runtime Lifecycle
    #

    "Start-JDHarvester",
    "Stop-JDHarvester",
    "Restart-JDHarvester",
    "Pause-JDHarvester",
    "Resume-JDHarvester",
    "Get-JDHarvesterStatus",
    "Get-JDHarvesterHealth",
    "Get-JDHarvesterMetrics",
    "Register-JDHarvesterService",
    "Invoke-JDHarvesterCycle"

)

# ============================================================================
# END OF FILE
# ============================================================================

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQU0I7tYFosx4k4IhXl+Ub1J4ov
# 6uygggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFN98raHXg7p8nJIaHlUwK6Ev
# bqytMA0GCSqGSIb3DQEBAQUABIIBgJ/QUH/Gy/vV+zBgGZKBFiYFOBkHU4RGxYpy
# 5vR6YWw9eIiGjpPLgo7U8S+YVrvJGJXQDCDrTEWh1Xqg+js59245DmXcv2+utEbe
# teEpMSuPLBzvR6UNhqCzwrmswLFYuv36kuRVwuUUGhpmxTSGFVLqnYlFr6qNCxt1
# 4tYCxb3njszUApw22uuXeEmxN1yUvLmHvQ65F8KNBqAekcZX+1MYdRxo2OFZbKw0
# 5k9yE6hTJYQ7wdpJg0oJMwg/qZHz/vQA3YMtWu9jdYtBsoVw0G7rmq4LFVcGMeDQ
# Dqz/7M4vDFYnshu5plGVJgEK6llp/eSKeXIiqZpog/6f6P5wJCNTOcS5AChBCAEM
# ByXz2ALJ/unM2GH47SVrN+solcCa9GNR5Mfcq1YStGGgRQQSgVLaXOem4rJ2/P8n
# GwCZwI5uKBuErMQPnwtQ9aeLSTNNUgoGxzAD8zJnyWL6MGiK/hsxmewBmNoPtniQ
# o6cWkDuvuszo/w98ui1VOtOH6J7Bcg==
# SIG # End signature block
