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

        StartCommand =
            if($Registration.PSObject.Properties["StartCommand"])
            {
                $Registration.StartCommand
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
