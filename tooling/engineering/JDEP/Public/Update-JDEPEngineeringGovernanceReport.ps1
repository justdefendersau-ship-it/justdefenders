# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Update-JDEPEngineeringGovernanceReport.ps1
# Programme : EP-001
# WorkPack  : PR-003
# Unit      : EU-007
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Update-JDEPEngineeringGovernanceReport {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [object[]]$EngineeringPolicy,

        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [psobject]$ComplianceAssessment,

        [string]$WorkspaceRoot = (Get-Location).Path
    )

    if (-not (Test-Path -LiteralPath $WorkspaceRoot -PathType Container)) {
        throw "Workspace does not exist: $WorkspaceRoot"
    }

    $workspaceRoot = (Resolve-Path -LiteralPath $WorkspaceRoot).Path

    $documentationPath = Join-Path $workspaceRoot 'Documentation'

    if (-not (Test-Path -LiteralPath $documentationPath -PathType Container)) {
        throw "Required directory not found: $documentationPath"
    }

    $governanceReportPath = Join-Path $documentationPath 'Engineering-Governance-Report.md'

    $totalPolicies   = [int]$ComplianceAssessment.TotalPolicies
    $compliant       = [int]$ComplianceAssessment.Compliant
    $pending         = [int]$ComplianceAssessment.Pending
    $nonCompliant    = [int]$ComplianceAssessment.NonCompliant

    if ($totalPolicies -eq 0) {
        $compliancePercentage = 0
    }
    else {
        $compliancePercentage = [math]::Round(($compliant / $totalPolicies) * 100, 2)
    }

    $lines = [System.Collections.Generic.List[string]]::new()

    $lines.Add('# JDEP Engineering Governance Report')
    $lines.Add('')
    $lines.Add('This document is generated from Engineering Policy evidence and Engineering Compliance evidence.')
    $lines.Add('Manual changes will be replaced.')
    $lines.Add('')
    $lines.Add('## Governance Overview')
    $lines.Add('')
    $lines.Add("| Metric | Value |")
    $lines.Add("|--------|------:|")
    $lines.Add("| Total Policies | $totalPolicies |")
    $lines.Add("| Compliant Policies | $compliant |")
    $lines.Add("| Pending Policies | $pending |")
    $lines.Add("| Non-Compliant Policies | $nonCompliant |")
    $lines.Add("| Compliance Percentage | $compliancePercentage% |")
    $lines.Add('')
    $lines.Add('## Policy Summary')
    $lines.Add('')
    $lines.Add('| Policy Identifier | Policy Title | Compliance Status |')
    $lines.Add('|-------------------|--------------|-------------------|')

    foreach ($result in ($ComplianceAssessment.ComplianceResults | Sort-Object PolicyIdentifier)) {

        $policy = $EngineeringPolicy |
            Where-Object PolicyIdentifier -eq $result.PolicyIdentifier |
            Select-Object -First 1

        $title = if ($null -ne $policy) {
            ([string]$policy.PolicyTitle).Replace('|', '\|')
        }
        else {
            ([string]$result.PolicyTitle).Replace('|', '\|')
        }

        $lines.Add(
            "| $($result.PolicyIdentifier) | $title | $($result.ComplianceStatus) |"
        )
    }

    $lines.Add('')
    $lines.Add('## Outstanding Governance Issues')
    $lines.Add('')

    $issues = $ComplianceAssessment.ComplianceResults |
        Where-Object {
            $_.ComplianceStatus -in @('Pending', 'Non-Compliant')
        }

    if (@($issues).Count -eq 0) {
        $lines.Add('- None.')
    }
    else {
        foreach ($issue in $issues) {
            $lines.Add("- $($issue.PolicyIdentifier): $($issue.PolicyTitle) ($($issue.ComplianceStatus))")
        }
    }

    $lines.Add('')
    $lines.Add('## Governance Recommendations')
    $lines.Add('')

    if ($nonCompliant -gt 0) {
        $lines.Add('- Recommend immediate review of all Non-Compliant policies.')
    }

    if ($pending -gt 0) {
        $lines.Add('- Recommend monitoring Pending policies until their effective dates.')
    }

    if (($pending + $nonCompliant) -eq 0) {
        $lines.Add('- Engineering Governance is fully compliant.')
    }

    [System.IO.File]::WriteAllLines(
        $governanceReportPath,
        $lines,
        [System.Text.UTF8Encoding]::new($false)
    )

    [pscustomobject]@{
        GovernanceReportPath = $governanceReportPath
        TotalPolicies        = $totalPolicies
        CompliancePercentage = $compliancePercentage
        GeneratedAt          = Get-Date
        Success              = $true
    }
}

Export-ModuleMember -Function Update-JDEPEngineeringGovernanceReport