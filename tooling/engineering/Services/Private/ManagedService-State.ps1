#
# JustDefenders©
# File: tooling\engineering\Services\Private\ManagedService-State.ps1
# Work Package: WP-SERVICE-006A
# Module: Managed Service Runtime State
#
# Purpose:
#   Canonical runtime state store for the Managed Service Engine.
#

Set-StrictMode -Version Latest

if (-not (Get-Variable -Name ManagedServiceRuntime -Scope Script -ErrorAction SilentlyContinue)) {
    $script:ManagedServiceRuntime = [ordered]@{}
}

$script:ManagedServiceValidStates = @(
    'Unregistered',
    'Registered',
    'Starting',
    'Running',
    'Stopping',
    'Stopped',
    'Failed'
)

function Initialize-JDManagedServiceState {
    [CmdletBinding()]
    param()

    $script:ManagedServiceRuntime = [ordered]@{}
    return $script:ManagedServiceRuntime
}

function Test-JDManagedServiceState {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    return $script:ManagedServiceRuntime.Contains($Name)
}

function Get-JDManagedServiceStates {
    [CmdletBinding()]
    param()

    return $script:ManagedServiceRuntime.Values
}

function Get-JDManagedServiceState {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    if (-not (Test-JDManagedServiceState -Name $Name)) {
        throw "Managed service state '$Name' does not exist."
    }

    return $script:ManagedServiceRuntime[$Name]
}

function Set-JDManagedServiceState {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name,

        [ValidateSet(
            'Unregistered',
            'Registered',
            'Starting',
            'Running',
            'Stopping',
            'Stopped',
            'Failed'
        )]
        [string]$RuntimeState,

        [string]$RegistrationState,

        [string]$HealthState,

        [hashtable]$RuntimeContext,

        [hashtable]$Metadata
    )

    $existing = $null
    if (Test-JDManagedServiceState -Name $Name) {
        $existing = $script:ManagedServiceRuntime[$Name]
    }

    $state = [pscustomobject]@{
        Name               = $Name
        RegistrationState  = if($PSBoundParameters.ContainsKey('RegistrationState')){$RegistrationState}else{$existing.RegistrationState}
        RuntimeState       = if($PSBoundParameters.ContainsKey('RuntimeState')){$RuntimeState}else{$existing.RuntimeState}
        HealthState        = if($PSBoundParameters.ContainsKey('HealthState')){$HealthState}else{$existing.HealthState}
        LastUpdated        = Get-Date
        LastStarted        = $existing.LastStarted
        LastStopped        = $existing.LastStopped
        LastHealthCheck    = $existing.LastHealthCheck
        RuntimeContext     = if($RuntimeContext){$RuntimeContext}else{$existing.RuntimeContext}
        Metadata           = if($Metadata){$Metadata}else{$existing.Metadata}
    }

    switch ($state.RuntimeState) {
        'Running'  { $state.LastStarted = Get-Date }
        'Stopped'  { $state.LastStopped = Get-Date }
    }

    if ($PSBoundParameters.ContainsKey('HealthState')) {
        $state.LastHealthCheck = Get-Date
    }

    $script:ManagedServiceRuntime[$Name] = $state

    return $state
}

function Remove-JDManagedServiceState {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )

    if (Test-JDManagedServiceState -Name $Name) {
        [void]$script:ManagedServiceRuntime.Remove($Name)
        return $true
    }

    return $false
}

# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUlROWi2QAsTTXL4KzvHfsnzEe
# kk+gggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFImoavvczEUllUg1GUFOtYxj
# niMqMA0GCSqGSIb3DQEBAQUABIIBgDP5oPkRPJYZJkklKEK8XntW/M18nrzfoAXy
# Qv+nCnLo5YlTGDiY9T0IX5EZZ5LtXDOkAcUr/HgoCJ+m53/MwCR59PQapaQ41gQt
# aLRhRMGDvYWP2ZTa+lwy86EmQHWpzJ83tZjt4rmhZD9E5XTUtcpjRwXsnlybwbkw
# UVzjdAYkO653Ls71BbviGInJmII5Y03S2ikzbKywTWw+bgCc5VMv/kqI3St0WfBo
# RRcWuZpYZUeCFjoZugmfxkUv5qKdImWrvxL+hFRxmubD/21qiHjiR1dojYLKPRs8
# O8cpdN5hLKwnoj9XuJaTQygW+T1LAeiEmEN0RgwDY//Fu+kECsOzlNa9jIMSVWTy
# K+9nwJlvsE3QiKGV/qf/+3SPVH+eH3IoVLQYOY5U8bJFyJlPKiquOnFS/5OQFI81
# +C//Oif6sdhl9ZV0CoPAMA7SXwVFAMm6KY4CCu3Qa9Y+nRm9SYPaT/pNP/fJkvzA
# FhhvdieiNJ1isRP6ITjlNCoYkYj/EA==
# SIG # End signature block
