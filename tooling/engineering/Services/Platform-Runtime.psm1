# ============================================================================
# JustDefenders ©
#
# Platform-Runtime.psm1
#
# WP-PLATFORM-001 PR-009
# Production Platform Integration Runtime
#
# Purpose:
#   Top-level composition module for the JustDefenders Operational Platform.
#
# Responsibilities:
#   • Import Engineering Common
#   • Import Operational Service Host
#   • Import Harvester Runtime
#   • Load Platform private components
#   • Load Platform public components
#   • Export the Platform API
#
# ============================================================================

Set-StrictMode -Version Latest

$ErrorActionPreference = 'Stop'

# ============================================================================
# Module Initialisation
# ============================================================================

Set-StrictMode -Version Latest

$ErrorActionPreference = 'Stop'

# ============================================================================
# Resolve Module Paths
# ============================================================================

$ModuleRoot = Split-Path `
    -Parent `
    $PSCommandPath

$PrivateRoot = Join-Path `
    $ModuleRoot `
    'Private'

$PublicRoot = Join-Path `
    $ModuleRoot `
    'Public'

# ============================================================================
# Import Runtime Dependencies
# ============================================================================

Import-Module `
    (Join-Path $ModuleRoot 'Engineering-Common.psm1') `
    -Force `
    -ErrorAction Stop

Import-Module `
    (Join-Path $ModuleRoot 'Operational-ServiceHost.psm1') `
    -Force `
    -ErrorAction Stop

Import-Module `
    (Join-Path $PrivateRoot 'Harvester-Runtime.psm1') `
    -Force `
    -ErrorAction Stop

# ============================================================================
# Platform Runtime Manifest
# ============================================================================

$script:PlatformManifest = [ordered]@{

    Private = @(
        'Platform-Bootstrap.ps1'
        'Platform-Lifecycle.ps1'
        'Platform-Diagnostics.ps1'
    )

    Public = @(
    'Initialize-JDPlatform.ps1'
    'Start-JDPlatform.ps1'
    'Stop-JDPlatform.ps1'
    'Restart-JDPlatform.ps1'
    'Get-JDPlatformStatus.ps1'
    'Get-JDPlatformMetadata.ps1'
    'Platform-Control.ps1'
)

    RequiredModules = @(
        'Engineering-Common'
        'Operational-ServiceHost'
        'Harvester-Runtime'
    )

}

# ============================================================================
# Runtime Loader
# ============================================================================


# ============================================================================
# Load Private Runtime
# ============================================================================

foreach ($ScriptName in $script:PlatformManifest.Private) {

    $ScriptPath = Join-Path $PrivateRoot $ScriptName

    
    if (-not (Test-Path $ScriptPath)) {
        throw "Platform runtime failed to locate Private script: $ScriptName"
    }

    . $ScriptPath

    
}

# ============================================================================
# Load Public Runtime
# ============================================================================

foreach ($ScriptName in $script:PlatformManifest.Public) {

    $ScriptPath = Join-Path $PublicRoot $ScriptName

    
    if (-not (Test-Path $ScriptPath)) {
        throw "Platform runtime failed to locate Public script: $ScriptName"
    }

    . $ScriptPath

   
}

# ============================================================================
# Runtime Validation
# ============================================================================

$RequiredFunctions = @(

    'Initialize-JDPlatform'

    'Start-JDPlatform'

    'Stop-JDPlatform'

    'Restart-JDPlatform'

    'Get-JDPlatformStatus'

)



foreach ($FunctionName in $RequiredFunctions) {

    if (-not (Get-Command `
                -Name $FunctionName `
                -ErrorAction SilentlyContinue)) {

        throw "Platform Runtime validation failed. Missing function: $FunctionName"

    }

}

# ============================================================================
# Platform Metadata
# ============================================================================

$script:PlatformRuntimeMetadata = [ordered]@{

    Name          = 'JustDefenders Platform Runtime'

    Version       = '1.0.0'

    Loaded        = Get-Date

    PrivateFiles  = $script:PlatformManifest.Private.Count

    PublicFiles   = $script:PlatformManifest.Public.Count

    HostRuntime   = 'Operational-ServiceHost'

    Harvester     = 'Harvester-Runtime'

}

function Get-JDPlatformMetadata {

    [CmdletBinding()]
    param()

    return [PSCustomObject]$script:PlatformRuntimeMetadata

}

# ============================================================================
# Export Public API
# ============================================================================

Export-ModuleMember `
    -Function @(
        'Initialize-JDPlatform',
        'Start-JDPlatform',
        'Stop-JDPlatform',
        'Restart-JDPlatform',
        'Get-JDPlatformStatus',
        'Get-JDPlatformMetadata'
    )
# SIG # Begin signature block
# MIIHVwYJKoZIhvcNAQcCoIIHSDCCB0QCAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCAt4JrNGwTU3YfX
# QGre8LKaQE5DSj4SNypCtKj9XFhI1KCCBDYwggQyMIICmqADAgECAhAlNgKOf1FV
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
# DQEJBDEiBCD0127wjf0n44O2tZH2r8/7VaHLDRUyipv9uCVJDnqDFTANBgkqhkiG
# 9w0BAQEFAASCAYB+6M6McLpHZzCs4qaIxQ4SvFqAGUdhE5TXrEwkYYUw08uUPtJn
# NDE0mV/da9rN5v9QJz9RT7yRQyXg79IWIniCOWsAatU0rRDyW0u58dF9XWTqpYOh
# wYPG8SxKPcGVzjf+vzhK3HJEPaVu1Q7LTWwIohSVb7lK4dJJn3tzeG3537z8bHdJ
# tCVykswP5yzVFvha5tNQGs/EZfXOoIhq3iWcuqeDU36p38B0k+66e+AkyH0KtKth
# bW+crIjtsikupT4lRhXzcRUTzQtAGrvcDl3oEmXrSbYS4dl0a1ygjZO2KaF6h8pt
# aroF3OHH/v3s/aunuFCuVlI8/m9Ky2EF1HlzJe2Iu5HbqE0ljPsXzSICH/yEbD3k
# DXepAKL9GyWKTMhcjRkPyQhsPI1zEWHiiTsgHoQhoyQHQGinIif4/AfBt65O2iGB
# XD5R5881bvSv6/roEbnFkXQGqlKd5syrI2PpL6q+qpNK11IHrl6836SafENkPtO/
# ZKTTWBUsxqOalUk=
# SIG # End signature block
