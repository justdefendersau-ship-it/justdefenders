<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
Toolkit-Compatibility.psm1

Repository:
C:\dev\justdefenders\frontend\tooling\common\Toolkit-Compatibility.psm1

Module:
Engineering Toolkit Compatibility

Work Package:
WP-004.3.3

Engineering Baseline:
WP00433_TOOLKIT_COMPATIBILITY_V120

Version:
1.2.0

Status:
Engineering Baseline

Purpose

Provides canonical compatibility services for the
JustDefenders Engineering Toolkit.

The Toolkit Compatibility module provides runtime compatibility helpers,
collection compatibility utilities and PowerShell runtime detection for
both Windows PowerShell 5.1 and PowerShell 7+.

Responsibilities

    • Runtime Detection
    • Collection Compatibility
    • Property Inspection
    • Property Retrieval
    • Version Reporting
    • Runtime Diagnostics
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

$Script:Compatibility = [ordered]@{

    Name          = "Engineering Toolkit Compatibility"

    Version       = "1.2.0"

    Baseline      = "WP00433_TOOLKIT_COMPATIBILITY_V120"

    Initialised   = $false

    Loaded        = Get-Date
}

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

function Initialize-JDToolkitCompatibility
{
    [CmdletBinding()]
    param()

    $Script:Compatibility.Initialised = $true
}

#------------------------------------------------------------------------------
# Private Helper
#------------------------------------------------------------------------------

function Normalize-Collection
{
    [CmdletBinding()]
    param(

        $InputObject
    )

    if($null -eq $InputObject)
    {
        return @()
    }

    return @($InputObject)
}

#------------------------------------------------------------------------------
# Collection Helpers
#------------------------------------------------------------------------------

function Get-CollectionItems
{
    [CmdletBinding()]
    param(

        $Collection
    )

    return @(Normalize-Collection $Collection)
}

function Get-CollectionCount
{
    [CmdletBinding()]
    param(

        $Collection
    )

    $Items =
        @(Normalize-Collection $Collection)

    return $Items.Length
}

function Get-FirstItem
{
    [CmdletBinding()]
    param(

        $Collection
    )

    $Items =
        @(Normalize-Collection $Collection)

    if($Items.Length -eq 0)
    {
        return $null
    }

    return $Items[0]
}

#------------------------------------------------------------------------------
# Property Helpers
#------------------------------------------------------------------------------

function Test-PropertyExists
{
    [CmdletBinding()]
    param(

        $Object,

        [string]
        $Property
    )

    if($null -eq $Object)
    {
        return $false
    }

    return (
        $Object.PSObject.Properties.Name -contains
        $Property
    )
}

function Get-PropertyValue
{
    [CmdletBinding()]
    param(

        $Object,

        [string]
        $Property
    )

    if(-not (Test-PropertyExists $Object $Property))
    {
        return $null
    }

    return $Object.$Property
}

#------------------------------------------------------------------------------
# Runtime Detection
#------------------------------------------------------------------------------

function Test-WindowsPowerShell
{
    [CmdletBinding()]
    param()

    return (
        $PSVersionTable.PSEdition -eq "Desktop"
    )
}

function Test-PowerShell7
{
    [CmdletBinding()]
    param()

    return (
        $PSVersionTable.PSEdition -eq "Core"
    )
}

function Get-PowerShellDetails
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        Edition =
            $PSVersionTable.PSEdition

        Version =
            $PSVersionTable.PSVersion.ToString()

        MajorVersion =
            $PSVersionTable.PSVersion.Major

        OperatingSystem =
            [System.Environment]::OSVersion.VersionString
    }
}

#------------------------------------------------------------------------------
# Toolkit Compatibility Version
#------------------------------------------------------------------------------

function Get-JDToolkitCompatibilityVersion
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        Name =
            $Script:Compatibility.Name

        Version =
            $Script:Compatibility.Version

        Baseline =
            $Script:Compatibility.Baseline

        Initialised =
            $Script:Compatibility.Initialised

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

function Get-JDToolkitCompatibilityState
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Toolkit.Compatibility.State"

        Name =
            $Script:Compatibility.Name

        Version =
            $Script:Compatibility.Version

        Baseline =
            $Script:Compatibility.Baseline

        Initialised =
            $Script:Compatibility.Initialised

        Loaded =
            $Script:Compatibility.Loaded

        Runtime =
            $PSVersionTable.PSEdition

        PowerShellVersion =
            $PSVersionTable.PSVersion.ToString()

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Toolkit Integrity Validation
#------------------------------------------------------------------------------

function Test-JDToolkitCompatibility
{
    [CmdletBinding()]
    param()

    $RequiredFunctions = @(

        "Get-CollectionItems"

        "Get-CollectionCount"

        "Get-FirstItem"

        "Test-PropertyExists"

        "Get-PropertyValue"

        "Test-WindowsPowerShell"

        "Test-PowerShell7"

        "Get-PowerShellDetails"

        "Get-JDToolkitCompatibilityVersion"

        "Get-JDToolkitCompatibilityState"

        "Test-JDToolkitCompatibility"
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
            "JustDefenders.Toolkit.Compatibility.Validation"

        Success =
            ($Missing.Count -eq 0)

        FunctionCount =
            $RequiredFunctions.Count

        MissingFunctions =
            $Missing

        Runtime =
            $PSVersionTable.PSEdition

        PowerShellVersion =
            $PSVersionTable.PSVersion.ToString()

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Legacy Compatibility Self-Test
#------------------------------------------------------------------------------

function Test-ToolkitCompatibility
{
    [CmdletBinding()]
    param()

    return Test-JDToolkitCompatibility
}

#------------------------------------------------------------------------------
# Engineering Governance Notes
#------------------------------------------------------------------------------

<#
Engineering Guidance

Toolkit Compatibility provides the canonical runtime compatibility layer
for the JustDefenders Engineering Toolkit.

The module intentionally preserves the original public compatibility
functions while introducing governance, diagnostics and integrity
validation.

The legacy entry point Test-ToolkitCompatibility has been retained for
backwards compatibility and now delegates to the governed validation
routine Test-JDToolkitCompatibility.

Future engineering modules should use the compatibility services exposed
by this module rather than implementing their own PowerShell runtime
detection or property inspection logic.

The module is designed to operate consistently under both Windows
PowerShell 5.1 and PowerShell 7+.

#>

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Public API
#------------------------------------------------------------------------------

Export-ModuleMember -Function @(

    "Get-CollectionItems",

    "Get-CollectionCount",

    "Get-FirstItem",

    "Test-PropertyExists",

    "Get-PropertyValue",

    "Test-WindowsPowerShell",

    "Test-PowerShell7",

    "Get-PowerShellDetails",

    "Get-JDToolkitCompatibilityVersion",

    "Get-JDToolkitCompatibilityState",

    "Test-JDToolkitCompatibility",

    "Test-ToolkitCompatibility"
)

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

Initialize-JDToolkitCompatibility

Write-Verbose (
    "{0} v{1} initialised successfully." -f `
    $Script:Compatibility.Name,
    $Script:Compatibility.Version
)

#------------------------------------------------------------------------------
# End of Module
#------------------------------------------------------------------------------

<#
===============================================================================
JustDefenders© Engineering
===============================================================================

Module:
Engineering Toolkit Compatibility

Work Package:
WP-004.3.3

Version:
1.2.0

Engineering Baseline:
WP00433_TOOLKIT_COMPATIBILITY_V120

Status:
Engineering Baseline

Summary

The Engineering Toolkit Compatibility module provides the canonical
compatibility layer for the JustDefenders Engineering Toolkit.

The module supplies:

    • Collection Compatibility
    • Runtime Detection
    • Property Inspection
    • Property Retrieval
    • Runtime Diagnostics
    • Version Reporting
    • Integrity Validation

The module provides a common compatibility abstraction layer for all
engineering modules, ensuring consistent behaviour across supported
PowerShell runtimes.

Compatible With

• Windows PowerShell 5.1
• PowerShell 7+

===============================================================================
JustDefenders© 2026
===============================================================================
#>