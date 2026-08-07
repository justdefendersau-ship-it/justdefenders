# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Update-JDEPEngineeringRiskRegister.ps1
# Programme : EP-001
# WorkPack  : PR-003
# Unit      : EU-003
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Update-JDEPEngineeringRiskRegister {
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

    $riskRegisterPath = Join-Path $documentationPath 'Engineering-Risk-Register.md'

    $today = (Get-Date).Date

    $lines = [System.Collections.Generic.List[string]]::new()

    $lines.Add('# JDEP Engineering Risk Register')
    $lines.Add('')
    $lines.Add('This document is generated from Engineering Policy evidence.')
    $lines.Add('Manual changes will be replaced.')
    $lines.Add('')
    $lines.Add('| Policy Identifier | Policy Title | Policy Category | Policy Authority | Effective Date | Review Date | Risk Level | Risk Status |')
    $lines.Add('|-------------------|--------------|-----------------|------------------|----------------|-------------|------------|-------------|')

    $riskCount = 0

    foreach ($policy in ($EngineeringPolicy | Sort-Object PolicyIdentifier)) {

        $effectiveDate = ([datetime]$policy.EffectiveDate).Date
        $reviewDate    = ([datetime]$policy.ReviewDate).Date

        if ($effectiveDate -gt $today) {
            $riskStatus = 'Pending'
        }
        elseif ($reviewDate -lt $today) {
            $riskStatus = 'Overdue'
        }
        else {
            $riskStatus = 'Active'
        }

        if ($reviewDate -lt $today) {
            $riskLevel = 'Critical'
        }
        else {
            $daysRemaining = ($reviewDate - $today).Days

            if ($daysRemaining -le 30) {
                $riskLevel = 'High'
            }
            elseif ($daysRemaining -le 90) {
                $riskLevel = 'Medium'
            }
            else {
                $riskLevel = 'Low'
            }
        }

        $title      = ([string]$policy.PolicyTitle).Replace('|', '\|')
        $category   = ([string]$policy.PolicyCategory).Replace('|', '\|')
        $authority  = ([string]$policy.PolicyAuthority).Replace('|', '\|')

        $lines.Add(
            "| $($policy.PolicyIdentifier) | $title | $category | $authority | $($effectiveDate.ToString('yyyy-MM-dd')) | $($reviewDate.ToString('yyyy-MM-dd')) | $riskLevel | $riskStatus |"
        )

        $riskCount++
    }

    [System.IO.File]::WriteAllLines(
        $riskRegisterPath,
        $lines,
        [System.Text.UTF8Encoding]::new($false)
    )

    [pscustomobject]@{
        RiskRegisterPath = $riskRegisterPath
        RiskCount        = $riskCount
        GeneratedAt      = Get-Date
        Success          = $true
    }
}

Export-ModuleMember -Function Update-JDEPEngineeringRiskRegister