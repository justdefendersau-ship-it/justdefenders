<#
==============================================================================
JustDefenders©
==============================================================================
Production Revision : PR-006
Module              : Asset-Contracts.psm1
Work Package        : WP-Asset-001A.2
Component           : Asset Contracts
Purpose             : Public API and Module Finalisation
Timestamp           : 14 July 2026 16:45

File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
Asset-Contracts.Production.PR-006.psm1
#>

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
        [JDValidationSeverity]$Severity=[JDValidationSeverity]::Information,
        [string]$Category,
        [string]$Message,
        [string]$Recommendation
    )
    $f=[JDValidationFinding]::new()
    $f.Severity=$Severity
    $f.Category=$Category
    $f.Message=$Message
    $f.Recommendation=$Recommendation
    return $f
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

    [pscustomobject]@{
        ModuleName         = $script:ModuleInfo.ModuleName
        ModuleVersion      = $script:ModuleInfo.ModuleVersion
        ContractVersion    = $script:ModuleInfo.ContractVersion
        SchemaVersion      = $script:ModuleInfo.SchemaVersion
        ProductionRevision = $script:ModuleInfo.ProductionRevision
        WorkPackage        = $script:ModuleInfo.WorkPackage
        BuildTimestamp     = $script:ModuleInfo.BuildTimestamp
        EngineeringStatus  = $script:ModuleInfo.EngineeringStatus
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

#==============================================================================
# END OF PRODUCTION REVISION PR-006
#==============================================================================
