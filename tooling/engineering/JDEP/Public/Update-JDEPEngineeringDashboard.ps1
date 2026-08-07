# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Update-JDEPEngineeringDashboard.ps1
# Programme : EP-001
# WorkPack  : PR-002
# Unit      : EU-004
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Update-JDEPEngineeringDashboard {
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

    $dashboardPath = Join-Path $documentationPath 'Engineering-Dashboard.md'

    $totalEngineeringUnits = @($EngineeringReview).Count

    $reviewCounts = @{
        'PASS'                   = 0
        'PASS WITH OBSERVATIONS' = 0
        'REVISION REQUIRED'      = 0
        'REJECTED'               = 0
        'ENGINEERING BLOCKER'    = 0
    }

    foreach ($review in $EngineeringReview) {
        $result = [string]$review.ReviewResult
        if ($reviewCounts.ContainsKey($result)) {
            $reviewCounts[$result]++
        }
    }

    $lines = [System.Collections.Generic.List[string]]::new()

    $lines.Add('# JDEP Engineering Dashboard')
    $lines.Add('')
    $lines.Add('This dashboard is generated from Engineering Review evidence.')
    $lines.Add('Manual changes will be replaced.')
    $lines.Add('')
    $lines.Add('## Engineering Overview')
    $lines.Add('')
    $lines.Add("| Metric | Value |")
    $lines.Add("|--------|------:|")
    $lines.Add("| Total Engineering Units | $totalEngineeringUnits |")
    $lines.Add("| PASS | $($reviewCounts['PASS']) |")
    $lines.Add("| PASS WITH OBSERVATIONS | $($reviewCounts['PASS WITH OBSERVATIONS']) |")
    $lines.Add("| REVISION REQUIRED | $($reviewCounts['REVISION REQUIRED']) |")
    $lines.Add("| REJECTED | $($reviewCounts['REJECTED']) |")
    $lines.Add("| ENGINEERING BLOCKER | $($reviewCounts['ENGINEERING BLOCKER']) |")
    $lines.Add('')
    $lines.Add('## Engineering Progress')
    $lines.Add('')
    $lines.Add("| Completed | Remaining |")
    $lines.Add("|----------:|----------:|")
    $completed = $reviewCounts['PASS'] + $reviewCounts['PASS WITH OBSERVATIONS']
    $remaining = $totalEngineeringUnits - $completed
    $lines.Add("| $completed | $remaining |")
    $lines.Add('')
    $lines.Add('## Review Summary')
    $lines.Add('')
    $lines.Add("| Engineering Unit | Review Result | Summary |")
    $lines.Add("|------------------|---------------|---------|")

    foreach ($review in ($EngineeringReview | Sort-Object Programme, WorkPackage, EngineeringUnit)) {

        $summary = ([string]$review.Summary).Replace('|', '\|')

        $lines.Add(
            "| $($review.EngineeringUnit) | $($review.ReviewResult) | $summary |"
        )
    }

    $lines.Add('')
    $lines.Add('## Work Package Summary')
    $lines.Add('')
    $lines.Add("| Programme | Work Package | Engineering Units |")
    $lines.Add("|-----------|--------------|------------------:|")

    $groups = $EngineeringReview |
        Group-Object Programme, WorkPackage |
        Sort-Object Name

    foreach ($group in $groups) {
        $first = $group.Group[0]

        $lines.Add(
            "| $($first.Programme) | $($first.WorkPackage) | $($group.Count) |"
        )
    }

    [System.IO.File]::WriteAllLines(
        $dashboardPath,
        $lines,
        [System.Text.UTF8Encoding]::new($false)
    )

    [pscustomobject]@{
        DashboardPath        = $dashboardPath
        TotalEngineeringUnits = $totalEngineeringUnits
        GeneratedAt          = Get-Date
        Success              = $true
    }
}

Export-ModuleMember -Function Update-JDEPEngineeringDashboard