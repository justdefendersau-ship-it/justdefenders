# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Update-JDEPEngineeringReport.ps1
# Programme : EP-001
# WorkPack  : PR-002
# Unit      : EU-007
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Update-JDEPEngineeringReport {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [object[]]$EngineeringReview,

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

    $reportPath = Join-Path $documentationPath 'Engineering-Report.md'

    $reviews = @($EngineeringReview)

    $totalEngineeringUnits = $reviews.Count
    $programmeCount = ($reviews | Group-Object Programme).Count
    $workPackageCount = ($reviews | Group-Object Programme,WorkPackage).Count

    $completed = ($reviews | Where-Object {
        $_.ReviewResult -in @('PASS','PASS WITH OBSERVATIONS')
    }).Count

    $completionPercentage =
        if ($totalEngineeringUnits -eq 0) {
            0
        }
        else {
            [math]::Round(($completed / $totalEngineeringUnits) * 100,2)
        }

    $statusCounts = [ordered]@{
        'PASS'                   = 0
        'PASS WITH OBSERVATIONS' = 0
        'REVISION REQUIRED'      = 0
        'REJECTED'               = 0
        'ENGINEERING BLOCKER'    = 0
    }

    foreach ($review in $reviews) {
        if ($statusCounts.Contains($review.ReviewResult)) {
            $statusCounts[$review.ReviewResult]++
        }
    }

    $lines = [System.Collections.Generic.List[string]]::new()

    $lines.Add('# JDEP Engineering Report')
    $lines.Add('')
    $lines.Add('This report is derived exclusively from Engineering Review evidence.')
    $lines.Add('Manual changes will be replaced.')
    $lines.Add('')
    $lines.Add('## Engineering Overview')
    $lines.Add('')
    $lines.Add("- Total Engineering Units: $totalEngineeringUnits")
    $lines.Add("- Programmes: $programmeCount")
    $lines.Add("- Work Packages: $workPackageCount")
    $lines.Add("- Completion: $completionPercentage%")
    $lines.Add('')
    $lines.Add('## Programme Summary')
    $lines.Add('')

    foreach ($group in ($reviews | Group-Object Programme | Sort-Object Name)) {
        $lines.Add("### $($group.Name)")
        $lines.Add("- Engineering Units: $($group.Count)")
        $lines.Add('')
    }

    $lines.Add('## Work Package Summary')
    $lines.Add('')
    $lines.Add('| Programme | Work Package | Engineering Units |')
    $lines.Add('|-----------|--------------|------------------:|')

    foreach ($group in ($reviews | Group-Object Programme,WorkPackage | Sort-Object Name)) {
        $first = $group.Group[0]
        $lines.Add("| $($first.Programme) | $($first.WorkPackage) | $($group.Count) |")
    }

    $lines.Add('')
    $lines.Add('## Engineering Review Summary')
    $lines.Add('')
    $lines.Add('| Review Result | Count |')
    $lines.Add('|---------------|------:|')

    foreach ($key in $statusCounts.Keys) {
        $lines.Add("| $key | $($statusCounts[$key]) |")
    }

    $lines.Add('')
    $lines.Add('## Engineering Capability Summary')
    $lines.Add('')
    $lines.Add('| Engineering Unit | Deliverable | Capability |')
    $lines.Add('|------------------|-------------|------------|')

    foreach ($review in ($reviews | Sort-Object Programme,WorkPackage,EngineeringUnit)) {

        switch ($review.ReviewResult) {
            'PASS' { $capability = 'Complete' }
            'PASS WITH OBSERVATIONS' { $capability = 'Complete (Observed)' }
            'REVISION REQUIRED' { $capability = 'Revision Required' }
            'REJECTED' { $capability = 'Rejected' }
            'ENGINEERING BLOCKER' { $capability = 'Blocked' }
            default { $capability = 'Unknown' }
        }

        $deliverable = ([string]$review.Deliverable).Replace('|','\|')

        $lines.Add("| $($review.EngineeringUnit) | $deliverable | $capability |")
    }

    $lines.Add('')
    $lines.Add('## Engineering Improvement Summary')
    $lines.Add('')

    $improvements = $reviews | Where-Object {
        $_.ReviewResult -in @(
            'PASS WITH OBSERVATIONS',
            'REVISION REQUIRED',
            'ENGINEERING BLOCKER'
        )
    }

    if ($improvements.Count -eq 0) {
        $lines.Add('- No engineering improvements identified.')
    }
    else {
        foreach ($review in $improvements) {

            $observations = @($review.Observations)

            if ($observations.Count -eq 0) {
                $lines.Add("- $($review.EngineeringUnit): $($review.ReviewResult)")
            }
            else {
                foreach ($observation in $observations) {
                    $lines.Add("- $($review.EngineeringUnit): $observation")
                }
            }
        }
    }

    $lines.Add('')
    $lines.Add('## Engineering Completion Summary')
    $lines.Add('')
    $lines.Add("- Completed Engineering Units: $completed")
    $lines.Add("- Completion Percentage: $completionPercentage%")
    $lines.Add('')
    $lines.Add('## Engineering Recommendations')
    $lines.Add('')

    if ($statusCounts['ENGINEERING BLOCKER'] -gt 0) {
        $lines.Add('- Resolve Engineering Blockers.')
    }

    if ($statusCounts['REVISION REQUIRED'] -gt 0) {
        $lines.Add('- Complete all Required Revisions.')
    }

    if ($statusCounts['PASS WITH OBSERVATIONS'] -gt 0) {
        $lines.Add('- Address Engineering Observations.')
    }

    if (
        $statusCounts['ENGINEERING BLOCKER'] -eq 0 -and
        $statusCounts['REVISION REQUIRED'] -eq 0 -and
        $statusCounts['PASS WITH OBSERVATIONS'] -eq 0
    ) {
        $lines.Add('- No outstanding engineering recommendations.')
    }

    [System.IO.File]::WriteAllLines(
        $reportPath,
        $lines,
        [System.Text.UTF8Encoding]::new($false)
    )

    [pscustomobject]@{
        ReportPath            = $reportPath
        TotalEngineeringUnits = $totalEngineeringUnits
        Programmes            = $programmeCount
        WorkPackages          = $workPackageCount
        GeneratedAt           = Get-Date
        Success               = $true
    }
}

Export-ModuleMember -Function Update-JDEPEngineeringReport