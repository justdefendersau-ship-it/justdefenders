<#
==============================================================================
JustDefenders Â©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Set-JDHarvesterSourceConfiguration.ps1

Timestamp
16 August 2026 12:52 Sydney

Work Package
PR-019A / PR-019B

Component
Harvester Runtime

Purpose
Provides the controlled public configuration boundary for the authorised
MS-006 Harvester source set.

Authorised Sources
    â€¢ repco
    â€¢ burson
    â€¢ lrdirect

Responsibilities
    â€¢ Expose Set-JDHarvesterSourceConfiguration as the controlled public
      source-configuration command.
    â€¢ Apply only the authorised source endpoints to the already-registered
      Harvester source objects.
    â€¢ Preserve the existing Harvester Source Registry as the sole owner of
      registered source state.
    â€¢ Supply the Url and Endpoint fields required by the existing MS-006
      source-engine discovery contract.
    â€¢ Preserve the existing PR-019A / PR-019B separation.

Restrictions
    â€¢ No caller-supplied source definitions.
    â€¢ No arbitrary source registration.
    â€¢ No direct manipulation of $Script:JDHarvesterSources.
    â€¢ No source registration.
    â€¢ No source discovery.
    â€¢ No harvesting.
    â€¢ No supplier contact.
    â€¢ No Harvester start or restart.
    â€¢ No invocation of discoverAndCollect.
    â€¢ No invocation of collectSources.
    â€¢ No invocation of Invoke-JDHarvesterCycle.
    â€¢ No automatic configuration during module import.
    â€¢ No source expansion beyond repco, burson and lrdirect.

Notes
    â€¢ Configuration occurs only when Set-JDHarvesterSourceConfiguration is
      explicitly invoked.
    â€¢ The authoritative registered source object remains the source of state.
    â€¢ Url and Endpoint remain the existing source identity/configuration
      boundary.
    â€¢ Query is not established by the MS-006 configuration authority and is
      therefore intentionally absent from the configuration objects.
==============================================================================
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ============================================================================
# CONFIGURE AUTHORISED MS-006 SOURCES
# ============================================================================

function Set-JDHarvesterSourceConfiguration
{
    [CmdletBinding()]
    param()

    $configurations = @(
        [PSCustomObject]@{
            Name     = "repco"
            Url      = "https://www.repco.com.au"
            Endpoint = "https://www.repco.com.au"
        }

        [PSCustomObject]@{
            Name     = "burson"
            Url      = "https://www.burson.com.au"
            Endpoint = "https://www.burson.com.au"
        }

        [PSCustomObject]@{
            Name     = "lrdirect"
            Url      = "https://www.lrdirect.com"
            Endpoint = "https://www.lrdirect.com"
        }
    )

    $sources = @(
        Get-JDHarvesterSources
    )

    $results = foreach($configuration in $configurations)
    {
        $source =
            $sources |
                Where-Object {
                    [string]$_.Name -eq $configuration.Name
                } |
                Select-Object -First 1

        if($null -eq $source)
        {
            throw (
                "Authorised Harvester source '{0}' is not registered." -f
                $configuration.Name
            )
        }

        $source |
            Add-Member `
                -MemberType NoteProperty `
                -Name "Url" `
                -Value $configuration.Url `
                -Force

        $source |
            Add-Member `
                -MemberType NoteProperty `
                -Name "Endpoint" `
                -Value $configuration.Endpoint `
                -Force

        $source
    }

    return @($results)
}

# ============================================================================
# END OF FILE
# ============================================================================