<#
==============================================================================
JustDefenders©
==============================================================================
Production Revision : PR-004
Module              : Engineering Module Builder
Work Package        : WP-BUILD-001
Component           : Assembly Engine
Purpose             : Assemble production revisions into a single module.
Timestamp           : 14 July 2026 17:45

File:
C:\dev\justdefenders\frontend\tooling\common\engineering-builder\development\
Engineering-Builder.Production.PR-004.psm1
#>

function Join-JDModuleContent {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [JDBuildManifest]$Manifest
    )

    $builder = [System.Text.StringBuilder]::new()

    foreach($revision in ($Manifest.Revisions | Sort-Object Sequence)) {

        $content = Get-Content -LiteralPath $revision.FileName -Raw

        [void]$builder.AppendLine(
"# -----------------------------------------------------------------------------")
        [void]$builder.AppendLine(
"# BEGIN $($revision.RevisionId) : $([IO.Path]::GetFileName($revision.FileName))")
        [void]$builder.AppendLine(
"# -----------------------------------------------------------------------------")
        [void]$builder.AppendLine($content)
        [void]$builder.AppendLine(
"# -----------------------------------------------------------------------------")
        [void]$builder.AppendLine("# END $($revision.RevisionId)")
        [void]$builder.AppendLine()
    }

    return $builder.ToString()
}

function Test-JDDuplicateSymbols {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$ModuleContent
    )

    $classes = [regex]::Matches($ModuleContent,'(?m)^\s*class\s+([A-Za-z0-9_]+)') |
        ForEach-Object {$_.Groups[1].Value}

    $functions = [regex]::Matches($ModuleContent,'(?m)^\s*function\s+([A-Za-z0-9_-]+)') |
        ForEach-Object {$_.Groups[1].Value}

    [pscustomobject]@{
        DuplicateClasses  = $classes | Group-Object | Where-Object Count -gt 1
        DuplicateFunctions= $functions | Group-Object | Where-Object Count -gt 1
    }
}

function Save-JDAssembledModule {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][JDBuildManifest]$Manifest,
        [Parameter(Mandatory)][string]$OutputFile
    )

    $content = Join-JDModuleContent -Manifest $Manifest

    Set-Content -LiteralPath $OutputFile -Value $content -Encoding UTF8

    return (Get-Item -LiteralPath $OutputFile)
}

Export-ModuleMember -Function `
    Join-JDModuleContent,`
    Test-JDDuplicateSymbols,`
    Save-JDAssembledModule

#==============================================================================
# END OF PRODUCTION REVISION PR-004
#==============================================================================
