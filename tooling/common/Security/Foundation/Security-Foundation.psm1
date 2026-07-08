<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
Security-Foundation.psm1

Repository:
C:\dev\justdefenders\frontend\tooling\common\Security\Foundation\Security-Foundation.psm1

Module:
Security Foundation

Work Package:
WP-003F.1A

Engineering Baseline:
ALPHA_BASELINE_20260701

Version:
1.1.0

Status:
Foundation Refinement

Purpose:
Provides the canonical security object model and shared security services for
the JustDefenders Engineering Platform.

This module intentionally contains no application business logic.

Every security module shall depend upon this module rather than implementing
its own security primitives.

Consumers include:

• Security-Environment
• Security-Http
• Security-Authentication
• Security-Authorization
• Security-Validation
• Security-Sanitization
• Security-Logging
• Security-Reporting
• Security-Diagnostics

PowerShell Compatibility

• Windows PowerShell 5.1
• PowerShell 7+

===============================================================================
#>

Set-StrictMode -Version Latest

#------------------------------------------------------------------------------
# Script State
#------------------------------------------------------------------------------

$Script:ModuleVersion = '1.1.0'

$Script:ModuleName = 'Security-Foundation'

$Script:ModuleInitialised = $false

#------------------------------------------------------------------------------
# Canonical Security Constants
#------------------------------------------------------------------------------

$Script:SecurityConstants = @{

    Result = @{

        Pass    = 'PASS'
        Warning = 'WARNING'
        Fail    = 'FAIL'
    }

    Severity = @{

        Information = 'Information'
        Warning     = 'Warning'
        Error       = 'Error'
        Critical    = 'Critical'
    }

    Category = @{

        General        = 'General'
        Configuration  = 'Configuration'
        Authentication = 'Authentication'
        Authorization  = 'Authorization'
        Validation     = 'Validation'
        Sanitization   = 'Sanitization'
        Http           = 'HTTP'
        Logging        = 'Logging'
        Reporting      = 'Reporting'
        Diagnostics    = 'Diagnostics'
    }

}

#------------------------------------------------------------------------------
# Protected Secret Names
#------------------------------------------------------------------------------

$Script:ProtectedSecretNames = @(
    'SUPABASE_SERVICE_ROLE_KEY',
    'SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_SUPABASE_URL',
    'DATABASE_URL',
    'POSTGRES_URL',
    'POSTGRES_PRISMA_URL',
    'POSTGRES_URL_NON_POOLING',
    'JWT_SECRET',
    'NEXTAUTH_SECRET',
    'API_SECRET',
    'SERVICE_ROLE_KEY',
    'ACCESS_TOKEN',
    'REFRESH_TOKEN'
)

#------------------------------------------------------------------------------
# Internal Helper
#------------------------------------------------------------------------------

function Get-JDSecurityConstants
{
    return $Script:SecurityConstants
}

#------------------------------------------------------------------------------
# Public Version Information
#------------------------------------------------------------------------------

function Get-JDSecurityFoundationVersion
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        Module      = $Script:ModuleName

        Version     = $Script:ModuleVersion

        Initialised = $Script:ModuleInitialised

        Timestamp   = Get-Date

        PowerShell  = $PSVersionTable.PSVersion.ToString()
    }
}

#------------------------------------------------------------------------------
# Canonical Object Constructors
#------------------------------------------------------------------------------

function New-JDSecurityStatus
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name,

        [Parameter(Mandatory)]
        [ValidateSet('PASS','WARNING','FAIL')]
        [string]
        $Result,

        [ValidateNotNull()]
        [string]
        $Category = 'General',

        [ValidateNotNull()]
        [string]
        $Severity = 'Information',

        [string]
        $Message = '',

        [hashtable]
        $Metadata = @{}
    )

    return [PSCustomObject]@{

        PSTypeName = 'JustDefenders.Security.Status'

        Timestamp  = Get-Date

        Name       = $Name

        Result     = $Result

        Category   = $Category

        Severity   = $Severity

        Message    = $Message

        Metadata   = $Metadata
    }

}# -----------------------------------------------------------------------------
# Compatibility Wrapper
# Create Security Exception
# -----------------------------------------------------------------------------

function New-JDSecurityException
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]$Message
    )

    return [System.Exception]::new($Message)
}



#------------------------------------------------------------------------------
# Canonical Security Issue
#------------------------------------------------------------------------------

function New-JDSecurityIssue
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Code,

        [Parameter(Mandatory)]
        [string]
        $Message,

        [string]
        $Severity = 'Error',

        [string]
        $Category = 'General'
    )

    return [PSCustomObject]@{

        PSTypeName = 'JustDefenders.Security.Issue'

        Timestamp  = Get-Date

        Code       = $Code

        Message    = $Message

        Severity   = $Severity

        Category   = $Category
    }
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Canonical Security Event
#------------------------------------------------------------------------------

function New-JDSecurityEvent
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name,

        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Message,

        [string]
        $Category = 'General',

        [string]
        $Severity = 'Information',

        [hashtable]
        $Metadata = @{}
    )

    return [PSCustomObject]@{

        PSTypeName = 'JustDefenders.Security.Event'

        EventId    = ([guid]::NewGuid()).Guid

        Timestamp  = Get-Date

        Name       = $Name

        Category   = $Category

        Severity   = $Severity

        Message    = $Message

        Metadata   = $Metadata
    }
}

#------------------------------------------------------------------------------
# Canonical Security Result
#------------------------------------------------------------------------------

function New-JDSecurityResult
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [bool]
        $Success,

        [string]
        $Message = "",

        [Object]
        $Data = $null,

        [Object[]]
        $Issues = @()
    )

    return [PSCustomObject]@{

        PSTypeName = 'JustDefenders.Security.Result'

        Timestamp  = Get-Date

        Success    = $Success

        Message    = $Message

        Data       = $Data

        Issues     = $Issues
    }
}

#------------------------------------------------------------------------------
# Canonical Security Report
#------------------------------------------------------------------------------

function New-JDSecurityReport
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Title,

        [Object[]]
        $Results = @(),

        [Object[]]
        $Issues = @(),

        [hashtable]
        $Metadata = @{}
    )

    return [PSCustomObject]@{

        PSTypeName = 'JustDefenders.Security.Report'

        Timestamp  = Get-Date

        Title      = $Title

        Results    = $Results

        Issues     = $Issues

        Metadata   = $Metadata
    }
}

#------------------------------------------------------------------------------
# Internal Type Detection
#------------------------------------------------------------------------------

function Test-JDHashtable
{
    param([object]$Value)

    return ($Value -is [System.Collections.IDictionary])
}

function Test-JDCollection
{
    param([object]$Value)

    if ($null -eq $Value)
    {
        return $false
    }

    if ($Value -is [string])
    {
        return $false
    }

    return ($Value -is [System.Collections.IEnumerable])
}

function Test-JDPSObject
{
    param([object]$Value)

    if ($null -eq $Value)
    {
        return $false
    }

    return ($Value -is [PSCustomObject])
}

#------------------------------------------------------------------------------
# Secret Detection
#------------------------------------------------------------------------------

function Test-JDProtectedSecretName
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Name
    )

    return ($Script:ProtectedSecretNames -contains $Name)
}

function Protect-JDSecret
{
    [CmdletBinding()]
    param(

        [AllowNull()]
        [Object]
        $Value
    )

    if ($null -eq $Value)
    {
        return $null
    }

    $Text = [string]$Value

    if ([string]::IsNullOrWhiteSpace($Text))
    {
        return ""
    }

    if ($Text.Length -le 8)
    {
        return "********"
    }

    return (
        "{0}********{1}" -f
        $Text.Substring(0,4),
        $Text.Substring($Text.Length-4,4)
    )
}

#------------------------------------------------------------------------------
# Recursive Secret Protection
#------------------------------------------------------------------------------

function Protect-JDSecurityObject
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [Object]
        $InputObject
    )

    if ($null -eq $InputObject)
    {
        return $null
    }

    if (Test-JDHashtable $InputObject)
    {
        $Output = @{}

        foreach ($Key in $InputObject.Keys)
        {
            if (Test-JDProtectedSecretName $Key)
            {
                $Output[$Key] =
                    Protect-JDSecret $InputObject[$Key]
            }
            else
            {
                $Output[$Key] =
                    Protect-JDSecurityObject $InputObject[$Key]
            }
        }

        return $Output
    }

    if (Test-JDCollection $InputObject)
    {
        $Collection = @()

        foreach ($Item in $InputObject)
        {
            $Collection += Protect-JDSecurityObject $Item
        }

        return $Collection
    }

    if (Test-JDPSObject $InputObject)
    {
        $Clone = [PSCustomObject]@{}

        foreach ($Property in $InputObject.PSObject.Properties)
        {
            if (Test-JDProtectedSecretName $Property.Name)
            {
                $Clone |
                    Add-Member `
                    -MemberType NoteProperty `
                    -Name $Property.Name `
                    -Value (Protect-JDSecret $Property.Value)
            }
            else
            {
                $Clone |
                    Add-Member `
                    -MemberType NoteProperty `
                    -Name $Property.Name `
                    -Value (
                        Protect-JDSecurityObject $Property.Value
                    )
            }
        }

        return $Clone
    }

 
    return $InputObject
}

# -----------------------------------------------------------------------------
# Compatibility Wrapper
# Protect Hashtable Secrets
# -----------------------------------------------------------------------------

function Protect-JDHashtableSecrets
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [hashtable]$Hashtable
    )

    return (Protect-JDSecurityObject $Hashtable)
}


#------------------------------------------------------------------------------
# Internal Utility Layer
#------------------------------------------------------------------------------

function Copy-JDObject
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [Object]
        $InputObject
    )

    return (
        $InputObject |
        ConvertTo-Json -Depth 100 |
        ConvertFrom-Json
    )
}

function ConvertTo-JDSafeString
{
    [CmdletBinding()]
    param(
        [AllowNull()]
        [Object]
        $Value
    )

    if ($null -eq $Value)
    {
        return ""
    }

    return [string]$Value
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Security Registry
#------------------------------------------------------------------------------

function Get-JDSecurityRegistry
{
    <#
    .SYNOPSIS
        Returns the canonical JustDefenders Security Registry.

    .DESCRIPTION
        The registry is the single authoritative source for security
        constants used throughout the engineering platform.

        Future modules shall obtain security values from this function
        rather than hard-coding literals.
    #>

    [CmdletBinding()]
    param()

    return $Script:SecurityConstants
}

#------------------------------------------------------------------------------
# Registry Accessors
#------------------------------------------------------------------------------

function Get-JDSecurityResults
{
    [CmdletBinding()]
    param()

    return $Script:SecurityConstants.Result
}

function Get-JDSecuritySeverities
{
    [CmdletBinding()]
    param()

    return $Script:SecurityConstants.Severity
}

function Get-JDSecurityCategories
{
    [CmdletBinding()]
    param()

    return $Script:SecurityConstants.Category
}

# -----------------------------------------------------------------------------
# Get Environment Variable
# -----------------------------------------------------------------------------

function Get-JDEnvironmentVariable
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]$Name
    )

    return [System.Environment]::GetEnvironmentVariable($Name)
}

# -----------------------------------------------------------------------------
# Start Security Timer
# -----------------------------------------------------------------------------

function Start-JDSecurityTimer
{
    [CmdletBinding()]
    param()

    return [System.Diagnostics.Stopwatch]::StartNew()
}

# -----------------------------------------------------------------------------
# Stop Security Timer
# -----------------------------------------------------------------------------

function Stop-JDSecurityTimer
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [System.Diagnostics.Stopwatch]$Timer
    )

    $Timer.Stop()

    return $Timer.Elapsed
}

#------------------------------------------------------------------------------
# Validation Helpers
#------------------------------------------------------------------------------

function Test-JDSecurityResult
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Value
    )

    return (
        $Script:SecurityConstants.Result.Values -contains $Value
    )
}

function Test-JDSecuritySeverity
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Value
    )

    return (
        $Script:SecurityConstants.Severity.Values -contains $Value
    )
}

function Test-JDSecurityCategory
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Value
    )

    return (
        $Script:SecurityConstants.Category.Values -contains $Value
    )
}

# -----------------------------------------------------------------------------
# Assert Boolean
# -----------------------------------------------------------------------------

function Assert-JDBoolean
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [object]$Value,

        [string]$Name = "Boolean"
    )

    if ($Value -isnot [bool])
    {
        throw ("{0} must be Boolean." -f $Name)
    }

    return $true
}

#------------------------------------------------------------------------------
# Assertion Helpers
#------------------------------------------------------------------------------

function Assert-JDNotNull
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        $Value,

        [Parameter(Mandatory)]
        [string]
        $Name
    )

    if ($null -eq $Value)
    {
        throw (
            New-JDSecurityIssue `
                -Code "NULL_VALUE" `
                -Message "$Name cannot be null."
        )
    }

    return $true
}

function Assert-JDNotNullOrEmpty
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [AllowEmptyString()]
        [string]
        $Value,

        [Parameter(Mandatory)]
        [string]
        $Name
    )

    if ([string]::IsNullOrWhiteSpace($Value))
    {
        throw (
            New-JDSecurityIssue `
                -Code "EMPTY_VALUE" `
                -Message "$Name cannot be empty."
        )
    }

    return $true
}

function Assert-JDSecurityResult
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Result
    )

    if (-not (Test-JDSecurityResult $Result))
    {
        throw (
            New-JDSecurityIssue `
                -Code "INVALID_RESULT" `
                -Message "Unknown security result '$Result'."
        )
    }

    return $true
}

function Assert-JDSecuritySeverity
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Severity
    )

    if (-not (Test-JDSecuritySeverity $Severity))
    {
        throw (
            New-JDSecurityIssue `
                -Code "INVALID_SEVERITY" `
                -Message "Unknown severity '$Severity'."
        )
    }

    return $true
}

function Assert-JDSecurityCategory
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Category
    )

    if (-not (Test-JDSecurityCategory $Category))
    {
        throw (
            New-JDSecurityIssue `
                -Code "INVALID_CATEGORY" `
                -Message "Unknown category '$Category'."
        )
    }

    return $true
}

# -----------------------------------------------------------------------------
# Validate Security Status Object
# -----------------------------------------------------------------------------

function Test-JDSecurityStatus
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [object]$Status
    )

    if ($null -eq $Status)
    {
        return $false
    }

    $Properties = $Status.PSObject.Properties.Name

    return (
        $Properties -contains 'Name'   -and
        $Properties -contains 'Result'
    )
}

# -----------------------------------------------------------------------------
# Validate Security Event
# -----------------------------------------------------------------------------

function Test-JDSecurityEvent
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [object]$Event
    )

    if ($null -eq $Event)
    {
        return $false
    }

    $Properties = $Event.PSObject.Properties.Name

    return (
        $Properties -contains 'Name'     -and
        $Properties -contains 'Category' -and
        $Properties -contains 'Severity' -and
        $Properties -contains 'Message'
    )
}

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

function Initialize-JDSecurityFoundation
{
    [CmdletBinding()]
    param()

    if ($Script:ModuleInitialised)
    {
        return
    }

    Write-Verbose (
        "Initialising {0} v{1}" -f
        $Script:ModuleName,
        $Script:ModuleVersion
    )

    $Script:ModuleInitialised = $true
}

#------------------------------------------------------------------------------
# Module Integrity Validation
#------------------------------------------------------------------------------

function Test-JDSecurityFoundation
{
    [CmdletBinding()]
    param()

    $RequiredFunctions = @(
        'Get-JDSecurityRegistry',
        'Get-JDSecurityFoundationVersion',
        'New-JDSecurityStatus',
        'New-JDSecurityIssue',
        'New-JDSecurityEvent',
        'New-JDSecurityResult',
        'New-JDSecurityReport',
        'Protect-JDSecurityObject',
        'Protect-JDSecret'
    )

    $Missing = @()

    foreach ($Function in $RequiredFunctions)
    {
        if (-not (Get-Command $Function -ErrorAction SilentlyContinue))
        {
            $Missing += $Function
        }
    }

    return (New-JDSecurityResult `
        -Success ($Missing.Count -eq 0) `
        -Message "Security Foundation Integrity Check" `
        -Data @{
            Version = $Script:ModuleVersion
            Missing = $Missing
            Checked = $RequiredFunctions.Count
        })
}

#------------------------------------------------------------------------------
# Export Public API
#------------------------------------------------------------------------------

Export-ModuleMember -Function @(

    # Registry

'Get-JDSecurityRegistry',
'Get-JDSecurityResults',
'Get-JDSecuritySeverities',
'Get-JDSecurityCategories',
'Get-JDEnvironmentVariable',

'Start-JDSecurityTimer',
'Stop-JDSecurityTimer',

    # Constructors

'New-JDSecurityStatus',
'New-JDSecurityIssue',
'New-JDSecurityEvent',
'New-JDSecurityResult',
'New-JDSecurityReport',
'New-JDSecurityException',

    # Validation

'Test-JDSecurityResult',
'Test-JDSecuritySeverity',
'Test-JDSecurityCategory',
'Test-JDSecurityStatus',
'Test-JDSecurityEvent',
'Test-JDSecurityFoundation',

    # Assertions

'Assert-JDBoolean',
'Assert-JDNotNull',
'Assert-JDNotNullOrEmpty',
'Assert-JDSecurityResult',
'Assert-JDSecuritySeverity',
'Assert-JDSecurityCategory',

    # Secret Protection

    'Protect-JDSecret',
'Protect-JDSecurityObject',
'Protect-JDHashtableSecrets',
'Test-JDProtectedSecretName',

    # Version

    'Get-JDSecurityFoundationVersion'
)

#------------------------------------------------------------------------------
# Initialise Module
#------------------------------------------------------------------------------

Initialize-JDSecurityFoundation

Write-Verbose (
    "{0} v{1} initialised successfully." -f
    $Script:ModuleName,
    $Script:ModuleVersion
)

#------------------------------------------------------------------------------
# End of Module
#------------------------------------------------------------------------------

<#
===============================================================================
JustDefenders©

Security Foundation

Version:
1.1.0

Status:
Complete

Work Package:
WP-003F.1A

Engineering Baseline:
ALPHA_BASELINE_20260701

===============================================================================
#>
