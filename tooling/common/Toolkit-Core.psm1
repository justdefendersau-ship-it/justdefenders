<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
Toolkit-Core.psm1

Repository:f
C:\dev\justdefenders\frontend\tooling\common\Toolkit-Core.psm1

Module:
Engineering Toolkit Core

Work Package:
WP-004.3.1

Engineering Baseline:
WP00431_TOOLKIT_CORE_V120

Version:
1.2.0

Status:
Engineering Baseline

Purpose

Provides the canonical core services for the JustDefenders Engineering
Toolkit.

The Toolkit Core module supplies shared configuration discovery,
repository location services, toolkit initialisation and engineering
diagnostics used throughout the Engineering Toolkit.

Responsibilities

    • Toolkit Configuration
    • Repository Discovery
    • Folder Resolution
    • Toolkit Initialisation
    • Module Diagnostics
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

$Script:Toolkit = [ordered]@{

    Name          = "Engineering Toolkit Core"

    Version       = "1.2.0"

    Baseline      = "WP00431_TOOLKIT_CORE_V120"

    Initialised   = $false

    Loaded        = Get-Date
}

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

function Initialize-JDToolkitCore
{
    [CmdletBinding()]
    param()

    $Script:Toolkit.Initialised = $true
}

#------------------------------------------------------------------------------
# Toolkit Configuration
#------------------------------------------------------------------------------

function Get-ToolkitConfiguration
{
    [CmdletBinding()]
    param()

    $ToolingRoot =
        Split-Path $PSScriptRoot -Parent

    $ProjectRoot =
        Split-Path $ToolingRoot -Parent

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Toolkit.Configuration"

        ToolkitName =
            "JustDefenders Engineering Toolkit"

        ToolkitVersion =
            $Script:Toolkit.Version

        EngineeringBaseline =
            $Script:Toolkit.Baseline

        ProjectRoot =
            $ProjectRoot

        ToolingRoot =
            $ToolingRoot

        CommonFolder =
            Join-Path $ToolingRoot "common"

        DiscoveryFolder =
            Join-Path $ToolingRoot "discovery"

        EngineeringFolder =
            Join-Path $ToolingRoot "engineering"

        ValidationFolder =
            Join-Path $ToolingRoot "validation"

        SecurityFolder =
            Join-Path $ToolingRoot "Security"

        TestingFolder =
            Join-Path $ToolingRoot "Testing"

        OutputFolder =
            Join-Path $ToolingRoot "output"

        ApiFolder =
            Join-Path $ProjectRoot "app\api"

        InventoryJson =
            Join-Path `
                $ToolingRoot `
                "output\platform-inventory.json"

        HealthJson =
            Join-Path `
                $ToolingRoot `
                "output\platform-health.json"

        DashboardJson =
            Join-Path `
                $ToolingRoot `
                "output\engineering-dashboard.json"
    }
}

#------------------------------------------------------------------------------
# Toolkit Version
#------------------------------------------------------------------------------

function Get-JDToolkitCoreVersion
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        Name =
            $Script:Toolkit.Name

        Version =
            $Script:Toolkit.Version

        Baseline =
            $Script:Toolkit.Baseline

        Initialised =
            $Script:Toolkit.Initialised

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Toolkit Initialisation
#------------------------------------------------------------------------------

function Initialize-Toolkit
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [ValidateNotNull()]
        [pscustomobject]
        $Configuration
    )

    $RequiredFolders = @(

        $Configuration.OutputFolder,

        $Configuration.CommonFolder
    )

    foreach($Folder in $RequiredFolders)
    {
        if(-not (Test-Path -LiteralPath $Folder))
        {
            New-Item `
                -ItemType Directory `
                -Path $Folder `
                -Force | Out-Null
        }
    }

    $Script:Toolkit.Initialised = $true

    return $true
}

#------------------------------------------------------------------------------
# Repository Validation
#------------------------------------------------------------------------------

function Test-JDToolkitRepository
{
    [CmdletBinding()]
    param()

    $Configuration =
        Get-ToolkitConfiguration

    $RequiredFolders = @{

        ProjectRoot      = $Configuration.ProjectRoot

        ToolingRoot      = $Configuration.ToolingRoot

        CommonFolder     = $Configuration.CommonFolder

        OutputFolder     = $Configuration.OutputFolder
    }

    $Results = @()

    foreach($Item in $RequiredFolders.GetEnumerator())
    {
        $Results += [PSCustomObject]@{

            Name = $Item.Key

            Path = $Item.Value

            Exists =
                Test-Path `
                    -LiteralPath $Item.Value `
                    -PathType Container
        }
    }

    return $Results
}

#------------------------------------------------------------------------------
# Toolkit Diagnostics
#------------------------------------------------------------------------------

function Get-JDToolkitCoreState
{
    [CmdletBinding()]
    param()

    $Configuration =
        Get-ToolkitConfiguration

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Toolkit.Core.State"

        Name =
            $Script:Toolkit.Name

        Version =
            $Script:Toolkit.Version

        Baseline =
            $Script:Toolkit.Baseline

        Initialised =
            $Script:Toolkit.Initialised

        Loaded =
            $Script:Toolkit.Loaded

        ProjectRoot =
            $Configuration.ProjectRoot

        ToolingRoot =
            $Configuration.ToolingRoot

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Toolkit Integrity Validation
#------------------------------------------------------------------------------

function Test-JDToolkitCore
{
    [CmdletBinding()]
    param()

    $RequiredFunctions = @(

        "Get-ToolkitConfiguration"

        "Initialize-Toolkit"

        "Get-JDToolkitCoreVersion"

        "Get-JDToolkitCoreState"

        "Test-JDToolkitRepository"

        "Test-JDToolkitCore"
    )

    $Missing = @()

    foreach($Function in $RequiredFunctions)
    {
        if(-not (Get-Command $Function -ErrorAction SilentlyContinue))
        {
            $Missing += $Function
        }
    }

    $Repository =
        Test-JDToolkitRepository

    $MissingFolders =
        @(
            $Repository |
            Where-Object {
                -not $_.Exists
            }
        )

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Toolkit.Core.Validation"

        Success =
            (
                ($Missing.Count -eq 0) -and
                ($MissingFolders.Count -eq 0)
            )

        FunctionCount =
            $RequiredFunctions.Count

        MissingFunctions =
            $Missing

        RepositoryFolders =
            $Repository.Count

        MissingFolders =
    @(
        $MissingFolders |
        ForEach-Object {
            $_.Name
        }
    )

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Public API
#------------------------------------------------------------------------------

Export-ModuleMember -Function @(

    "Get-ToolkitConfiguration",

    "Initialize-Toolkit",

    "Get-JDToolkitCoreVersion",

    "Get-JDToolkitCoreState",

    "Test-JDToolkitRepository",

    "Test-JDToolkitCore"
)

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

Initialize-JDToolkitCore

Write-Verbose (
    "{0} v{1} initialised successfully." -f `
    $Script:Toolkit.Name, `
    $Script:Toolkit.Version
)

#------------------------------------------------------------------------------
# End of Module
#------------------------------------------------------------------------------

<#
===============================================================================
JustDefenders© Engineering
===============================================================================

Module:
Engineering Toolkit Core

Work Package:
WP-004.3.1

Version:
1.2.0

Engineering Baseline:
WP00431_TOOLKIT_CORE_V120

Status:
Engineering Baseline

Summary

The Engineering Toolkit Core module provides the foundational services
required by the JustDefenders Engineering Toolkit.

The module supplies:

    • Toolkit Configuration
    • Repository Discovery
    • Toolkit Initialisation
    • Repository Validation
    • Framework Diagnostics
    • Version Reporting
    • Integrity Validation

The module serves as the common entry point for shared engineering
tooling and provides a stable foundation for all higher-level toolkit
components.

Compatible With

• Windows PowerShell 5.1
• PowerShell 7+

===============================================================================
JustDefenders© 2026
===============================================================================
#>