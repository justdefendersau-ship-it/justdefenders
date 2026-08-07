# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Update-JDEPEngineeringImprovementBacklog.ps1
# Programme : EP-001
# WorkPack  : PR-002
# Unit      : EU-005
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Update-JDEPEngineeringImprovementBacklog {
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

    $improvementBacklogPath = Join-Path $documentationPath 'Engineering-Improvement-Backlog.md'

    $categoryMap = @{
        'PASS WITH OBSERVATIONS' = 'Improvement'
        'REVISION REQUIRED'      = 'Required Revision'
        'ENGINEERING BLOCKER'    = 'Blocker'
    }

    $reviewFilter = @(
        'PASS WITH OBSERVATIONS'
        'REVISION REQUIRED'
        'ENGINEERING BLOCKER'
    )

    $lines = [System.Collections.Generic.List[string]]::new()

    $lines.Add('# JDEP Engineering Improvement Backlog')
    $lines.Add('')
    $lines.Add('This document is generated from Engineering Review evidence.')
    $lines.Add('Manual changes will be replaced.')
    $lines.Add('')
    $lines.Add('| Programme | Work Package | Engineering Unit | Deliverable | Review Result | Observation | Improvement Category |')
    $lines.Add('|-----------|--------------|------------------|-------------|---------------|-------------|----------------------|')

    $improvementCount = 0

    foreach ($review in ($EngineeringReview | Sort-Object Programme, WorkPackage, EngineeringUnit)) {

        $reviewResult = [string]$review.ReviewResult

        if ($reviewFilter -notcontains $reviewResult) {
            continue
        }

        $category = $categoryMap[$reviewResult]

        $observations = @($review.Observations)

        if ($observations.Count -eq 0) {
            $observations = @('')
        }

        foreach ($observation in $observations) {

            $text = ([string]$observation).Replace('|', '\|')
            $deliverable = ([string]$review.Deliverable).Replace('|', '\|')

            $lines.Add(
                "| $($review.Programme) | $($review.WorkPackage) | $($review.EngineeringUnit) | $deliverable | $reviewResult | $text | $category |"
            )

            $improvementCount++
        }
    }

    [System.IO.File]::WriteAllLines(
        $improvementBacklogPath,
        $lines,
        [System.Text.UTF8Encoding]::new($false)
    )

    [pscustomobject]@{
        ImprovementBacklogPath = $improvementBacklogPath
        ImprovementCount       = $improvementCount
        GeneratedAt            = Get-Date
        Success                = $true
    }
}

Export-ModuleMember -Function Update-JDEPEngineeringImprovementBacklog