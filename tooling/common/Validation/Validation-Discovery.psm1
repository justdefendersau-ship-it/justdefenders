<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
Validation-Discovery.psm1

Repository:
C:\dev\justdefenders\frontend\tooling\common\Validation\
Validation-Discovery.psm1

Module:
Engineering Validation Discovery

Version:
1.0.0

Engineering Baseline:
ALPHA_BASELINE_20260701

Purpose

Discovers validation targets for the JustDefenders Engineering Toolkit.

Responsibilities

    • Repository Discovery
    • Module Discovery
    • Test Discovery
    • Validation Target Construction
    • Dependency Metadata
    • Validation Filtering

Execution and reporting are delegated to dedicated modules.

Compatible With

• Windows PowerShell 5.1
• PowerShell 7+

===============================================================================
#>

Set-StrictMode -Version Latest

#------------------------------------------------------------------------------
# Module State
#------------------------------------------------------------------------------

$Script:Module = [ordered]@{

    Name = "Engineering Validation Discovery"

    Version = "1.0.0"

    Baseline = "ALPHA_BASELINE_20260701"

    Initialised = $true
}

#------------------------------------------------------------------------------
# Validation Target Constructor
#------------------------------------------------------------------------------

function New-JDValidationTarget
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Name,

        [Parameter(Mandatory)]
        [string]
        $ModulePath,

        [Parameter(Mandatory)]
        [string]
        $TestPath,

        [string]
        $Category = "General",

        [string[]]
        $Dependencies = @(),

        [int]
        $Priority = 100,

        [bool]
        $Enabled = $true
    )

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Validation.Target"

        Name = $Name

        Category = $Category

        ModulePath = $ModulePath

        TestPath = $TestPath

        Dependencies = $Dependencies

        Priority = $Priority

        Enabled = $Enabled

        Discovered = Get-Date
    }
}

#------------------------------------------------------------------------------
# Repository Information
#------------------------------------------------------------------------------

function Get-JDRepositoryInformation
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Configuration
    )

    $Root = $Configuration.RepositoryRoot

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Validation.Repository"

        Root = $Root

        ToolingPath = Join-Path $Root "tooling"

        SecurityPath = Join-Path $Root "tooling\common\Security"

        ValidationPath = Join-Path $Root "tooling\common\Validation"

        TestingPath = Join-Path $Root "tooling\common\Testing"

        Exists = (Test-Path -LiteralPath $Root)
    }
}

#------------------------------------------------------------------------------
# Module Discovery
#------------------------------------------------------------------------------

function Get-JDModuleCandidates
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Root
    )

    Get-ChildItem `
        -Path $Root `
        -Filter "*.psm1" `
        -Recurse `
        -File |
    Sort-Object FullName
}

#------------------------------------------------------------------------------
# Test Discovery
#------------------------------------------------------------------------------

function Get-JDTestCandidates
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Root
    )

    Get-ChildItem `
        -Path $Root `
        -Filter "*.Tests.ps1" `
        -Recurse `
        -File |
    Sort-Object FullName
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Validation Target Pairing
#------------------------------------------------------------------------------

function Get-JDValidationTargets
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Configuration
    )

    $Repository =
        Get-JDRepositoryInformation `
            -Configuration $Configuration

    $Modules =
        Get-JDModuleCandidates `
            -Root $Repository.Root

    $Tests =
        Get-JDTestCandidates `
            -Root $Repository.Root

    $Targets = New-Object System.Collections.ArrayList

    foreach($Module in $Modules)
    {
        $ModuleName =
            [System.IO.Path]::GetFileNameWithoutExtension(
                $Module.Name
            )

        $ExpectedTest =
            "{0}.Tests.ps1" -f $ModuleName

        $Test =
            $Tests |
            Where-Object Name -eq $ExpectedTest |
            Select-Object -First 1

        if($null -eq $Test)
        {
            continue
        }

        $Dependencies =
            Get-JDModuleDependencies `
                -ModuleName $ModuleName

        $Target =
            New-JDValidationTarget `
                -Name $ModuleName `
                -ModulePath $Module.FullName `
                -TestPath $Test.FullName `
                -Category (
                    Get-JDModuleCategory `
                        -ModulePath $Module.FullName
                ) `
                -Dependencies $Dependencies

        [void]$Targets.Add($Target)
    }

    return $Targets
}

#------------------------------------------------------------------------------
# Module Category Resolution
#------------------------------------------------------------------------------

function Get-JDModuleCategory
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $ModulePath
    )

    if($ModulePath -match "\\Security\\")
    {
        return "Security"
    }

    if($ModulePath -match "\\Testing\\")
    {
        return "Testing"
    }

    if($ModulePath -match "\\Validation\\")
    {
        return "Validation"
    }

    return "General"
}

#------------------------------------------------------------------------------
# Dependency Resolution
#------------------------------------------------------------------------------

function Get-JDModuleDependencies
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $ModuleName
    )

    switch($ModuleName)
    {
        "Security-Foundation"
        {
            return @()
        }

        "Test-Framework"
        {
            return @(
                "Security-Foundation"
            )
        }

        "Test-Assertions"
        {
            return @(
                "Test-Framework"
            )
        }

        "Security-Environment"
        {
            return @(
                "Security-Foundation"
            )
        }

        default
        {
            return @()
        }
    }
}

#------------------------------------------------------------------------------
# Validation Filtering
#------------------------------------------------------------------------------

function Filter-JDValidationTargets
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [System.Collections.IEnumerable]
        $Targets,

        [Parameter(Mandatory)]
        [pscustomobject]
        $Configuration
    )

    $Filtered = @($Targets)

    if($Configuration.Module)
    {
        $Filtered =
            $Filtered |
            Where-Object Name -eq $Configuration.Module
    }

    if($Configuration.Category)
    {
        $Filtered =
            $Filtered |
            Where-Object Category -eq $Configuration.Category
    }

    if($Configuration.SecurityOnly)
    {
        $Filtered =
            $Filtered |
            Where-Object Category -eq "Security"
    }

    if($Configuration.ToolkitOnly)
    {
        $Filtered =
            $Filtered |
            Where-Object {

                $_.Category -in @(
                    "Testing",
                    "Validation"
                )
            }
    }

    return @($Filtered)
}

#------------------------------------------------------------------------------
# Discovery Integrity
#------------------------------------------------------------------------------

function Test-JDDiscoveryIntegrity
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [System.Collections.IEnumerable]
        $Targets
    )

    $DuplicateNames =
        @($Targets |
        Group-Object Name |
        Where-Object Count -gt 1)

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Validation.Discovery"

        Success =
            ($DuplicateNames.Count -eq 0)

        TargetCount =
            @($Targets).Count

        DuplicateTargets =
            $DuplicateNames

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Validation Target Pairing
#------------------------------------------------------------------------------

function Get-JDValidationTargets
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Configuration
    )

    $Repository =
        Get-JDRepositoryInformation `
            -Configuration $Configuration

    $Modules =
        Get-JDModuleCandidates `
            -Root $Repository.Root

    $Tests =
        Get-JDTestCandidates `
            -Root $Repository.Root

    $Targets = New-Object System.Collections.ArrayList

    foreach($Module in $Modules)
    {
        $ModuleName =
            [System.IO.Path]::GetFileNameWithoutExtension(
                $Module.Name
            )

        $ExpectedTest =
            "{0}.Tests.ps1" -f $ModuleName

        $Test =
            $Tests |
            Where-Object Name -eq $ExpectedTest |
            Select-Object -First 1

        if($null -eq $Test)
        {
            continue
        }

        $Dependencies =
            Get-JDModuleDependencies `
                -ModuleName $ModuleName

        $Target =
            New-JDValidationTarget `
                -Name $ModuleName `
                -ModulePath $Module.FullName `
                -TestPath $Test.FullName `
                -Category (
                    Get-JDModuleCategory `
                        -ModulePath $Module.FullName
                ) `
                -Dependencies $Dependencies

        [void]$Targets.Add($Target)
    }

    return $Targets
}

#------------------------------------------------------------------------------
# Module Category Resolution
#------------------------------------------------------------------------------

function Get-JDModuleCategory
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $ModulePath
    )

    if($ModulePath -match "\\Security\\")
    {
        return "Security"
    }

    if($ModulePath -match "\\Testing\\")
    {
        return "Testing"
    }

    if($ModulePath -match "\\Validation\\")
    {
        return "Validation"
    }

    return "General"
}

#------------------------------------------------------------------------------
# Dependency Resolution
#------------------------------------------------------------------------------

function Get-JDModuleDependencies
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $ModuleName
    )

    switch($ModuleName)
    {
        "Security-Foundation"
        {
            return @()
        }

        "Test-Framework"
        {
            return @(
                "Security-Foundation"
            )
        }

        "Test-Assertions"
        {
            return @(
                "Test-Framework"
            )
        }

        "Security-Environment"
        {
            return @(
                "Security-Foundation"
            )
        }

        default
        {
            return @()
        }
    }
}

#------------------------------------------------------------------------------
# Validation Filtering
#------------------------------------------------------------------------------

function Filter-JDValidationTargets
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [System.Collections.IEnumerable]
        $Targets,

        [Parameter(Mandatory)]
        [pscustomobject]
        $Configuration
    )

    $Filtered = @($Targets)

    if($Configuration.Module)
    {
        $Filtered =
            $Filtered |
            Where-Object Name -eq $Configuration.Module
    }

    if($Configuration.Category)
    {
        $Filtered =
            $Filtered |
            Where-Object Category -eq $Configuration.Category
    }

    if($Configuration.SecurityOnly)
    {
        $Filtered =
            $Filtered |
            Where-Object Category -eq "Security"
    }

    if($Configuration.ToolkitOnly)
    {
        $Filtered =
            $Filtered |
            Where-Object {

                $_.Category -in @(
                    "Testing",
                    "Validation"
                )
            }
    }

    return @($Filtered)
}

#------------------------------------------------------------------------------
# Discovery Integrity
#------------------------------------------------------------------------------

function Test-JDDiscoveryIntegrity
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [System.Collections.IEnumerable]
        $Targets
    )

    $DuplicateNames =
        @($Targets |
        Group-Object Name |
        Where-Object Count -gt 1)

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Validation.Discovery"

        Success =
            ($DuplicateNames.Count -eq 0)

        TargetCount =
            @($Targets).Count

        DuplicateTargets =
            $DuplicateNames

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Discovery Report
#------------------------------------------------------------------------------

function New-JDDiscoveryReport
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [System.Collections.IEnumerable]
        $Targets,

        [Parameter(Mandatory)]
        [System.Collections.IEnumerable]
        $Modules,

        [Parameter(Mandatory)]
        [System.Collections.IEnumerable]
        $Tests
    )

    $TargetNames = @($Targets.Name)

    $OrphanedModules = @()

    foreach($Module in $Modules)
    {
        $Name = [System.IO.Path]::GetFileNameWithoutExtension($Module.Name)

        if($TargetNames -notcontains $Name)
        {
            $OrphanedModules += $Module.FullName
        }
    }

    $OrphanedTests = @()

    foreach($Test in $Tests)
    {
        $Expected =
            $Test.Name.Replace(".Tests.ps1",".psm1")

        if($Modules.Name -notcontains $Expected)
        {
            $OrphanedTests += $Test.FullName
        }
    }

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Validation.Discovery.Report"

        TargetCount = @($Targets).Count

        ModuleCount = @($Modules).Count

        TestCount = @($Tests).Count

        OrphanedModules = $OrphanedModules

        OrphanedTests = $OrphanedTests

        Generated = Get-Date
    }
}

#------------------------------------------------------------------------------
# Discovery Entry Point
#------------------------------------------------------------------------------

function Get-JDValidationDiscovery
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [pscustomobject]
        $Configuration
    )

    $Repository =
        Get-JDRepositoryInformation `
            -Configuration $Configuration

    $Modules =
        Get-JDModuleCandidates `
            -Root $Repository.Root

    $Tests =
        Get-JDTestCandidates `
            -Root $Repository.Root

    $Targets =
        Get-JDValidationTargets `
            -Configuration $Configuration

    $Targets =
        Filter-JDValidationTargets `
            -Targets $Targets `
            -Configuration $Configuration

    $Integrity =
        Test-JDDiscoveryIntegrity `
            -Targets $Targets

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Validation.Discovery"

        Repository = $Repository

        Targets = $Targets

        Integrity = $Integrity

        Report =
            New-JDDiscoveryReport `
                -Targets $Targets `
                -Modules $Modules `
                -Tests $Tests
    }
}

#------------------------------------------------------------------------------
# Module Version
#------------------------------------------------------------------------------

function Get-JDValidationDiscoveryVersion
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Validation.Discovery.Version"

        Name = $Script:Module.Name

        Version = $Script:Module.Version

        Baseline = $Script:Module.Baseline

        Timestamp = Get-Date
    }
}

#------------------------------------------------------------------------------
# Module Integrity
#------------------------------------------------------------------------------

function Test-JDValidationDiscovery
{
    [CmdletBinding()]
    param()

    $Functions = @(

        'Get-JDValidationDiscovery',

        'Get-JDValidationTargets',

        'Get-JDRepositoryInformation',

        'Test-JDValidationDiscovery',

        'Get-JDValidationDiscoveryVersion'
    )

    $Missing = @()

    foreach($Function in $Functions)
    {
        if(-not (Get-Command $Function -ErrorAction SilentlyContinue))
        {
            $Missing += $Function
        }
    }

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Validation.Discovery.Validation"

        Success =
            ($Missing.Count -eq 0)

        FunctionCount =
            $Functions.Count

        MissingFunctions =
            $Missing

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Public API
#------------------------------------------------------------------------------

Export-ModuleMember -Function @(

    'Get-JDValidationDiscovery',

    'Get-JDValidationTargets',

    'Get-JDRepositoryInformation',

    'Test-JDValidationDiscovery',

    'Get-JDValidationDiscoveryVersion'
)

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

Write-Verbose (
    "{0} v{1} initialised successfully." -f
    $Script:Module.Name,
    $Script:Module.Version
)

#------------------------------------------------------------------------------
# End of Module
#------------------------------------------------------------------------------

<#
===============================================================================
JustDefenders© Engineering

Validation Discovery

Version:
1.0.0

Status:
Complete

Engineering Baseline:
ALPHA_BASELINE_20260701

===============================================================================
#>