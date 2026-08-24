<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-Health.ps1

Timestamp
10 July 2026 10:20

Work Package
WP-S001-03

Component
Operational Service Host

Purpose
Provides health monitoring, heartbeat management and runtime statistics for
the Operational Service Host and all managed Operational Services.

Dependencies
- Host-State.ps1
- Host-ServiceLookup.ps1
- Host-ServiceState.ps1

Notes
- Private module
- Dot-sourced by Operational-ServiceHost.psm1
==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# HOST HEARTBEAT
# ============================================================================

function Invoke-JDHostHeartbeat
{
    [CmdletBinding()]
    param()

    Update-JDHostHeartbeat

    $state = Get-JDHostState

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Operational Host heartbeat updated."

    return $state.LastHeartbeat
}

# ============================================================================
# HOST HEALTH CHECK
# ============================================================================

function Test-JDHostHealth
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    if (-not $state.Running)
    {
        Update-JDHostHealth `
            -Health "FAILED"

        return $false
    }

    Update-JDHostHealth `
        -Health "HEALTHY"

    Invoke-JDHostHeartbeat | Out-Null

    return $true
}

# ============================================================================
# SERVICE HEALTH
# ============================================================================

function Get-JDHostServiceHealth
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

    [pscustomobject]@{

        Name        = $Name

        State       = $runtime.State

        Health      = $runtime.Health

        Enabled     = $runtime.Enabled

        CheckedAt   = Get-Date

    }
}

# ============================================================================
# ALL SERVICE HEALTH
# ============================================================================

function Get-JDHostServicesHealth
{
    [CmdletBinding()]
    param()

    foreach($service in Get-JDHostRegisteredServices)
    {
        Get-JDHostServiceHealth `
            -Name $service.Name
    }
}

# ============================================================================
# HOST STATISTICS
# ============================================================================

function Get-JDHostStatistics
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    Update-JDHostManagedServiceCount | Out-Null

    [pscustomobject]@{

        HostStarts =
            $state.Statistics.HostStarts

        HostStops =
            $state.Statistics.HostStops

        Restarts =
            $state.Statistics.Restarts

        HealthChecks =
            $state.Statistics.HealthChecks

        RecoveryEvents =
            $state.Statistics.RecoveryEvents

        ManagedServices =
            $state.Statistics.ManagedServices

        LastHeartbeat =
            $state.LastHeartbeat

        LastHealthCheck =
            $state.LastHealthCheck

    }
}

# ============================================================================
# RESET HEALTH
# ============================================================================

function Reset-JDHostHealth
{
    [CmdletBinding()]
    param()

    Update-JDHostHealth `
        -Health "UNKNOWN"

    $state = Get-JDHostState

    $state.LastHeartbeat = $null

    return $true
}

# ============================================================================
# END OF FILE
# ============================================================================
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUaou+pwpuMdTpd/g2IP8cRT9J
# t2agggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFBWm5QUQENHS7MOgsOhf2lkJ
# Y8KwMA0GCSqGSIb3DQEBAQUABIIBgKHq4Nh9RHzKcFiIfhnPJXS8xkuBu6ZYFHrS
# ++QrRab/4pTjsSid+1qcKio6Hdr3FBjg3HKJ5jeE8I4cJ/VTeqcT0UWDKpCJWnxD
# fsDL3GnlgdgBat5dYrPsPoznhMuaFetoFr18T2w9z3HdK2pimp1Sk0dRNHRKOVhN
# 7EvIB5YFfcDKhceESXXbGHGfw48sIVjdTHscsTsCS3llKEj4nuDK/TXeDdCva/DC
# 7gv8K3MER7NjxGfpbbze9B9BPheCs7GRLjsC88RTZ+iJR33oG0msNMfpROpzHkss
# 36coAQ7IXSFcBNbH8iJHlGHOFmRuMaHHR4ade6Ie55IALJbIxr4F11nc75EIP6Kw
# fwzEFN/KVoLiprMNG0vH1c6qxZ162DUx5KHnO9ZdCgjLDMrfLI0qqBek9PCw80/j
# ZCqCkhCPkwJ+jIz9ffKDjERLDHZM+BGVGGiMUesOjnfb0I51s67O5GRJen4Vr9Dt
# CCdoWiqm3H8qXnP3dSmy5g0aPFFyLQ==
# SIG # End signature block
