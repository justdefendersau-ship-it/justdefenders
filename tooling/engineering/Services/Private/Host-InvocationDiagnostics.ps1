<#
==============================================================================
JustDefenders©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-InvocationDiagnostics.ps1

Timestamp
13 July 2026 17:45

Work Package
WP-S005A-03C

Component
Host Invocation Diagnostics

Purpose

Provides engineering diagnostics for the Operational Service Host
invocation pipeline.

Responsibilities

    • Capture invocation context.
    • Capture runspace identity.
    • Capture module identity.
    • Capture caller information.
    • Capture execution timestamps.
    • Capture engineering session information.
    • Produce deterministic diagnostics.
    • Never modify runtime behaviour.

Dependencies

    • Engineering-Common.psm1

Notes

    • Private module.
    • Read-only diagnostics.
    • Safe for production execution.
    • No runtime side-effects.
    • No state mutation.

==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# SCRIPT DIAGNOSTIC SESSION
# ============================================================================

if (
    -not (Get-Variable `
        -Name JDHostInvocationDiagnostics `
        -Scope Script `
        -ErrorAction SilentlyContinue)
)
{
    $Script:JDHostInvocationDiagnostics = [PSCustomObject]@{

        SessionId =
            [guid]::NewGuid().Guid

        CorrelationId =
            [guid]::NewGuid().Guid

        CreatedAt =
            Get-Date

        TraceCount =
            0

        Enabled =
            $true

        Version =
            "1.0.0-alpha"

        WorkPackage =
            "WP-S005A-03C"

    }
}

# ============================================================================
# GET INVOCATION CONTEXT
# ============================================================================

function Get-JDInvocationContext
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        Timestamp =
            Get-Date

        Command =
            $MyInvocation.MyCommand.Name

        InvocationName =
            $MyInvocation.InvocationName

        ScriptName =
            $MyInvocation.ScriptName

        PSCommandPath =
            $PSCommandPath

        PSScriptRoot =
            $PSScriptRoot

        ModuleName =
            $MyInvocation.MyCommand.ModuleName

        ModulePath =
            $MyInvocation.MyCommand.Module.Path

        RunspaceId =
            [System.Management.Automation.Runspaces.Runspace]::DefaultRunspace.InstanceId

        ThreadId =
            [System.Threading.Thread]::CurrentThread.ManagedThreadId

        ProcessId =
            $PID

        ComputerName =
            $env:COMPUTERNAME

        UserName =
            $env:USERNAME

    }
}

# ============================================================================
# GET MODULE IDENTITY
# ============================================================================

function Get-JDModuleIdentity
{
    [CmdletBinding()]
    param()

    $module =
        $MyInvocation.MyCommand.Module

    if ($null -eq $module)
    {
        return $null
    }

    return [PSCustomObject]@{

        Name =
            $module.Name

        Version =
            $module.Version

        Path =
            $module.Path

        Guid =
            $module.Guid

    }
}

# ============================================================================
# GET RUNSPACE IDENTITY
# ============================================================================

function Get-JDRunspaceIdentity
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        RunspaceId =
            [System.Management.Automation.Runspaces.Runspace]::DefaultRunspace.InstanceId

        ThreadId =
            [System.Threading.Thread]::CurrentThread.ManagedThreadId

        ProcessId =
            $PID

    }
}

# ============================================================================
# PART 1 END
# ============================================================================

# ============================================================================
# GET INVOCATION OBJECT IDENTITY
# ============================================================================
#
# JustDefenders©
#
# Purpose
#
# Returns a deterministic identity for an object during an invocation.
#
# Responsibilities
#
#   • Safely identify runtime objects.
#   • Never modify the supplied object.
#   • Return a stable engineering identifier.
#
# Notes
#
#   • Read-only helper.
#   • Safe for all object types.
#
# ============================================================================

function Get-JDInvocationObjectIdentity
{
    [CmdletBinding()]
    param
    (
        [Parameter()]
        [AllowNull()]
        [object]
        $InputObject
    )

    if ($null -eq $InputObject)
    {
        return "NULL"
    }

    try
    {
        return [System.Runtime.CompilerServices.RuntimeHelpers]::GetHashCode(
            $InputObject
        )
    }
    catch
    {
        return "UNAVAILABLE"
    }
}

# ============================================================================
# MERGE INVOCATION TRACE DATA
# ============================================================================
#
# JustDefenders©
#
# Purpose
#
# Merges invocation context with additional engineering data.
#
# Responsibilities
#
#   • Preserve invocation context.
#   • Merge supplied diagnostic values.
#   • Never overwrite existing keys.
#
# Notes
#
#   • Internal helper.
#   • Read-only.
#
# ============================================================================

function Merge-JDInvocationTraceData
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [hashtable]
        $Trace,

        [Parameter()]
        [hashtable]
        $Data = @{}
    )

    foreach($key in $Data.Keys)
    {
        if (-not $Trace.ContainsKey($key))
        {
            $Trace[$key] = $Data[$key]
        }
    }

    return $Trace
}

# ============================================================================
# WRITE HOST INVOCATION TRACE
# ============================================================================
#
# JustDefenders©
#
# Purpose
#
# Emits a structured engineering trace for Operational Host invocation.
#
# Responsibilities
#
#   • Capture invocation context.
#   • Capture object identity.
#   • Merge engineering metadata.
#   • Delegate output to Engineering logging.
#
# Notes
#
#   • Read-only.
#   • No runtime side-effects.
#   • Safe for production execution.
#
# ============================================================================

function Write-JDHostInvocationTrace
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Event,

        [Parameter()]
        [AllowNull()]
        [object]
        $InputObject,

        [Parameter()]
        [hashtable]
        $Data = @{}
    )

    #
    # Collect invocation context
    #

    $context =
        Get-JDInvocationContext

    #
    # Build trace
    #

    $trace = [ordered]@{

        Timestamp =
            $context.Timestamp

        Event =
            $Event

        Command =
            $context.Command

        InvocationName =
            $context.InvocationName

        ModuleName =
            $context.ModuleName

        ModulePath =
            $context.ModulePath

        ScriptName =
            $context.ScriptName

        RunspaceId =
            $context.RunspaceId

        ThreadId =
            $context.ThreadId

        ProcessId =
            $context.ProcessId

        ObjectIdentity =
            Get-JDInvocationObjectIdentity `
                -InputObject $InputObject

    }

    #
    # Merge caller supplied data
    #

    $trace =
        Merge-JDInvocationTraceData `
            -Trace $trace `
            -Data $Data

    #
    # Build engineering message
    #

    $message =
        ($trace.GetEnumerator() |
            ForEach-Object {

                "{0}={1}" -f $_.Key,$_.Value

            }) -join "; "

    #
    # Emit engineering log
    #

    Write-JDEngineeringLog `
        -Level Information `
        -Message "[HOST TRACE] $message"

    return [PSCustomObject]$trace
}

# ============================================================================
# PART 2 END
# ============================================================================

# ============================================================================
# TEST HOST INVOCATION DIAGNOSTICS
# ============================================================================
#
# JustDefenders©
#
# Purpose
#
# Performs a lightweight self-test of the Host Invocation Diagnostics
# framework.
#
# Responsibilities
#
#   • Validate helper availability.
#   • Validate invocation context collection.
#   • Validate object identity helper.
#   • Never modify runtime behaviour.
#
# Notes
#
#   • Internal helper.
#   • Safe for production execution.
#   • No runtime side-effects.
#
# ============================================================================

function Test-JDHostInvocationDiagnostics
{
    [CmdletBinding()]
    param()

    try
    {
        $context =
            Get-JDInvocationContext

        if ($null -eq $context)
        {
            return $false
        }

        $identity =
            Get-JDInvocationObjectIdentity `
                -InputObject $context

        if ([string]::IsNullOrWhiteSpace("$identity"))
        {
            return $false
        }

        return $true
    }
    catch
    {
        Write-JDEngineeringLog `
            -Level Warning `
            -Message (
                "Host Invocation Diagnostics self-test failed. {0}" -f
                $_.Exception.Message
            )

        return $false
    }
}

# ============================================================================
# ASSERT HOST INVOCATION DIAGNOSTICS
# ============================================================================
#
# JustDefenders©
#
# Purpose
#
# Verifies that the Host Invocation Diagnostics framework is operational.
#
# Responsibilities
#
#   • Execute the diagnostics self-test.
#   • Throw if diagnostics are unavailable.
#
# Notes
#
#   • Internal helper.
#   • Used during engineering investigations.
#
# ============================================================================

function Assert-JDHostInvocationDiagnostics
{
    [CmdletBinding()]
    param()

    if (-not (Test-JDHostInvocationDiagnostics))
    {
        throw "Host Invocation Diagnostics are unavailable."
    }

    return $true
}

# ============================================================================
# END OF FILE
#
# JustDefenders©
#
# File
# C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\
# Host-InvocationDiagnostics.ps1
#
# Work Package
# WP-S005A-03C
#
# Component
# Host Invocation Diagnostics
#
# Status
# Engineering Baseline
#
# Notes
#
#   • Private Engineering Services helper.
#   • Loaded by Operational-ServiceHost.psm1.
#   • Produces no runtime side-effects.
#   • Uses the Engineering logging framework.
#
# ============================================================================