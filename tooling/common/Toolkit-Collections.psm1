<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
Toolkit-Collections.psm1

Repository:
C:\dev\justdefenders\frontend\tooling\common\Toolkit-Collections.psm1

Module:
Engineering Toolkit Collections

Work Package:
WP-004.3.2

Engineering Baseline:
WP00432_TOOLKIT_COLLECTIONS_V120

Version:
1.2.0

Status:
Engineering Baseline

Purpose

Provides canonical collection handling services for the
JustDefenders Engineering Toolkit.

The Toolkit Collections module supplies safe collection operations,
enumeration helpers and common collection utilities that operate
consistently across Windows PowerShell 5.1 and PowerShell 7+.

Responsibilities

    • Safe Array Conversion
    • Collection Inspection
    • Safe Enumeration
    • Group Operations
    • Sorting
    • Unique Value Discovery
    • Collection Diagnostics
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

$Script:Collections = [ordered]@{

    Name          = "Engineering Toolkit Collections"

    Version       = "1.2.0"

    Baseline      = "WP00432_TOOLKIT_COLLECTIONS_V120"

    Initialised   = $false

    Loaded        = Get-Date
}

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

function Initialize-JDToolkitCollections
{
    [CmdletBinding()]
    param()

    $Script:Collections.Initialised = $true
}

#------------------------------------------------------------------------------
# Safe Array Conversion
#------------------------------------------------------------------------------

function ConvertTo-SafeArray
{
    [CmdletBinding()]
    param(

        [Parameter(ValueFromPipeline = $true)]

        $InputObject
    )

    process
    {
        if($null -eq $InputObject)
        {
            return @()
        }

        if($InputObject -is [System.Array])
        {
            return $InputObject
        }

        return @($InputObject)
    }
}

#------------------------------------------------------------------------------
# Safe Count
#------------------------------------------------------------------------------

function Get-SafeCount
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]

        $Collection
    )

    $Safe =
        ConvertTo-SafeArray $Collection

    return $Safe.Count
}

#------------------------------------------------------------------------------
# First Item
#------------------------------------------------------------------------------

function Get-FirstItem
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]

        $Collection
    )

    $Safe =
        ConvertTo-SafeArray $Collection

    if($Safe.Count -eq 0)
    {
        return $null
    }

    return $Safe[0]
}

#------------------------------------------------------------------------------
# Safe Grouping
#------------------------------------------------------------------------------

function Group-Safely
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]

        $Collection,

        [Parameter(Mandatory)]

        [string]
        $Property
    )

    $Safe =
        ConvertTo-SafeArray $Collection

    $Groups =
        $Safe |
        Group-Object `
            -Property $Property

    return ConvertTo-SafeArray $Groups
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Toolkit Collections Version
#------------------------------------------------------------------------------

function Get-JDToolkitCollectionsVersion
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        Name =
            $Script:Collections.Name

        Version =
            $Script:Collections.Version

        Baseline =
            $Script:Collections.Baseline

        Initialised =
            $Script:Collections.Initialised

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Collection Detection
#------------------------------------------------------------------------------

function Test-IsCollection
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]

        $Object
    )

    return (
        ($Object -is [System.Collections.IEnumerable]) -and
        ($Object -isnot [string])
    )
}

#------------------------------------------------------------------------------
# Unique Values
#------------------------------------------------------------------------------

function Get-UniqueValues
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]

        $Collection,

        [Parameter(Mandatory)]

        [string]
        $Property
    )

    $Safe =
        ConvertTo-SafeArray $Collection

    return (
        $Safe |
        Select-Object `
            -ExpandProperty $Property `
            -Unique |
        Sort-Object
    )
}

#------------------------------------------------------------------------------
# Safe Sorting
#------------------------------------------------------------------------------

function Sort-Safely
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]

        $Collection,

        [Parameter(Mandatory)]

        [string]
        $Property
    )

    $Safe =
        ConvertTo-SafeArray $Collection

    return (
        $Safe |
        Sort-Object `
            -Property $Property
    )
}

#------------------------------------------------------------------------------
# Toolkit Diagnostics
#------------------------------------------------------------------------------

function Get-JDToolkitCollectionsState
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Toolkit.Collections.State"

        Name =
            $Script:Collections.Name

        Version =
            $Script:Collections.Version

        Baseline =
            $Script:Collections.Baseline

        Initialised =
            $Script:Collections.Initialised

        Loaded =
            $Script:Collections.Loaded

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Toolkit Integrity Validation
#------------------------------------------------------------------------------

function Test-JDToolkitCollections
{
    [CmdletBinding()]
    param()

    $RequiredFunctions = @(

        "ConvertTo-SafeArray"

        "Get-SafeCount"

        "Get-FirstItem"

        "Group-Safely"

        "Test-IsCollection"

        "Get-UniqueValues"

        "Sort-Safely"

        "Get-JDToolkitCollectionsVersion"

        "Get-JDToolkitCollectionsState"

        "Test-JDToolkitCollections"
    )

    $Missing = @()

    foreach($Function in $RequiredFunctions)
    {
        if(-not (Get-Command `
                    -Name $Function `
                    -ErrorAction SilentlyContinue))
        {
            $Missing += $Function
        }
    }

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Toolkit.Collections.Validation"

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
# Collection Governance Notes
#------------------------------------------------------------------------------

<#
Engineering Guidance

This module intentionally provides a minimal collection utility layer.

The existing public function names (Group-Safely and Sort-Safely)
are retained for backwards compatibility with earlier Engineering
Toolkit releases, despite not using approved PowerShell verbs.

Maintaining API compatibility has been prioritised over renaming
functions, thereby avoiding breaking existing automation and scripts.

Future engineering modules should consume these shared utilities rather
than implementing bespoke collection handling logic.

#>

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Public API
#------------------------------------------------------------------------------

Export-ModuleMember -Function @(

    "ConvertTo-SafeArray",

    "Get-SafeCount",

    "Get-FirstItem",

    "Group-Safely",

    "Test-IsCollection",

    "Get-UniqueValues",

    "Sort-Safely",

    "Get-JDToolkitCollectionsVersion",

    "Get-JDToolkitCollectionsState",

    "Test-JDToolkitCollections"
)

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

Initialize-JDToolkitCollections

Write-Verbose (
    "{0} v{1} initialised successfully." -f `
    $Script:Collections.Name, `
    $Script:Collections.Version
)

#------------------------------------------------------------------------------
# End of Module
#------------------------------------------------------------------------------

<#
===============================================================================
JustDefenders© Engineering
===============================================================================

Module:
Engineering Toolkit Collections

Work Package:
WP-004.3.2

Version:
1.2.0

Engineering Baseline:
WP00432_TOOLKIT_COLLECTIONS_V120

Status:
Engineering Baseline

Summary

The Engineering Toolkit Collections module provides canonical collection
handling services for the JustDefenders Engineering Toolkit.

The module supplies:

    • Safe Array Conversion
    • Collection Detection
    • Safe Enumeration
    • Group Operations
    • Sorting
    • Unique Value Discovery
    • Runtime Diagnostics
    • Version Reporting
    • Integrity Validation

The module provides a consistent collection abstraction layer for
engineering tooling and removes the need for individual modules to
implement their own collection handling logic.

Compatible With

• Windows PowerShell 5.1
• PowerShell 7+

===============================================================================
JustDefenders© 2026
===============================================================================
#>