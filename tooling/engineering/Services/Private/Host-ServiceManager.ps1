<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-ServiceManager.ps1

Timestamp
13 August 2026 21:23 (Sydney)

Work Package
WP-HARVEST-001 / PR-001

Component
Operational Service Host

Purpose
Implements lifecycle management for managed Operational Services and
coordinates execution of managed runtime commands.

Dependencies

- Host-State.ps1
- Host-ServiceLookup.ps1
- Host-ServiceState.ps1
- Host-ServiceValidation.ps1
- Engineering-Common.psm1

Notes

- Private module
- Dot-sourced by Operational-ServiceHost.psm1
- Implements Managed Runtime Contract
- Preserves the established lifecycle and synchronisation behaviour.
- Engineering-Common logging is module-qualified to avoid nested module-scope
  command resolution failures.
==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# INVOKE MANAGED SERVICE COMMAND
# ============================================================================

function Invoke-JDHostServiceCommand
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [PSCustomObject]
        $Service,

        [Parameter(Mandatory)]
        [ValidateSet(
            "Start",
            "Stop",
            "Restart",
            "Pause",
            "Resume",
            "Status",
            "Health",
            "Metrics"
        )]
        [string]
        $Operation
    )

    # ------------------------------------------------------------------------
    # Resolve command property
    # ------------------------------------------------------------------------

    $property =
        "{0}Command" -f $Operation

    if(-not $Service.PSObject.Properties[$property])
    {
        throw (
            "Operational Service '{0}' does not expose '{1}'." -f
            $Service.Name,
            $property
        )
    }

    $commandName =
        $Service.$property

    if([string]::IsNullOrWhiteSpace($commandName))
    {
        throw (
            "Operational Service '{0}' has no '{1}' configured." -f
            $Service.Name,
            $property
        )
    }

    # ------------------------------------------------------------------------
    # Resolve command
    # ------------------------------------------------------------------------

    $command =
        Get-Command `
            -Name $commandName `
            -ErrorAction SilentlyContinue

    if($null -eq $command)
    {
        throw (
            "Managed Service command '{0}' could not be resolved." -f
            $commandName
        )
    }

    # ------------------------------------------------------------------------
    # Execute command
    # ------------------------------------------------------------------------

    Engineering-Common\Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Invoking managed service command '{0}' for [{1}]." -f
            $commandName,
            $Service.Name
        )

    return (& $commandName)
}

# ============================================================================
# INVOKE MANAGED SERVICE WORK
# ============================================================================
#
# Work execution is deliberately distinct from lifecycle operations.
#
# The registered service MUST expose an explicit WorkCommand property.
# WorkCommand is never inferred from:
#
#     StartCommand
#     StartupCommand
#     ExecuteCommand
#
# The command result is returned unchanged and genuine exceptions propagate
# to the caller so the scheduler cannot record false success.
#
# ============================================================================

function Invoke-JDHostServiceWork
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    # ------------------------------------------------------------------------
    # Validate Host
    # ------------------------------------------------------------------------

    Assert-JDHostRunning

    # ------------------------------------------------------------------------
    # Validate registered service
    # ------------------------------------------------------------------------

    Assert-JDHostServiceExists `
        -Name $Name

    Assert-JDHostServiceEnabled `
        -Name $Name

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    if($null -eq $service)
    {
        throw (
            "Operational Service '{0}' could not be resolved for work execution." -f
            $Name
        )
    }

    # ------------------------------------------------------------------------
    # Resolve explicit work binding
    # ------------------------------------------------------------------------

    $workCommandProperty =
        $service.PSObject.Properties["WorkCommand"]

    if($null -eq $workCommandProperty)
    {
        throw (
            "Operational Service '{0}' does not expose an authorised 'WorkCommand'." -f
            $Name
        )
    }

    $workCommand =
        [string]$workCommandProperty.Value

    if([string]::IsNullOrWhiteSpace($workCommand))
    {
        throw (
            "Operational Service '{0}' has no authorised 'WorkCommand' configured." -f
            $Name
        )
    }

    # ------------------------------------------------------------------------
    # Resolve work command
    # ------------------------------------------------------------------------

    $command =
        Get-Command `
            -Name $workCommand `
            -ErrorAction SilentlyContinue

    if($null -eq $command)
    {
        throw (
            "Operational Service work command '{0}' could not be resolved for [{1}]." -f
            $workCommand,
            $Name
        )
    }

    # ------------------------------------------------------------------------
    # Execute authorised service work
    # ------------------------------------------------------------------------

    Engineering-Common\Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Invoking managed service work command '{0}' for [{1}]." -f
            $workCommand,
            $Name
        )

    return (& $workCommand)
}


# ============================================================================
# START SERVICE
# ============================================================================

function Start-JDHostService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    Assert-JDHostRunning

    Assert-JDHostServiceExists `
        -Name $Name

    Assert-JDHostServiceEnabled `
        -Name $Name

    Assert-JDHostServiceStopped `
        -Name $Name

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    Invoke-JDHostServiceCommand `
        -Service $service `
        -Operation Start | Out-Null

    Sync-JDHostManagedService `
        -Name $Name | Out-Null

    Update-JDHostServiceTimestamp `
        -Name $Name | Out-Null

    Engineering-Common\Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Operational Service [{0}] started." -f
            $Name
        )

    return Get-JDHostRegisteredService `
        -Name $Name
}

# ============================================================================
# STOP SERVICE
# ============================================================================

function Stop-JDHostService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    Assert-JDHostRunning

    Assert-JDHostServiceExists `
        -Name $Name

    Assert-JDHostServiceRunning `
        -Name $Name

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    Invoke-JDHostServiceCommand `
        -Service $service `
        -Operation Stop | Out-Null

    Sync-JDHostManagedService `
        -Name $Name | Out-Null

    Update-JDHostServiceTimestamp `
        -Name $Name | Out-Null

    Engineering-Common\Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Operational Service [{0}] stopped." -f
            $Name
        )

    return Get-JDHostRegisteredService `
        -Name $Name
}

# ============================================================================
# RESTART SERVICE
# ============================================================================

function Restart-JDHostService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    Invoke-JDHostServiceCommand `
        -Service $service `
        -Operation Restart | Out-Null

    Sync-JDHostManagedService `
        -Name $Name | Out-Null

    Update-JDHostServiceTimestamp `
        -Name $Name | Out-Null

    $state =
        Get-JDHostState

    $state.Statistics.Restarts++

    Engineering-Common\Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Operational Service [{0}] restarted." -f
            $Name
        )

    return Get-JDHostRegisteredService `
        -Name $Name
}

# ============================================================================
# START ALL ENABLED SERVICES
# ============================================================================

function Start-JDHostEnabledServices
{
    [CmdletBinding()]
    param()

    foreach($service in Get-JDHostEnabledServices)
    {
        if($service.RuntimeStatus.State -ne "RUNNING")
        {
            Start-JDHostService `
                -Name $service.Name | Out-Null
        }
    }

    Update-JDHostManagedServiceCount | Out-Null
}

# ============================================================================
# STOP ALL RUNNING SERVICES
# ============================================================================

function Stop-JDHostRunningServices
{
    [CmdletBinding()]
    param()

    foreach($service in Get-JDHostServicesByState `
        -State "RUNNING")
    {
        try
        {
            Stop-JDHostService `
                -Name $service.Name | Out-Null
        }
        catch
        {
            Engineering-Common\Write-JDEngineeringLog `
                -Level Error `
                -Message (
                    "Failed to stop Operational Service [{0}]. {1}" -f
                    $service.Name,
                    $_.Exception.Message
                )

            throw
        }
    }

    Update-JDHostManagedServiceCount | Out-Null
}

# ============================================================================
# SYNCHRONISE MANAGED SERVICE
# ============================================================================

function Sync-JDHostManagedService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    Assert-JDHostServiceExists `
        -Name $Name

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    try
    {
        $status =
            Invoke-JDHostServiceCommand `
                -Service $service `
                -Operation Status
    }
    catch
    {
        return $service
    }

    if($null -eq $status)
    {
        return $service
    }

    if($status.PSObject.Properties["Running"])
    {
        if($status.Running)
        {
            Set-JDHostServiceState `
                -Name $Name `
                -State "RUNNING" | Out-Null
        }
        else
        {
            Set-JDHostServiceState `
                -Name $Name `
                -State "STOPPED" | Out-Null
        }

        Update-JDHostServiceTimestamp `
            -Name $Name | Out-Null
    }

    return Get-JDHostRegisteredService `
        -Name $Name
}

# ============================================================================
# SYNCHRONISE ALL MANAGED SERVICES
# ============================================================================

function Sync-JDHostManagedServices
{
    [CmdletBinding()]
    param()

    foreach($service in Get-JDHostRegisteredServices)
    {
        Sync-JDHostManagedService `
            -Name $service.Name | Out-Null
    }

    Update-JDHostManagedServiceCount | Out-Null
}

# ============================================================================
# END OF FILE
# ============================================================================

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUXqre6INSEjN1uO0jbjChPOW2
# y2egggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFPrWnJ894byTNGI9K46Ii2L6
# heUWMA0GCSqGSIb3DQEBAQUABIIBgHmXPHYlCQjrvA0Bo6U8R554YQJR2KrM/c9Q
# RuI0N9SrW8qUQFrIWpuIoCiE/312he1FkQZDXNpl7NryTVhiHNk1g1z3t5UOfiKv
# kZy7VjQACpW6qM6ce0msISIatyUGucdgqafM1nkYPLcIZJizXr5/fT72trJeXEb7
# 9YsPx37/XjzDyvyxwW/KXTay9RsploeY86ifAbOcqcdq4s7r2WCqiwxwfCs/26t2
# v2H7Di5oH0ZgXK7Trgtj1DYVUQpVMkWDmSh+tvlDdkJXKuu2TSupwydb45uqcvhW
# d+PPq0AJdhA5jBZ7Zb7gqOdYB+nA3qnn846I/L/fKGMBY3C7vJTW0aFPv9rhe76a
# xRunsvah5DZL7YyLXWJEio+t1+0zPwSlq/WmeKMsgMtM067S3ETx51+9NRUQNXt3
# HeRjBW6Pq8fMYRM7ismXCEuy1BZnbZ8rx/mC8z08kScsKzYIdTS0kJEtu/TdA4jc
# EAQGjGyQNz+R/0UE1fEq+P0jwWhfoQ==
# SIG # End signature block
