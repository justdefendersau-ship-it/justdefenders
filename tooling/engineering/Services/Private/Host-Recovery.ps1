<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-Recovery.ps1

Timestamp
10 July 2026 10:50

Work Package
WP-S001-03

Component
Operational Service Host

Purpose
Implements recovery operations for the Operational Service Host. Responsible
for recovering failed services, restarting services when appropriate and
maintaining recovery statistics.

Dependencies
- Host-State.ps1
- Host-ServiceLookup.ps1
- Host-ServiceState.ps1
- Host-ServiceManager.ps1
- Host-Health.ps1

Notes
- Private module
- Dot-sourced by Operational-ServiceHost.psm1
==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# TEST SERVICE RECOVERY REQUIRED
# ============================================================================

function Test-JDHostServiceRecoveryRequired
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    Assert-JDHostServiceExists `
        -Name $Name

    $runtime = Get-JDHostServiceState `
        -Name $Name

    return ($runtime.Health -eq "FAILED")
}

# ============================================================================
# RECOVER SERVICE
# ============================================================================

function Invoke-JDHostServiceRecovery
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    if (-not (Test-JDHostServiceRecoveryRequired -Name $Name))
    {
        return $false
    }

    Restart-JDHostService `
        -Name $Name | Out-Null

    Set-JDHostServiceHealth `
        -Name $Name `
        -Health "HEALTHY" | Out-Null

    $state = Get-JDHostState

    $state.LastRecoveryAttempt =
        Get-Date

    $state.Statistics.RecoveryEvents++

    Write-JDEngineeringLog `
        -Level Warning `
        -Message ("Recovered Operational Service [{0}]." -f $Name)

    return $true
}

# ============================================================================
# RECOVER ALL FAILED SERVICES
# ============================================================================

function Invoke-JDHostRecovery
{
    [CmdletBinding()]
    param()

    $recovered = 0

    foreach($service in Get-JDHostRegisteredServices)
    {
        if(Test-JDHostServiceRecoveryRequired `
            -Name $service.Name)
        {
            Invoke-JDHostServiceRecovery `
                -Name $service.Name | Out-Null

            $recovered++
        }
    }

    return $recovered
}

# ============================================================================
# GET RECOVERY STATUS
# ============================================================================

function Get-JDHostRecoveryStatus
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    [pscustomobject]@{

        RecoveryEnabled =
            $state.RecoveryEnabled

        LastRecoveryAttempt =
            $state.LastRecoveryAttempt

        RecoveryEvents =
            $state.Statistics.RecoveryEvents

    }
}

# ============================================================================
# ENABLE RECOVERY
# ============================================================================

function Enable-JDHostRecovery
{
    [CmdletBinding()]
    param()

    (Get-JDHostState).RecoveryEnabled = $true

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational recovery enabled."

    return $true
}

# ============================================================================
# DISABLE RECOVERY
# ============================================================================

function Disable-JDHostRecovery
{
    [CmdletBinding()]
    param()

    (Get-JDHostState).RecoveryEnabled = $false

    Write-JDEngineeringLog `
        -Level Warning `
        -Message "Operational recovery disabled."

    return $true
}

# ============================================================================
# EXECUTE HOST RECOVERY CYCLE
# ============================================================================

function Invoke-JDHostRecoveryCycle
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    if(-not $state.RecoveryEnabled)
    {
        return
    }

    Invoke-JDHostRecovery | Out-Null

    return $true
}

# ============================================================================
# END OF FILE
# ============================================================================
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUNKpu8fP6q7oTVj1fVCsMOD3j
# d2igggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFLraPW5vqaAX6L+/6z8rf/Cs
# ogYQMA0GCSqGSIb3DQEBAQUABIIBgFB1owrTrge6Qfx1ouvem214hhFMOs9dZZTQ
# Mm/MY9/veNkpwJf7NYoy7otVwKeCbAUodOyhJ6X6P7oTp3vhL+v+nK82UT8LY4FN
# ijwR4zsB24OukdtZbK/DAYR+ebzrEpDNNuRXiA7iDfIg73zrKamgS74EAiy1ieXL
# pVVs1ZII7qP2lhlF4ubAKbSR1Mx2BStlo4zyXuLgoMkHtPKraDGRNel+SLxHepCn
# sz1FRi6uCCraStXgPTtTyKalpjkaV5HPQVlfn3k04yRDQEENA+k8xeKRkGFSSQQc
# jpTtWG+3kuKm1dREgbhk16DmekArVBkCQqFM76lfVvoGbB/FTiXO9amwZjIajSs1
# DiiEWG1Wq56pOWu9p5ofGJf+J9FTtTQIin4sbfbyRJKhuvLnTNqAsRR3DYiwGY9H
# 3Z8vbls7SuX4fr9Kkr/BIKu15tVP0ua0c7qy+ZKSTwB3Nl5yQ3kVCj1v+xPsaV1E
# O7VYsBScyComGgLp1JElWshccJMmzw==
# SIG # End signature block
