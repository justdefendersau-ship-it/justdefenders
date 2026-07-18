<#
==============================================================================
 JustDefenders ©
 File:
 C:\dev\justdefenders\frontend\tooling\engineering\Services\Operational-Registry.psm1

 Timestamp:
 18 July 2026 14:15

 Work Package:
 PR-004A – Operational Registry v0.4.0

 Version:
 0.4.0 (Engineering Runtime Foundation)

 NOTE:
 This is Part 1 of the complete engineering replacement. It contains the
 module header, metadata, internal models, validation helpers and registry
 lifecycle. Subsequent parts append directly to this file.
==============================================================================#>

Set-StrictMode -Version Latest

Import-Module "$PSScriptRoot\..\Common\Engineering-Common.psm1" -Force -ErrorAction Stop

# ---------------------------------------------------------------------------
# Module State
# ---------------------------------------------------------------------------

$Script:OperationalRegistry = @{}

$Script:RegistryInfo = [ordered]@{
    Name        = "Operational-Registry"
    Version     = "0.4.0"
    Initialised = $false
    StartedAt   = $null
}

# ---------------------------------------------------------------------------
# Private Runtime Model
# ---------------------------------------------------------------------------

function New-JDOperationalRuntime {
    [CmdletBinding()]
    param()

    [pscustomobject]@{
        State          = "REGISTERED"
        Running        = $false
        Enabled        = $true
        Health         = "UNKNOWN"
        CurrentPhase   = "Registered"
        StartedAt      = $null
        StoppedAt      = $null
        LastHeartbeat  = $null
        LastUpdated    = Get-Date
        Metrics        = [ordered]@{
            QueueDepth          = 0
            ActiveWorkers       = 0
            DocumentsProcessed  = 0
            DocumentsInserted   = 0
            FailedDocuments     = 0
        }
    }
}

function New-JDOperationalStatistics {
    [CmdletBinding()]
    param()

    [pscustomobject]@{
        Starts        = 0
        Stops         = 0
        Restarts      = 0
        HealthChecks  = 0
        Recoveries    = 0
        Heartbeats    = 0
        Failures      = 0
    }
}

function Test-JDRegistrationContract {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [psobject]$Registration
    )

    foreach($property in @("Name","Version","StartCommand","StatusCommand")){
        if([string]::IsNullOrWhiteSpace($Registration.$property)){
            throw "Registration.$property is required."
        }
    }

    return $true
}

# ---------------------------------------------------------------------------
# Registry Lifecycle
# ---------------------------------------------------------------------------

function Initialize-JDOperationalRegistry {
    [CmdletBinding()]
    param()

    $Script:OperationalRegistry.Clear()
    $Script:RegistryInfo.Initialised = $true
    $Script:RegistryInfo.StartedAt = Get-Date

    Write-JDEngineeringLog -Level Information -Message "Operational Registry v0.4.0 initialised."

    return $true
}

function Clear-JDOperationalRegistry {
    [CmdletBinding()]
    param()

    $Script:OperationalRegistry.Clear()

    Write-JDEngineeringLog -Level Information -Message "Operational Registry cleared."

    return $true
}

# ===== END OF PART 1 =====


# ---------------------------------------------------------------------------
# Part 2
# Registration Engine
# ---------------------------------------------------------------------------

function Register-JDOperationalService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [psobject]$Registration
    )

    Test-JDRegistrationContract -Registration $Registration | Out-Null

    if($Script:OperationalRegistry.ContainsKey($Registration.Name)){
        throw "Service '$($Registration.Name)' already exists."
    }

    $runtime = New-JDOperationalRuntime
    $statistics = New-JDOperationalStatistics

    $record = [pscustomobject]@{
        Name          = $Registration.Name
        Registration  = $Registration

        # New runtime model
        Runtime       = $runtime

        # Compatibility alias for legacy callers
        RuntimeStatus = $runtime

        Statistics    = $statistics
        Instance      = $null
        RegisteredAt  = Get-Date
        UpdatedAt     = Get-Date
    }

    $Script:OperationalRegistry[$Registration.Name] = $record

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Registered managed service [{0}]." -f $Registration.Name)

    return $record
}

function Get-JDOperationalServices {
    [CmdletBinding()]
    param()

    return @($Script:OperationalRegistry.Values)
}

function Get-JDOperationalService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    if($Script:OperationalRegistry.ContainsKey($Name)){
        return $Script:OperationalRegistry[$Name]
    }

    return $null
}

function Test-JDOperationalServiceExists {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    return $Script:OperationalRegistry.ContainsKey($Name)
}

function Update-JDOperationalService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name,

        [Parameter(Mandatory)]
        [hashtable]$Properties
    )

    $service = Get-JDOperationalService -Name $Name

    if(-not $service){
        throw "Service '$Name' not found."
    }

    foreach($key in $Properties.Keys){
        if($service.PSObject.Properties.Match($key).Count -gt 0){
            $service.$key = $Properties[$key]
        }
    }

    $service.UpdatedAt = Get-Date

    return $service
}

function Unregister-JDOperationalService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    if(-not $Script:OperationalRegistry.ContainsKey($Name)){
        return $false
    }

    $null = $Script:OperationalRegistry.Remove($Name)

    Write-JDEngineeringLog `
        -Level Information `
        -Message ("Unregistered service [{0}]." -f $Name)

    return $true
}

# ===== END OF PART 2 =====


# ---------------------------------------------------------------------------
# Part 3
# Runtime Management API
# ---------------------------------------------------------------------------

function Get-JDOperationalRuntime {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    $service = Get-JDOperationalService -Name $Name
    if(-not $service){
        throw "Service '$Name' not found."
    }

    return $service.Runtime
}

function Update-JDOperationalRuntime {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name,

        [hashtable]$Properties
    )

    $runtime = Get-JDOperationalRuntime -Name $Name

    foreach($key in $Properties.Keys){
        if($runtime.PSObject.Properties.Match($key).Count -gt 0){
            $runtime.$key = $Properties[$key]
        }
    }

    $runtime.LastUpdated = Get-Date

    $service = Get-JDOperationalService -Name $Name
    $service.UpdatedAt = Get-Date

    return $runtime
}

function Update-JDOperationalMetrics {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name,

        [Parameter(Mandatory)]
        [hashtable]$Metrics
    )

    $runtime = Get-JDOperationalRuntime -Name $Name

    foreach($key in $Metrics.Keys){
        if($runtime.Metrics.Contains($key)){
            $runtime.Metrics[$key] = $Metrics[$key]
        }
    }

    $runtime.LastUpdated = Get-Date

    return $runtime.Metrics
}

function Reset-JDOperationalRuntime {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    $service = Get-JDOperationalService -Name $Name
    if(-not $service){
        throw "Service '$Name' not found."
    }

    $service.Runtime = New-JDOperationalRuntime
    $service.RuntimeStatus = $service.Runtime
    $service.UpdatedAt = Get-Date

    return $service.Runtime
}

function Get-JDOperationalRuntimeSummary {
    [CmdletBinding()]
    param()

    foreach($service in Get-JDOperationalServices){
        [pscustomobject]@{
            Name            = $service.Name
            State           = $service.Runtime.State
            Running         = $service.Runtime.Running
            Health          = $service.Runtime.Health
            CurrentPhase    = $service.Runtime.CurrentPhase
            LastHeartbeat   = $service.Runtime.LastHeartbeat
            LastUpdated     = $service.Runtime.LastUpdated
        }
    }
}

# ===== END OF PART 3 =====


# ---------------------------------------------------------------------------
# Part 4
# Diagnostics / Version / Exports
# ---------------------------------------------------------------------------

function Get-JDOperationalRegistryVersion {
    [CmdletBinding()]
    param()

    [pscustomobject]@{
        Name          = $Script:RegistryInfo.Name
        Version       = $Script:RegistryInfo.Version
        Initialised   = $Script:RegistryInfo.Initialised
        ServiceCount  = $Script:OperationalRegistry.Count
        Timestamp     = Get-Date
    }
}

Export-ModuleMember -Function `
Initialize-JDOperationalRegistry,`
Clear-JDOperationalRegistry,`
Register-JDOperationalService,`
Get-JDOperationalServices,`
Get-JDOperationalService,`
Test-JDOperationalServiceExists,`
Update-JDOperationalService,`
Unregister-JDOperationalService,`
Get-JDOperationalRegistryVersion,`
Get-JDOperationalRuntime,`
Update-JDOperationalRuntime,`
Update-JDOperationalMetrics,`
Reset-JDOperationalRuntime,`
Get-JDOperationalRuntimeSummary

# ============================================================================
# End of Operational-Registry.psm1 v0.4.0
# PR-004A Complete
# ============================================================================
