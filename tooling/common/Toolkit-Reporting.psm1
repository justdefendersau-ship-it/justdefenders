# ============================================================================
# JustDefenders©
#
# File:
# C:\dev\justdefenders\frontend\tooling\common\Toolkit-Reporting.psm1
#
# Timestamp:
# 11 August 2026 13:41 Sydney
#
# Version:
# 1.2.0
#
# Work Package:
# WP-003D
#
# Engineering Baseline:
# WP003D_TOOLKIT_REPORTING_V120
#
# Purpose:
# Shared reporting engine for the JustDefenders Engineering Toolkit.
#
# ============================================================================

Set-StrictMode -Version Latest

# -----------------------------------------------------------------------------
# Engineering Toolkit Module State
# -----------------------------------------------------------------------------

$Script:Module = [ordered]@{

    Name = "Engineering Toolkit Reporting"

    Version = "1.2.0"

    WorkPackage = "WP-003D"

    Baseline = "WP003D_TOOLKIT_REPORTING_V120"

    Initialised = $false

    Loaded = Get-Date
}

# -----------------------------------------------------------------------------
# Module Initialisation
# -----------------------------------------------------------------------------

function Initialize-JDToolkitReporting
{
    [CmdletBinding()]
    param()

    $Script:Module.Initialised = $true
}

# -----------------------------------------------------------------------------
# Toolkit Version
# -----------------------------------------------------------------------------

function Get-JDToolkitReportingVersion
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        Name = $Script:Module.Name

        Version = $Script:Module.Version

        WorkPackage = $Script:Module.WorkPackage

        Baseline = $Script:Module.Baseline

        Initialised = $Script:Module.Initialised

        Timestamp = Get-Date
    }
}

# -----------------------------------------------------------------------------
# Toolkit State
# -----------------------------------------------------------------------------

function Get-JDToolkitReportingState
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        Name = $Script:Module.Name

        Version = $Script:Module.Version

        WorkPackage = $Script:Module.WorkPackage

        Baseline = $Script:Module.Baseline

        Initialised = $Script:Module.Initialised

        Loaded = $Script:Module.Loaded

        Timestamp = Get-Date
    }
}

# -----------------------------------------------------------------------------
# Toolkit Governance Validation
# -----------------------------------------------------------------------------

function Test-JDToolkitReporting
{
    [CmdletBinding()]
    param()

    $RequiredFunctions = @(

        'Get-JDToolkitReportingVersion'

        'Get-JDToolkitReportingState'

        'Write-JsonReport'

        'Write-CsvReport'

        'Write-MarkdownReport'

        'Test-ToolkitReporting'
    )

    $Missing = @()

    foreach($Function in $RequiredFunctions)
    {
        if(-not (Get-Command -Name $Function -ErrorAction SilentlyContinue))
        {
            $Missing += $Function
        }
    }

    return [PSCustomObject]@{

        Success = ($Missing.Count -eq 0)

        FunctionCount = $RequiredFunctions.Count

        MissingFunctions = $Missing

        Timestamp = Get-Date
    }
}

# -----------------------------------------------------------------------------
# Private Functions
# -----------------------------------------------------------------------------

function Ensure-FolderExists
{
    param(
        [Parameter(Mandatory)]
        [string]$Path
    )

    $folder = Split-Path `
        -Path $Path `
        -Parent

    if([string]::IsNullOrWhiteSpace($folder))
    {
        return
    }

    if(-not (Test-Path -LiteralPath $folder -PathType Container))
    {
        New-Item `
            -ItemType Directory `
            -Path $folder `
            -Force | Out-Null
    }
}

function Write-TextFile
{
    param(
        [Parameter(Mandatory)]
        [string]$Path,

        [Parameter(Mandatory)]
        [AllowEmptyString()]
        [AllowEmptyCollection()]
        [string[]]$Content
    )

    Ensure-FolderExists `
        -Path $Path

    Set-Content `
        -LiteralPath $Path `
        -Value $Content `
        -Encoding UTF8
}

function ConvertTo-MarkdownContent
{
    param(
        [Parameter(Mandatory)]
        $Content
    )

    if($null -eq $Content)
    {
        return @()
    }

    if($Content -is [string])
    {
        return @($Content)
    }

    if($Content -is [System.Collections.IEnumerable] -and
       $Content -isnot [string])
    {
        $lines = @()

        foreach($item in $Content)
        {
            if($null -eq $item)
            {
                $lines += ""
            }
            else
            {
                $lines += [string]$item
            }
        }

        return $lines
    }

    return @([string]$Content)
}

function Get-ReportHeader
{
    param(
        [Parameter(Mandatory)]
        [string]$ReportTitle
    )

    return @(
        "# $ReportTitle"
        ""
        "**Generated By:** JustDefenders Engineering Toolkit"
        "**Toolkit Version:** $($Script:Module.Version)"
        "**Work Package:** $($Script:Module.WorkPackage)"
        "**Engineering Baseline:** $($Script:Module.Baseline)"
        "**Generated:** $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        ""
        "---"
        ""
    )
}

function Test-ToolkitModule
{
    param(
        [Parameter(Mandatory)]
        [string]$ModuleName,

        [Parameter(Mandatory)]
        [scriptblock]$Validation
    )

    $started = Get-Date

    try
    {
        & $Validation

        return [PSCustomObject]@{

            Name = $ModuleName

            Status = "PASS"

            Success = $true

            Message = "Validation completed successfully."

            DurationMs = [math]::Round(
                ((Get-Date) - $started).TotalMilliseconds,
                2
            )
        }
    }
    catch
    {
        return [PSCustomObject]@{

            Name = $ModuleName

            Status = "FAIL"

            Success = $false

            Message = $_.Exception.Message

            DurationMs = [math]::Round(
                ((Get-Date) - $started).TotalMilliseconds,
                2
            )
        }
    }
}

function Show-TestSummary
{
    param(
        [Parameter(Mandatory)]
        [object[]]$Results
    )

    $NormalisedResults = @($Results)

    $total = $NormalisedResults.Count

    $passed = @(
        $NormalisedResults |
            Where-Object {
                $_.Success -eq $true
            }
    ).Count

    $failed = @(
        $NormalisedResults |
            Where-Object {
                $_.Success -ne $true
            }
    ).Count

    return [PSCustomObject]@{

        Success = ($failed -eq 0)

        TotalTests = $total

        Passed = $passed

        Failed = $failed

        Results = $NormalisedResults

        Timestamp = Get-Date
    }
}

# -----------------------------------------------------------------------------
# JSON Report
# -----------------------------------------------------------------------------

function Write-JsonReport
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        $Data,

        [Parameter(Mandatory)]
        [string]$Path,

        [ValidateRange(1, 100)]
        [int]$Depth = 10
    )

    Ensure-FolderExists `
        -Path $Path

    $json = $Data |
        ConvertTo-Json `
            -Depth $Depth

    Write-TextFile `
        -Path $Path `
        -Content $json

    return $Path
}

# -----------------------------------------------------------------------------
# CSV Report
# -----------------------------------------------------------------------------

function Write-CsvReport
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        $Data,

        [Parameter(Mandatory)]
        [string]$Path,

        [switch]$Append
    )

    Ensure-FolderExists `
        -Path $Path

    if($Append)
    {
        $Data |
            Export-Csv `
                -LiteralPath $Path `
                -NoTypeInformation `
                -Append `
                -Encoding UTF8
    }
    else
    {
        $Data |
            Export-Csv `
                -LiteralPath $Path `
                -NoTypeInformation `
                -Encoding UTF8
    }

    return $Path
}

# -----------------------------------------------------------------------------
# Markdown Report
# -----------------------------------------------------------------------------

function Write-MarkdownReport
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [AllowEmptyString()]
        [AllowEmptyCollection()]
        [string[]]$Content,

        [Parameter(Mandatory)]
        [string]$Path,

        [string]$Title = "Engineering Report",

        [switch]$IncludeHeader
    )

    $markdown = ConvertTo-MarkdownContent `
        -Content $Content

    if($IncludeHeader)
    {
        $markdown = @(
            Get-ReportHeader `
                -ReportTitle $Title
        ) + $markdown
    }

    Write-TextFile `
        -Path $Path `
        -Content $markdown

    return $Path
}

# -----------------------------------------------------------------------------
# Comprehensive Reporting Self-Test
# -----------------------------------------------------------------------------

function Test-ToolkitReporting
{
    [CmdletBinding()]
    param()

    $results = @()

    $testFolder = Join-Path `
        $env:TEMP `
        "JDToolkitReporting"

    Ensure-FolderExists `
        -Path (Join-Path $testFolder "placeholder.txt")

    # -------------------------------------------------------------------------
    # JSON Report Test
    # -------------------------------------------------------------------------

    $results += Test-ToolkitModule `
        -ModuleName "JSON Report" `
        -Validation {

            $jsonFile = Join-Path `
                $testFolder `
                "report.json"

            Write-JsonReport `
                -Data @{
                    Name = "JustDefenders"
                    Version = $Script:Module.Version
                } `
                -Path $jsonFile `
                -Depth 5 | Out-Null

            if(-not (Test-Path -LiteralPath $jsonFile -PathType Leaf))
            {
                throw "JSON report was not created."
            }

            $content = Get-Content `
                -LiteralPath $jsonFile `
                -Raw

            if([string]::IsNullOrWhiteSpace($content))
            {
                throw "JSON report is empty."
            }

            $parsed = $content |
                ConvertFrom-Json

            if($parsed.Name -ne "JustDefenders")
            {
                throw "JSON report content is invalid."
            }

            if($parsed.Version -ne $Script:Module.Version)
            {
                throw "JSON report version is invalid."
            }
        }

    # -------------------------------------------------------------------------
    # CSV Report Test
    # -------------------------------------------------------------------------

    $results += Test-ToolkitModule `
        -ModuleName "CSV Report" `
        -Validation {

            $csvFile = Join-Path `
                $testFolder `
                "report.csv"

            $sample = @(
                [PSCustomObject]@{
                    Capability = "Discovery"
                    Routes     = 350
                }
            )

            Write-CsvReport `
                -Data $sample `
                -Path $csvFile | Out-Null

            if(-not (Test-Path -LiteralPath $csvFile -PathType Leaf))
            {
                throw "CSV report was not created."
            }

            $content = Get-Content `
                -LiteralPath $csvFile `
                -Raw

            if([string]::IsNullOrWhiteSpace($content))
            {
                throw "CSV report is empty."
            }

            $rows = @(
                Import-Csv `
                    -LiteralPath $csvFile
            )

            if($rows.Count -ne 1)
            {
                throw "CSV report row count is invalid."
            }

            if($rows[0].Capability -ne "Discovery")
            {
                throw "CSV report content is invalid."
            }
        }

    # -------------------------------------------------------------------------
    # Markdown Report Test
    # -------------------------------------------------------------------------

    $results += Test-ToolkitModule `
        -ModuleName "Markdown Report" `
        -Validation {

            $markdownFile = Join-Path `
                $testFolder `
                "report.md"

            Write-MarkdownReport `
                -Content @(
                    "# Toolkit Reporting"
                    ""
                    "Markdown validation completed successfully."
                ) `
                -Path $markdownFile `
                -Title "Toolkit Reporting Test" `
                -IncludeHeader | Out-Null

            if(-not (Test-Path -LiteralPath $markdownFile -PathType Leaf))
            {
                throw "Markdown report was not created."
            }

            $content = Get-Content `
                -LiteralPath $markdownFile `
                -Raw

            if([string]::IsNullOrWhiteSpace($content))
            {
                throw "Markdown report is empty."
            }

            if($content -notmatch 'Toolkit Version')
            {
                throw "Markdown report header was not created."
            }

            if($content -notmatch '1\.2\.0')
            {
                throw "Markdown report contains an incorrect toolkit version."
            }

            if($content -notmatch 'WP-003D')
            {
                throw "Markdown report contains an incorrect work package."
            }

            if($content -notmatch 'WP003D_TOOLKIT_REPORTING_V120')
            {
                throw "Markdown report contains an incorrect engineering baseline."
            }
        }

    # -------------------------------------------------------------------------
    # Markdown String Test
    # -------------------------------------------------------------------------

    $results += Test-ToolkitModule `
        -ModuleName "Markdown String" `
        -Validation {

            $markdownFile = Join-Path `
                $testFolder `
                "report-string.md"

            Write-MarkdownReport `
                -Content "Single line markdown content." `
                -Path $markdownFile | Out-Null

            if(-not (Test-Path -LiteralPath $markdownFile -PathType Leaf))
            {
                throw "Markdown string report was not created."
            }

            $content = Get-Content `
                -LiteralPath $markdownFile `
                -Raw

            if($content -notmatch 'Single line markdown content')
            {
                throw "Markdown string content is invalid."
            }
        }

    # -------------------------------------------------------------------------
    # JSON Depth Test
    # -------------------------------------------------------------------------

    $results += Test-ToolkitModule `
        -ModuleName "JSON Depth" `
        -Validation {

            $jsonFile = Join-Path `
                $testFolder `
                "depth.json"

            $object = @{
                Level1 = @{
                    Level2 = @{
                        Level3 = @{
                            Value = "OK"
                        }
                    }
                }
            }

            Write-JsonReport `
                -Data $object `
                -Path $jsonFile `
                -Depth 10 | Out-Null

            if(-not (Test-Path -LiteralPath $jsonFile -PathType Leaf))
            {
                throw "JSON depth report was not created."
            }

            $content = Get-Content `
                -LiteralPath $jsonFile `
                -Raw

            if($content -notmatch '"Value"')
            {
                throw "JSON depth content is invalid."
            }

            $parsed = $content |
                ConvertFrom-Json

            if($parsed.Level1.Level2.Level3.Value -ne "OK")
            {
                throw "JSON nested content was not preserved."
            }
        }

    # -------------------------------------------------------------------------
    # CSV Append Test
    # -------------------------------------------------------------------------

    $results += Test-ToolkitModule `
        -ModuleName "CSV Append" `
        -Validation {

            $csvFile = Join-Path `
                $testFolder `
                "append.csv"

            Write-CsvReport `
                -Data @(
                    [PSCustomObject]@{
                        Name = "One"
                    }
                ) `
                -Path $csvFile | Out-Null

            Write-CsvReport `
                -Data @(
                    [PSCustomObject]@{
                        Name = "Two"
                    }
                ) `
                -Path $csvFile `
                -Append | Out-Null

            if(-not (Test-Path -LiteralPath $csvFile -PathType Leaf))
            {
                throw "CSV append report was not created."
            }

            $rows = @(
                Import-Csv `
                    -LiteralPath $csvFile
            )

            if($rows.Count -ne 2)
            {
                throw "CSV append did not preserve both rows."
            }

            if($rows[0].Name -ne "One")
            {
                throw "CSV append first row was not preserved."
            }

            if($rows[1].Name -ne "Two")
            {
                throw "CSV append second row was not preserved."
            }
        }

    # -------------------------------------------------------------------------
    # Display Test Summary
    # -------------------------------------------------------------------------

    return Show-TestSummary `
        -Results $results
}

# -----------------------------------------------------------------------------
# Module Initialisation
# -----------------------------------------------------------------------------

Write-Verbose "Toolkit-Reporting module loaded."

Initialize-JDToolkitReporting

# -----------------------------------------------------------------------------
# Public Export Boundary
# -----------------------------------------------------------------------------

Export-ModuleMember `
    -Function `
        Get-JDToolkitReportingVersion, `
        Get-JDToolkitReportingState, `
        Test-JDToolkitReporting, `
        Write-JsonReport, `
        Write-CsvReport, `
        Write-MarkdownReport, `
        Test-ToolkitReporting

# ============================================================================
# End of File
#
# Module Status:
# ✓ Private helper functions
# ✓ JSON reporting
# ✓ CSV reporting
# ✓ Markdown reporting
# ✓ Automatic folder creation
# ✓ Configurable JSON depth
# ✓ CSV append support
# ✓ Markdown metadata support
# ✓ Comprehensive six-test self-test
#
# JustDefenders©
#
# File:
# C:\dev\justdefenders\frontend\tooling\common\Toolkit-Reporting.psm1
#
# Work Package:
# WP-003D
#
# Version:
# 1.2.0
#
# Engineering Baseline:
# WP003D_TOOLKIT_REPORTING_V120
#
# Timestamp:
# 11 August 2026 13:41 Sydney
#
# ============================================================================
