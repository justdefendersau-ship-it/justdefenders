<#
==============================================================================
JustDefenders©
==============================================================================
File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
WP-Asset-001A_Section-6_Asset-Contracts.psm1

Timestamp:
13 July 2026 22:00

Work Package:
WP-Asset-001A

Component:
Asset Contracts

Section:
6 - JDAuditStatistics / JDAuditSummary

Purpose:
Defines aggregate statistics and audit summary contracts for the Asset
Management subsystem.

Notes:
Engineering Exception EE-001 applies. This section is assembled into the final
Asset-Contracts.psm1 module.
==============================================================================#>

using namespace System.Collections.Generic

class JDAuditStatistics : JDContractBase {

    [int]$TotalAssets
    [int]$RasterImages
    [int]$VectorImages
    [int]$AnimatedAssets
    [int]$DuplicateAssets
    [int]$MissingAssets
    [int]$BrokenReferences
    [int]$OrphanedAssets
    [int64]$RepositoryBytes
    [timespan]$Elapsed

    JDAuditStatistics() : base() {
        $this.ContractName = 'JDAuditStatistics'
    }

    [void] Reset() {
        $this.TotalAssets = 0
        $this.RasterImages = 0
        $this.VectorImages = 0
        $this.AnimatedAssets = 0
        $this.DuplicateAssets = 0
        $this.MissingAssets = 0
        $this.BrokenReferences = 0
        $this.OrphanedAssets = 0
        $this.RepositoryBytes = 0
        $this.Elapsed = [timespan]::Zero
        $this.Touch()
    }

    [bool] Validate() {
        return ($this.TotalAssets -ge 0)
    }

    [string] GetSummary() {
        return ("Assets={0} Missing={1} Duplicates={2}" -f
            $this.TotalAssets,
            $this.MissingAssets,
            $this.DuplicateAssets)
    }
}

class JDAuditSummary : JDContractBase {

    [guid]$AuditId
    [datetime]$Generated
    [JDAuditStatistics]$Statistics
    [List[JDValidationFinding]]$Findings
    [bool]$AlphaReady
    [string]$OverallStatus

    JDAuditSummary() : base() {
        $this.ContractName = 'JDAuditSummary'
        $this.AuditId = [guid]::NewGuid()
        $this.Generated = Get-Date
        $this.Statistics = [JDAuditStatistics]::new()
        $this.Findings = [List[JDValidationFinding]]::new()
        $this.AlphaReady = $false
        $this.OverallStatus = 'Unknown'
    }

    [void] AddFinding([JDValidationFinding]$Finding) {
        if($null -ne $Finding){
            $this.Findings.Add($Finding)
        }
    }

    [bool] Validate() {
        return ($null -ne $this.Statistics)
    }

    [string] GetSummary() {
        return ("Status={0} AlphaReady={1} Findings={2}" -f
            $this.OverallStatus,
            $this.AlphaReady,
            $this.Findings.Count)
    }
}

#------------------------------------------------------------------------------
# SECTION 6 END
#------------------------------------------------------------------------------
