<#
==============================================================================
JustDefenders Â©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Operational-ServiceHost.psm1

Timestamp
14 August 2026 07:00

Work Package
WP-S001-03 â€” Operational Service Host

Component
Operational Service Host

Purpose
Bootstrap module for the Operational Service Host.

Responsibilities

    â€¢ Load Engineering Common
    â€¢ Load Operational Registry
    â€¢ Load all Private modules
    â€¢ Load all Public modules
    â€¢ Export the complete Host Runtime public API

Composition Boundary

    â€¢ Engineering-Common is a foundational dependency.
    â€¢ Operational-Registry is an internal Host dependency.
    â€¢ ManagedService-Engine is a consumer of the Operational Service Host
      and therefore must not be imported by this Host bootstrap module.
    â€¢ No runtime initialisation occurs during module import.

Notes

    â€¢ The Operational Registry is an internal implementation detail.
    â€¢ Consumers interact exclusively with the Host Runtime.
    â€¢ Dependency direction is maintained from the Host to its foundations;
      consumer runtimes must not create a reverse dependency into the Host.

==============================================================================
#>

Set-StrictMode -Version Latest

# ============================================================================
# IMPORT DEPENDENCIES
#
# Composition boundary:
#   Engineering-Common and Operational-Registry are Host dependencies.
#   ManagedService-Engine is deliberately NOT imported here because it
#   consumes Operational-ServiceHost and therefore creates a reverse/circular
#   module dependency when imported by this bootstrap module.
# ============================================================================

Import-Module `
    (Join-Path $PSScriptRoot "Engineering-Common.psm1") `
    -Force

Import-Module `
    (Join-Path $PSScriptRoot "Operational-Registry.psm1") `
    -Force

# ============================================================================
# LOAD PRIVATE MODULES
# ============================================================================
$privateFolder = Join-Path $PSScriptRoot "Private"

if (Test-Path $privateFolder)
{
    #
    # Runtime-State must always load first because Host-State depends on it.
    #
    $orderedPrivateModules = @(
        "Runtime-State.ps1"
    )

    foreach ($module in $orderedPrivateModules)
    {
        $path = Join-Path $privateFolder $module

        if (Test-Path $path)
        {
            Write-Host "[LOAD ] $($module)" -ForegroundColor Cyan

            try
            {
                . $path

                Write-Host "[OK   ] $($module)" -ForegroundColor Green
            }
            catch
            {
                Write-Host "[FAIL ] $($module)" -ForegroundColor Red
                Write-Host $_.Exception.Message -ForegroundColor Yellow

                throw
            }
        }
    }

    #
    # Load the remaining private modules alphabetically.
    #
    Get-ChildItem `
        -Path $privateFolder `
        -Filter "*.ps1" `
        -File |
    Where-Object {
        $_ -is [System.IO.FileInfo] -and
        $_.Name -notin $orderedPrivateModules
    } |
    Sort-Object -Property Name |
    ForEach-Object {

        $module = $_

        Write-Host "[LOAD ] $($module.Name)" -ForegroundColor Cyan

        try
        {
            . $module.FullName

            Write-Host "[ OK  ] $($module.Name)" -ForegroundColor Green
        }
        catch
        {
            Write-Host "[FAIL ] $($module.Name)" -ForegroundColor Red
            Write-Host $_.Exception.ToString() -ForegroundColor Yellow

            throw
        }
    }
}

# ============================================================================
# LOAD PUBLIC MODULES
# ============================================================================

$publicFolder = Join-Path $PSScriptRoot "Public"

if (Test-Path $publicFolder)
{
    Get-ChildItem `
        -Path $publicFolder `
        -Filter "*.ps1" |
    Sort-Object Name |
    ForEach-Object {

        . $_.FullName

    }
}

# ============================================================================
# EXPORT PUBLIC HOST API
# ============================================================================

Export-ModuleMember -Function @(

    #
    # Host Lifecycle
    #

    "Start-JDOperationalHost",
    "Stop-JDOperationalHost",
    "Get-JDOperationalHostStatus",

    #
    # Service Lifecycle
    #

    "Start-JDOperationalService",
    "Stop-JDOperationalService",
    "Restart-JDOperationalService",
    "Get-JDOperationalServiceHealth",

    #
    # Harvester Runtime
    #

    "Register-JDHarvesterService",
    "Start-JDHarvester",
    "Stop-JDHarvester",
    "Restart-JDHarvester",
    "Pause-JDHarvester",
    "Resume-JDHarvester",
    "Get-JDHarvesterStatus",
    "Get-JDHarvesterHealth",
    "Get-JDHarvesterMetrics",

    #
    # Host Registration API
    #

    "Register-JDOperationalHostService",
    "Get-JDOperationalHostService",
    "Get-JDOperationalHostServices",
    "Unregister-JDOperationalHostService",

    #
    # Scheduler Runtime
    #

    "Start-JDOperationalScheduler",
    "Stop-JDOperationalScheduler",
    "Get-JDOperationalSchedulerStatus",
    "Get-JDOperationalSchedulerMetrics",
    "Invoke-JDOperationalSchedulerCycle",

    #
    # Runtime State
    #

    "Get-JDRuntimeState",
    "Test-JDRuntimeState",
    "Reset-JDRuntimeState",
    "Remove-JDRuntimeState"

)

# ============================================================================
# END OF FILE
# ============================================================================

# SIG # Begin signature block
# MIIHVwYJKoZIhvcNAQcCoIIHSDCCB0QCAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCCfP3pEFkBeWA+k
# zECCpYxgiwK+fY10GnYW+AEvbAwwxKCCBDYwggQyMIICmqADAgECAhAlNgKOf1FV
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
# DQEJBDEiBCC0+vI4rCplFyQjsVRMZRaZQyr8y1O8ECByoB5CRRnllDANBgkqhkiG
# 9w0BAQEFAASCAYBhcCNccrOXtmbpouO3trWy6Au+Y/giKEBst2rFkgRhsGMyaoEl
# JkrkKMEYNCDYoqWdBizhvE0R5AOY2r5p4MWUSMwwrC4bVUcM80T0H9C/xofLVkVM
# bBUseke8N51v7ylD/MY2IWhZQMLUjn4q92ePYmtQusiCBuo6PI/Vv4vgwGx+S4mG
# LHtjKKSwwvfetn3R/4ME+lN59/Q4a5XxHkcLhlMJ6SAXb3RtdLk3jCdXzVAZJk/3
# KVfq9U7hPODGnDdvXAsoWiZM7NMr+J2UZEVMXL7VPU9Ugz1rZJ7Rh/0HZM24N8/x
# nw1N7X4RG+fDUugTHNozIO95f3SFAYGgFWYlVHtYp305CApOJEV6zOZ6KVBELd4t
# Y9/45eMHS+zbIOpnhzQXV4pV+DmmfykPjtQZcEOPYVAcTcX1v+r7bfxVTqQH63Au
# ILoAPGUQrg9qWaSp31M99dcBiVq7XwHxyFvD8XkJMNXY0hMhF8BCmhKK4rjiH8jI
# wG1bAQpgSSMELmA=
# SIG # End signature block
