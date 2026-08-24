#
# =====================================================
# JustDefenders ©
# File: C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\ManagedService-Discovery.ps1
# Work Package: PR-006F – Managed Service Discovery
# Timestamp: 22 July 2026, 08:55
# =====================================================

function Get-JDManagedServiceDiscovery
{
    [CmdletBinding()]
    param(
        [string]$Name,
        [switch]$IncludeDisabled
    )

    #
    # Ensure the singleton runtime exists.
    #
    $null = Get-JDHostState

    if (-not (Get-Command Get-JDOperationalHostServices -ErrorAction SilentlyContinue))
    {
        throw "Operational Host discovery API 'Get-JDOperationalHostServices' is unavailable."
    }

    $services = @(Get-JDOperationalHostServices)

    if ($Name)
    {
        $services = $services | Where-Object {
            $_.Name -like $Name -or
            $_.DisplayName -like $Name
        }
    }

    if (-not $IncludeDisabled)
    {
        $services = $services | Where-Object {

            if ($_.PSObject.Properties.Match('Enabled').Count)
            {
                $_.Enabled -ne $false
            }
            else
            {
                $true
            }

        }
    }

    $hostState = Get-JDHostState

    foreach ($service in $services)
    {
        [PSCustomObject]@{

            Name            = $service.Name
            DisplayName     = $service.DisplayName
            Description     = $service.Description
            Version         = $service.Version
            RuntimeType     = $service.RuntimeType

            RuntimeStatus   = if ($service.PSObject.Properties.Match('RuntimeStatus').Count)
                              {
                                  $service.RuntimeStatus
                              }
                              else
                              {
                                  $null
                              }

            HostRunning     = $hostState.Running
            HostHealth      = $hostState.HealthState
            LastHeartbeat   = $hostState.LastHeartbeat

            Source          = 'Operational-ServiceHost'
            Registration    = $service
        }
    }
}
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUaYpZAy0AyVsfj1ZPsm1BkKEr
# SQ6gggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
# AQsFADAxMS8wLQYDVQQDDCZKdXN0RGVmZW5kZXJzIEVuZ2luZWVyaW5nIENvZGUg
# U2lnbmluZzAeFw0yNjA4MTgwNzQzMjBaFw0yOTA4MTgwNzUzMjBaMDExLzAtBgNV
# BAMMJkp1c3REZWZlbmRlcnMgRW5naW5lZXJpbmcgQ29kZSBTaWduaW5nMIIBojAN
# BgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEAv9IMoIFNr6yFN3YrhKFM/OwF+Adn
# cEASw7j1RpghwtHyC/Of95kDXKYH5iorn7wjRrQaIpjI3SwSjSPVyeNPv9BwnEWf
# og9RFegtkcpbDmVEdDStaLKcurAWNPePaQLjM37OJcDhZq7Xt6o0M4P560gTpugT
# qXmzBmBJm8esfNlrvpvyb1kWHHwExhWKiOJLITN1DwzVtKp1iIsLVaSGfFYOoyTZ
# d5M2btm3//gM+UVgIv8OL0b1+FA0LPO6w+r/wsETvkE6gA2Yp1XEMBnVrM+82GyA
# ULNSaiOCRHmIvvWd7ae42hd49iNb448zI6o5dd+7UwuW2IgN+4dUBJj6/xKnVaqP
# ogS5w859W633Rw2oREVPHR7aXVC/5O6HRARb3J+GBB8aONmNIagpmIlO80yno3sD
# VeRI2jldaMrn82y6ekg3Vg5WTTN3LWuCAtdgQZXwEiZhddcLKR0c78LLQ2fOAX2E
# Ke8VMbDucbKrXo9WK0NuOyD8UZ2oFfeD8UulAgMBAAGjRjBEMA4GA1UdDwEB/wQE
# AwIHgDATBgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUMb5aRWwHL790fjoR
# 9BLuJCqudeswDQYJKoZIhvcNAQELBQADggGBAIxqgLtL/oLQX0G73w1odkDFk/ln
# 6qQ9Sq3EblYSgcgx7W5i62YHCAfN5dL6q8rwY+5M0JzKV3P0d8aV8HUqBhmJse3/
# YqH219aNYGgEDIFH9zw2oQ6+vV3L3J1RPf1qewGEpemRGCJJ0e7MRW9MIcmn68yD
# 4s9udhiDMlBYVaM1KeKc8lseJE8JSNZST5q+foPAeDJ7lpIX6a48dL7tMqYhV3sa
# G2QTtXsZLykIZWc7c6LPAbN13zAu8O15K0oZ9uzF7skToPf1Oycz70ALjMRS4j09
# ytSJpkEyyJcrdwsugfqWVviQzTnZm4JwejtsyKwwJacU353PkanMPE+RSv5ivTnc
# RdfUy5zX1nlXez21X0a1uDwvDbdz8vZf7OJ22iRvYIMx/vLLgt64wxtB7KDHK3tx
# V9f6KOTsDzGBnmzD6hVltnHtfK4ePqInezXSOGQwyJjZcACO5RfXsL0iemOXM4sy
# Q7nXcW7dmS/h/7l76i58v9f7wPFEk7ZYyM8QTjGCAmYwggJiAgEBMEUwMTEvMC0G
# A1UEAwwmSnVzdERlZmVuZGVycyBFbmdpbmVlcmluZyBDb2RlIFNpZ25pbmcCECU2
# Ao5/UVWGQFSqUiaNwrowCQYFKw4DAhoFAKB4MBgGCisGAQQBgjcCAQwxCjAIoAKA
# AKECgAAwGQYJKoZIhvcNAQkDMQwGCisGAQQBgjcCAQQwHAYKKwYBBAGCNwIBCzEO
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFNAQkGgaLXTgd06zHFJnLSdn
# mns2MA0GCSqGSIb3DQEBAQUABIIBgEmbDR6Xusl+FTZ8KbsvGZpL7ikLpHt1hWoJ
# woVZorFUZsxxT+v/huiokDs2da15kGrBasGrn06Nd+N1ldmLaLaQn0sPw+sXUoe+
# cluHYCTsqVA5XHNI6VOVUdRrDmZlxmRI7BVPk12tME02QadLKwj5u/jIHcrM3F7g
# tw5QgMgoqQQFSH4RNu9jv+9qfo+V+NIqhzlxzu3KqRPMtMFwe+xwzGv0TlAmU6nw
# 5dr2aBNWA//gEFsqY+RcuGK3W3S3i7T9cApw6zMlg9NR1fkMg/pYwis+MxkR9Rp8
# 0DgUmXWJBG4LEemrxJKflRAl1laJNxrx8RXfOSXX5FdRvV3a2v1xVjsRnF+/qpul
# NW1r58gMEOJCi7Z2W/qGKu8lXGSMvFjLmB7TiIrf3ZV2h6B3nDf5YoWQmTUwDs8v
# uGIX0otzGQZ2ubZF/COjPQDLRS0D9u0JAbiI7yh0QYqkRemHJQ5grsgC79JUbqi0
# V9OLrJ+ka3tWJpFK6nGAt4PW0WZX2w==
# SIG # End signature block
