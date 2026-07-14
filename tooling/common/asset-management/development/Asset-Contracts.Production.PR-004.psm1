<#
==============================================================================
JustDefenders©
==============================================================================
Production Revision : PR-004
Module              : Asset-Contracts.psm1
Work Package        : WP-Asset-001A.2
Component           : Asset Contracts
Purpose             : Production Validation and Reference Contracts
Timestamp           : 14 July 2026 16:10

File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
Asset-Contracts.Production.PR-004.psm1
#>

class JDValidationFinding : JDContractBase {

    [JDValidationSeverity]$Severity
    [string]$Category
    [string]$Code
    [string]$Message
    [string]$Recommendation
    [string]$ObjectType
    [string]$ObjectIdentifier
    [datetime]$TimestampUtc

    JDValidationFinding() : base() {
        $this.ContractName='JDValidationFinding'
        $this.TimestampUtc=[datetime]::UtcNow
        $this.Severity=[JDValidationSeverity]::Information
    }

    [bool]Validate() {
        if([string]::IsNullOrWhiteSpace($this.Category)){ return $false }
        if([string]::IsNullOrWhiteSpace($this.Message)){ return $false }
        return $true
    }

    [string]GetSummary() {
        return "[{0}] {1} - {2}" -f $this.Severity,$this.Category,$this.Message
    }
}

class JDReferenceRecord : JDContractBase {

    [string]$AssetId
    [string]$RepositoryPath
    [string]$SourceFile
    [string]$Component
    [string]$Page
    [string]$Route
    [int]$LineNumber
    [JDReferenceType]$ReferenceType
    [bool]$IsDynamic

    JDReferenceRecord() : base() {
        $this.ContractName='JDReferenceRecord'
        $this.ReferenceType=[JDReferenceType]::Unknown
        $this.IsDynamic=$false
    }

    [bool]Validate() {
        if([string]::IsNullOrWhiteSpace($this.AssetId)){ return $false }
        if([string]::IsNullOrWhiteSpace($this.SourceFile)){ return $false }
        return $true
    }

    [string]GetSummary() {
        return "{0} -> {1}:{2}" -f $this.AssetId,$this.SourceFile,$this.LineNumber
    }
}

#==============================================================================
# END OF PRODUCTION REVISION PR-004
#==============================================================================
