#
# JustDefenders©
# File: tooling\engineering\Services\Private\ManagedService-Registration.ps1
# Work Package: WP-SERVICE-006A
# Module: Managed Service Registration
#
# Purpose:
#   Registers managed services with the Operational Host and
#   initialises canonical runtime state.
#

Set-StrictMode -Version Latest

$runtimeModule = Join-Path $PSScriptRoot 'ManagedService/Runtime/ManagedService-Runtime.psm1'
Import-Module $runtimeModule -Force -DisableNameChecking

function Test-JDManagedServiceRegistration {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    return (Test-JDManagedServiceState -Name $Name)
}

function Get-JDManagedServiceRegistration {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    return Get-JDManagedServiceState -Name $Name
}

function Register-JDManagedService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name,

        [Parameter(Mandatory)]
        [hashtable]$Definition
    )

    if (Test-JDManagedServiceRegistration -Name $Name) {
        throw "Managed service '$Name' is already registered."
    }

    foreach($required in 'StartupCommand','StopCommand'){
        if(-not $Definition.ContainsKey($required)){
            throw "Managed service '$Name' is missing required property '$required'."
        }
    }

    if (Get-Command Register-JDOperationalHostService -ErrorAction SilentlyContinue)
{
    $registration =
        if ($Definition -is [pscustomobject])
        {
            $Definition
        }
        else
        {
            [pscustomobject]$Definition
        }

    if (-not ($registration.PSObject.Properties.Name -contains 'ExecuteCommand'))
    {
        $registration | Add-Member -MemberType NoteProperty -Name 'ExecuteCommand' -Value $null -Force
    }

    Register-JDOperationalHostService `
        -Registration $registration
}

    try {
        New-JDManagedServiceRuntime `
            -ServiceName $Name `
            -Metadata $Definition | Out-Null
    }
    catch {
        if ($_.Exception.Message -notmatch 'already exists') {
            throw
        }
    }

    Set-JDManagedServiceRuntimeState `
        -ServiceName $Name `
        -State 'REGISTERED' `
        -Metadata $Definition | Out-Null

    $state = Set-JDManagedServiceState `
        -Name $Name `
        -RegistrationState 'Registered' `
        -RuntimeState 'Registered' `
        -HealthState 'Unknown' `
        -Metadata $Definition

    [pscustomobject]@{
        Name              = $Name
        RegistrationState = 'Registered'
        RegisteredAt      = Get-Date
        Runtime           = $state
    }
}

function Unregister-JDManagedService {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    if (-not (Test-JDManagedServiceRegistration -Name $Name)) {
        return $false
    }

    if (Get-Command Unregister-JDOperationalHostService -ErrorAction SilentlyContinue) {
        Unregister-JDOperationalHostService -Name $Name
    }

    Remove-JDManagedServiceState -Name $Name | Out-Null

    return $true
}

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUiEIDfb9Q1BVDQSWnLjvC0NOb
# 0YGgggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFD6fmh+SByN0rcXRcO49szF5
# ans9MA0GCSqGSIb3DQEBAQUABIIBgCugUTSrItB+v/yI57a9Qjd6hNHv7SvOBR0U
# 5eELD/OeWTzl9gP+Aam0yW0pt4nS/1KUjXs1B4oYmvhcd2YgcC5BPZs6IfX5qfK+
# V9+rIlRZRZvh9bn4LlUHhM0IibA2YAkn951n3gy6jI3VmSuObkZbkkvyDcBxo525
# /81UdBE8pL2l9WBu8+TQlViRiw9YzM4FEafvxPXr7NIJvJQEy0gZG4krCcjBWDOk
# 9P9pPAhgHFeJiAkWBwtEt+FTDfbsrAW4IqjXRi1vk8gdY3SQQ13iKJ0RjCWjLvnD
# pYnO1QdJGoGpMToTYDbWURlkO9RAm8VN6dUa1fh/ZUj8ehV1AAwclACkriS1bkKq
# JLPaQX7gQ0S6o6+J6cLVG3Z3tpdLgIa2yw9U1vYROiUVn8z8w0E4rExRLfo5ot8u
# 03achLdi0b9mYXY7WgMJQnZCmFWMoL5TgHXlIBnbongp/YS5JdSeYSGutCKVXa4r
# oJsS6EdtpM79MT2EFZGpNaA+gVVj0A==
# SIG # End signature block
