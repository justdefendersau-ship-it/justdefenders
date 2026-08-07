# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Update-JDEPEngineeringApprovalRegister.ps1
# Programme : EP-001
# WorkPack  : PR-003
# Unit      : EU-005
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Update-JDEPEngineeringApprovalRegister {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [object[]]$EngineeringPolicy,

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

    $approvalRegisterPath = Join-Path $documentationPath 'Engineering-Approval-Register.md'

    $today = (Get-Date).Date

    $lines = [System.Collections.Generic.List[string]]::new()

    $lines.Add('# JDEP Engineering Approval Register')
    $lines.Add('')
    $lines.Add('This document is generated from Engineering Policy evidence.')
    $lines.Add('Manual changes will be replaced.')
    $lines.Add('')
    $lines.Add('| Policy Identifier | Policy Title | Policy Category | Approval Authority | Effective Date | Review Date | Approval Status |')
    $lines.Add('|-------------------|--------------|-----------------|--------------------|----------------|-------------|-----------------|')

    $approvalCount = 0

    foreach ($policy in ($EngineeringPolicy | Sort-Object PolicyIdentifier)) {

        $effectiveDate = ([datetime]$policy.EffectiveDate).Date
        $reviewDate    = ([datetime]$policy.ReviewDate).Date

        if ($effectiveDate -gt $today) {
            $approvalStatus = 'Pending Approval'
        }
        elseif ($reviewDate -lt $today) {
            $approvalStatus = 'Approval Expired'
        }
        else {
            $approvalStatus = 'Approved'
        }

        $title     = ([string]$policy.PolicyTitle).Replace('|', '\|')
        $category  = ([string]$policy.PolicyCategory).Replace('|', '\|')
        $authority = ([string]$policy.PolicyAuthority).Replace('|', '\|')

        $lines.Add(
            "| $($policy.PolicyIdentifier) | $title | $category | $authority | $($effectiveDate.ToString('yyyy-MM-dd')) | $($reviewDate.ToString('yyyy-MM-dd')) | $approvalStatus |"
        )

        $approvalCount++
    }

    [System.IO.File]::WriteAllLines(
        $approvalRegisterPath,
        $lines,
        [System.Text.UTF8Encoding]::new($false)
    )

    [pscustomobject]@{
        ApprovalRegisterPath = $approvalRegisterPath
        ApprovalCount        = $approvalCount
        GeneratedAt          = Get-Date
        Success              = $true
    }
}

Export-ModuleMember -Function Update-JDEPEngineeringApprovalRegister