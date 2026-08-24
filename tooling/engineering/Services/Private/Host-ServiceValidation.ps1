<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-ServiceValidation.ps1

Timestamp
22 July 2026 08:35

Work Package
PR-006F — Host State Singleton Refactor

Component
Operational Service Host

Purpose
Performs validation of Operational Services before lifecycle operations.
This module contains validation only and relies on the singleton-backed
host state provided by Host-State.ps1.

Dependencies
- Runtime-State.ps1
- Host-State.ps1
- Host-ServiceLookup.ps1
- Host-ServiceState.ps1
- Operational-Registry.psm1

Notes
- Private module
- Dot-sourced by Operational-ServiceHost.psm1
- Uses only the public Operational Registry API
==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# ASSERT SERVICE EXISTS
# ============================================================================

function Assert-JDHostServiceExists
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    if (-not (Test-JDHostServiceExists -Name $Name))
    {
        throw "Operational Service '$Name' is not registered."
    }

    return
}

# ============================================================================
# ASSERT SERVICE ENABLED
# ============================================================================

function Assert-JDHostServiceEnabled
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $service = Get-JDHostRegisteredService -Name $Name

    if (-not $service.RuntimeStatus.Enabled)
    {
        throw "Operational Service '$Name' is disabled."
    }

    return
}

# ============================================================================
# ASSERT HOST RUNNING
# ============================================================================

function Assert-JDHostRunning
{
    [CmdletBinding()]
    param()

    #
    # Runtime state is now supplied by the singleton provider.
    #
    $state = Get-JDHostState

    Write-Host ""
    Write-Host "================ HOST VALIDATION ================" -ForegroundColor Yellow
    Write-Host ("Running      : {0}" -f $state.Running)
    Write-Host ("Initialised  : {0}" -f $state.Initialised)
Write-Host ("Bootstrapping: {0}" -f $state.Bootstrapping)
Write-Host ("Starting     : {0}" -f $state.Starting)
Write-Host ("Lifecycle    : {0}" -f $state.LifecycleState)
    Write-Host ("Health       : {0}" -f $state.HealthState)
    Write-Host ("StartedAt    : {0}" -f $state.StartedAt)
    Write-Host ("Heartbeat    : {0}" -f $state.LastHeartbeat)
    Write-Host ("Object Hash  : {0}" -f ([System.Runtime.CompilerServices.RuntimeHelpers]::GetHashCode($state)))
    Write-Host "=================================================" -ForegroundColor Yellow
    Write-Host ""

    #
# During startup the host has been initialised but has not yet entered
# the Running state. Service registration is valid while the runtime is
# still starting.
#

#
# During bootstrap the Operational Host intentionally has not entered the
# Running state. Service registration is permitted while Bootstrapping or
# Starting provided the host has already been initialised.
#

if (-not $state.Running)
{
    $bootstrapActive =
        ($state.Bootstrapping -eq $true) -or
        ($state.Starting -eq $true)

    if ($state.Initialised -and $bootstrapActive)
    {
        return
    }
Write-Host ""
Write-Host "===== ASSERT-JDHOSTRUNNING CALL STACK =====" -ForegroundColor Cyan
Get-PSCallStack | Select-Object FunctionName, Location | Format-Table -AutoSize
Write-Host "==========================================" -ForegroundColor Cyan
    throw "Operational Service Host is not running."
}

return

}   # <-- closes Assert-JDHostRunning

# ============================================================================
# ASSERT SERVICE STOPPED
# ============================================================================

function Assert-JDHostServiceStopped
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $runtime = Get-JDHostServiceState -Name $Name

    if ($runtime.State -eq "RUNNING")
    {
        throw "Operational Service '$Name' is already running."
    }

    return
}

# ============================================================================
# ASSERT SERVICE RUNNING
# ============================================================================

function Assert-JDHostServiceRunning
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $runtime = Get-JDHostServiceState -Name $Name

    if ($runtime.State -ne "RUNNING")
    {
        throw "Operational Service '$Name' is not running."
    }

    return
}

# ============================================================================
# TEST SERVICE READY
# ============================================================================

function Test-JDHostServiceReady
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    try
    {
        Assert-JDHostRunning

        Assert-JDHostServiceExists `
            -Name $Name

        Assert-JDHostServiceEnabled `
            -Name $Name

        return $true
    }
    catch
    {
        return $false
    }
}

# ============================================================================
# VALIDATE SERVICE
# ============================================================================

function Test-JDHostServiceValidation
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $service = Get-JDHostRegisteredService `
        -Name $Name

    if ($null -eq $service)
    {
        return $false
    }

    if ($null -eq $service.RuntimeStatus)
    {
        return $false
    }

    return $true
}

function Assert-JDHostInitialised
{
    [CmdletBinding()]
    param()

    $state = Get-JDHostState

    if ($null -eq $state)
    {
        throw "Operational Service Host state has not been created."
    }

    if (-not $state.Initialised)
    {
        throw "Operational Service Host has not been initialised."
    }

    return $true
}

# ============================================================================
# END OF FILE
# ============================================================================
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUbaI8WSOSUQxvdkZfG+kyNZP/
# MkGgggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFDnZwiuaijyVLRK6o+tsscx3
# NN8BMA0GCSqGSIb3DQEBAQUABIIBgF1Re086swjZMff5EipQs7TLsmK8B0mB3vOs
# VhgOOuLxWkUHC32N+e/sECW63yK4/AxisvaP1CCOLllnXTH3Dn4x90Uq1S5QPTdB
# ZXHbmAGdTsykruor5E5vcX4xcwFnn2aooTLRVp5Iaa4uuTDpp/qtPYZmMCNQGiTL
# XO9RiuSmqXMYLDhzu/GwHSiBaNbdEkU556rMZSu3bt3YKUn/2OErGm3uZsWyLXjv
# E9SVNXBh0Tala2//Zqu292D0i/XkvdrzgeBrAFucLEE53kDX8J6XbTnGDQ+HesBD
# NrKxeG78pydcVfPsSYinrmxMCjMJklvMMr3d3bWubm7Ecc8I7xbny+0YhNT1yD9B
# 0578qEGR+DJtNGJahupV2g4zgXaXEXJYm+dMWMb+RCKClKz9mCp7DtVYt9dMDsTm
# hxqokqop20jb2dXcMR29KVKgwuu2NjWr4BREp9OHRp+JO0HdC8UVWBIcXW0MK17R
# W8fvh9TfYklcDA3oP97vhlbZHBatXQ==
# SIG # End signature block
