<#
==============================================================================
 JustDefenders ©
 File:
 C:\dev\justdefenders\frontend\tooling\engineering\Services\Operational-Registry.psm1

 Timestamp:
 13 August 2026 16:30

 Work Package:
 PR-004A – Operational Registry v0.4.0

 Version:
 0.4.0 (Engineering Runtime Foundation)

 Engineering Correction:
 Engineering-Common logging is invoked through its module-qualified command
 surface so Operational-Registry does not depend on unqualified command
 visibility across module scope boundaries.
==============================================================================#>

Set-StrictMode -Version Latest

# Engineering-Common is a sibling production module in Services.
Import-Module "$PSScriptRoot\Engineering-Common.psm1" -Force -ErrorAction Stop

# Resolve the logging command inside this module scope.
# Do not rely on module-name-qualified command auto-resolution from a nested
# module/function scope during Operational Host startup.
$Script:EngineeringCommonLogCommand = Get-Command `
    -Name 'Write-JDEngineeringLog' `
    -Module 'Engineering-Common' `
    -ErrorAction Stop

function Write-JDOperationalRegistryLog {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateSet("Debug","Information","Warning","Error")]
        [string]$Level,

        [Parameter(Mandatory)]
        [string]$Message
    )

    & $Script:EngineeringCommonLogCommand `
        -Level $Level `
        -Message $Message
}

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

    foreach ($property in @("Name", "Version", "StartCommand", "StatusCommand")) {
        if ([string]::IsNullOrWhiteSpace($Registration.$property)) {
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

    Write-JDOperationalRegistryLog `
        -Level Information `
        -Message "Operational Registry v0.4.0 initialised."

    return $true
}

function Clear-JDOperationalRegistry {
    [CmdletBinding()]
    param()

    $Script:OperationalRegistry.Clear()

    Write-JDOperationalRegistryLog `
        -Level Information `
        -Message "Operational Registry cleared."

    return $true
}

# ---------------------------------------------------------------------------
# Registration Engine
# ---------------------------------------------------------------------------

function Register-JDOperationalService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [psobject]$Registration
    )

    Test-JDRegistrationContract -Registration $Registration | Out-Null

    if ($Script:OperationalRegistry.ContainsKey($Registration.Name)) {
        throw "Service '$($Registration.Name)' already exists."
    }

    $runtime = New-JDOperationalRuntime
    $statistics = New-JDOperationalStatistics

    $record = [pscustomobject]@{
        Name          = $Registration.Name
        Registration  = $Registration
        Runtime       = $runtime
        RuntimeStatus = $runtime
        Statistics    = $statistics
        Instance      = $null
        RegisteredAt  = Get-Date
        UpdatedAt     = Get-Date
    }

    $Script:OperationalRegistry[$Registration.Name] = $record

    Write-JDOperationalRegistryLog `
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

    if ($Script:OperationalRegistry.ContainsKey($Name)) {
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

    if (-not $service) {
        throw "Service '$Name' not found."
    }

    foreach ($key in $Properties.Keys) {
        if ($service.PSObject.Properties.Match($key).Count -gt 0) {
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

    if (-not $Script:OperationalRegistry.ContainsKey($Name)) {
        return $false
    }

    $null = $Script:OperationalRegistry.Remove($Name)

    Write-JDOperationalRegistryLog `
        -Level Information `
        -Message ("Unregistered service [{0}]." -f $Name)

    return $true
}

# ---------------------------------------------------------------------------
# Runtime Management API
# ---------------------------------------------------------------------------

function Get-JDOperationalRuntime {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    $service = Get-JDOperationalService -Name $Name

    if (-not $service) {
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

    foreach ($key in $Properties.Keys) {
        if ($runtime.PSObject.Properties.Match($key).Count -gt 0) {
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

    foreach ($key in $Metrics.Keys) {
        if ($runtime.Metrics.Contains($key)) {
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

    if (-not $service) {
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

    foreach ($service in Get-JDOperationalServices) {
        [pscustomobject]@{
            Name         = $service.Name
            State        = $service.Runtime.State
            Running      = $service.Runtime.Running
            Health       = $service.Runtime.Health
            CurrentPhase = $service.Runtime.CurrentPhase
            LastHeartbeat = $service.Runtime.LastHeartbeat
            LastUpdated  = $service.Runtime.LastUpdated
        }
    }
}

# ---------------------------------------------------------------------------
# Diagnostics / Version
# ---------------------------------------------------------------------------

function Get-JDOperationalRegistryVersion {
    [CmdletBinding()]
    param()

    [pscustomobject]@{
        Name         = $Script:RegistryInfo.Name
        Version      = $Script:RegistryInfo.Version
        Initialised  = $Script:RegistryInfo.Initialised
        ServiceCount = $Script:OperationalRegistry.Count
        Timestamp    = Get-Date
    }
}

# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

Export-ModuleMember -Function `
    Initialize-JDOperationalRegistry, `
    Clear-JDOperationalRegistry, `
    Register-JDOperationalService, `
    Get-JDOperationalServices, `
    Get-JDOperationalService, `
    Test-JDOperationalServiceExists, `
    Update-JDOperationalService, `
    Unregister-JDOperationalService, `
    Get-JDOperationalRegistryVersion, `
    Get-JDOperationalRuntime, `
    Update-JDOperationalRuntime, `
    Update-JDOperationalMetrics, `
    Reset-JDOperationalRuntime, `
    Get-JDOperationalRuntimeSummary

# ============================================================================
# End of Operational-Registry.psm1 v0.4.0
# PR-004A — Engineering Runtime Dependency Boundary Correction
# ============================================================================

# SIG # Begin signature block
# MIIHVwYJKoZIhvcNAQcCoIIHSDCCB0QCAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCA5761f74w+QBby
# /PrkNYMx+hCkFjVNJCntXQ5HHEhlcKCCBDYwggQyMIICmqADAgECAhAlNgKOf1FV
# hkBUqlImjcK6MA0GCSqGSIb3DQEBCwUAMDExLzAtBgNVBAMMJkp1c3REZWZlbmRl
# cnMgRW5naW5lZXJpbmcgQ29kZSBTaWduaW5nMB4XDTI2MDgxODA3NDMyMFoXDTI5
# MDgxODA3NTMyMFowMTEvMC0GA1UEAwwmSnVzdERlZmVuZGVycyBFbmdpbmVlcmlu
# ZyBDb2RlIFNpZ25pbmcwggGiMA0GCSqGSIb3DQEBAQUAA4IBjwAwggGKAoIBgQC/
# 0gyggU2vrIU3diuEoUz87AX4B2dwQBLDuPVGmCHC0fIL85/3mQNcpgfmKiufvCNG
# tBoimMjdLBKNI9XJ40+/0HCcRZ+iD1EV6C2RylsOZUR0NK1ospy6sBY0949pAuMz
# fs4lwOFmrte3qjQzg/nrSBOm6BOpebMGYEmbx6x82Wu+m/JvWRYcfATGFYqI4ksh
# M3UPDNW0qnWIiwtVpIZ8Vg6jJNl3kzZu2bf/+Az5RWAi/w4vRvX4UDQs87rD6v/C
# wRO+QTqADZinVcQwGdWsz7zYbIBQs1JqI4JEeYi+9Z3tp7jaF3j2I1vjjzMjqjl1
# 37tTC5bYiA37h1QEmPr/EqdVqo+iBLnDzn1brfdHDahERU8dHtpdUL/k7odEBFvc
# n4YEHxo42Y0hqCmYiU7zTKejewNV5EjaOV1oyufzbLp6SDdWDlZNM3cta4IC12BB
# lfASJmF11wspHRzvwstDZ84BfYQp7xUxsO5xsqtej1YrQ247IPxRnagV94PxS6UC
# AwEAAaNGMEQwDgYDVR0PAQH/BAQDAgeAMBMGA1UdJQQMMAoGCCsGAQUFBwMDMB0G
# A1UdDgQWBBQxvlpFbAcvv3R+OhH0Eu4kKq516zANBgkqhkiG9w0BAQsFAAOCAYEA
# jGqAu0v+gtBfQbvfDWh2QMWT+WfqpD1KrcRuVhKByDHtbmLrZgcIB83l0vqryvBj
# 7kzQnMpXc/R3xpXwdSoGGYmx7f9iofbX1o1gaAQMgUf3PDahDr69XcvcnVE9/Wp7
# AYSl6ZEYIknR7sxFb0whyafrzIPiz252GIMyUFhVozUp4pzyWx4kTwlI1lJPmr5+
# g8B4MnuWkhfprjx0vu0ypiFXexobZBO1exkvKQhlZztzos8Bs3XfMC7w7XkrShn2
# 7MXuyROg9/U7JzPvQAuMxFLiPT3K1ImmQTLIlyt3Cy6B+pZW+JDNOdmbgnB6O2zI
# rDAlpxTfnc+Rqcw8T5FK/mK9OdxF19TLnNfWeVd7PbVfRrW4PC8Nt3Py9l/s4nba
# JG9ggzH+8suC3rjDG0HsoMcre3FX1/oo5OwPMYGebMPqFWW2ce18rh4+oid7NdI4
# ZDDImNlwAI7lF9ewvSJ6Y5czizJDuddxbt2ZL+H/uXvqLny/1/vA8USTtljIzxBO
# MYICdzCCAnMCAQEwRTAxMS8wLQYDVQQDDCZKdXN0RGVmZW5kZXJzIEVuZ2luZWVy
# aW5nIENvZGUgU2lnbmluZwIQJTYCjn9RVYZAVKpSJo3CujANBglghkgBZQMEAgEF
# AKCBhDAYBgorBgEEAYI3AgEMMQowCKACgAChAoAAMBkGCSqGSIb3DQEJAzEMBgor
# BgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
# DQEJBDEiBCA1y68tmc+MijmgICPWqU+E1FUcTTJO2AKFHPUkZsK8SjANBgkqhkiG
# 9w0BAQEFAASCAYBM0xAoAfjnQFOVsftWzZNuPLN9F0eKJGrqKvV1TmZbCUi/jYtN
# 8yePUHm3AhO8gZrFQLTxXiG3MGURgCJCIjgU+tOYB2wpMSd360zUWx0lgUlTnJRc
# 4b74bDBxtZN16pXoUKzJg1WVIyd1nwvdQpzxgA1s6YGpYmug6OWPzquO5UChhgTP
# 2NkArRIUPv71A3W+vUFe3VU1XMfR7M09zmKPvzWrYkp/6/6tv2lXJ+nxlF1QeL6a
# B7fj7wMCUg3axQjovs819ZCeo+Co4Fr5L2sQb9D4Q+3CN5MhkchQumGlQGCF9L7b
# PSXcQGOSDHbY1HmZo8Y2LTO5byHttaSn2CUZKZ/Lxy83GER9Xhozf52xc5tWRgpc
# ZFSQgh0NPUEt1ZxEgcfIPpK98HH98MEEw2rGBut4OLZm3h7rhUw009/rpjMZHKR/
# 8Vu2V4KpYd8uhCnvhyoGCHPqWI1iSW49DA6b6vpS6gjcGwyuforVQJxHb3wQM3St
# Ipq+r5o9vh4Olmc=
# SIG # End signature block
