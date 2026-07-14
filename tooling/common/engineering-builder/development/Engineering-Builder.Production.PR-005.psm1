<#
==============================================================================
JustDefenders©
==============================================================================
Production Revision : PR-005
Module              : Engineering Module Builder
Work Package        : WP-BUILD-001
Component           : Validation Engine
Purpose             : Validate assembled engineering modules before promotion.
Timestamp           : 14 July 2026 18:00

File:
C:\dev\justdefenders\frontend\tooling\common\engineering-builder\development\
Engineering-Builder.Production.PR-005.psm1
#>

function Test-JDModuleFileExists {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$ModuleFile
    )

    return (Test-Path -LiteralPath $ModuleFile -PathType Leaf)
}

function Test-JDModuleSyntax {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$ModuleFile
    )

    $tokens = $null
    $errors = $null

    [void][System.Management.Automation.Language.Parser]::ParseFile(
        $ModuleFile,
        [ref]$tokens,
        [ref]$errors
    )

    [pscustomobject]@{
        Passed = ($errors.Count -eq 0)
        ErrorCount = $errors.Count
        Errors = $errors
    }
}

function Test-JDUsingStatements {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$ModuleFile
    )

    $lines = Get-Content -LiteralPath $ModuleFile

    $firstClass = ($lines | Select-String '^\s*class\s+' | Select-Object -First 1).LineNumber
    $invalid = @()

    foreach($match in ($lines | Select-String '^\s*using\s+namespace')){
        if($firstClass -and $match.LineNumber -gt $firstClass){
            $invalid += $match.LineNumber
        }
    }

    [pscustomobject]@{
        Passed = ($invalid.Count -eq 0)
        InvalidLines = $invalid
    }
}

function Test-JDEngineeringModule {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$ModuleFile
    )

    $result = [JDBuildResult]::new()
    $result.StartedUtc = [datetime]::UtcNow
    $result.OutputFile = $ModuleFile

    if(-not (Test-JDModuleFileExists $ModuleFile)){
        $result.AddMessage("Module file not found.")
        return $result
    }

    $syntax = Test-JDModuleSyntax -ModuleFile $ModuleFile
    $using = Test-JDUsingStatements -ModuleFile $ModuleFile

    $result.AddMessage("Syntax Passed: $($syntax.Passed)")
    $result.AddMessage("Using Statements Passed: $($using.Passed)")

    $result.Successful = ($syntax.Passed -and $using.Passed)
    $result.CompletedUtc = [datetime]::UtcNow

    return $result
}

Export-ModuleMember -Function `
    Test-JDModuleFileExists,`
    Test-JDModuleSyntax,`
    Test-JDUsingStatements,`
    Test-JDEngineeringModule

#==============================================================================
# END OF PRODUCTION REVISION PR-005
#==============================================================================
