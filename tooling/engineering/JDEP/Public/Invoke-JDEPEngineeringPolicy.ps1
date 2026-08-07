# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Invoke-JDEPEngineeringPolicy.ps1
# Programme : EP-001
# WorkPack  : PR-003
# Unit      : EU-001
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Invoke-JDEPEngineeringPolicy {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidatePattern('^[A-Z]{2,}-\d{3,}$')]
        [string]$PolicyIdentifier,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$PolicyTitle,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$PolicyCategory,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$PolicyStatement,

        [Parameter(Mandatory)]
        [ValidateNotNullOrWhiteSpace()]
        [string]$PolicyAuthority,

        [Parameter(Mandatory)]
        [datetime]$EffectiveDate,

        [Parameter(Mandatory)]
        [datetime]$ReviewDate
    )

    if ($ReviewDate -lt $EffectiveDate) {
        throw "ReviewDate must not be earlier than EffectiveDate."
    }

    $policy = [pscustomobject]@{
        PSTypeName       = 'JDEP.Engineering.Policy'
        PolicyIdentifier = $PolicyIdentifier
        PolicyTitle      = $PolicyTitle
        PolicyCategory   = $PolicyCategory
        PolicyStatement  = $PolicyStatement
        PolicyAuthority  = $PolicyAuthority
        EffectiveDate    = $EffectiveDate
        ReviewDate       = $ReviewDate
    }

    $policy.PSObject.TypeNames.Insert(0, 'JDEP.Engineering.Policy')

    $policy | Add-Member `
        -MemberType ScriptMethod `
        -Name ToString `
        -Value {
            '{0} - {1}' -f $this.PolicyIdentifier, $this.PolicyTitle
        } `
        -Force

    $policy.PSObject.Properties |
        ForEach-Object {
            $_.IsSettable = $false
        } |
        Out-Null

    $policy
}

Export-ModuleMember -Function Invoke-JDEPEngineeringPolicy