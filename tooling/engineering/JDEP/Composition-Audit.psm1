# ==================================================================================================
# JustDefenders Engineering Platform (JDEP)
#
# File      : tooling/engineering/JDEP/Composition-Audit.psm1
# Programme : EP-001
# WorkPack  : PR-001
# Unit      : EU-002
#
# Copyright (c) JustDefenders Foundation.
# ==================================================================================================

Set-StrictMode -Version Latest

function Get-JDEPCompositionAudit {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Root
    )

    $resolvedRoot = (Resolve-Path -LiteralPath $Root).Path

    $files = Get-ChildItem -LiteralPath $resolvedRoot -File -Recurse |
        Sort-Object FullName

    $results = foreach ($file in $files) {

        $hash = Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256

        [pscustomobject]@{
            Path          = $file.FullName.Substring($resolvedRoot.Length).TrimStart('\','/')
            Name          = $file.Name
            Extension     = $file.Extension
            Length        = $file.Length
            LastWriteTime = $file.LastWriteTimeUtc
            SHA256        = $hash.Hash
        }
    }

    [pscustomobject]@{
        Root          = $resolvedRoot
        GeneratedAt   = (Get-Date).ToUniversalTime()
        FileCount     = $results.Count
        Files         = $results
    }
}

function Test-JDEPCompositionAudit {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Root
    )

    $audit = Get-JDEPCompositionAudit -Root $Root

    [pscustomobject]@{
        Root        = $audit.Root
        GeneratedAt = $audit.GeneratedAt
        FileCount   = $audit.FileCount
        Passed      = ($audit.FileCount -gt 0)
    }
}

Export-ModuleMember `
    -Function Get-JDEPCompositionAudit,
              Test-JDEPCompositionAudit