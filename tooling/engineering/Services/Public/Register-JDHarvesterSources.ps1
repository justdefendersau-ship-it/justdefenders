<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Register-JDHarvesterSources.ps1

Timestamp
17 August 2026 14:39 Sydney

Work Package
WP-S002-04

Component
Harvester Runtime

Purpose
Provides the controlled public invocation boundary for applying the
authorised MS-006 initial Harvester source set to the existing private
Harvester Source Registry.

Authorised Sources
    • repco
    • burson
    • lrdirect

Responsibilities
    • Expose Register-JDHarvesterSources as the controlled public command.
    • Construct only the explicitly authorised MS-006 source registrations.
    • Invoke the existing private Register-JDHarvesterSource implementation.
    • Preserve the existing private source registry boundary.

Restrictions
    • No caller-supplied source-definition parameters.
    • No arbitrary source registration.
    • No direct manipulation of $Script:JDHarvesterSources.
    • No source discovery.
    • No harvesting.
    • No supplier contact.
    • No Harvester start or restart.
    • No automatic registration during module import.

Notes
    • Registration occurs only when Register-JDHarvesterSources is explicitly
      invoked.
    • The private Register-JDHarvesterSource implementation remains the sole
      mechanism that creates source-registry state.
============================================================================== 
#>

Set-StrictMode -Version Latest

# ============================================================================
# REGISTER AUTHORISED MS-006 SOURCES
# ============================================================================

function Register-JDHarvesterSources
{
    [CmdletBinding()]
    param()

    $registrations = @(
        [PSCustomObject]@{
            Name  = "repco"
            Type  = "Supplier"
            Query = $null
        }

        [PSCustomObject]@{
            Name  = "burson"
            Type  = "Supplier"
            Query = $null
        }

        [PSCustomObject]@{
            Name  = "lrdirect"
            Type  = "Supplier"
            Query = $null
        }
    )

    $results = foreach($registration in $registrations)
    {
        Register-JDHarvesterSource `
            -Registration $registration
    }

    return @($results)
}

# ============================================================================
# END OF FILE
# ============================================================================