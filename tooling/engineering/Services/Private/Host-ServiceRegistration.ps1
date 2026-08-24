<#
==============================================================================
JustDefenders©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-ServiceRegistration.ps1

Timestamp
12 July 2026 08:50

Work Package
WP-S004B-01A — Host-ServiceRegistration Contract Migration

Component
Operational Service Host

Purpose

Provides the authoritative private registration engine for the
JustDefenders Operational Service Host.

This module is responsible for creating, storing and removing managed
Operational Services.

Responsibilities

    • Validate registration contracts
    • Create managed service records
    • Initialise RuntimeStatus
    • Persist registrations
    • Remove registrations
    • Maintain registration timestamps

The module does NOT:

    • Start services
    • Stop services
    • Restart services
    • Pause services
    • Resume services
    • Perform health checks
    • Execute scheduler cycles

Dependencies

    • Host-State.ps1
    • Host-ServiceState.ps1
    • Host-ServiceLookup.ps1
    • Host-ServiceValidation.ps1
    • Engineering-Common

Notes

    • Private implementation.
    • Single source of truth for Operational Service registration.
    • Registration contract standardised on *Command members.
    • No ScriptBlocks are stored in the registry.

==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# REGISTER OPERATIONAL SERVICE
# ============================================================================

function Register-JDOperationalService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [PSCustomObject]
        $Registration
    )

    # ========================================================================
    # VALIDATE REGISTRATION CONTRACT
    # ========================================================================

    foreach($property in @(
        "Name",
        "Version"
    ))
    {
        if(
            -not $Registration.PSObject.Properties[$property] -or
            [string]::IsNullOrWhiteSpace($Registration.$property)
        )
        {
            throw (
                "Registration contract violation. Missing required property '{0}'." -f
                $property
            )
        }
    }

    # ========================================================================
    # PREVENT DUPLICATE REGISTRATION
    # ========================================================================

    if(Test-JDHostServiceExists -Name $Registration.Name)
    {
        throw (
            "Operational Service '{0}' is already registered." -f
            $Registration.Name
        )
    }

    # ========================================================================
    # BUILD RUNTIME STATUS
    # ========================================================================

    $runtimeStatus = [PSCustomObject]@{

        State =
            "REGISTERED"

        Health =
            "UNKNOWN"

        Enabled =
            if($Registration.PSObject.Properties["Enabled"])
            {
                [bool]$Registration.Enabled
            }
            else
            {
                $true
            }

        Running =
            $false

        StartedAt =
            $null

        StoppedAt =
            $null

        LastHeartbeat =
            $null

    }

    # ========================================================================
    # BUILD SERVICE RECORD
    # ========================================================================

    $service = [PSCustomObject]@{

        #
        # Identity
        #

        Name =
            $Registration.Name

        DisplayName =
            if($Registration.PSObject.Properties["DisplayName"])
            {
                $Registration.DisplayName
            }
            else
            {
                $Registration.Name
            }

        Description =
            if($Registration.PSObject.Properties["Description"])
            {
                $Registration.Description
            }
            else
            {
                ""
            }

        Version =
            $Registration.Version

        WorkPackage =
            if($Registration.PSObject.Properties["WorkPackage"])
            {
                $Registration.WorkPackage
            }
            else
            {
                ""
            }

        RuntimeType =
            if($Registration.PSObject.Properties["RuntimeType"])
            {
                $Registration.RuntimeType
            }
            else
            {
                "ManagedService"
            }

        #
        # Runtime
        #

        RuntimeStatus =
            $runtimeStatus

        #
        # Lifecycle Commands
        #

        StartupCommand =
            if($Registration.PSObject.Properties["StartupCommand"])
            {
                $Registration.StartupCommand
            }
            else
            {
                $null
            }

        WorkCommand =
            if($Registration.PSObject.Properties["WorkCommand"])
            {
                $Registration.WorkCommand
            }
            else
            {
                $null
            }

        StopCommand =
            if($Registration.PSObject.Properties["StopCommand"])
            {
                $Registration.StopCommand
            }
            else
            {
                $null
            }

        RestartCommand =
            if($Registration.PSObject.Properties["RestartCommand"])
            {
                $Registration.RestartCommand
            }
            else
            {
                $null
            }

        PauseCommand =
            if($Registration.PSObject.Properties["PauseCommand"])
            {
                $Registration.PauseCommand
            }
            else
            {
                $null
            }

        ResumeCommand =
            if($Registration.PSObject.Properties["ResumeCommand"])
            {
                $Registration.ResumeCommand
            }
            else
            {
                $null
            }

        #
        # PART 1 CONTINUES
        #

        #
        # Reporting Commands
        #

        StatusCommand =
            if($Registration.PSObject.Properties["StatusCommand"])
            {
                $Registration.StatusCommand
            }
            else
            {
                $null
            }

        HealthCommand =
            if($Registration.PSObject.Properties["HealthCommand"])
            {
                $Registration.HealthCommand
            }
            else
            {
                $null
            }

        MetricsCommand =
            if($Registration.PSObject.Properties["MetricsCommand"])
            {
                $Registration.MetricsCommand
            }
            else
            {
                $null
            }

        #
        # Configuration
        #

        Enabled =
            if($Registration.PSObject.Properties["Enabled"])
            {
                [bool]$Registration.Enabled
            }
            else
            {
                $true
            }

        AutoStart =
            if($Registration.PSObject.Properties["AutoStart"])
            {
                [bool]$Registration.AutoStart
            }
            else
            {
                $false
            }

        #
        # Capabilities
        #

        Capabilities =
            if($Registration.PSObject.Properties["Capabilities"])
            {
                $Registration.Capabilities
            }
            else
            {
                @()
            }

        #
        # Registration Metadata
        #

        RegisteredBy =
            if($Registration.PSObject.Properties["RegisteredBy"])
            {
                $Registration.RegisteredBy
            }
            else
            {
                $env:USERNAME
            }

        RegisteredAt =
            if($Registration.PSObject.Properties["RegisteredAt"])
            {
                $Registration.RegisteredAt
            }
            else
            {
                Get-Date
            }

        UpdatedAt =
            Get-Date

    }

    # ========================================================================
    # PERSIST SERVICE REGISTRATION
    # ========================================================================

    Add-JDHostRegisteredService `
    -Service $service | Out-Null

    # ========================================================================
    # SYNCHRONISE HOST METADATA
    # ========================================================================

    Update-JDHostManagedServiceCount | Out-Null

    # ========================================================================
    # ENGINEERING LOG
    # ========================================================================

    Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Operational Service '{0}' registered." -f
            $service.Name
        )

    return $service
}

# ============================================================================
# UNREGISTER OPERATIONAL SERVICE
# ============================================================================

function Unregister-JDOperationalService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    if(-not (Test-JDHostServiceExists -Name $Name))
    {
        throw (
            "Operational Service '{0}' is not registered." -f
            $Name
        )
    }

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    if($null -eq $service)
    {
        throw (
            "Unable to retrieve Operational Service '{0}'." -f
            $Name
        )
    }

    Remove-JDHostRegisteredService `
        -Name $Name

    Update-JDHostManagedServiceCount | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Operational Service '{0}' unregistered." -f
            $Name
        )

    return $true
}

# ============================================================================
# GET REGISTERED OPERATIONAL SERVICE
# ============================================================================

function Get-JDRegisteredOperationalService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    return Get-JDHostRegisteredService `
        -Name $Name
}

# ============================================================================
# PART 2 CONTINUES
# ============================================================================

# ============================================================================
# TEST OPERATIONAL SERVICE REGISTRATION
# ============================================================================

function Test-JDOperationalServiceRegistration
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    return (Test-JDHostServiceExists -Name $Name)
}

# ============================================================================
# VALIDATE OPERATIONAL SERVICE CONTRACT
# ============================================================================

function Assert-JDOperationalServiceContract
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [PSCustomObject]
        $Service
    )

    foreach($property in @(
        "Name",
        "Version",
        "RuntimeStatus",
        "RegisteredAt",
        "UpdatedAt"
    ))
    {
        if(-not $Service.PSObject.Properties[$property])
        {
            throw (
                "Operational Service contract violation. " +
                "Missing property '{0}'." -f
                $property
            )
        }
    }

    foreach($property in @(
        "State",
        "Health",
        "Enabled",
        "Running"
    ))
    {
        if(-not $Service.RuntimeStatus.PSObject.Properties[$property])
        {
            throw (
                "Operational RuntimeStatus contract violation. " +
                "Missing property '{0}'." -f
                $property
            )
        }
    }

    foreach($property in @(
        "StartCommand",
        "WorkCommand",
        "StopCommand",
        "RestartCommand",
        "PauseCommand",
        "ResumeCommand",
        "StatusCommand",
        "HealthCommand",
        "MetricsCommand"
    ))
    {
        if(-not $Service.PSObject.Properties[$property])
        {
            throw (
                "Operational Service contract violation. " +
                "Missing property '{0}'." -f
                $property
            )
        }
    }

    return $true
}

# ============================================================================
# VALIDATE REGISTRY CONSISTENCY
# ============================================================================

function Test-JDOperationalServiceRegistry
{
    [CmdletBinding()]
    param()

    $services =
        Get-JDHostRegisteredServices

    foreach($service in $services)
    {
        Assert-JDOperationalServiceContract `
            -Service $service | Out-Null
    }

    return [PSCustomObject]@{

        RegisteredServices =
            @($services).Count

        Valid =
            $true

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# END OF FILE
# ============================================================================

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUcLTxFdkLLf87cQG4zedVNANc
# YeigggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFGpT7qOLY+CrZ7IzV8pG8TXv
# 2/3GMA0GCSqGSIb3DQEBAQUABIIBgIPTZVS5w5TRgfkcLNJDbCOVGbIW7nzfvNdu
# +FR2l5BpIg2gFhx5/m106uFY1h3rgh+JnuI566KrOuPpcV4pP6XuwpoJYkzqqzG7
# WkcLP4aUWbqBirUXPOSoBIzQFZJ3zJsoIL2v8c/1D/bf92Idj+oTluNzB8xTbPKi
# +EVd+6L1mQDzBrdK8GvwlUyho8jjjy76Pm3x0nXH1CoaIoygUKp+l9fJy5Is/iub
# hZ3DFv7fSrhrJAox0UhLhorarhzD9I1vxkUcOnV3AsY0G+lcTCBR9Y4nTVfjuJoI
# 7vq7dGCyCmMmWGt0eE3f5lTe7QnWjCsdl+5s38t+Q9W7NtQwJZduw/29ep2C7KPZ
# mb0YU+bd250ScUZq2dpuXAJUKmD7nXXwajFyURrdJU1nJFMGdhEqjnlGmKg+smF9
# anfS/IpZnl0VklSqdcH9aojuHVmbItqqHW+WPqOYgXM/MZd3FRYafgZJdBEvokMZ
# VTJsrYGBc/10+AewQlK+cAFlsFSPFA==
# SIG # End signature block
