<#
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\tooling\engineering\Services\Public\Start-JDHarvester.ps1

Timestamp
10 July 2026 20:10

Work Package
WP-S003-01

Component
Public Harvester API

Purpose
Public entry point for starting the JustDefenders Harvester Runtime.

This is the supported public API for starting the Harvester. Consumers must
never invoke the internal Harvester Manager directly.

Dependencies
- Harvester-Manager.ps1
- Harvester-State.ps1

Notes
- Public module
- Exported by Harvester Runtime module
- Owns no runtime state
==============================================================================
#>

Set-StrictMode -Version Latest

function Start-JDHarvester
{
    [CmdletBinding()]
    param()

    # ------------------------------------------------------------------------
    # Initialise Runtime
    # ------------------------------------------------------------------------

    Initialize-JDHarvesterState | Out-Null

    # ------------------------------------------------------------------------
    # Register Authorised MS-006 Sources
    #
    # Registration and configuration execute within the same loaded
    # Harvester-Runtime module instance that owns the source registry.
    # ------------------------------------------------------------------------

    Register-JDHarvesterSources | Out-Null

    Set-JDHarvesterSourceConfiguration | Out-Null

    # ------------------------------------------------------------------------
    # Start Runtime
    # ------------------------------------------------------------------------

    $runtime =
        Start-JDHarvesterRuntime

    # ------------------------------------------------------------------------
    # Return Public Status
    # ------------------------------------------------------------------------

    [PSCustomObject]@{

        Name =
            $runtime.Name

        Version =
            $runtime.Version

        Running =
            $runtime.Running

        Paused =
            $runtime.Paused

        Initialised =
            $runtime.Initialised

        Health =
            $runtime.HealthState

        StartedAt =
            $runtime.StartedAt

        CurrentPhase =
            $runtime.CurrentPhase

        Timestamp =
            Get-Date
    }
}

# ============================================================================
# END OF FILE
# ============================================================================
# SIG # Begin signature block
# MIIHVwYJKoZIhvcNAQcCoIIHSDCCB0QCAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCCCys5uTnlqK78C
# L4p/rB85fmX0jatzH08Q475zSjIdjaCCBDYwggQyMIICmqADAgECAhAlNgKOf1FV
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
# DQEJBDEiBCBuD7ybsRYZbmHGcY7ktMA/kQnazt0u2jRwwqEYPgczRTANBgkqhkiG
# 9w0BAQEFAASCAYArb40xHHBAt/Ne7mimIxpLhhx1WAzMH7lYzcoGNIDmsoXY3YQA
# fABtpnQEK+/xN091/EjGAT7Vkg9OmQ1who2eaJpvCE686QBWf4urXP4zBtSf+Nsc
# BwgIevKX1Ds9pHXQ+G8q26JMkO4eeuspJv3IaXRp9JibGaiqWx0AfiZmllMcpzfY
# n8U8ivUT+Uk/lmFhX+Wgng5XXRgO/lau9y4z/bm22PVC0Sb3YUgCjTtPLtiGfFMc
# hYLfHfEoAZUbaNQZQnqG4EnrbleB6N1rDT6HBilrgwA25rDUQKu1Cooc8vIPKlaJ
# S36numN6AngL6ijCE9WJK5SfeYfMNnOfC1ctObrA9Ho58zA0VpIUlECphgt+IVIg
# q678PWBcp6TeDkqGNYBNNRTjzlSznc4UtChjjNtfTlXHeca0+J6nmrqmIEmYczjk
# No8u1S3UWTckMe4vegCx45Cp7WsXGlg3r5rAwAvmoLW6eC62/Peudo9ugvGxHK61
# 4K7i2OPVsTels4I=
# SIG # End signature block
