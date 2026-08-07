# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Invoke-JDEPEngineeringValidationResult.ps1
# Programme : EP-001
# WorkPack  : PR-004
# Unit      : EU-003 (Revision A)
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JDEPEngineeringValidationResult {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z]{2,}-\d{3,}$')]
        [string]$ValidationIdentifier,

        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z]{2,}-\d{3,}$')]
        [string]$RuleIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$ValidationCategory,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$ValidationTarget,

        [Parameter(Mandatory)]
        [ValidateSet(
            'PASS',
            'PASS WITH OBSERVATIONS',
            'VALIDATION REQUIRED',
            'FAILED',
            'VALIDATION BLOCKED'
        )]
        [string]$ValidationResult,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$ValidationSummary,

        [object[]]$ValidationEvidence = @()
    )

    $validatedAt = Get-Date

    [pscustomobject]@{
        PSTypeName           = 'JDEP.Engineering.ValidationResult'
        ValidationIdentifier = $ValidationIdentifier
        RuleIdentifier       = $RuleIdentifier
        ValidationCategory   = $ValidationCategory
        ValidationTarget     = $ValidationTarget
        ValidationResult     = $ValidationResult
        ValidationSummary    = $ValidationSummary
        ValidationEvidence   = @($ValidationEvidence)
        ValidatedAt          = $validatedAt
        Success              = $true
    }
}

Export-ModuleMember -Function Invoke-JDEPEngineeringValidationResult