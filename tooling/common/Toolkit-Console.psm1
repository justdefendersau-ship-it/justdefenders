<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
Toolkit-Console.psm1

Repository:
C:\dev\justdefenders\frontend\tooling\common\Toolkit-Console.psm1

Module:
Engineering Toolkit Console

Work Package:
WP-004.3.4

Engineering Baseline:
WP00434_TOOLKIT_CONSOLE_V120

Version:
1.2.0

Status:
Engineering Baseline

Purpose

Provides canonical console presentation services for the
JustDefenders Engineering Toolkit.

The Toolkit Console module supplies standardised console formatting,
banner rendering, messaging helpers and engineering output formatting
used throughout the shared engineering tooling.

Responsibilities

    • Banner Rendering
    • Section Formatting
    • Console Messaging
    • Footer Rendering
    • Runtime Diagnostics
    • Version Reporting
    • Integrity Validation

Compatible With

• Windows PowerShell 5.1
• PowerShell 7+

===============================================================================
#>

Set-StrictMode -Version Latest

#------------------------------------------------------------------------------
# Module State
#------------------------------------------------------------------------------

$Script:Console = [ordered]@{

    Name          = "Engineering Toolkit Console"

    Version       = "1.2.0"

    Baseline      = "WP00434_TOOLKIT_CONSOLE_V120"

    Initialised   = $false

    Loaded        = Get-Date
}

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

function Initialize-JDToolkitConsole
{
    [CmdletBinding()]
    param()

    $Script:Console.Initialised = $true
}

#------------------------------------------------------------------------------
# Banner
#------------------------------------------------------------------------------

function Show-ToolkitBanner
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        $Configuration,

        [Parameter(Mandatory)]
        [string]
        $Title
    )

    Clear-Host

    Write-Host ""

    Write-Host (
        "============================================================"
    )

    Write-Host (
        " {0}" -f $Title
    )

    Write-Host (
        "============================================================"
    )

    Write-Host ""

    Write-Host (
        "Toolkit Version : {0}" -f
        $Configuration.ToolkitVersion
    )

    Write-Host (
        "Project Root    : {0}" -f
        $Configuration.ProjectRoot
    )

    Write-Host (
        "Generated       : {0}" -f
        (Get-Date)
    )

    Write-Host ""
}

#------------------------------------------------------------------------------
# Section Heading
#------------------------------------------------------------------------------

function Write-Section
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Title
    )

    Write-Host ""

    Write-Host (
        "------------------------------------------------------------"
    )

    Write-Host (
        " {0}" -f $Title
    )

    Write-Host (
        "------------------------------------------------------------"
    )

    Write-Host ""
}

#------------------------------------------------------------------------------
# Message Helpers
#------------------------------------------------------------------------------

function Write-Info
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Message
    )

    Write-Host (
        "[INFO]    {0}" -f $Message
    )
}

function Write-Success
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Message
    )

    Write-Host (
        "[SUCCESS] {0}" -f $Message
    )
}

function Write-WarningMessage
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Message
    )

    Write-Host (
        "[WARNING] {0}" -f $Message
    )
}

function Write-ErrorMessage
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Message
    )

    Write-Host (
        "[ERROR]   {0}" -f $Message
    )
}

#------------------------------------------------------------------------------
# Toolkit Console Version
#------------------------------------------------------------------------------

function Get-JDToolkitConsoleVersion
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        Name =
            $Script:Console.Name

        Version =
            $Script:Console.Version

        Baseline =
            $Script:Console.Baseline

        Initialised =
            $Script:Console.Initialised

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Toolkit Diagnostics
#------------------------------------------------------------------------------

function Get-JDToolkitConsoleState
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Toolkit.Console.State"

        Name =
            $Script:Console.Name

        Version =
            $Script:Console.Version

        Baseline =
            $Script:Console.Baseline

        Initialised =
            $Script:Console.Initialised

        Loaded =
            $Script:Console.Loaded

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Toolkit Integrity Validation
#------------------------------------------------------------------------------

function Test-JDToolkitConsole
{
    [CmdletBinding()]
    param()

    $RequiredFunctions = @(

        "Show-ToolkitBanner"

        "Write-Section"

        "Write-Info"

        "Write-Success"

        "Write-WarningMessage"

        "Write-ErrorMessage"

        "Write-Footer"

        "Get-JDToolkitConsoleVersion"

        "Get-JDToolkitConsoleState"

        "Test-JDToolkitConsole"
    )

    $Missing = @()

    foreach($Function in $RequiredFunctions)
    {
        if(
            -not (
                Get-Command `
                    -Name $Function `
                    -ErrorAction SilentlyContinue
            )
        )
        {
            $Missing += $Function
        }
    }

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Toolkit.Console.Validation"

        Success =
            ($Missing.Count -eq 0)

        FunctionCount =
            $RequiredFunctions.Count

        MissingFunctions =
            $Missing

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Engineering Governance Notes
#------------------------------------------------------------------------------

<#
Engineering Guidance

Toolkit Console provides the canonical console presentation layer for
the JustDefenders Engineering Toolkit.

The module centralises banner rendering, console formatting and message
presentation so that engineering tooling maintains a consistent user
experience.

Future engineering modules should consume these shared console services
rather than implementing bespoke console output.

The governance standardisation introduces module state, diagnostics,
version reporting and integrity validation while preserving the existing
console presentation behaviour.

This module has been designed for compatibility with both Windows
PowerShell 5.1 and PowerShell 7+.

#>

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Public API
#------------------------------------------------------------------------------

Export-ModuleMember -Function @(

    "Show-ToolkitBanner",

    "Write-Section",

    "Write-Info",

    "Write-Success",

    "Write-WarningMessage",

    "Write-ErrorMessage",

    "Write-Footer",

    "Get-JDToolkitConsoleVersion",

    "Get-JDToolkitConsoleState",

    "Test-JDToolkitConsole"
)

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

Initialize-JDToolkitConsole

Write-Verbose (
    "{0} v{1} initialised successfully." -f `
    $Script:Console.Name,
    $Script:Console.Version
)

#------------------------------------------------------------------------------
# End of Module
#------------------------------------------------------------------------------

<#
===============================================================================
JustDefenders© Engineering
===============================================================================

Module:
Engineering Toolkit Console

Work Package:
WP-004.3.4

Version:
1.2.0

Engineering Baseline:
WP00434_TOOLKIT_CONSOLE_V120

Status:
Engineering Baseline

Summary

The Engineering Toolkit Console module provides the canonical console
presentation layer for the JustDefenders Engineering Toolkit.

The module supplies:

    • Banner Rendering
    • Section Formatting
    • Console Messaging
    • Footer Rendering
    • Runtime Diagnostics
    • Version Reporting
    • Integrity Validation

The module establishes a common engineering presentation layer used by
all shared toolkit modules, ensuring consistent console output,
diagnostics and operational messaging across the Engineering Toolkit.

Compatible With

• Windows PowerShell 5.1
• PowerShell 7+

===============================================================================
JustDefenders© 2026
===============================================================================
#>