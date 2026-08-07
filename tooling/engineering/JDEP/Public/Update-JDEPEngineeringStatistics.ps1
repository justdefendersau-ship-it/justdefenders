# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Update-JDEPEngineeringStatistics.ps1
# Programme : EP-001
# WorkPack  : PR-002
# Unit      : EU-006
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Update-JDEPEngineeringStatistics {
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

    $statisticsPath = Join-Path $documentationPath 'Engineering-Statistics.md'

    $totalEngineeringUnits = @($EngineeringReview).Count

    $resultCounts = [ordered]@{
        'PASS'                   = 0
        'PASS WITH OBSERVATIONS' = 0
        'REVISION REQUIRED'      = 0
        'REJECTED'               = 0
        'ENGINEERING BLOCKER'    = 0
    }

    foreach ($review in $EngineeringReview) {
        $result = [string]$review.ReviewResult
        if ($resultCounts.Contains($result)) {
            $resultCounts[$result]++
        }
    }

    $completedUnits = $resultCounts['PASS'] + $resultCounts['PASS WITH OBSERVATIONS']

    $completionPercentage =
        if ($totalEngineeringUnits -eq 0) {
            0
        }
        else {
            [math]::Round(($completedUnits / $totalEngineeringUnits) * 100, 2)
        }

    $programmeGroups = $EngineeringReview |
        Group-Object Programme |
        Sort-Object Name

    $workPackageGroups = $EngineeringReview |
        Group-Object Programme, WorkPackage |
        Sort-Object Name

    $lines = [System.Collections.Generic.List[string]]::new()

    $lines.Add('# JDEP Engineering Statistics')
    $lines.Add('')
    $lines.Add('This document is generated from Engineering Review evidence.')
    $lines.Add('Manual changes will be replaced.')
    $lines.Add('')
    $lines.Add('## Overall Statistics')
    $lines.Add('')
    $lines.Add('| Statistic | Value |')
    $lines.Add('|-----------|------:|')
    $lines.Add("| Total Engineering Units | $totalEngineeringUnits |")
    $lines.Add("| PASS | $($resultCounts['PASS']) |")
    $lines.Add("| PASS WITH OBSERVATIONS | $($resultCounts['PASS WITH OBSERVATIONS']) |")
    $lines.Add("| REVISION REQUIRED | $($resultCounts['REVISION REQUIRED']) |")
    $lines.Add("| REJECTED | $($resultCounts['REJECTED']) |")
    $lines.Add("| ENGINEERING BLOCKER | $($resultCounts['ENGINEERING BLOCKER']) |")
    $lines.Add("| Completion Percentage | $completionPercentage% |")
    $lines.Add('')
    $lines.Add('## Programme Statistics')
    $lines.Add('')
    $lines.Add('| Programme | Engineering Units | Completed | Completion % |')
    $lines.Add('|-----------|------------------:|----------:|-------------:|')

    foreach ($group in $programmeGroups) {

        $programmeReviews = @($group.Group)

        $programmeCompleted =
            ($programmeReviews | Where-Object {
                $_.ReviewResult -in @('PASS', 'PASS WITH OBSERVATIONS')
            }).Count

        $programmePercentage =
            if ($programmeReviews.Count -eq 0) {
                0
            }
            else {
                [math]::Round(($programmeCompleted / $programmeReviews.Count) * 100, 2)
            }

        $lines.Add(
            "| $($group.Name) | $($programmeReviews.Count) | $programmeCompleted | $programmePercentage% |"
        )
    }

    $lines.Add('')
    $lines.Add('## Work Package Statistics')
    $lines.Add('')
    $lines.Add('| Programme | Work Package | Engineering Units | Completed | Completion % |')
    $lines.Add('|-----------|--------------|------------------:|----------:|-------------:|')

    foreach ($group in $workPackageGroups) {

        $reviews = @($group.Group)

        $completed =
            ($reviews | Where-Object {
                $_.ReviewResult -in @('PASS', 'PASS WITH OBSERVATIONS')
            }).Count

        $percentage =
            if ($reviews.Count -eq 0) {
                0
            }
            else {
                [math]::Round(($completed / $reviews.Count) * 100, 2)
            }

        $first = $reviews[0]

        $lines.Add(
            "| $($first.Programme) | $($first.WorkPackage) | $($reviews.Count) | $completed | $percentage% |"
        )
    }

    [System.IO.File]::WriteAllLines(
        $statisticsPath,
        $lines,
        [System.Text.UTF8Encoding]::new($false)
    )

    [pscustomobject]@{
        StatisticsPath       = $statisticsPath
        TotalEngineeringUnits = $totalEngineeringUnits
        Programmes           = $programmeGroups.Count
        WorkPackages         = $workPackageGroups.Count
        GeneratedAt          = Get-Date
        Success              = $true
    }
}

Export-ModuleMember -Function Update-JDEPEngineeringStatistics