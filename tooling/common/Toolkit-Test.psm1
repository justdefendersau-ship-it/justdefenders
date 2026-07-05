# ============================================================================
# JustDefenders©
#
# File:
# C:\dev\justdefenders\frontend\tooling\common\Toolkit-Test.psm1
#
# Timestamp:
# 30 June 2026 18:45 Sydney
#
# Work Package:
# WP-004.3.7
#
# Module:
# Toolkit Test Framework
#
# Version:
# 1.2.0
#
# Engineering Baseline:
# WP00437_TOOLKIT_TEST_V120
#
# Purpose:
# Shared testing framework for all Engineering Toolkit modules.
#
# ============================================================================

Set-StrictMode -Version Latest

#------------------------------------------------------------------------------
# Engineering Toolkit Module State
#------------------------------------------------------------------------------

$Script:Module = [ordered]@{

    Name = "Engineering Toolkit Test"

    Version = "1.2.0"

    Baseline = "WP00437_TOOLKIT_TEST_V120"

    Initialised = $false

    Loaded = Get-Date
}

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

function Initialize-JDToolkitTest
{
    [CmdletBinding()]
    param()

    $Script:Module.Initialised = $true
}

#------------------------------------------------------------------------------
# Toolkit Version
#------------------------------------------------------------------------------

function Get-JDToolkitTestVersion
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

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

function Get-JDToolkitTestState
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        Name = $Script:Module.Name

        Version = $Script:Module.Version

        Baseline = $Script:Module.Baseline

        Initialised = $Script:Module.Initialised

        Loaded = $Script:Module.Loaded

        Timestamp = Get-Date
    }
}

#------------------------------------------------------------------------------
# Toolkit Governance Validation
#------------------------------------------------------------------------------

function Test-JDToolkitTest
{
    [CmdletBinding()]
    param()

    $RequiredFunctions = @(

        'Get-JDToolkitTestVersion'

        'Get-JDToolkitTestState'

        'New-TestResult'

        'Invoke-ToolkitTest'

        'Show-TestSummary'

        'Test-ToolkitModule'
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

        MissingFunctions = @($Missing)

        Timestamp = Get-Date
    }
}

# -----------------------------------------------------------------------------
# Create a standard test result
# -----------------------------------------------------------------------------

function New-TestResult
{
    param(
        [Parameter(Mandatory)]
        [string]$Name,

        [Parameter(Mandatory)]
        [bool]$Passed,

        [string]$Message = ""
    )

    return [PSCustomObject]@{

        TestName = $Name

        Passed = $Passed

        Message = $Message

        Timestamp = Get-Date
    }
}

# -----------------------------------------------------------------------------
# Execute a test safely
# -----------------------------------------------------------------------------

function Invoke-ToolkitTest
{
    param(
        [Parameter(Mandatory)]
        [string]$Name,

        [Parameter(Mandatory)]
        [scriptblock]$Test
    )

    try
    {
        & $Test

        return New-TestResult `
            -Name $Name `
            -Passed $true
    }
    catch
    {
        return New-TestResult `
            -Name $Name `
            -Passed $false `
            -Message $_.Exception.Message
    }
}

# -----------------------------------------------------------------------------
# Display summary
# -----------------------------------------------------------------------------

function Show-TestSummary
{
    param(
        [Parameter(Mandatory)]
        $Results
    )

    Write-Host ""
    Write-Host "============================================================"
    Write-Host " Toolkit Test Summary"
    Write-Host "============================================================"
    Write-Host ""

    foreach ($result in $Results)
    {
        if ($result.Passed)
        {
            Write-Host ("PASS  {0}" -f $result.TestName)
        }
        else
        {
            Write-Host ("FAIL  {0}" -f $result.TestName)
            Write-Host ("      {0}" -f $result.Message)
        }
    }

    Write-Host ""

    $passed = @($Results | Where-Object Passed).Count
    $failed = @($Results | Where-Object { -not $_.Passed }).Count

    Write-Host ("Passed : {0}" -f $passed)
    Write-Host ("Failed : {0}" -f $failed)

    Write-Host ""
}

# -----------------------------------------------------------------------------
# Execute one module validation
# -----------------------------------------------------------------------------

function Test-ToolkitModule
{
    param(
        [Parameter(Mandatory)]
        [string]$ModuleName,

        [Parameter(Mandatory)]
        [scriptblock]$Validation
    )

    Invoke-ToolkitTest `
        -Name $ModuleName `
        -Test $Validation
}

# -----------------------------------------------------------------------------
# Export Public Functions
# -----------------------------------------------------------------------------

#------------------------------------------------------------------------------
# Module Initialisation
#------------------------------------------------------------------------------

Initialize-JDToolkitTest

Export-ModuleMember `
    -Function `
        Get-JDToolkitTestVersion, `
        Get-JDToolkitTestState, `
        Test-JDToolkitTest, `
        New-TestResult, `
        Invoke-ToolkitTest, `
        Show-TestSummary, `
        Test-ToolkitModule