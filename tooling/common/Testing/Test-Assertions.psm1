<#
===============================================================================
JustDefenders© Engineering
===============================================================================

File:
Test-Assertions.psm1

Repository:
C:\dev\justdefenders\frontend\tooling\common\Testing\Test-Assertions.psm1

Module:
Engineering Assertions

Work Package:
WP-003F.1A

Engineering Baseline:
ALPHA_BASELINE_20260701

Version:
1.0.0

Purpose

Provides the canonical assertion library for the JustDefenders Engineering
Testing SDK.

This module intentionally contains assertion logic only.

Execution, reporting and rendering are implemented by separate modules.

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

    Name = "JustDefenders Engineering Assertions"

    Version = "1.0.0"

    Baseline = "ALPHA_BASELINE_20260701"

}

#------------------------------------------------------------------------------
# Internal Failure Helper
#------------------------------------------------------------------------------

function Throw-JDAssertionFailed
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Assertion,

        [Parameter(Mandatory)]
        [string]
        $Message
    )

    throw (
        "[{0}] {1}" -f
        $Assertion,
        $Message
    )
}

#------------------------------------------------------------------------------
# Boolean Assertions
#------------------------------------------------------------------------------

function Assert-JDTrue
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [bool]
        $Condition,

        [string]
        $Message = "Expected condition to be TRUE."
    )

    if (-not $Condition)
    {
        Throw-JDAssertionFailed `
            -Assertion "Assert-JDTrue" `
            -Message $Message
    }
}

function Assert-JDFalse
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [bool]
        $Condition,

        [string]
        $Message = "Expected condition to be FALSE."
    )

    if ($Condition)
    {
        Throw-JDAssertionFailed `
            -Assertion "Assert-JDFalse" `
            -Message $Message
    }
}

#------------------------------------------------------------------------------
# Null Assertions
#------------------------------------------------------------------------------

function Assert-JDNull
{
    [CmdletBinding()]
    param(

        $Value,

        [string]
        $Message = "Expected value to be NULL."
    )

    if ($null -ne $Value)
    {
        Throw-JDAssertionFailed `
            -Assertion "Assert-JDNull" `
            -Message $Message
    }
}

function Assert-JDNotNull
{
    [CmdletBinding()]
    param(

        $Value,

        [string]
        $Message = "Unexpected NULL value."
    )

    if ($null -eq $Value)
    {
        Throw-JDAssertionFailed `
            -Assertion "Assert-JDNotNull" `
            -Message $Message
    }
}

#------------------------------------------------------------------------------
# Equality Assertions
#------------------------------------------------------------------------------

function Assert-JDEquals
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        $Expected,

        [Parameter(Mandatory)]
        $Actual,

        [string]
        $Message
    )

    if ($Expected -ne $Actual)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected '{0}' but received '{1}'." -f
                $Expected,
                $Actual
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDEquals" `
            -Message $Message
    }
}

function Assert-JDNotEquals
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        $Unexpected,

        [Parameter(Mandatory)]
        $Actual,

        [string]
        $Message
    )

    if ($Unexpected -eq $Actual)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Did not expect '{0}'." -f
                $Unexpected
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDNotEquals" `
            -Message $Message
    }
}

#------------------------------------------------------------------------------
# String Assertions
#------------------------------------------------------------------------------

function Assert-JDContains
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Value,

        [Parameter(Mandatory)]
        [string]
        $Substring,

        [string]
        $Message
    )

    if ($Value -notlike "*$Substring*")
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected '{0}' to contain '{1}'." -f
                $Value,
                $Substring
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDContains" `
            -Message $Message
    }
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# String Assertions
#------------------------------------------------------------------------------

function Assert-JDStartsWith
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Value,

        [Parameter(Mandatory)]
        [string]
        $Prefix,

        [string]
        $Message
    )

    if (-not $Value.StartsWith($Prefix,
        [System.StringComparison]::Ordinal))
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected '{0}' to start with '{1}'." -f
                $Value,
                $Prefix
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDStartsWith" `
            -Message $Message
    }
}

function Assert-JDEndsWith
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Value,

        [Parameter(Mandatory)]
        [string]
        $Suffix,

        [string]
        $Message
    )

    if (-not $Value.EndsWith($Suffix,
        [System.StringComparison]::Ordinal))
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected '{0}' to end with '{1}'." -f
                $Value,
                $Suffix
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDEndsWith" `
            -Message $Message
    }
}

function Assert-JDMatches
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Value,

        [Parameter(Mandatory)]
        [string]
        $Pattern,

        [string]
        $Message
    )

    if ($Value -notmatch $Pattern)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected '{0}' to match '{1}'." -f
                $Value,
                $Pattern
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDMatches" `
            -Message $Message
    }
}

#------------------------------------------------------------------------------
# Collection Assertions
#------------------------------------------------------------------------------

function Assert-JDEmpty
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        $Collection,

        [string]
        $Message
    )

    $Count = @($Collection).Count

    if ($Count -ne 0)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected empty collection. Actual count: {0}." -f
                $Count
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDEmpty" `
            -Message $Message
    }
}

function Assert-JDNotEmpty
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        $Collection,

        [string]
        $Message
    )

    $Count = @($Collection).Count

    if ($Count -eq 0)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = "Expected collection to contain items."
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDNotEmpty" `
            -Message $Message
    }
}

function Assert-JDCollectionCount
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        $Collection,

        [Parameter(Mandatory)]
        [int]
        $ExpectedCount,

        [string]
        $Message
    )

    $ActualCount = @($Collection).Count

    if ($ActualCount -ne $ExpectedCount)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected {0} items but found {1}." -f
                $ExpectedCount,
                $ActualCount
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDCollectionCount" `
            -Message $Message
    }
}

#------------------------------------------------------------------------------
# Object Assertions
#------------------------------------------------------------------------------

function Assert-JDHasProperty
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [object]
        $Object,

        [Parameter(Mandatory)]
        [string]
        $Property,

        [string]
        $Message
    )

    if ($Object.PSObject.Properties.Name -notcontains $Property)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected property '{0}' was not found." -f
                $Property
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDHasProperty" `
            -Message $Message
    }
}

function Assert-JDPropertyEquals
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [object]
        $Object,

        [Parameter(Mandatory)]
        [string]
        $Property,

        [Parameter(Mandatory)]
        $Expected,

        [string]
        $Message
    )

    Assert-JDHasProperty `
        -Object $Object `
        -Property $Property

    $Actual = $Object.$Property

    if ($Actual -ne $Expected)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Property '{0}' expected '{1}' but received '{2}'." -f
                $Property,
                $Expected,
                $Actual
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDPropertyEquals" `
            -Message $Message
    }
}

function Assert-JDType
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [object]
        $Object,

        [Parameter(Mandatory)]
        [Type]
        $Type,

        [string]
        $Message
    )

    if ($Object.GetType() -ne $Type)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected type '{0}' but received '{1}'." -f
                $Type.FullName,
                $Object.GetType().FullName
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDType" `
            -Message $Message
    }
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# String Assertions
#------------------------------------------------------------------------------

function Assert-JDStartsWith
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Value,

        [Parameter(Mandatory)]
        [string]
        $Prefix,

        [string]
        $Message
    )

    if (-not $Value.StartsWith($Prefix,
        [System.StringComparison]::Ordinal))
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected '{0}' to start with '{1}'." -f
                $Value,
                $Prefix
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDStartsWith" `
            -Message $Message
    }
}

function Assert-JDEndsWith
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Value,

        [Parameter(Mandatory)]
        [string]
        $Suffix,

        [string]
        $Message
    )

    if (-not $Value.EndsWith($Suffix,
        [System.StringComparison]::Ordinal))
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected '{0}' to end with '{1}'." -f
                $Value,
                $Suffix
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDEndsWith" `
            -Message $Message
    }
}

function Assert-JDMatches
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [string]
        $Value,

        [Parameter(Mandatory)]
        [string]
        $Pattern,

        [string]
        $Message
    )

    if ($Value -notmatch $Pattern)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected '{0}' to match '{1}'." -f
                $Value,
                $Pattern
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDMatches" `
            -Message $Message
    }
}

#------------------------------------------------------------------------------
# Collection Assertions
#------------------------------------------------------------------------------

function Assert-JDEmpty
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        $Collection,

        [string]
        $Message
    )

    $Count = @($Collection).Count

    if ($Count -ne 0)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected empty collection. Actual count: {0}." -f
                $Count
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDEmpty" `
            -Message $Message
    }
}

function Assert-JDNotEmpty
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        $Collection,

        [string]
        $Message
    )

    $Count = @($Collection).Count

    if ($Count -eq 0)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = "Expected collection to contain items."
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDNotEmpty" `
            -Message $Message
    }
}

function Assert-JDCollectionCount
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        $Collection,

        [Parameter(Mandatory)]
        [int]
        $ExpectedCount,

        [string]
        $Message
    )

    $ActualCount = @($Collection).Count

    if ($ActualCount -ne $ExpectedCount)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected {0} items but found {1}." -f
                $ExpectedCount,
                $ActualCount
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDCollectionCount" `
            -Message $Message
    }
}

#------------------------------------------------------------------------------
# Object Assertions
#------------------------------------------------------------------------------

function Assert-JDHasProperty
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [object]
        $Object,

        [Parameter(Mandatory)]
        [string]
        $Property,

        [string]
        $Message
    )

    if ($Object.PSObject.Properties.Name -notcontains $Property)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected property '{0}' was not found." -f
                $Property
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDHasProperty" `
            -Message $Message
    }
}

function Assert-JDPropertyEquals
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [object]
        $Object,

        [Parameter(Mandatory)]
        [string]
        $Property,

        [Parameter(Mandatory)]
        $Expected,

        [string]
        $Message
    )

    Assert-JDHasProperty `
        -Object $Object `
        -Property $Property

    $Actual = $Object.$Property

    if ($Actual -ne $Expected)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Property '{0}' expected '{1}' but received '{2}'." -f
                $Property,
                $Expected,
                $Actual
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDPropertyEquals" `
            -Message $Message
    }
}

function Assert-JDType
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [object]
        $Object,

        [Parameter(Mandatory)]
        [Type]
        $Type,

        [string]
        $Message
    )

    if ($Object.GetType() -ne $Type)
    {
        if ([string]::IsNullOrWhiteSpace($Message))
        {
            $Message = (
                "Expected type '{0}' but received '{1}'." -f
                $Type.FullName,
                $Object.GetType().FullName
            )
        }

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDType" `
            -Message $Message
    }
}

#------------------------------------------------------------------------------
# Section Continues...
#------------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Module Version
#------------------------------------------------------------------------------

function Get-JDAssertionsVersion
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        PSTypeName = 'JustDefenders.Test.Assertions.Version'

        Name       = $Script:Module.Name

        Version    = $Script:Module.Version

        Baseline   = $Script:Module.Baseline

        Timestamp  = Get-Date
    }
}

#------------------------------------------------------------------------------
# Enhanced Exception Assertion
#------------------------------------------------------------------------------

Remove-Item Function:\Assert-JDThrows -ErrorAction SilentlyContinue

function Assert-JDThrows
{
    [CmdletBinding()]
    param(

        [Parameter(Mandatory)]
        [scriptblock]
        $ScriptBlock,

        [Type]
        $ExceptionType
    )

    try
    {
        & $ScriptBlock

        Throw-JDAssertionFailed `
            -Assertion "Assert-JDThrows" `
            -Message "Expected exception was not thrown."
    }
    catch
    {
        if ($PSBoundParameters.ContainsKey("ExceptionType"))
        {
            $ActualType = $_.Exception.GetType()

            if (-not $ExceptionType.IsAssignableFrom($ActualType))
            {
                Throw-JDAssertionFailed `
                    -Assertion "Assert-JDThrows" `
                    -Message (
                        "Expected exception assignable to '{0}' but received '{1}'." -f
                        $ExceptionType.FullName,
                        $ActualType.FullName
                    )
            }
        }
    }
}

#------------------------------------------------------------------------------
# Public API
#------------------------------------------------------------------------------

Export-ModuleMember -Function @(

    # Boolean

    'Assert-JDTrue',
    'Assert-JDFalse',

    # Null

    'Assert-JDNull',
    'Assert-JDNotNull',

    # Equality

    'Assert-JDEquals',
    'Assert-JDNotEquals',

    # Strings

    'Assert-JDContains',
    'Assert-JDStartsWith',
    'Assert-JDEndsWith',
    'Assert-JDMatches',

    # Collections

    'Assert-JDEmpty',
    'Assert-JDNotEmpty',
    'Assert-JDCollectionCount',

    # Objects

    'Assert-JDHasProperty',
    'Assert-JDPropertyEquals',
    'Assert-JDType',

    # Exceptions

    'Assert-JDThrows',
    'Assert-JDDoesNotThrow',

    # Files

    'Assert-JDFileExists',
    'Assert-JDDirectoryExists',

    # Numbers

    'Assert-JDGreaterThan',
    'Assert-JDLessThan',
    'Assert-JDBetween',

    # Diagnostics

    'Get-JDAssertionsVersion',
    'Test-JDAssertionsModule'
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

Module:
Engineering Assertions

Version:
1.0.0

Status:
Complete

Work Package:
WP-003F.1A

Engineering Baseline:
ALPHA_BASELINE_20260701

===============================================================================
#>
