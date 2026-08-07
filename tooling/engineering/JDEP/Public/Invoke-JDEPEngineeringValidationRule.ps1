# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Invoke-JDEPEngineeringValidationRule.ps1
# Programme : EP-001
# WorkPack  : PR-004
# Unit      : EU-002
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JDEPEngineeringValidationRule {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z]{2,}-\d{3,}$')]
        [string]$RuleIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$RuleTitle,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$RuleCategory,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$RuleDescription,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$ValidationTarget,

        [Parameter(Mandatory)]
        [ValidateSet(
            'INFORMATION',
            'LOW',
            'MEDIUM',
            'HIGH',
            'CRITICAL'
        )]
        [string]$RuleSeverity,

        [bool]$RuleEnabled = $true
    )

    $createdAt = Get-Date

    [pscustomobject]@{
        PSTypeName       = 'JDEP.Engineering.ValidationRule'
        RuleIdentifier   = $RuleIdentifier
        RuleTitle        = $RuleTitle
        RuleCategory     = $RuleCategory
        RuleDescription  = $RuleDescription
        ValidationTarget = $ValidationTarget
        RuleSeverity     = $RuleSeverity
        RuleEnabled      = $RuleEnabled
        CreatedAt        = $createdAt
        Success          = $true
    }
}

Export-ModuleMember -Function Invoke-JDEPEngineeringValidationRule