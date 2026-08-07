# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Public/Update-JDEPEngineeringExceptionRegister.ps1
# Programme : EP-001
# WorkPack  : PR-003
# Unit      : EU-004
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Update-JDEPEngineeringExceptionRegister {
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

    $exceptionRegisterPath = Join-Path $documentationPath 'Engineering-Exception-Register.md'

    $today = (Get-Date).Date

    $lines = [System.Collections.Generic.List[string]]::new()

    $lines.Add('# JDEP Engineering Exception Register')
    $lines.Add('')
    $lines.Add('This document is generated from Engineering Policy evidence.')
    $lines.Add('Manual changes will be replaced.')
    $lines.Add('')
    $lines.Add('| Policy Identifier | Policy Title | Policy Category | Policy Authority | Effective Date | Review Date | Exception Status | Exception Reason |')
    $lines.Add('|-------------------|--------------|-----------------|------------------|----------------|-------------|------------------|------------------|')

    $exceptionCount = 0

    foreach ($policy in ($EngineeringPolicy | Sort-Object PolicyIdentifier)) {

        $effectiveDate = ([datetime]$policy.EffectiveDate).Date
        $reviewDate    = ([datetime]$policy.ReviewDate).Date

        if ($effectiveDate -gt $today) {
            $exceptionStatus = 'Pending'
            $exceptionReason = 'Policy not yet effective.'
        }
        elseif ($reviewDate -lt $today) {
            $exceptionStatus = 'Exception Active'
            $exceptionReason = 'Policy review overdue.'
        }
        else {
            $exceptionStatus = 'None'
            $exceptionReason = 'No engineering exception.'
        }

        $title     = ([string]$policy.PolicyTitle).Replace('|', '\|')
        $category  = ([string]$policy.PolicyCategory).Replace('|', '\|')
        $authority = ([string]$policy.PolicyAuthority).Replace('|', '\|')

        $lines.Add(
            "| $($policy.PolicyIdentifier) | $title | $category | $authority | $($effectiveDate.ToString('yyyy-MM-dd')) | $($reviewDate.ToString('yyyy-MM-dd')) | $exceptionStatus | $exceptionReason |"
        )

        $exceptionCount++
    }

    [System.IO.File]::WriteAllLines(
        $exceptionRegisterPath,
        $lines,
        [System.Text.UTF8Encoding]::new($false)
    )

    [pscustomobject]@{
        ExceptionRegisterPath = $exceptionRegisterPath
        ExceptionCount        = $exceptionCount
        GeneratedAt           = Get-Date
        Success               = $true
    }
}

Export-ModuleMember -Function Update-JDEPEngineeringExceptionRegister