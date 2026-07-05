<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
C:\dev\justdefenders\frontend\tooling\common\Toolkit-Http.psm1

Timestamp:
2nd July 2026, 10:25 Sydney

Module:
Engineering Toolkit HTTP

Version:
1.0.0

Work Package:
WP-003D – Engineering Toolkit

Engineering Baseline:
ALPHA_BASELINE_20260701

Purpose

Provides a shared HTTP client for all JustDefenders engineering modules.

Responsibilities

• HTTP GET
• HTTP POST
• HTTP PUT
• HTTP DELETE
• Structured request handling
• Retry support
• Timeout support
• Response standardisation
• Error handling
• PowerShell compatibility

Compatible With

• Windows PowerShell 5.1
• PowerShell 7+

===============================================================================
#>

Set-StrictMode -Version Latest

$ErrorActionPreference = 'Stop'

#------------------------------------------------------------------------------
# JustDefenders© Module State
#
# File:
# C:\dev\justdefenders\frontend\tooling\common\Toolkit-Http.psm1
#
# Timestamp:
# 2nd July 2026, 10:25 Sydney
#------------------------------------------------------------------------------

$Script:Module = [ordered]@{

    Name = "Engineering Toolkit HTTP"

    Version = "1.2.0"

    Baseline = "WP00435_TOOLKIT_HTTP_V120"

    Initialised = $false

    Loaded = Get-Date
}

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

function Initialize-JDToolkitHttp
{
    [CmdletBinding()]
    param()

    $Script:Module.Initialised = $true
}

#------------------------------------------------------------------------------
# JustDefenders© Default Configuration
#------------------------------------------------------------------------------

$Script:HttpDefaults = [ordered]@{

    TimeoutSeconds = 30

    RetryCount = 3

    RetryDelaySeconds = 2

    UserAgent = "JustDefenders-EngineeringToolkit/1.0"

    ContentType = "application/json"

    Accept = "application/json"
}

#------------------------------------------------------------------------------
# JustDefenders© Version Information
#------------------------------------------------------------------------------

function Get-JDHttpVersion
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Toolkit.Http.Version"

        Name = $Script:Module.Name

        Version = $Script:Module.Version

        Baseline = $Script:Module.Baseline

Initialised = $Script:Module.Initialised

        Timestamp = Get-Date
    }
}

#------------------------------------------------------------------------------
# Toolkit State
#------------------------------------------------------------------------------

function Get-JDToolkitHttpState
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Toolkit.Http.State"

        Name = $Script:Module.Name

        Version = $Script:Module.Version

        Baseline = $Script:Module.Baseline

        Initialised = $Script:Module.Initialised

        Loaded = $Script:Module.Loaded

        TimeoutSeconds = $Script:HttpDefaults.TimeoutSeconds

        RetryCount = $Script:HttpDefaults.RetryCount

        RetryDelaySeconds = $Script:HttpDefaults.RetryDelaySeconds

        UserAgent = $Script:HttpDefaults.UserAgent

        Timestamp = Get-Date
    }
}

#------------------------------------------------------------------------------
# JustDefenders© HTTP Client
#------------------------------------------------------------------------------

function New-JDHttpClient
{
    [CmdletBinding()]
    param(

        [int]
        $TimeoutSeconds = $Script:HttpDefaults.TimeoutSeconds,

        [int]
        $RetryCount = $Script:HttpDefaults.RetryCount,

        [int]
        $RetryDelaySeconds = $Script:HttpDefaults.RetryDelaySeconds,

        [hashtable]
        $DefaultHeaders = @{}
    )

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Toolkit.Http.Client"

        TimeoutSeconds = $TimeoutSeconds

        RetryCount = $RetryCount

        RetryDelaySeconds = $RetryDelaySeconds

        Headers = $DefaultHeaders

        Created = Get-Date
    }
}

#------------------------------------------------------------------------------
# JustDefenders© HTTP Response Object
#------------------------------------------------------------------------------

function New-JDHttpResponse
{
    [CmdletBinding()]
    param(

        [bool]
        $Success,

        [string]
        $Method,

        [string]
        $Uri,

        [int]
        $StatusCode,

        [AllowNull()]
        $Body,

        [TimeSpan]
        $Duration,

        [AllowNull()]
        [System.Management.Automation.ErrorRecord]
        $ErrorRecord = $null
    )

    return [PSCustomObject]@{

        PSTypeName = "JustDefenders.Toolkit.Http.Response"

        Success = $Success

        Method = $Method

        Uri = $Uri

        StatusCode = $StatusCode

        Body = $Body

        Duration = $Duration

        Timestamp = Get-Date

        ErrorRecord = $ErrorRecord

        Exception = if($ErrorRecord)
        {
            $ErrorRecord.Exception
        }
        else
        {
            $null
        }

        Message = if($ErrorRecord)
        {
            $ErrorRecord.Exception.Message
        }
        else
        {
            ""
        }
    }
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# JustDefenders© HTTP Request Engine
#
# File:
# C:\dev\justdefenders\frontend\tooling\common\Toolkit-Http.psm1
#
# Timestamp:
# 2nd July 2026, 10:25 Sydney
#------------------------------------------------------------------------------

function Invoke-JDHttpRequest
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [ValidateSet(
            "GET",
            "POST",
            "PUT",
            "DELETE"
        )]
        [string]
        $Method,

        [Parameter(Mandatory)]
        [string]
        $Uri,

        [AllowNull()]
        $Body,

        [hashtable]
        $Headers = @{},

        [string]
        $ContentType = $Script:HttpDefaults.ContentType,

        [int]
        $TimeoutSeconds = $Script:HttpDefaults.TimeoutSeconds,

        [int]
        $RetryCount = $Script:HttpDefaults.RetryCount,

        [int]
        $RetryDelaySeconds = $Script:HttpDefaults.RetryDelaySeconds
    )

    $Stopwatch =
        [System.Diagnostics.Stopwatch]::StartNew()

    $LastError = $null

    for($Attempt = 1;
        $Attempt -le $RetryCount;
        $Attempt++)
    {
        try
        {
            $Parameters = @{

                Method = $Method

                Uri = $Uri

                Headers = $Headers

                TimeoutSec = $TimeoutSeconds

                ContentType = $ContentType

                ErrorAction = 'Stop'
            }

            if($null -ne $Body)
            {
                if($Body -is [string])
                {
                    $Parameters.Body = $Body
                }
                else
                {
                    $Parameters.Body =
                        $Body |
                        ConvertTo-Json -Depth 20
                }
            }

            $Response =
                Invoke-RestMethod @Parameters

            $Stopwatch.Stop()

            return New-JDHttpResponse `
                -Success $true `
                -Method $Method `
                -Uri $Uri `
                -StatusCode 200 `
                -Body $Response `
                -Duration $Stopwatch.Elapsed
        }
        catch
        {
            $LastError = $_

            if($Attempt -lt $RetryCount)
            {
                Start-Sleep -Seconds $RetryDelaySeconds
            }
        }
    }

    $Stopwatch.Stop()

    return New-JDHttpResponse `
        -Success $false `
        -Method $Method `
        -Uri $Uri `
        -StatusCode 0 `
        -Body $null `
        -Duration $Stopwatch.Elapsed `
        -ErrorRecord $LastError
}

#------------------------------------------------------------------------------
# JustDefenders© HTTP GET
#------------------------------------------------------------------------------

function Invoke-JDGet
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Uri,

        [hashtable]
        $Headers = @{}
    )

    return Invoke-JDHttpRequest `
        -Method GET `
        -Uri $Uri `
        -Headers $Headers
}

#------------------------------------------------------------------------------
# JustDefenders© HTTP POST
#------------------------------------------------------------------------------

function Invoke-JDPost
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Uri,

        [AllowNull()]
        $Body,

        [hashtable]
        $Headers = @{}
    )

    return Invoke-JDHttpRequest `
        -Method POST `
        -Uri $Uri `
        -Body $Body `
        -Headers $Headers
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# JustDefenders© HTTP PUT
#
# File:
# C:\dev\justdefenders\frontend\tooling\common\Toolkit-Http.psm1
#
# Timestamp:
# 2nd July 2026, 10:25 Sydney
#------------------------------------------------------------------------------

function Invoke-JDPut
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Uri,

        [AllowNull()]
        $Body,

        [hashtable]
        $Headers = @{}
    )

    return Invoke-JDHttpRequest `
        -Method PUT `
        -Uri $Uri `
        -Body $Body `
        -Headers $Headers
}

#------------------------------------------------------------------------------
# JustDefenders© HTTP DELETE
#------------------------------------------------------------------------------

function Invoke-JDDelete
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Uri,

        [hashtable]
        $Headers = @{}
    )

    return Invoke-JDHttpRequest `
        -Method DELETE `
        -Uri $Uri `
        -Headers $Headers
}

#------------------------------------------------------------------------------
# JustDefenders© Header Utilities
#------------------------------------------------------------------------------

function New-JDHttpHeaders
{
    [CmdletBinding()]
    param(

        [hashtable]
        $Headers = @{}
    )

    $MergedHeaders = @{

        "Accept" =
            $Script:HttpDefaults.Accept

        "User-Agent" =
            $Script:HttpDefaults.UserAgent
    }

    foreach($Key in $Headers.Keys)
    {
        $MergedHeaders[$Key] =
            $Headers[$Key]
    }

    return $MergedHeaders
}

#------------------------------------------------------------------------------
# JustDefenders© HTTP Health Check
#------------------------------------------------------------------------------

function Test-JDHttpEndpoint
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Uri
    )

    $Result =
        Invoke-JDGet `
            -Uri $Uri

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Toolkit.Http.Health"

        Success =
            $Result.Success

        Uri =
            $Uri

        StatusCode =
            $Result.StatusCode

        Duration =
            $Result.Duration

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# JustDefenders© Internal Validation
#------------------------------------------------------------------------------

function Test-JDHttp
{
    [CmdletBinding()]
    param()

    $RequiredFunctions = @(

        'Get-JDHttpVersion',

        'New-JDHttpClient',

        'New-JDHttpHeaders',

        'Invoke-JDHttpRequest',

        'Invoke-JDGet',

        'Invoke-JDPost',

        'Invoke-JDPut',

        'Invoke-JDDelete',

        'Test-JDHttpEndpoint',

        'Test-JDHttp'
    )

    $Missing = @()

    foreach($Function in $RequiredFunctions)
    {
        if(-not (
            Get-Command `
                $Function `
                -ErrorAction SilentlyContinue
        ))
        {
            $Missing +=
                $Function
        }
    }

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Toolkit.Http.Validation"

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
#------------------------------------------------------------------------------
# JustDefenders© HTTP Diagnostics
#
# File:
# C:\dev\justdefenders\frontend\tooling\common\Toolkit-Http.psm1
#
# Timestamp:
# 2nd July 2026, 10:25 Sydney
#------------------------------------------------------------------------------

function Get-JDHttpDiagnostics
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Toolkit.Http.Diagnostics"

        Module =
            $Script:Module.Name

        Version =
            $Script:Module.Version

        Baseline =
            $Script:Module.Baseline

        PowerShellVersion =
            $PSVersionTable.PSVersion.ToString()

        Edition =
            $PSVersionTable.PSEdition

        RetryCount =
            $Script:HttpDefaults.RetryCount

        TimeoutSeconds =
            $Script:HttpDefaults.TimeoutSeconds

        DefaultContentType =
            $Script:HttpDefaults.ContentType

        UserAgent =
            $Script:HttpDefaults.UserAgent

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# JustDefenders© Module Integrity
#------------------------------------------------------------------------------

function Test-JDHttpModule
{
    [CmdletBinding()]
    param()

    $Validation =
        Test-JDHttp

    return [PSCustomObject]@{

        PSTypeName =
            "JustDefenders.Toolkit.Http.Module"

        Success =
            $Validation.Success

        Validation =
            $Validation

        Diagnostics =
            Get-JDHttpDiagnostics

        Timestamp =
            Get-Date
    }
}

#------------------------------------------------------------------------------
# Toolkit Governance Validation
#------------------------------------------------------------------------------

function Test-JDToolkitHttp
{
    [CmdletBinding()]
    param()

    $RequiredFunctions = @(
        'Get-JDHttpVersion'
        'Get-JDToolkitHttpState'
        'Get-JDHttpDiagnostics'
        'New-JDHttpClient'
        'New-JDHttpHeaders'
        'New-JDHttpResponse'
        'Invoke-JDHttpRequest'
        'Invoke-JDGet'
        'Invoke-JDPost'
        'Invoke-JDPut'
        'Invoke-JDDelete'
        'Test-JDHttpEndpoint'
        'Test-JDHttp'
        'Test-JDHttpModule'
    )

    $Missing = @()

    foreach($Function in $RequiredFunctions)
    {
        if (-not (Get-Command -Name $Function -ErrorAction SilentlyContinue))
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

#------------------------------------------------------------------------------
# JustDefenders© Public API
#------------------------------------------------------------------------------

Export-ModuleMember -Function @(
    'Get-JDHttpVersion',
    'Get-JDToolkitHttpState',
    'Get-JDHttpDiagnostics',
    'New-JDHttpClient',
    'New-JDHttpHeaders',
    'New-JDHttpResponse',
    'Invoke-JDHttpRequest',
    'Invoke-JDGet',
    'Invoke-JDPost',
    'Invoke-JDPut',
    'Invoke-JDDelete',
    'Test-JDHttpEndpoint',
    'Test-JDHttp',
    'Test-JDHttpModule',
'Test-JDToolkitHttp'
)
#------------------------------------------------------------------------------
# JustDefenders© Module Initialisation
#------------------------------------------------------------------------------

Initialize-JDToolkitHttp

Write-Verbose (
    "{0} v{1} initialised successfully." -f
    $Script:Module.Name,
    $Script:Module.Version
)
#------------------------------------------------------------------------------
# End of File
#------------------------------------------------------------------------------

