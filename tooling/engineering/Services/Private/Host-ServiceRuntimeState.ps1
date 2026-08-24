<#
==============================================================================
JustDefenders©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-ServiceRuntimeState.ps1

Timestamp
12 July 2026 12:45

Work Package
WP-S004C-01 — Host Runtime State Manager

Component
Operational Service Host

Purpose

Provides runtime state management for registered Operational Services.

Responsibilities

    • Read RuntimeStatus
    • Update RuntimeStatus
    • Update lifecycle timestamps

Dependencies

    • Host-ServiceState.ps1
    • Host-ServiceLookup.ps1

Notes

    • Private implementation
    • Owns runtime state only
    • Does not modify the registry

==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# GET RUNTIME STATE
# ============================================================================

function Get-JDHostServiceState
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    if($null -eq $service)
    {
        throw (
            "Operational Service '{0}' is not registered." -f
            $Name
        )
    }

    if($null -eq $service.RuntimeStatus)
    {
        throw (
            "Operational Service '{0}' has no RuntimeStatus." -f
            $Name
        )
    }

    return $service.RuntimeStatus
}

# ============================================================================
# PART 1 CONTINUES
# ============================================================================

# ============================================================================
# SET RUNTIME STATE
# ============================================================================

function Set-JDHostServiceState
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name,

        [Parameter(Mandatory)]
        [ValidateSet(
            "REGISTERED",
            "STARTING",
            "RUNNING",
            "STOPPING",
            "STOPPED",
            "FAILED"
        )]
        [string]
        $State
    )

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    if($null -eq $service)
    {
        throw (
            "Operational Service '{0}' is not registered." -f
            $Name
        )
    }

    if($null -eq $service.RuntimeStatus)
    {
        $service | Add-Member `
            -MemberType NoteProperty `
            -Name RuntimeStatus `
            -Value ([PSCustomObject]@{

                State           = "REGISTERED"
                Health          = "UNKNOWN"
                Enabled         = $true
                Running         = $false
                StartedAt       = $null
                StoppedAt       = $null
                LastHeartbeat   = $null

            })
    }

    $service.RuntimeStatus.State = $State

    switch ($State)
    {
        "RUNNING"
        {
            $service.RuntimeStatus.Running   = $true
            $service.RuntimeStatus.StartedAt = Get-Date
        }

        "STOPPED"
        {
            $service.RuntimeStatus.Running   = $false
            $service.RuntimeStatus.StoppedAt = Get-Date
        }

        default
        {
            # Preserve existing Running state.
        }
    }

    return $service.RuntimeStatus
}

# ============================================================================
# UPDATE RUNTIME TIMESTAMP
# ============================================================================

function Update-JDHostServiceTimestamp
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    $runtime =
        Get-JDHostServiceState `
            -Name $Name

    $runtime.LastHeartbeat =
        Get-Date

    return $runtime.LastHeartbeat
}

# ============================================================================
# PART 2 CONTINUES
# ============================================================================

# ============================================================================
# VALIDATE RUNTIME STATE
# ============================================================================

function Assert-JDHostServiceRuntimeState
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    $runtime =
        Get-JDHostServiceState `
            -Name $Name

    foreach($property in @(
        "State",
        "Health",
        "Enabled",
        "Running",
        "StartedAt",
        "StoppedAt",
        "LastHeartbeat"
    ))
    {
        if(-not $runtime.PSObject.Properties[$property])
        {
            throw (
                "Runtime state contract violation. Missing property '{0}'." -f
                $property
            )
        }
    }

    return $true
}

# ============================================================================
# RESET RUNTIME STATE
# ============================================================================

function Reset-JDHostServiceRuntimeState
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    $runtime =
        Get-JDHostServiceState `
            -Name $Name

    $runtime.State         = "REGISTERED"
    $runtime.Health        = "UNKNOWN"
    $runtime.Running       = $false
    $runtime.StartedAt     = $null
    $runtime.StoppedAt     = $null
    $runtime.LastHeartbeat = $null

    return $runtime
}

# ============================================================================
# END OF FILE
# ============================================================================

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQU9gR1YETfdIMJ14Hp7zDn6++c
# LzagggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFHhlLdKZKPRtSeU17R0OO+/z
# ysbbMA0GCSqGSIb3DQEBAQUABIIBgLr9IRWWushb0IQaFH5XCtPDNOWHU1gW1xLO
# z4Wu09axxCwic+DcWZ75FiGhGLR5G1jkqUFWXyyEc/Ovrb4vr8+/Os+ihrSTcJHp
# nmS3ey10RPnGSzt4lI24XT9l8HqfZXulVRmvJ2WbcFemUjNGSyH/UVYrryga2Oxs
# BCrnU6spZ+WNb7LIecL979HnWS+i4+iRxfVfLB8wQ/5uxU24CX9NbEMujEZOwcCr
# MrWzGRAAKX0c0B5wVGvF8ofsN8lJUiuvvvsKFY1jBu0bwYxO3jQZUST8EKwPC9LV
# SzzaIMEzN2K+wh0yHpOHBZ5/wTOVtqBGkegKMTeKmhsnZBETRv2BHmNMpLLp1Z4i
# Wpcq7S8YL1EgxXr8jhKrI9VKQ+gUQOnhfuH+KDjQCr/RzO9HSfOIth4YB1HFS7rR
# 1dfIakYeLXQi2GkFdrqAdKPNpuxsfn2DK2T+z3+0Qa7dTpCPJLvbn5ZJnUpDEf65
# 1mXVH8rvwM78khMjPJ8sIHUJhsJ1cg==
# SIG # End signature block
