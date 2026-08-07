# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Update-JDEPEngineeringValidationReport.ps1
# Programme : EP-001
# WorkPack  : PR-004
# Unit      : EU-004
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Update-JDEPEngineeringValidationReport {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [object[]]$ValidationResult,

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

    $validationReportPath = Join-Path $documentationPath 'Engineering-Validation-Report.md'

    $results = @($ValidationResult)

    $totalValidationResults = $results.Count

    $statusCounts = [ordered]@{
        'PASS'                   = 0
        'PASS WITH OBSERVATIONS' = 0
        'VALIDATION REQUIRED'    = 0
        'FAILED'                 = 0
        'VALIDATION BLOCKED'     = 0
    }

    foreach ($result in $results) {
        $status = [string]$result.ValidationResult
        if ($statusCounts.Contains($status)) {
            $statusCounts[$status]++
        }
    }

    $successful = $statusCounts['PASS'] + $statusCounts['PASS WITH OBSERVATIONS']

    $validationSuccessPercentage =
        if ($totalValidationResults -eq 0) {
            0
        }
        else {
            [math]::Round(($successful / $totalValidationResults) * 100, 2)
        }

    $lines = [System.Collections.Generic.List[string]]::new()

    $lines.Add('# JDEP Engineering Validation Report')
    $lines.Add('')
    $lines.Add('This report is generated exclusively from Engineering Validation Result evidence.')
    $lines.Add('Manual changes will be replaced.')
    $lines.Add('')
    $lines.Add('## Validation Overview')
    $lines.Add('')
    $lines.Add("| Metric | Value |")
    $lines.Add("|--------|------:|")
    $lines.Add("| Total Validation Results | $totalValidationResults |")
    $lines.Add("| PASS | $($statusCounts['PASS']) |")
    $lines.Add("| PASS WITH OBSERVATIONS | $($statusCounts['PASS WITH OBSERVATIONS']) |")
    $lines.Add("| VALIDATION REQUIRED | $($statusCounts['VALIDATION REQUIRED']) |")
    $lines.Add("| FAILED | $($statusCounts['FAILED']) |")
    $lines.Add("| VALIDATION BLOCKED | $($statusCounts['VALIDATION BLOCKED']) |")
    $lines.Add("| Validation Success Percentage | $validationSuccessPercentage% |")
    $lines.Add('')
    $lines.Add('## Validation Result Summary')
    $lines.Add('')
    $lines.Add('| Validation Identifier | Rule Identifier | Validation Target | Result | Summary |')
    $lines.Add('|-----------------------|-----------------|-------------------|--------|---------|')

    foreach ($result in ($results | Sort-Object ValidationIdentifier, RuleIdentifier)) {
        $summary = ([string]$result.ValidationSummary).Replace('|', '\|')

        $lines.Add(
            "| $($result.ValidationIdentifier) | $($result.RuleIdentifier) | $($result.ValidationTarget) | $($result.ValidationResult) | $summary |"
        )
    }

    $lines.Add('')
    $lines.Add('## Outstanding Validation Issues')
    $lines.Add('')

    $issues = $results | Where-Object {
        $_.ValidationResult -in @(
            'VALIDATION REQUIRED',
            'FAILED',
            'VALIDATION BLOCKED'
        )
    }

    if (@($issues).Count -eq 0) {
        $lines.Add('- None.')
    }
    else {
        foreach ($issue in $issues) {
            $lines.Add("- $($issue.ValidationIdentifier) / $($issue.RuleIdentifier): $($issue.ValidationResult)")
        }
    }

    $lines.Add('')
    $lines.Add('## Validation Recommendations')
    $lines.Add('')

    if ($statusCounts['FAILED'] -gt 0) {
        $lines.Add('- Recommend immediate engineering correction.')
    }

    if ($statusCounts['VALIDATION BLOCKED'] -gt 0) {
        $lines.Add('- Recommend removal of engineering blockers.')
    }

    if ($statusCounts['VALIDATION REQUIRED'] -gt 0) {
        $lines.Add('- Recommend completion of outstanding validation.')
    }

    if (
        $statusCounts['FAILED'] -eq 0 -and
        $statusCounts['VALIDATION BLOCKED'] -eq 0 -and
        $statusCounts['VALIDATION REQUIRED'] -eq 0
    ) {
        $lines.Add('- Engineering Validation is fully compliant.')
    }

    [System.IO.File]::WriteAllLines(
        $validationReportPath,
        $lines,
        [System.Text.UTF8Encoding]::new($false)
    )

    [pscustomobject]@{
        ValidationReportPath       = $validationReportPath
        TotalValidationResults     = $totalValidationResults
        ValidationSuccessPercentage = $validationSuccessPercentage
        GeneratedAt                = Get-Date
        Success                    = $true
    }
}

Export-ModuleMember -Function Update-JDEPEngineeringValidationReport