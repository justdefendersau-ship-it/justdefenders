# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Update-JDEPEngineeringValidationSummary.ps1
# Programme : EP-001
# WorkPack  : PR-004
# Unit      : EU-007
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Update-JDEPEngineeringValidationSummary {
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

    $validationSummaryPath = Join-Path $documentationPath 'Engineering-Validation-Summary.md'

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

    $successfulValidations = $statusCounts['PASS'] + $statusCounts['PASS WITH OBSERVATIONS']
    $remainingValidations  = $totalValidationResults - $successfulValidations

    $validationSuccessPercentage =
        if ($totalValidationResults -eq 0) {
            0
        }
        else {
            [math]::Round(($successfulValidations / $totalValidationResults) * 100, 2)
        }

    $categoryGroups = $results |
        Group-Object ValidationCategory |
        Sort-Object Name

    $outstandingIssues = $results | Where-Object {
        $_.ValidationResult -in @(
            'VALIDATION REQUIRED',
            'FAILED',
            'VALIDATION BLOCKED'
        )
    }

    $lines = [System.Collections.Generic.List[string]]::new()

    $lines.Add('# JDEP Engineering Validation Summary')
    $lines.Add('')
    $lines.Add('This document is generated exclusively from Engineering Validation Result evidence.')
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
    $lines.Add('## Validation Category Summary')
    $lines.Add('')
    $lines.Add('| Category | Validation Count |')
    $lines.Add('|----------|-----------------:|')

    foreach ($group in $categoryGroups) {
        $category =
            if ([string]::IsNullOrWhiteSpace($group.Name)) {
                '(Unspecified)'
            }
            else {
                $group.Name.Replace('|','\|')
            }

        $lines.Add("| $category | $($group.Count) |")
    }

    $lines.Add('')
    $lines.Add('## Outstanding Validation Issues')
    $lines.Add('')

    if (@($outstandingIssues).Count -eq 0) {
        $lines.Add('- None.')
    }
    else {
        foreach ($issue in ($outstandingIssues | Sort-Object ValidationIdentifier, RuleIdentifier)) {
            $lines.Add("- $($issue.ValidationIdentifier) / $($issue.RuleIdentifier): $($issue.ValidationResult)")
        }
    }

    $lines.Add('')
    $lines.Add('## Validation Completion Summary')
    $lines.Add('')
    $lines.Add("- Successful Validations: $successfulValidations")
    $lines.Add("- Remaining Validations: $remainingValidations")
    $lines.Add('')
    $lines.Add('## Engineering Recommendations')
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
        $validationSummaryPath,
        $lines,
        [System.Text.UTF8Encoding]::new($false)
    )

    [pscustomobject]@{
        ValidationSummaryPath      = $validationSummaryPath
        TotalValidationResults     = $totalValidationResults
        ValidationSuccessPercentage = $validationSuccessPercentage
        GeneratedAt                = Get-Date
        Success                    = $true
    }
}

Export-ModuleMember -Function Update-JDEPEngineeringValidationSummary