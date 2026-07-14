<#
==============================================================================
JustDefenders©
==============================================================================
File:
C:\dev\justdefenders\frontend\tooling\common\asset-management\development\
WP-Asset-001A_Section-4_Asset-Contracts.psm1

Timestamp:
13 July 2026 21:20

Work Package:
WP-Asset-001A

Component:
Asset Contracts

Section:
4 - JDValidationFinding / JDReferenceRecord

Purpose:
Defines validation findings and code-to-asset reference contracts used by the
Asset Management subsystem.

Notes:
Engineering Exception EE-001 applies. This section is assembled into the final
Asset-Contracts.psm1 module.
==============================================================================#>

class JDValidationFinding : JDContractBase {

    [JDValidationSeverity]$Severity
    [string]$Category
    [string]$Message
    [string]$Recommendation
    [string]$ObjectType
    [string]$ObjectIdentifier
    [datetime]$Timestamp

    JDValidationFinding() : base() {
        $this.ContractName = 'JDValidationFinding'
        $this.Timestamp = Get-Date
        $this.Severity = [JDValidationSeverity]::Information
    }

    [bool] Validate() {
        if ([string]::IsNullOrWhiteSpace($this.Category)) { return $false }
        if ([string]::IsNullOrWhiteSpace($this.Message)) { return $false }
        return $true
    }

    [string] GetSummary() {
        return ("[{0}] {1}: {2}" -f $this.Severity,$this.Category,$this.Message)
    }
}

class JDReferenceRecord : JDContractBase {

    [string]$AssetId
    [string]$Component
    [string]$Page
    [string]$Route
    [string]$SourceFile
    [int]$LineNumber
    [JDReferenceType]$ReferenceType
    [bool]$IsDynamic

    JDReferenceRecord() : base() {
        $this.ContractName = 'JDReferenceRecord'
        $this.ReferenceType = [JDReferenceType]::Unknown
        $this.IsDynamic = $false
    }

    [bool] Validate() {
        if ([string]::IsNullOrWhiteSpace($this.AssetId)) { return $false }
        if ([string]::IsNullOrWhiteSpace($this.SourceFile)) { return $false }
        return $true
    }

    [string] GetSummary() {
        return ("{0} -> {1}:{2}" -f `
            $this.AssetId,
            $this.SourceFile,
            $this.LineNumber)
    }
}

#------------------------------------------------------------------------------
# SECTION 4 END
#------------------------------------------------------------------------------
