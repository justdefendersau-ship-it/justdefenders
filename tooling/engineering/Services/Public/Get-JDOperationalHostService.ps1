<#
==============================================================================
JustDefenders©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Get-JDOperationalHostService.ps1

Timestamp
12 July 2026 08:50

Work Package
WP-S004B-03 — Public Projection Contract Alignment

Component
Public Operational Service Host API

Purpose

Returns a single Operational Service from the authoritative Host Registry.

Consumers interact exclusively with the Operational Service Host.
The Host Registry remains an internal implementation detail.

Dependencies

    • Host-ServiceLookup.ps1
    • Host-ServiceValidation.ps1

Notes

    • Public API
    • Read-only
    • Projects the canonical Host Service contract
    • No registry modification

==============================================================================
#>

Set-StrictMode -Version Latest

function Get-JDOperationalHostService
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    # ========================================================================
    # VALIDATE HOST
    # ========================================================================

    Assert-JDHostRunning

    Assert-JDHostServiceExists `
        -Name $Name

    # ========================================================================
    # RETRIEVE SERVICE
    # ========================================================================

    $service =
        Get-JDHostRegisteredService `
            -Name $Name

    if($null -eq $service)
    {
        throw (
            "Operational Service '{0}' could not be located." -f
            $Name
        )
    }

    # ========================================================================
    # BUILD PUBLIC PROJECTION
    # ========================================================================

    $result = [PSCustomObject]@{

        #
        # Identity
        #

        Name =
            $service.Name

        DisplayName =
            $service.DisplayName

        Description =
            $service.Description

        Version =
            $service.Version

        WorkPackage =
            $service.WorkPackage

        RuntimeType =
            $service.RuntimeType

        #
        # PART 1 CONTINUES
        #

        #
        # Runtime
        #

        RuntimeStatus =
            $service.RuntimeStatus

        Enabled =
            if($null -ne $service.RuntimeStatus)
            {
                $service.RuntimeStatus.Enabled
            }
            else
            {
                $false
            }

        State =
            if($null -ne $service.RuntimeStatus)
            {
                $service.RuntimeStatus.State
            }
            else
            {
                "UNKNOWN"
            }

        Health =
            if($null -ne $service.RuntimeStatus)
            {
                $service.RuntimeStatus.Health
            }
            else
            {
                "UNKNOWN"
            }

        Running =
            if($null -ne $service.RuntimeStatus)
            {
                $service.RuntimeStatus.Running
            }
            else
            {
                $false
            }

        #
        # Lifecycle Commands
        #

        StartCommand =
            $service.StartCommand

        StopCommand =
            $service.StopCommand

        RestartCommand =
            $service.RestartCommand

        PauseCommand =
            $service.PauseCommand

        ResumeCommand =
            $service.ResumeCommand

        #
        # Monitoring Commands
        #

        StatusCommand =
            $service.StatusCommand

        HealthCommand =
            $service.HealthCommand

        MetricsCommand =
            $service.MetricsCommand

        #
        # Metadata
        #

        RegisteredBy =
            $service.RegisteredBy

        RegisteredAt =
            $service.RegisteredAt

        UpdatedAt =
            $service.UpdatedAt

        Timestamp =
            Get-Date

    }

    # =========================================================================
    # PART 2 CONTINUES
    # =========================================================================

    # ========================================================================
    # VALIDATE PUBLIC CONTRACT
    # ========================================================================

    foreach($property in @(
        "Name",
        "Version",
        "RuntimeStatus",
        "RegisteredAt"
    ))
    {
        if(-not $result.PSObject.Properties[$property])
        {
            throw (
                "Operational Host projection contract violation. " +
                "Missing property '{0}'." -f
                $property
            )
        }
    }

    # ========================================================================
    # ENGINEERING LOG
    # ========================================================================

    Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Operational Host returned service [{0}]." -f
            $result.Name
        )

    # ========================================================================
    # RETURN RESULT
    # ========================================================================

    return $result
}

# ============================================================================
# END OF FILE
# ============================================================================