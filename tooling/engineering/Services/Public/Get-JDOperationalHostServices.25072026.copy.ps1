<#
==============================================================================
JustDefenders©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Get-JDOperationalHostServices.ps1

Timestamp
12 July 2026 08:50

Work Package
WP-S004B-03 — Public Projection Contract Alignment

Component
Public Operational Service Host API

Purpose

Returns all Operational Services registered with the Operational
Service Host.

Consumers interact exclusively with the Host Runtime.

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

function Get-JDOperationalHostServices
{
    [CmdletBinding()]
    param()

    # ========================================================================
    # VALIDATE HOST
    # ========================================================================

    Assert-JDHostRunning

    # ========================================================================
    # RETRIEVE REGISTERED SERVICES
    # ========================================================================

    $services =
        @(Get-JDHostRegisteredServices)

    if($services.Count -eq 0)
    {
        return @()
    }

    # ========================================================================
    # BUILD PUBLIC PROJECTION
    # ========================================================================

    $result = foreach($service in $services)
    {
        [PSCustomObject]@{

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

            Enabled =
                if($null -ne $service.RuntimeStatus)
                {
                    $service.RuntimeStatus.Enabled
                }
                else
                {
                    $false
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
    }

    # =========================================================================
    # PART 2 CONTINUES
    # =========================================================================

    # ========================================================================
    # VALIDATE PUBLIC PROJECTION
    # ========================================================================

    foreach($service in $result)
    {
        foreach($property in @(
            "Name",
            "Version",
            "RuntimeStatus",
            "RegisteredAt"
        ))
        {
            if(-not $service.PSObject.Properties[$property])
            {
                throw (
                    "Operational Host projection contract violation. " +
                    "Missing property '{0}'." -f
                    $property
                )
            }
        }
    }

    # ========================================================================
    # UPDATE HOST STATISTICS
    # ========================================================================

    Update-JDHostManagedServiceCount | Out-Null

    # ========================================================================
    # ENGINEERING LOG
    # ========================================================================

    Write-JDEngineeringLog `
        -Level Information `
        -Message (
            "Operational Host returned {0} registered service(s)." -f
            @($result).Count
        )

    # ========================================================================
    # RETURN COLLECTION
    # ========================================================================

    return @($result)
}

# ============================================================================
# END OF FILE
# ============================================================================