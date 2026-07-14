<#
==============================================================================
JustDefenders©
==============================================================================
File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
WP-Asset-001A_Section-7_Asset-Contracts.psm1

Timestamp:
13 July 2026 22:20

Work Package:
WP-Asset-001A

Component:
Asset Contracts

Section:
7 - Public API, Module Finalisation and Exports

Purpose:
Provides the public entry points, engineering metadata access and export surface
for the Asset Contracts module.

Notes:
Engineering Exception EE-001 applies. This section is assembled into the final
Asset-Contracts.psm1 module.
==============================================================================#>

function New-JDDiscoverySession {
    [CmdletBinding()]
    param()

    return [JDDiscoverySession]::new()
}

function New-JDDiscoveryResult {
    [CmdletBinding()]
    param()

    return [JDDiscoveryResult]::new()
}

function New-JDValidationFinding {
    [CmdletBinding()]
    param(
        [JDValidationSeverity]$Severity = [JDValidationSeverity]::Information,
        [string]$Category,
        [string]$Message,
        [string]$Recommendation
    )

    $finding = [JDValidationFinding]::new()
    $finding.Severity = $Severity
    $finding.Category = $Category
    $finding.Message = $Message
    $finding.Recommendation = $Recommendation

    return $finding
}

function New-JDAuditSummary {
    [CmdletBinding()]
    param()

    return [JDAuditSummary]::new()
}

function Test-JDContract {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory,ValueFromPipeline)]
        [JDContractBase]$Contract
    )

    process {
        return $Contract.Validate()
    }
}

function Get-JDAssetContractVersion {
    [CmdletBinding()]
    param()

    return [pscustomobject]@{
        ModuleName       = 'Asset-Contracts'
        ModuleVersion    = $script:ModuleInfo.ModuleVersion
        ContractVersion  = $script:ModuleInfo.ContractVersion
        SchemaVersion    = $script:ModuleInfo.SchemaVersion
        WorkPackage      = $script:ModuleInfo.WorkPackage
        BuildTimestamp   = $script:ModuleInfo.BuildTimestamp
    }
}

Export-ModuleMember -Function `
    Get-JDEngineeringModuleInfo,`
    Get-JDAssetContractVersion,`
    New-JDDiscoverySession,`
    New-JDDiscoveryResult,`
    New-JDValidationFinding,`
    New-JDAuditSummary,`
    Test-JDContract

#------------------------------------------------------------------------------
# END OF SECTION 7
#
# NOTE:
# During final engineering assembly all development sections are merged into a
# single production Asset-Contracts.psm1 module. Section 2A and 2B are merged
# into one JDAssetRecord class before validation.
#------------------------------------------------------------------------------
