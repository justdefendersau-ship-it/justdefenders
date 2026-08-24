<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Runtime-State.ps1

Timestamp
22 July 2026 08:00

Work Package
PR-006F — Host State Singleton Refactor

Component
Runtime State Singleton

Purpose
Provides a process-wide singleton runtime state for the Operational Service
Host. This replaces direct script-scoped ownership while preserving the
existing JDHostState object model.

Notes
- Private module.
- Dot-sourced by Operational-ServiceHost.psm1 before Host-State.ps1.
- Preserves compatibility with existing consumers.
============================================================================== 
#>

Set-StrictMode -Version Latest

Write-Host "[RUNTIME] Runtime-State.ps1 loaded"

# ============================================================================
# SCRIPT STORAGE
# ============================================================================

if (-not (Get-Variable `
        -Name JDRuntimeSingleton `
        -Scope Script `
        -ErrorAction SilentlyContinue))
{
    $Script:JDRuntimeSingleton = @{

    Metadata = [PSCustomObject]@{

        RuntimeVersion = '2.0.0'
        SchemaVersion  = 2
        RuntimeId      = ([guid]::NewGuid()).Guid
        CreatedAt      = Get-Date

    }

        JDHostState = $null

}   # closes the hashtable

}   # closes the if statement

# ============================================================================
# CREATE DEFAULT HOST STATE
# ============================================================================

function New-JDHostRuntimeState
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        Name                = "JustDefenders Operational Service Host"

        Version             = "0.4.0"

        WorkPackage         = "PR-011A"

        RuntimeId           = $Script:JDRuntimeSingleton.Metadata.RuntimeId

        LifecycleState      = "Created"

        Initialised         = $false

        Running             = $false

        Starting            = $false

        Stopping            = $false

        Bootstrapping       = $false

        SchedulerRunning    = $false

        RecoveryEnabled     = $true

        HealthState         = "UNKNOWN"

        StartedAt           = $null

        StoppedAt           = $null

        LastHeartbeat       = $null

        LastHealthCheck     = $null

        LastRecoveryAttempt = $null

        LastOperation       = $null

        Statistics = [PSCustomObject]@{

            HostStarts      = 0

            HostStops       = 0

            Restarts        = 0

            HealthChecks    = 0

            RecoveryEvents  = 0

            ManagedServices = 0

        }

    }
}

# ============================================================================
# GET SINGLETON
# ============================================================================

function Get-JDRuntimeState
{
    [CmdletBinding()]
    param()

    if ($null -eq $Script:JDRuntimeSingleton.JDHostState)
    {
        $Script:JDRuntimeSingleton.JDHostState =
            New-JDHostRuntimeState
    }

    return $Script:JDRuntimeSingleton.JDHostState
}
# ============================================================================
# RESET SINGLETON
# ============================================================================

function Reset-JDRuntimeState
{
    [CmdletBinding()]
    param()

    $Script:JDRuntimeSingleton.JDHostState =
        New-JDHostRuntimeState

    return $Script:JDRuntimeSingleton.JDHostState
}

# ============================================================================
# TEST SINGLETON
# ============================================================================

function Test-JDRuntimeState
{
    [CmdletBinding()]
    param()

    return ($null -ne $Script:JDRuntimeSingleton.JDHostState)
}

# ============================================================================
# REMOVE SINGLETON
# ============================================================================

function Remove-JDRuntimeState
{
    [CmdletBinding()]
    param()

    $Script:JDRuntimeSingleton.JDHostState = $null
}

# ============================================================================
# END OF FILE
# ============================================================================
# SIG # Begin signature block
# MIIHVwYJKoZIhvcNAQcCoIIHSDCCB0QCAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCASvc2RK88qhOqR
# kpN867bDrEuap5UPrUAjeX6oEUqn2KCCBDYwggQyMIICmqADAgECAhAlNgKOf1FV
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
# DQEJBDEiBCCP0/mnBVi9kOta/6TJwEgO2HVE3J9K80Ib/UO7azNMgTANBgkqhkiG
# 9w0BAQEFAASCAYCVAD6kBNPKv8n1A2GBUyYTaM4TGfeq91O7TlihcQrl1ACHZPBQ
# MXq1g9Dd4btVpCfu6gU2w1FbOTAsQow/yKcPD8Za5L7TahCpp7FbthXkVgLUYHcF
# XWS0zGaBIa6mlw4U5vO9gV3swlaxVeBdPN3iObkjkkbQZM8xZ3e8FZ4PHRg/6FAu
# EBkp6MkiDHEPH7jF6l4Kf9fNMWMGitzpGmwhhylKySeflRt1+S0ZtFk3oI/OwCfU
# KHucOPmHC387+pA2d97GNLXlpPDwFDMqWYP5+vdwn7SggcWOWM/+UKzwXFyXpPRe
# 67Sd2J2naokX3oEzId+1dGqOTS/MC8OzXzCRIjSKDW3gk5PwAMJkmREruXF4hj6p
# gyx1ljoSZZeEBWGzhUpF+eYfLbcB5jJOHH1aZ5B/aF3bSRH1Witz3HRDyCdBH3ms
# uOTxcZhv7wve9QBJndRFpUDy4/NBi3ik89fUPfeXAV0raP8gQkYUrW56vwr/d1Jc
# HkLKAnJp4lX3qFM=
# SIG # End signature block
