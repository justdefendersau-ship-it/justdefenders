<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\
tooling\
engineering\
Services\
Public\
Register-JDHarvesterService.ps1

Timestamp
15 August 2026 20:41 Sydney

Work Package
MS-006 / Operational Scheduler — Harvester Work-Execution Contract

Component
Public Registration API

Purpose
Registers the JustDefenders Harvester Runtime with the
Operational Service Host.

Responsibilities

    • Validate Operational Host availability
    • Construct the Harvester registration contract
    • Delegate registration to the Operational Host
    • Return the registration summary

Contract Authority

    StartCommand is the canonical Operational Registry lifecycle
    startup property.

    StartupCommand is retained as the Host Service compatibility
    property and carries the same lifecycle command.

    WorkCommand is the explicit Operational Service Host work-execution
    property and binds the Harvester service to the established
    Invoke-JDHarvesterCycle work API.

Notes

    • This cmdlet owns NO registry state.
    • This cmdlet owns NO lifecycle state.
    • All registry operations are delegated to the
      Operational Service Host.
    • The Operational Registry contract requires StartCommand.
    • StartupCommand is retained for Host Service compatibility.
    • WorkCommand is distinct from lifecycle command properties.
    • WorkCommand SHALL resolve to Invoke-JDHarvesterCycle.
    • No acquisition logic is implemented here.

==============================================================================
#>

Set-StrictMode -Version Latest

function Register-JDHarvesterService
{
    [CmdletBinding()]
    param()

    # ========================================================================
    # VALIDATE HOST
    # ========================================================================

    $hostStatus =
        Get-JDOperationalHostStatus

    if ($null -eq $hostStatus)
    {
        throw "Operational Service Host status is unavailable."
    }

    if (-not $hostStatus.Running)
    {
        throw "Operational Service Host is not running."
    }

    if (-not $hostStatus.Initialised)
    {
        throw "Operational Service Host is not initialised."
    }

    # ========================================================================
    # BUILD REGISTRATION CONTRACT
    # ========================================================================

    $registration = [PSCustomObject]@{

        #
        # Identity
        #

        Name =
            "Harvester"

        DisplayName =
            "JustDefenders Harvester Runtime"

        Description =
            "Managed Harvester Runtime"

        Version =
            "0.1.0"

        WorkPackage =
            "WP-S004-02"

        RuntimeType =
            "ManagedService"

        #
        # Runtime Commands
        #
        # StartCommand is the canonical Operational Registry contract
        # property.
        #
        # StartupCommand is retained as the Host Service compatibility
        # property and carries the same lifecycle command.
        #
        # WorkCommand is the explicit Operational Service Host work
        # execution property and binds Harvester work to the existing
        # public Invoke-JDHarvesterCycle API.
        #

        StartCommand =
            "Start-JDHarvester"

        StartupCommand =
            "Start-JDHarvester"

        WorkCommand =
            "Invoke-JDHarvesterCycle"

        StopCommand =
            "Stop-JDHarvester"

        RestartCommand =
            "Restart-JDHarvester"

        #
        # Monitoring
        #

        StatusCommand =
            "Get-JDHarvesterStatus"

        HealthCommand =
            "Get-JDHarvesterHealth"

        MetricsCommand =
            "Get-JDHarvesterMetrics"

        #
        # Configuration
        #

        Enabled =
            $true

        AutoStart =
            $false

        RegisteredBy =
            $env:USERNAME

        RegisteredAt =
            Get-Date
    }

    # ========================================================================
    # AUTHORITATIVE CONTRACT ASSERTIONS
    # ========================================================================

    if ([string]::IsNullOrWhiteSpace([string]$registration.Name))
    {
        throw "Harvester registration contract is missing Name."
    }

    if ([string]::IsNullOrWhiteSpace([string]$registration.Version))
    {
        throw "Harvester registration contract is missing Version."
    }

    if ([string]::IsNullOrWhiteSpace([string]$registration.StartCommand))
    {
        throw "Harvester registration contract is missing StartCommand."
    }

    if ([string]::IsNullOrWhiteSpace([string]$registration.StartupCommand))
    {
        throw "Harvester registration contract is missing StartupCommand."
    }

    if ([string]::IsNullOrWhiteSpace([string]$registration.WorkCommand))
    {
        throw "Harvester registration contract is missing WorkCommand."
    }

    if ([string]$registration.WorkCommand -ne "Invoke-JDHarvesterCycle")
    {
        throw (
            "Harvester registration contract WorkCommand must be " +
            "'Invoke-JDHarvesterCycle'."
        )
    }

    if ([string]::IsNullOrWhiteSpace([string]$registration.StatusCommand))
    {
        throw "Harvester registration contract is missing StatusCommand."
    }

    # ========================================================================
    # DELEGATE REGISTRATION
    # ========================================================================

    $service =
        Register-JDOperationalHostService `
            -Registration $registration

    if ($null -eq $service)
    {
        throw "Operational Service Host did not return a registration result."
    }

    # ========================================================================
    # VALIDATE HOST REGISTRATION RESULT
    #
    # Register-JDOperationalHostService returns a Host-facing projection.
    # It does NOT return the underlying Operational Registry record.
    # ========================================================================

    if (-not $service.PSObject.Properties["Name"])
    {
        throw (
            "Registration contract violation. " +
            "Operational Service Host registration result is missing property 'Name'."
        )
    }

    if ([string]::IsNullOrWhiteSpace([string]$service.Name))
    {
        throw "Registration contract violation. Returned service Name is empty."
    }

    if (-not $service.PSObject.Properties["State"])
    {
        throw (
            "Registration contract violation. " +
            "Operational Service Host registration result is missing property 'State'."
        )
    }

    if (-not $service.PSObject.Properties["Health"])
    {
        throw (
            "Registration contract violation. " +
            "Operational Service Host registration result is missing property 'Health'."
        )
    }

    if (-not $service.PSObject.Properties["Enabled"])
    {
        throw (
            "Registration contract violation. " +
            "Operational Service Host registration result is missing property 'Enabled'."
        )
    }

    # ========================================================================
    # BUILD PUBLIC RESULT
    #
    # Identity and contract values come from the authoritative registration
    # object constructed above.
    #
    # Runtime projection values come from the Host Registration API result.
    #
    # WorkCommand is returned from the authoritative registration contract.
    # It is not inferred from the Host-facing projection.
    # ========================================================================

    $result = [PSCustomObject]@{

        Name =
            $registration.Name

        DisplayName =
            $registration.DisplayName

        Description =
            $registration.Description

        Version =
            $registration.Version

        WorkPackage =
            $registration.WorkPackage

        RuntimeType =
            $registration.RuntimeType

        #
        # Canonical Operational Registry lifecycle command
        #

        StartCommand =
            $registration.StartCommand

        #
        # Host Service compatibility lifecycle command
        #

        StartupCommand =
            $registration.StartupCommand

        #
        # Explicit Operational Service Host work command
        #

        WorkCommand =
            $registration.WorkCommand

        StopCommand =
            $registration.StopCommand

        RestartCommand =
            $registration.RestartCommand

        StatusCommand =
            $registration.StatusCommand

        HealthCommand =
            $registration.HealthCommand

        MetricsCommand =
            $registration.MetricsCommand

        Registered =
            $true

        Enabled =
            [bool]$service.Enabled

        State =
            $service.State

        Health =
            $service.Health

        RegisteredAt =
            $service.RegisteredAt

        UpdatedAt =
            $service.UpdatedAt

        ManagedServices =
            $service.ManagedServices

        Timestamp =
            $service.Timestamp
    }

    # ========================================================================
    # ASSERT REGISTRATION RESULT
    # ========================================================================

    if (-not $result.Registered)
    {
        throw "Harvester registration did not complete successfully."
    }

    if ([string]::IsNullOrWhiteSpace([string]$result.Name))
    {
        throw "Registration contract violation. Missing service Name."
    }

    if ([string]::IsNullOrWhiteSpace([string]$result.StartCommand))
    {
        throw "Registration contract violation. Missing StartCommand."
    }

    if ([string]::IsNullOrWhiteSpace([string]$result.StartupCommand))
    {
        throw "Registration contract violation. Missing StartupCommand."
    }

    if ([string]::IsNullOrWhiteSpace([string]$result.WorkCommand))
    {
        throw "Registration contract violation. Missing WorkCommand."
    }

    if ([string]$result.WorkCommand -ne "Invoke-JDHarvesterCycle")
    {
        throw (
            "Registration contract violation. " +
            "WorkCommand must be 'Invoke-JDHarvesterCycle'."
        )
    }

    if ([string]::IsNullOrWhiteSpace([string]$result.StopCommand))
    {
        throw "Registration contract violation. Missing StopCommand."
    }

    if ([string]::IsNullOrWhiteSpace([string]$result.RestartCommand))
    {
        throw "Registration contract violation. Missing RestartCommand."
    }

    if ([string]::IsNullOrWhiteSpace([string]$result.StatusCommand))
    {
        throw "Registration contract violation. Missing StatusCommand."
    }

    if ([string]::IsNullOrWhiteSpace([string]$result.HealthCommand))
    {
        throw "Registration contract violation. Missing HealthCommand."
    }

    if ([string]::IsNullOrWhiteSpace([string]$result.MetricsCommand))
    {
        throw "Registration contract violation. Missing MetricsCommand."
    }

    # ========================================================================
    # ENGINEERING LOG
    # ========================================================================

    Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Harvester Runtime registered with Operational Service Host [{0}]." -f
            $result.Name
        )

    Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Harvester work execution binding established [{0}]." -f
            $result.WorkCommand
        )

    Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Managed Service registration completed successfully."
        )

    # ========================================================================
    # RETURN RESULT
    # ========================================================================

    return $result
}

# ============================================================================
# END OF FILE
# ============================================================================