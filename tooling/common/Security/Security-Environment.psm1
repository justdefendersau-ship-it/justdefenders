<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
Security-Environment.psm1

Repository:
C:\dev\justdefenders\frontend\tooling\common\Security\Security-Environment.psm1

Module:
Security Environment

Work Package:
WP-003F.2

Engineering Baseline:
ALPHA_BASELINE_20260701

Version:
1.0.0

Status:
Initial Implementation

Purpose

Provides canonical runtime environment validation for the
JustDefenders Engineering Platform.

Responsibilities

    • Environment Classification
    • Environment Variable Validation
    • Runtime Validation
    • Repository Validation
    • Security Environment Validation
    • Structured Security Reporting

This module performs validation only.

It does not create, modify or load environment variables.

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

    Name         = "Security Environment"

    Version      = "1.0.0"

    Baseline     = "ALPHA_BASELINE_20260701"

    Initialised  = $false
}

#------------------------------------------------------------------------------
# Import Security Foundation
#------------------------------------------------------------------------------

$ModuleRoot = Split-Path $PSScriptRoot -Parent

$FoundationModule = Join-Path `
    (Join-Path $PSScriptRoot "Foundation") `
    "Security-Foundation.psm1"

Import-Module `
    $FoundationModule `
    -Force `
    -ErrorAction Stop

#------------------------------------------------------------------------------
# Canonical Environment Definitions
#------------------------------------------------------------------------------

$Script:EnvironmentDefinitions = [ordered]@{

    Development = @{

        Name = "Development"

        RequiresSecrets = $true

        AllowsDebug = $true
    }

    Test = @{

        Name = "Test"

        RequiresSecrets = $true

        AllowsDebug = $true
    }

    Staging = @{

        Name = "Staging"

        RequiresSecrets = $true

        AllowsDebug = $false
    }

    Production = @{

        Name = "Production"

        RequiresSecrets = $true

        AllowsDebug = $false
    }
}

#------------------------------------------------------------------------------
# Required Environment Variables
#------------------------------------------------------------------------------

$Script:RequiredVariables = @(

    'NEXT_PUBLIC_SUPABASE_URL',

    'NEXT_PUBLIC_SUPABASE_ANON_KEY',

    'SUPABASE_SERVICE_ROLE_KEY',

    'JWT_SECRET',

    'NEXTAUTH_SECRET'
)

#------------------------------------------------------------------------------
# Placeholder Values
#------------------------------------------------------------------------------

$Script:PlaceholderValues = @(

    '',

    'changeme',

    'password',

    'secret',

    'your-secret',

    'replace-me',

    'example',

    'todo'
)

#------------------------------------------------------------------------------
# Internal Helpers
#------------------------------------------------------------------------------

function Get-JDEnvironmentVariable
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Name
    )

    return [Environment]::GetEnvironmentVariable($Name)
}

function Test-JDPlaceholderValue
{
    [CmdletBinding()]
    param(

        [AllowNull()]
        [string]
        $Value
    )

    if([string]::IsNullOrWhiteSpace($Value))
    {
        return $true
    }

    return (
        $Script:PlaceholderValues -contains
        $Value.ToLowerInvariant()
    )
}

function Test-JDWeakSecret
{
    [CmdletBinding()]
    param(

        [AllowNull()]
        [string]
        $Value
    )

    if([string]::IsNullOrWhiteSpace($Value))
    {
        return $true
    }

    return ($Value.Length -lt 32)
}

#------------------------------------------------------------------------------
# Environment Classification
#------------------------------------------------------------------------------

function Get-JDEnvironment
{
    [CmdletBinding()]
    param()

    $EnvironmentName =
        [Environment]::GetEnvironmentVariable(
            "ASPNETCORE_ENVIRONMENT"
        )

    if([string]::IsNullOrWhiteSpace($EnvironmentName))
    {
        $EnvironmentName = "Development"
    }

    if(
        -not $Script:EnvironmentDefinitions.Contains(
            $EnvironmentName
        )
    )
    {
        $EnvironmentName = "Development"
    }

    return [PSCustomObject]@{

        PSTypeName = 'JustDefenders.Security.Environment'

        Name = $EnvironmentName

        Definition =
            $Script:EnvironmentDefinitions[$EnvironmentName]
    }
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Environment Variable Validation
#------------------------------------------------------------------------------

function Test-JDEnvironmentVariable
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [hashtable]
        $Definition
    )

    $Issues = @()

    $Name = $Definition.Name

    $Value = Get-JDEnvironmentVariable `
        -Name $Name

    if ($Definition.Required -and
        [string]::IsNullOrWhiteSpace($Value))
    {
        $Issues += New-JDSecurityIssue `
            -Code "ENV_MISSING" `
            -Message (
                "Required environment variable '{0}' is missing." -f
                $Name
            ) `
            -Category "Configuration"
    }

    elseif (Test-JDPlaceholderValue $Value)
    {
        $Issues += New-JDSecurityIssue `
            -Code "ENV_PLACEHOLDER" `
            -Message (
                "Environment variable '{0}' contains a placeholder value." -f
                $Name
            ) `
            -Category "Configuration"
    }

    elseif ($Definition.Secret -and
            (Test-JDWeakSecret $Value))
    {
        $Issues += New-JDSecurityIssue `
            -Code "ENV_WEAK_SECRET" `
            -Message (
                "Environment variable '{0}' does not meet minimum secret requirements." -f
                $Name
            ) `
            -Category "Configuration"
    }

    elseif ($Definition.MinimumLength -gt 0 -and
            $Value.Length -lt $Definition.MinimumLength)
    {
        $Issues += New-JDSecurityIssue `
            -Code "ENV_TOO_SHORT" `
            -Message (
                "Environment variable '{0}' is shorter than the required minimum length." -f
                $Name
            ) `
            -Category "Configuration"
    }

    if($Issues.Count -eq 0)
{
    $Result = "PASS"
    $Severity = "Information"
    $Message = "Validated"
}
else
{
    $Result = "FAIL"
    $Severity = "Error"
    $Message = $Issues[0].Message
}

return New-JDSecurityStatus `
    -Name $Name `
    -Result $Result `
    -Category "Configuration" `
    -Severity $Severity `
    -Message $Message `
    -Metadata @{
        Variable = $Name
        Secret = $Definition.Secret
        Issues = $Issues
    }
}

#------------------------------------------------------------------------------
# Runtime Validation
#------------------------------------------------------------------------------

function Test-JDRuntime
{
    [CmdletBinding()]
    param()

    $Statuses = @()

    $Statuses += New-JDSecurityStatus `
        -Name "PowerShell Version" `
        -Result "PASS" `
        -Category "Runtime" `
        -Message $PSVersionTable.PSVersion.ToString()

    $Statuses += New-JDSecurityStatus `
        -Name "Operating System" `
        -Result "PASS" `
        -Category "Runtime" `
        -Message (
            [System.Environment]::OSVersion.VersionString
        )

    if([Environment]::Is64BitProcess)
{
    $ProcessResult = "PASS"
    $ProcessMessage = "64-bit"
}
else
{
    $ProcessResult = "WARNING"
    $ProcessMessage = "32-bit"
}

$Statuses += New-JDSecurityStatus `
    -Name "64-bit Process" `
    -Result $ProcessResult `
    -Category "Runtime" `
    -Message $ProcessMessage

    return $Statuses
}

#------------------------------------------------------------------------------
# Repository Validation
#------------------------------------------------------------------------------

function Test-JDRepository
{
    [CmdletBinding()]
    param()

    $RequiredFolders = @(
        "app",
        "tooling",
        "public",
        "components"
    )

    $Statuses = @()

    foreach($Folder in $RequiredFolders)
{
    $Exists = Test-Path `
        -LiteralPath (
            Join-Path $PWD $Folder
        ) `
        -PathType Container

    if($Exists)
    {
        $RepositoryResult = "PASS"
        $RepositoryMessage = "Folder located."
    }
    else
    {
        $RepositoryResult = "FAIL"
        $RepositoryMessage = "Folder missing."
    }

    $Statuses += New-JDSecurityStatus `
        -Name $Folder `
        -Result $RepositoryResult `
        -Category "Repository" `
        -Message $RepositoryMessage
}

    return $Statuses
}

#------------------------------------------------------------------------------
# Security Environment Validation
#------------------------------------------------------------------------------

function Test-JDSecurityEnvironment
{
    [CmdletBinding()]
    param()

    $Statuses = @()

    foreach($Definition in $Script:RequiredVariables)
    {
        $Statuses += Test-JDEnvironmentVariable `
            -Definition $Definition
    }

    $Statuses += Test-JDRuntime

    $Statuses += Test-JDRepository

    return $Statuses
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Repository Root Resolution
#------------------------------------------------------------------------------

function Get-JDRepositoryRoot
{
    [CmdletBinding()]
    param()

    $Current = $PSScriptRoot

    while ($null -ne $Current)
    {
        if (Test-Path (Join-Path $Current "package.json") `
            -PathType Leaf)
        {
            return $Current
        }

        if (Test-Path (Join-Path $Current ".git"))
        {
            return $Current
        }

        $Parent = Split-Path $Current -Parent

        if ($Parent -eq $Current)
        {
            break
        }

        $Current = $Parent
    }

    throw "Unable to determine repository root."
}

#------------------------------------------------------------------------------
# Environment Report
#------------------------------------------------------------------------------

function Get-JDEnvironmentReport
{
    [CmdletBinding()]
    param()

    $Statuses = Test-JDSecurityEnvironment

    $Report = New-JDSecurityReport `
        -Title "Security Environment Validation" `
        -Results $Statuses `
        -Metadata @{

            RepositoryRoot = Get-JDRepositoryRoot

            Environment = (
                Get-JDEnvironment
            ).Name

            Module = $Script:Module.Name

            Version = $Script:Module.Version
        }

    return Protect-JDSecurityObject $Report
}

#------------------------------------------------------------------------------
# Module Diagnostics
#------------------------------------------------------------------------------

function Get-JDEnvironmentModuleState
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Security.Environment.State"

        Name = $Script:Module.Name

        Version = $Script:Module.Version

        Baseline = $Script:Module.Baseline

        Initialised = $Script:Module.Initialised

        Environment = (
            Get-JDEnvironment
        ).Name

        RepositoryRoot = Get-JDRepositoryRoot

        Timestamp = Get-Date
    }
}

#------------------------------------------------------------------------------
# Module Integrity
#------------------------------------------------------------------------------

function Test-JDEnvironmentModule
{
    [CmdletBinding()]
    param()

    $RequiredFunctions = @(

        'Get-JDEnvironment',

        'Test-JDEnvironmentVariable',

        'Test-JDRuntime',

        'Test-JDRepository',

        'Test-JDSecurityEnvironment',

        'Get-JDRepositoryRoot',

        'Get-JDEnvironmentReport',

        'Get-JDEnvironmentModuleState'
    )

    $Missing = @()

    foreach($Function in $RequiredFunctions)
    {
        if(-not (Get-Command $Function -ErrorAction SilentlyContinue))
        {
            $Missing += $Function
        }
    }

    return New-JDSecurityResult `
        -Success ($Missing.Count -eq 0) `
        -Message "Security Environment Integrity Check" `
        -Data @{

            Module = $Script:Module.Name

            Version = $Script:Module.Version

            FunctionCount = $RequiredFunctions.Count

            MissingFunctions = $Missing
        }
}

#------------------------------------------------------------------------------
# Public API
#------------------------------------------------------------------------------

Export-ModuleMember -Function @(

    'Get-JDEnvironment',

    'Test-JDEnvironmentVariable',

    'Test-JDRuntime',

    'Test-JDRepository',

    'Test-JDSecurityEnvironment',

    'Get-JDRepositoryRoot',

    'Get-JDEnvironmentReport',

    'Get-JDEnvironmentModuleState',

    'Test-JDEnvironmentModule'
)

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

$Script:Module.Initialised = $true

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

Module:
Security Environment

Version:
1.0.0

Status:
Complete

Work Package:
WP-003F.2

Engineering Baseline:
ALPHA_BASELINE_20260701

===============================================================================
#>