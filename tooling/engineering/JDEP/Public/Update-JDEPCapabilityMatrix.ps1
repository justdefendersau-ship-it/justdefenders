# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Update-JDEPCapabilityMatrix.ps1
# Programme : EP-001
# WorkPack  : PR-002
# Unit      : EU-003
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Update-JDEPCapabilityMatrix {
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

    $capabilityMatrixPath = Join-Path $documentationPath 'Capability-Matrix.md'

    $statusMap = @{
        'PASS'                   = 'Complete'
        'PASS WITH OBSERVATIONS' = 'Complete (Observed)'
        'REVISION REQUIRED'      = 'Revision Required'
        'REJECTED'               = 'Rejected'
        'ENGINEERING BLOCKER'    = 'Blocked'
    }

    $lines = [System.Collections.Generic.List[string]]::new()

    $lines.Add('# JDEP Capability Matrix')
    $lines.Add('')
    $lines.Add('This document is generated from Engineering Review evidence.')
    $lines.Add('Manual changes will be replaced.')
    $lines.Add('')

    $groups = $EngineeringReview |
        Group-Object Programme, WorkPackage |
        Sort-Object Name

    foreach ($group in $groups) {

        $programme = $group.Group[0].Programme
        $workPackage = $group.Group[0].WorkPackage

        $lines.Add("## $programme / $workPackage")
        $lines.Add('')
        $lines.Add('| Engineering Unit | Deliverable | Review Result | Capability Status |')
        $lines.Add('|------------------|-------------|---------------|-------------------|')

        foreach ($review in ($group.Group | Sort-Object EngineeringUnit)) {

            $reviewResult = [string]$review.ReviewResult

            if ($statusMap.ContainsKey($reviewResult)) {
                $capabilityStatus = $statusMap[$reviewResult]
            }
            else {
                $capabilityStatus = 'Unknown'
            }

            $deliverable = ([string]$review.Deliverable).Replace('|', '\|')

            $lines.Add(
                "| $($review.EngineeringUnit) | $deliverable | $reviewResult | $capabilityStatus |"
            )
        }

        $lines.Add('')
    }

    [System.IO.File]::WriteAllLines(
        $capabilityMatrixPath,
        $lines,
        [System.Text.UTF8Encoding]::new($false)
    )

    [pscustomobject]@{
        CapabilityMatrixPath = $capabilityMatrixPath
        CapabilityCount      = @($EngineeringReview).Count
        GeneratedAt          = Get-Date
        Success              = $true
    }
}

Export-ModuleMember -Function Update-JDEPCapabilityMatrix