#
# JustDefenders©
# File: tooling\engineering\Services\Private\ManagedService-Health.ps1
# Work Package: WP-SERVICE-006A
# Module: Managed Service Health
#
# Purpose:
#   Executes managed service health callbacks and normalises results.
#

Set-StrictMode -Version Latest

function Invoke-JDManagedServiceHealth {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    $registration = Get-JDManagedServiceRegistration -Name $Name
    $metadata = $registration.Metadata

    $result = [pscustomobject]@{
        Name            = $Name
        Healthy         = $false
        HealthState     = 'Unknown'
        CheckedAt       = Get-Date
        Details         = $null
        Exception       = $null
    }

    try {
        if ($metadata.ContainsKey('HealthCommand') -and $metadata.HealthCommand) {
            $callbackResult = & $metadata.HealthCommand

            if ($callbackResult -is [bool]) {
                $result.Healthy = $callbackResult
                $result.HealthState = if ($callbackResult) { 'Healthy' } else { 'Unhealthy' }
            }
            elseif ($callbackResult -is [psobject]) {
                $result = $callbackResult
            }
        }
        else {
            $result.Healthy = $true
            $result.HealthState = 'Unknown'
        }
    }
    catch {
        $result.Healthy = $false
        $result.HealthState = 'Failed'
        $result.Exception = $_.Exception.Message
    }

    Set-JDManagedServiceState `
        -Name $Name `
        -HealthState $result.HealthState | Out-Null

    return $result
}

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQU5ZnVE+Jw+1udYi9M3gT77LBm
# VQqgggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFO6hvOJUTgpBK8l+TgaSNx+F
# mEZQMA0GCSqGSIb3DQEBAQUABIIBgLVZeuoGtTHswVNCEsyrJnB9hdraxC2WpvJs
# RfObeJaf2A0L6uDgU9AVulKWYcLTmGhNAOvkAe0ZSr9P0codXvZMfoRE0o5GJ7OZ
# slgfXg8pUvr2d+jLnr6bHYxEC6cnn03Ne1fa1Ji57dae0mOOnJC3ypFDkrpmfUIV
# A+QsDJ7+UAKc3pp40yC1UoHdmWSd8ltqaBcNYJmbHvhL/gMw12jfMc8H8uLIas+T
# LB3/jvzI5FZfeMqPgAWvsqeteexlS7/VYcyR7mqZjgjzXSegJY0Uth1JfzLAXtHc
# BpvDyCt5yf3Od7DY0fjhDVjeUfQWav9renYzjQ64x4YwlNGPwXHlzfYfPX5F0Afr
# j6oXHV3ocGDyn6mCLKaurhcoU20h6mD5HR7dAhg3vkSqq06nuMPUGG2maJvWzeEp
# L7rPXZ9WFq1ORqH2aln43QdfK4ikn4X5mEn9qkG5kk4caj0iH3Ez+S8NN/UYaDBx
# lXm42A0LXmigQO1cGT1xT2X3fyy9Fg==
# SIG # End signature block
