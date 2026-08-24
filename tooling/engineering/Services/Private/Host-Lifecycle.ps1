<#
==============================================================================
 JustDefenders ©

 File
 C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-Lifecycle.ps1

 Timestamp
 09 July 2026 16:35

 Work Package
 WP-S001-03

 Component
 Operational Service Host

 Purpose
 Internal lifecycle engine responsible for starting, stopping and reporting
 runtime state for the Operational Service Host.

 NOTE
 This file is PRIVATE.
 It is dot-sourced by Operational-ServiceHost.psm1.
==============================================================================
#>


Set-StrictMode -Version Latest

# ============================================================================
# INITIALISE HOST
# ============================================================================

function Initialize-JDHost
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    if($state.Initialised)
    {
        return $state
    }

    Initialize-JDOperationalRegistry | Out-Null

    $state.Initialised = $true
    $state.HealthState = "HEALTHY"

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Host initialised."

    return $state
}

# ============================================================================
# START HOST
# ============================================================================

function Start-JDHost
{
    [CmdletBinding()]
    param()

    $state = Initialize-JDHost

    if($state.Running)
    {
        return $state
    }

    $state.Starting = $true

    $state.StartedAt = Get-Date

    $state.StoppedAt = $null

    $state.Running = $true

    $state.Starting = $false

    $state.Statistics.HostStarts++

    Update-JDHostHeartbeat | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Service Host started."

    return $state
}

# ============================================================================
# STOP HOST
# ============================================================================

function Stop-JDHost
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    if(-not $state.Running)
    {
        return $state
    }

    $state.Stopping = $true

    $state.Running = $false

    $state.StoppedAt = Get-Date

    $state.Stopping = $false

    $state.Statistics.HostStops++

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Service Host stopped."

    return $state
}

# ============================================================================
# HOST STATUS
# ============================================================================

function Get-JDHostStatus
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    $services = Get-JDOperationalServices

    $state.Statistics.ManagedServices =
        @($services).Count

    [pscustomobject]@{

        Name =
            $state.Name

        Version =
            $state.Version

        WorkPackage =
            $state.WorkPackage

        Running =
            $state.Running

        Initialised =
            $state.Initialised

        Health =
            $state.HealthState

        StartedAt =
            $state.StartedAt

        StoppedAt =
            $state.StoppedAt

        LastHeartbeat =
            $state.LastHeartbeat

        ManagedServices =
            $state.Statistics.ManagedServices
    }
}

# ============================================================================
# RESTART HOST
# ============================================================================

function Restart-JDHost
{
    [CmdletBinding()]
    param()

    Stop-JDHost | Out-Null

    $state = Start-JDHost

    $state.Statistics.Restarts++

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Service Host restarted."

    return $state
}
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUHP+fd9NbkZzZIfxgYGV/4Qla
# 0pOgggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFDn85gdKr/neoYCWMvd/quHw
# h5VHMA0GCSqGSIb3DQEBAQUABIIBgF57jb7TAqGGuznwpnoSGR1Tjl5hCbEaHSnQ
# +0+l70Q/GIuEo6G9bdbCge/5rp/EAmVPEWDFKrOPhU8iA9n7vcLvb/vMBJMbaizx
# 7nn9Ufb4NfUYjUHN8S19TW5RgmsDNgS/wkmRiJP+RI0pE3iZOqYK+IzCL9G25tWx
# mrMW3e8HaZOeDrCbkiYb8gdVoL1R42yfA4Blf/g3lewpaAcvlVmbfQXFq06kVtgY
# kZbIwCdaNSCJa4L+6S9kvuxBB1H7CIEsMCtvEYXfMJuEPKsxDpBVv5WnmvYTEyJo
# MJL+9urrCf3vrEBLVNPxPeH8EUpMuf6/r8sntdHaxYfmWqwVX3bYD9se6y1/wRyJ
# ZlBsiyjw1AIwKoKjbRkDBf39cmkRFVXedOt/RzHcUUD39HN79338sfqsVTLWtrUs
# OFLaYAuKHrirjusZTGXZ5CxD65sGQbMR04V1/ER7cASWUK3/9T+Ug+hN43Fbt27l
# bjtuYPXRgXI768q/RIhk2ESDdVxtSA==
# SIG # End signature block
