# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Test-JDEPEngineeringCompliance.ps1
# Programme : EP-001
# WorkPack  : PR-003
# Unit      : EU-006
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Test-JDEPEngineeringCompliance {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [object[]]$EngineeringPolicy
    )

    $today = (Get-Date).Date

    $results = foreach ($policy in ($EngineeringPolicy | Sort-Object PolicyIdentifier)) {

        $effectiveDate = ([datetime]$policy.EffectiveDate).Date
        $reviewDate    = ([datetime]$policy.ReviewDate).Date

        if ($effectiveDate -gt $today) {
            $complianceStatus = 'Pending'
        }
        elseif ($reviewDate -lt $today) {
            $complianceStatus = 'Non-Compliant'
        }
        else {
            $complianceStatus = 'Compliant'
        }

        [pscustomobject]@{
            PolicyIdentifier = $policy.PolicyIdentifier
            PolicyTitle      = $policy.PolicyTitle
            PolicyCategory   = $policy.PolicyCategory
            PolicyAuthority  = $policy.PolicyAuthority
            EffectiveDate    = $effectiveDate
            ReviewDate       = $reviewDate
            ComplianceStatus = $complianceStatus
        }
    }

    $compliant = ($results | Where-Object ComplianceStatus -eq 'Compliant').Count
    $pending = ($results | Where-Object ComplianceStatus -eq 'Pending').Count
    $nonCompliant = ($results | Where-Object ComplianceStatus -eq 'Non-Compliant').Count

    [pscustomobject]@{
        TotalPolicies    = @($results).Count
        Compliant        = $compliant
        Pending          = $pending
        NonCompliant     = $nonCompliant
        ComplianceResults = @($results)
        GeneratedAt      = Get-Date
        Success          = $true
    }
}

Export-ModuleMember -Function Test-JDEPEngineeringCompliance