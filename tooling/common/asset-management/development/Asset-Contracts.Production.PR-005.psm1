<#
==============================================================================
JustDefenders©
==============================================================================
Production Revision : PR-005
Module              : Asset-Contracts.psm1
Work Package        : WP-Asset-001A.2
Component           : Asset Contracts
Purpose             : Production Audit Contracts
Timestamp           : 14 July 2026 16:30

File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
Asset-Contracts.Production.PR-005.psm1
#>

using namespace System.Collections.Generic

class JDDuplicateGroup : JDContractBase {

    [string]$GroupId
    [string]$SHA256
    [List[JDAssetRecord]]$Assets
    [string]$CanonicalAssetId

    JDDuplicateGroup() : base() {
        $this.ContractName='JDDuplicateGroup'
        $this.GroupId=[guid]::NewGuid().ToString()
        $this.Assets=[List[JDAssetRecord]]::new()
    }

    [void] AddAsset([JDAssetRecord]$Asset){
        if($null -ne $Asset){ $this.Assets.Add($Asset) }
    }

    [int] GetDuplicateCount(){
        return [Math]::Max(0,$this.Assets.Count-1)
    }

    [bool] Validate(){
        return ($this.Assets.Count -gt 1)
    }

    [string] GetSummary(){
        return "Duplicate Group {0} Assets={1}" -f $this.GroupId,$this.Assets.Count
    }
}

class JDMissingAsset : JDContractBase {

    [string]$ExpectedPath
    [string]$ReferencingFile
    [string]$Component
    [string]$Route
    [int]$LineNumber
    [string]$Recommendation

    JDMissingAsset() : base(){
        $this.ContractName='JDMissingAsset'
    }

    [bool] Validate(){
        return -not [string]::IsNullOrWhiteSpace($this.ExpectedPath)
    }

    [string] GetSummary(){
        return "Missing {0}" -f $this.ExpectedPath
    }
}

class JDAuditStatistics : JDContractBase {

    [int]$TotalAssets
    [int]$RasterImages
    [int]$VectorImages
    [int]$AnimatedAssets
    [int]$DuplicateAssets
    [int]$MissingAssets
    [int]$BrokenReferences
    [int]$OrphanedAssets
    [Int64]$RepositoryBytes
    [timespan]$Elapsed

    JDAuditStatistics() : base(){
        $this.ContractName='JDAuditStatistics'
        $this.Elapsed=[timespan]::Zero
    }

    [void] Reset(){
        foreach($p in 'TotalAssets','RasterImages','VectorImages','AnimatedAssets','DuplicateAssets','MissingAssets','BrokenReferences','OrphanedAssets','RepositoryBytes'){
            $this.$p=0
        }
        $this.Elapsed=[timespan]::Zero
    }

    [bool] Validate(){ return ($this.TotalAssets -ge 0) }

    [string] GetSummary(){
        return "Assets={0} Missing={1} Duplicates={2}" -f $this.TotalAssets,$this.MissingAssets,$this.DuplicateAssets
    }
}

class JDAuditSummary : JDContractBase {

    [guid]$AuditId
    [datetime]$GeneratedUtc
    [JDAuditStatistics]$Statistics
    [List[JDValidationFinding]]$Findings
    [bool]$AlphaReady
    [string]$OverallStatus

    JDAuditSummary() : base(){
        $this.ContractName='JDAuditSummary'
        $this.AuditId=[guid]::NewGuid()
        $this.GeneratedUtc=[datetime]::UtcNow
        $this.Statistics=[JDAuditStatistics]::new()
        $this.Findings=[List[JDValidationFinding]]::new()
        $this.OverallStatus='Unknown'
    }

    [void] AddFinding([JDValidationFinding]$Finding){
        if($null -ne $Finding){ $this.Findings.Add($Finding) }
    }

    [bool] Validate(){ return ($null -ne $this.Statistics) }

    [string] GetSummary(){
        return "Status={0} Findings={1}" -f $this.OverallStatus,$this.Findings.Count
    }
}

#==============================================================================
# END OF PRODUCTION REVISION PR-005
#==============================================================================
