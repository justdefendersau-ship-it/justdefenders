<#
==============================================================================
JustDefenders©

File
C:\dev\justdefenders\frontend\
tooling\
engineering\
Services\
Public\
Register-JDHarvesterService.ps1

Timestamp
12 July 2026 08:50

Work Package
WP-S004-02 — Harvester Registration Integration

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

Notes

    • This cmdlet owns NO registry state.
    • This cmdlet owns NO lifecycle state.
    • All registry operations are delegated to the
      Operational Service Host.

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

if($null -eq $hostStatus)
{
    throw "Operational Service Host status is unavailable."
}

if(-not $hostStatus.Running)
{
    throw "Operational Service Host is not running."
}

if(-not $hostStatus.Initialised)
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

        Name            = "Harvester"

        DisplayName     = "JustDefenders Harvester Runtime"

        Description     = "Managed Harvester Runtime"

        Version         = "0.1.0"

        WorkPackage     = "WP-S004-02"

        RuntimeType     = "ManagedService"

        #
        # Runtime Commands
        #

        StartCommand    = "Start-JDHarvester"

        StopCommand     = "Stop-JDHarvester"

        RestartCommand  = "Restart-JDHarvester"

        #
        # Monitoring
        #

        StatusCommand   = "Get-JDHarvesterStatus"

        HealthCommand   = "Get-JDHarvesterHealth"

        MetricsCommand  = "Get-JDHarvesterMetrics"

        #
        # Configuration
        #

        Enabled         = $true

        AutoStart       = $false

        RegisteredBy    = $env:USERNAME

        RegisteredAt    = Get-Date

    }

    # PART 1 CONTINUES

    # ========================================================================
    # DELEGATE REGISTRATION
    # ========================================================================

    $service = Register-JDOperationalHostService `
        -Registration $registration

    if ($null -eq $service)
    {
        throw "Operational Service Host did not return a registration result."
    }

    # ========================================================================
    # VALIDATE REGISTRATION RESULT
    # ========================================================================

    if ([string]::IsNullOrWhiteSpace($service.Name))
    {
        throw "Registration contract violation. Missing service Name."
    }

    # Accept either a direct Enabled property or a nested RuntimeStatus.Enabled
    if ($service.PSObject.Properties["Enabled"])
    {
        $enabled = $service.Enabled
    }
    elseif (
        $service.PSObject.Properties["RuntimeStatus"] -and
        $null -ne $service.RuntimeStatus -and
        $service.RuntimeStatus.PSObject.Properties["Enabled"]
    )
    {
        $enabled = $service.RuntimeStatus.Enabled
    }
    else
    {
        $enabled = $true
    }

    # ========================================================================
    # BUILD PUBLIC RESULT
    # ========================================================================

    $result = [PSCustomObject]@{

        Name =
            $service.Name

        DisplayName =
            $registration.DisplayName

        Version =
            $registration.Version

        WorkPackage =
            $registration.WorkPackage

        RuntimeType =
            $registration.RuntimeType

        Registered =
            $true

        Enabled =
            $enabled

        Timestamp =
            Get-Date

    }

    # ========================================================================
    # RETURN RESULT
    # ========================================================================

    return $result

    # ========================================================================
    # ASSERTIONS
    # ========================================================================

    if (-not $result.Registered)
    {
        throw "Harvester registration did not complete successfully."
    }

    if ([string]::IsNullOrWhiteSpace($result.Name))
    {
        throw "Registration contract violation. Missing service Name."
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
            "Managed Service registration completed successfully."
        )

    return $result
}

# ============================================================================
# END OF FILE
# ============================================================================
