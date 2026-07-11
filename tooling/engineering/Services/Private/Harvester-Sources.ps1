<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Harvester-Sources.ps1

Timestamp
10 July 2026 19:15

Work Package
WP-S002-04

Component
Harvester Runtime

Purpose
Implements the Harvester Source Registry.

This module is the authoritative owner of all registered Harvester
connectors.

Responsibilities

    • Register Sources
    • Unregister Sources
    • Source Discovery
    • Source Enable/Disable
    • Source Metadata

Dependencies

    • Harvester-State.ps1
    • Engineering-Common

Notes

    • Private module
    • Dot-sourced by Harvester Runtime
    • Contains no harvesting logic
==============================================================================#
#>

Set-StrictMode -Version Latest

# ============================================================================
# INITIALISE SOURCE REGISTRY
# ============================================================================

$existingSources = Get-Variable `
    -Name JDHarvesterSources `
    -Scope Script `
    -ErrorAction SilentlyContinue

if($null -eq $existingSources)
{
    $Script:JDHarvesterSources = @{}
}

# ============================================================================
# GET SOURCES
# ============================================================================

function Get-JDHarvesterSources
{
    [CmdletBinding()]
    param()

    return @($Script:JDHarvesterSources.Values)
}

# ============================================================================
# GET SOURCE
# ============================================================================

function Get-JDHarvesterSource
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    if($Script:JDHarvesterSources.ContainsKey($Name))
    {
        return $Script:JDHarvesterSources[$Name]
    }

    return $null
}

# ============================================================================
# REGISTER SOURCE
# ============================================================================

function Register-JDHarvesterSource
{
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [pscustomobject]
        $Registration
    )

    if([string]::IsNullOrWhiteSpace($Registration.Name))
    {
        throw "Registration.Name is required."
    }

    if($Script:JDHarvesterSources.ContainsKey($Registration.Name))
    {
        throw "Harvester Source '$($Registration.Name)' already exists."
    }

    $source = [PSCustomObject]@{

        Name          = $Registration.Name

        Type          = $Registration.Type

        Enabled       = $true

        Connected     = $false

        Health        = "UNKNOWN"

        LastRun       = $null

        LastSuccess   = $null

        LastFailure   = $null

        Statistics    = [PSCustomObject]@{

            Executions = 0

            Documents  = 0

            Failures   = 0

        }

    }

    $Script:JDHarvesterSources[$source.Name] = $source

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Registered Harvester Source [{0}]." -f $source.Name)

    return $source
}

# ============================================================================
# PART 1 END
# ============================================================================

# ============================================================================
# UNREGISTER SOURCE
# ============================================================================

function Unregister-JDHarvesterSource
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name
    )

    if(-not $Script:JDHarvesterSources.ContainsKey($Name))
    {
        return $false
    }

    $null = $Script:JDHarvesterSources.Remove($Name)

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Unregistered Harvester Source [{0}]." -f $Name)

    return $true
}

# ============================================================================
# ENABLE SOURCE
# ============================================================================

function Enable-JDHarvesterSource
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $source = Get-JDHarvesterSource `
        -Name $Name

    if($null -eq $source)
    {
        throw "Harvester Source '$Name' not found."
    }

    $source.Enabled = $true

    return $source
}

# ============================================================================
# DISABLE SOURCE
# ============================================================================

function Disable-JDHarvesterSource
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $source = Get-JDHarvesterSource `
        -Name $Name

    if($null -eq $source)
    {
        throw "Harvester Source '$Name' not found."
    }

    $source.Enabled = $false

    return $source
}

# ============================================================================
# CONNECT SOURCE
# ============================================================================

function Connect-JDHarvesterSource
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $source = Get-JDHarvesterSource `
        -Name $Name

    if($null -eq $source)
    {
        throw "Harvester Source '$Name' not found."
    }

    if(-not $source.Enabled)
    {
        throw "Harvester Source '$Name' is disabled."
    }

    $source.Connected = $true

    $source.Health = "HEALTHY"

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Connected Harvester Source [{0}]." -f $Name)

    return $source
}

# ============================================================================
# DISCONNECT SOURCE
# ============================================================================

function Disconnect-JDHarvesterSource
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $source = Get-JDHarvesterSource `
        -Name $Name

    if($null -eq $source)
    {
        throw "Harvester Source '$Name' not found."
    }

    $source.Connected = $false

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Disconnected Harvester Source [{0}]." -f $Name)

    return $source
}

# ============================================================================
# TEST SOURCE
# ============================================================================

function Test-JDHarvesterSource
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name
    )

    $source = Get-JDHarvesterSource `
        -Name $Name

    if($null -eq $source)
    {
        return $false
    }

    if(-not $source.Enabled)
    {
        return $false
    }

    if(-not $source.Connected)
    {
        return $false
    }

    return $true
}

# ============================================================================
# UPDATE SOURCE EXECUTION
# ============================================================================

function Update-JDHarvesterSourceExecution
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name,

        [int]
        $Documents = 0
    )

    $source = Get-JDHarvesterSource `
        -Name $Name

    if($null -eq $source)
    {
        throw "Harvester Source '$Name' not found."
    }

    $source.LastRun = Get-Date

    $source.LastSuccess = Get-Date

    $source.Statistics.Executions++

    $source.Statistics.Documents += $Documents

    return $source
}

# ============================================================================
# PART 2 END
# ============================================================================

# ============================================================================
# RECORD SOURCE FAILURE
# ============================================================================

function Register-JDHarvesterSourceFailure
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name,

        [string]
        $Reason = "Unknown"
    )

    $source = Get-JDHarvesterSource `
        -Name $Name

    if($null -eq $source)
    {
        throw "Harvester Source '$Name' not found."
    }

    $source.Health = "FAILED"

    $source.LastFailure = Get-Date

    $source.Statistics.Failures++

    Write-JDEngineeringLog `
        -Level Warning `
        -Message ("Harvester Source [{0}] failed: {1}" -f $Name, $Reason)

    return $source
}

# ============================================================================
# GET SOURCE METRICS
# ============================================================================

function Get-JDHarvesterSourceMetrics
{
    [CmdletBinding()]
    param()

    $sources = Get-JDHarvesterSources

    [PSCustomObject]@{

        TotalSources =
            $sources.Count

        EnabledSources =
            @($sources | Where-Object Enabled).Count

        ConnectedSources =
            @($sources | Where-Object Connected).Count

        HealthySources =
            @($sources | Where-Object Health -eq "HEALTHY").Count

        FailedSources =
            @($sources | Where-Object Health -eq "FAILED").Count

        Timestamp =
            Get-Date

    }
}

# ============================================================================
# GET SOURCE SUMMARY
# ============================================================================

function Get-JDHarvesterSourceSummary
{
    [CmdletBinding()]
    param()

    Get-JDHarvesterSources |
        Sort-Object Name |
        ForEach-Object {

            [PSCustomObject]@{

                Name =
                    $_.Name

                Type =
                    $_.Type

                Enabled =
                    $_.Enabled

                Connected =
                    $_.Connected

                Health =
                    $_.Health

                Executions =
                    $_.Statistics.Executions

                Documents =
                    $_.Statistics.Documents

                Failures =
                    $_.Statistics.Failures

                LastRun =
                    $_.LastRun

                LastSuccess =
                    $_.LastSuccess

                LastFailure =
                    $_.LastFailure

            }

        }
}

# ============================================================================
# RESET SOURCE REGISTRY
# ============================================================================

function Reset-JDHarvesterSources
{
    [CmdletBinding()]
    param()

    $Script:JDHarvesterSources.Clear()

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Source Registry reset."

    return $true
}

# ============================================================================
# VALIDATE SOURCE REGISTRY
# ============================================================================

function Test-JDHarvesterSourceRegistry
{
    [CmdletBinding()]
    param()

    if($null -eq $Script:JDHarvesterSources)
    {
        return $false
    }

    return $true
}

# ============================================================================
# END OF FILE
# ============================================================================