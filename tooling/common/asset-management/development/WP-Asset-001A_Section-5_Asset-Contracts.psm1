<#
==============================================================================
JustDefenders©
==============================================================================
File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
WP-Asset-001A_Section-5_Asset-Contracts.psm1

Timestamp:
13 July 2026 21:40

Work Package:
WP-Asset-001A

Component:
Asset Contracts

Section:
5 - JDDuplicateGroup / JDMissingAsset

Purpose:
Defines duplicate asset grouping and missing asset contracts for the Asset
Management subsystem.

Notes:
Engineering Exception EE-001 applies. This section is assembled into the final
Asset-Contracts.psm1 module.
==============================================================================#>

using namespace System.Collections.Generic

class JDDuplicateGroup : JDContractBase {

    [string]$GroupId
    [string]$SHA256
    [List[JDAssetRecord]]$Assets
    [string]$RecommendedCanonicalAssetId

    JDDuplicateGroup() : base() {
        $this.ContractName = 'JDDuplicateGroup'
        $this.GroupId = ([guid]::NewGuid()).ToString()
        $this.Assets = [List[JDAssetRecord]]::new()
    }

    [void] AddAsset([JDAssetRecord]$Asset) {
        if ($null -ne $Asset) {
            $this.Assets.Add($Asset)
        }
    }

    [int] GetDuplicateCount() {
        return [Math]::Max(0, $this.Assets.Count - 1)
    }

    [bool] Validate() {
        return ($this.Assets.Count -gt 1)
    }

    [string] GetSummary() {
        return ("Group {0} | Assets={1} | Duplicates={2}" -f `
            $this.GroupId,
            $this.Assets.Count,
            $this.GetDuplicateCount())
    }
}

class JDMissingAsset : JDContractBase {

    [string]$ExpectedPath
    [string]$ReferencingFile
    [string]$Component
    [string]$Page
    [string]$Route
    [int]$LineNumber
    [string]$Recommendation

    JDMissingAsset() : base() {
        $this.ContractName = 'JDMissingAsset'
    }

    [bool] Validate() {
        return (-not [string]::IsNullOrWhiteSpace($this.ExpectedPath))
    }

    [string] GetSummary() {
        return ("Missing: {0} ({1}:{2})" -f `
            $this.ExpectedPath,
            $this.ReferencingFile,
            $this.LineNumber)
    }
}

#------------------------------------------------------------------------------
# SECTION 5 END
#------------------------------------------------------------------------------
