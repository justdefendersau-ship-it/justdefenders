# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Update-JDEPEngineeringValidationDashboard.ps1
# Programme : EP-001
# WorkPack  : PR-004
# Unit      : EU-005
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Update-JDEPEngineeringValidationDashboard {
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

    $dashboardPath = Join-Path $documentationPath 'Engineering-Validation-Dashboard.md'

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

    $lines = [System.Collections.Generic.List[string]]::new()

    $lines.Add('# JDEP Engineering Validation Dashboard')
    $lines.Add('')
    $lines.Add('This dashboard is generated exclusively from Engineering Validation Result evidence.')
    $lines.Add('Manual changes will be replaced.')
    $lines.Add('')
    $lines.Add('## Validation Overview')
    $lines.Add('')
    $lines.Add('| Metric | Value |')
    $lines.Add('|--------|------:|')
    $lines.Add("| Total Validation Results | $totalValidationResults |")
    $lines.Add("| PASS | $($statusCounts['PASS']) |")
    $lines.Add("| PASS WITH OBSERVATIONS | $($statusCounts['PASS WITH OBSERVATIONS']) |")
    $lines.Add("| VALIDATION REQUIRED | $($statusCounts['VALIDATION REQUIRED']) |")
    $lines.Add("| FAILED | $($statusCounts['FAILED']) |")
    $lines.Add("| VALIDATION BLOCKED | $($statusCounts['VALIDATION BLOCKED']) |")
    $lines.Add("| Validation Success Percentage | $validationSuccessPercentage% |")
    $lines.Add('')
    $lines.Add('## Validation Progress')
    $lines.Add('')
    $lines.Add('| Metric | Value |')
    $lines.Add('|--------|------:|')
    $lines.Add("| Successful Validations | $successfulValidations |")
    $lines.Add("| Remaining Validations | $remainingValidations |")
    $lines.Add('')
    $lines.Add('## Validation Result Summary')
    $lines.Add('')
    $lines.Add('| Validation Identifier | Rule Identifier | Validation Category | Validation Target | Result |')
    $lines.Add('|-----------------------|-----------------|---------------------|-------------------|--------|')

    foreach ($result in ($results | Sort-Object ValidationIdentifier, RuleIdentifier)) {
        $category = ([string]$result.ValidationCategory).Replace('|','\|')
        $target   = ([string]$result.ValidationTarget).Replace('|','\|')

        $lines.Add(
            "| $($result.ValidationIdentifier) | $($result.RuleIdentifier) | $category | $target | $($result.ValidationResult) |"
        )
    }

    $lines.Add('')
    $lines.Add('## Validation Category Summary')
    $lines.Add('')
    $lines.Add('| Category | Validation Count |')
    $lines.Add('|----------|-----------------:|')

    foreach ($group in $categoryGroups) {

        $categoryName =
            if ([string]::IsNullOrWhiteSpace($group.Name)) {
                '(Unspecified)'
            }
            else {
                $group.Name.Replace('|','\|')
            }

        $lines.Add("| $categoryName | $($group.Count) |")
    }

    [System.IO.File]::WriteAllLines(
        $dashboardPath,
        $lines,
        [System.Text.UTF8Encoding]::new($false)
    )

    [pscustomobject]@{
        DashboardPath               = $dashboardPath
        TotalValidationResults      = $totalValidationResults
        ValidationSuccessPercentage = $validationSuccessPercentage
        GeneratedAt                 = Get-Date
        Success                     = $true
    }
}

Export-ModuleMember -Function Update-JDEPEngineeringValidationDashboard