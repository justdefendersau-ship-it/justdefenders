#
# =====================================================
# JustDefenders ©
# File: C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\ManagedService-Discovery.ps1
# Work Package: PR-006F – Managed Service Discovery
# Timestamp: 22 July 2026, 08:55
# =====================================================

function Get-JDManagedServiceDiscovery
{
    [CmdletBinding()]
    param(
        [string]$Name,
        [switch]$IncludeDisabled
    )

    #
    # Ensure the singleton runtime exists.
    #
    $null = Get-JDHostState

    if (-not (Get-Command Get-JDOperationalHostServices -ErrorAction SilentlyContinue))
    {
        throw "Operational Host discovery API 'Get-JDOperationalHostServices' is unavailable."
    }

    $services = @(Get-JDOperationalHostServices)

    if ($Name)
    {
        $services = $services | Where-Object {
            $_.Name -like $Name -or
            $_.DisplayName -like $Name
        }
    }

    if (-not $IncludeDisabled)
    {
        $services = $services | Where-Object {

            if ($_.PSObject.Properties.Match('Enabled').Count)
            {
                $_.Enabled -ne $false
            }
            else
            {
                $true
            }

        }
    }

    $hostState = Get-JDHostState

    foreach ($service in $services)
    {
        [PSCustomObject]@{

            Name            = $service.Name
            DisplayName     = $service.DisplayName
            Description     = $service.Description
            Version         = $service.Version
            RuntimeType     = $service.RuntimeType

            RuntimeStatus   = if ($service.PSObject.Properties.Match('RuntimeStatus').Count)
                              {
                                  $service.RuntimeStatus
                              }
                              else
                              {
                                  $null
                              }

            HostRunning     = $hostState.Running
            HostHealth      = $hostState.HealthState
            LastHeartbeat   = $hostState.LastHeartbeat

            Source          = 'Operational-ServiceHost'
            Registration    = $service
        }
    }
}