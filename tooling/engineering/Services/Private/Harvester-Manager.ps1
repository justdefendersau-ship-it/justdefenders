# ============================================================================
# START RUNTIME
# ============================================================================

function Start-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    #
    # Already running
    #

    if ($state.Running)
    {
        return $state
    }

    #
    # Initialise runtime if required
    #

    if (-not $state.Initialised)
    {
        Initialize-JDHarvesterState | Out-Null

        #
        # Refresh authoritative state
        #

        $state = Get-JDHarvesterState
    }

    #
    # Transition to Running
    #

    $state.Running      = $true
    $state.Paused       = $false
    $state.CurrentPhase = "Running"

    if ($null -eq $state.StartedAt)
    {
        $state.StartedAt = Get-Date
    }

    $state.LastRun = Get-Date

    Update-JDHarvesterHeartbeat | Out-Null

    Update-JDHarvesterHealth `
        -Health "HEALTHY" | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Runtime started."

    return $state
}

# ============================================================================
# STOP RUNTIME
# ============================================================================

function Stop-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    #
    # Already stopped
    #

    if (-not $state.Running)
    {
        return $state
    }

    #
    # Transition to Stopped
    #

    $state.Running      = $false
    $state.Paused       = $false
    $state.CurrentPhase = "Stopped"
    $state.StoppedAt    = Get-Date

    Update-JDHarvesterHeartbeat | Out-Null

    Update-JDHarvesterHealth `
        -Health "UNKNOWN" | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Runtime stopped."

    return $state
}

# ============================================================================
# PART 1 END
# ============================================================================

# ============================================================================
# RESTART RUNTIME
# ============================================================================

function Restart-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    #
    # Stop only if currently running.
    #

    if ($state.Running)
    {
        Stop-JDHarvesterRuntime | Out-Null
    }

    #
    # Start runtime.
    #

    Start-JDHarvesterRuntime | Out-Null

    #
    # Refresh authoritative state.
    #

    $state = Get-JDHarvesterState

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Runtime restarted."

    return $state
}

# ============================================================================
# PAUSE RUNTIME
# ============================================================================

function Pause-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    #
    # Runtime must be running.
    #

    if (-not $state.Running)
    {
        return $state
    }

    #
    # Already paused.
    #

    if ($state.Paused)
    {
        return $state
    }

    #
    # Transition to Paused.
    #

    $state.Paused = $true
    $state.CurrentPhase = "Paused"

    Update-JDHarvesterHeartbeat | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Runtime paused."

    return $state
}

# ============================================================================
# RESUME RUNTIME
# ============================================================================

function Resume-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    #
    # Runtime must be running.
    #

    if (-not $state.Running)
    {
        return $state
    }

    #
    # Runtime must currently be paused.
    #

    if (-not $state.Paused)
    {
        return $state
    }

    #
    # Transition back to Running.
    #

    $state.Paused = $false
    $state.CurrentPhase = "Running"

    Update-JDHarvesterHeartbeat | Out-Null

    Write-JDEngineeringLog `
        -Level Information `
        -Message "Harvester Runtime resumed."

    return $state
}

# ============================================================================
# TEST RUNTIME
# ============================================================================

function Test-JDHarvesterRuntime
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    if (-not $state.Initialised)
    {
        return $false
    }

    if (-not $state.Running)
    {
        return $false
    }

    if ($state.HealthState -eq "FAILED")
    {
        return $false
    }

    return $true
}

# ============================================================================
# PART 2 END
# ============================================================================

# ============================================================================
# RECOVER RUNTIME
# ============================================================================

function Invoke-JDHarvesterRuntimeRecovery
{
    [CmdletBinding()]
    param()

    Write-JDEngineeringLog `
        -Level Warning `
        -Message "Harvester Runtime recovery initiated."

    Restart-JDHarvesterRuntime | Out-Null

    return Get-JDHarvesterState
}

# ============================================================================
# ASSERT RUNTIME RUNNING
# ============================================================================

function Assert-JDHarvesterRunning
{
    [CmdletBinding()]
    param()

    if (-not (Test-JDHarvesterRuntime))
    {
        throw "Harvester Runtime is not running."
    }

    return $true
}

# ============================================================================
# ASSERT RUNTIME PAUSED
# ============================================================================

function Assert-JDHarvesterPaused
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    if (-not $state.Paused)
    {
        throw "Harvester Runtime is not paused."
    }

    return $true
}

# ============================================================================
# ASSERT RUNTIME ACTIVE
# ============================================================================

function Assert-JDHarvesterActive
{
    [CmdletBinding()]
    param()

    $state = Get-JDHarvesterState

    if (-not $state.Running)
    {
        throw "Harvester Runtime is not running."
    }

    if ($state.Paused)
    {
        throw "Harvester Runtime is paused."
    }

    return $true
}

# ============================================================================
# END OF FILE
# ============================================================================
# SIG # Begin signature block
# MIIHMgYJKoZIhvcNAQcCoIIHIzCCBx8CAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUz14P4w6IM114hZnqfLjd5QXV
# hR2gggQ2MIIEMjCCApqgAwIBAgIQJTYCjn9RVYZAVKpSJo3CujANBgkqhkiG9w0B
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
# MAwGCisGAQQBgjcCARUwIwYJKoZIhvcNAQkEMRYEFMT8klkNVl8O/BfgnJnNOYVp
# eHYGMA0GCSqGSIb3DQEBAQUABIIBgGTnajuKyY3pb7GY0s0LEp0ibvzGiywOd4I5
# rjeoO/DD9y8GaL86USRXz9Rd/oEshyTOsm1GH1iKComyord+FB6bML6R5s3Zjwzy
# bKeJnZ+swS/7OBJdDsDkJg6CA3KRz1Uv1v1WO7Va5m4zAqlaefxs/pH3yiflowjG
# Oertlebge3zg3OupewRr9UGSnkUO7nYsqsUI6IrFjCXzQRnZWOsKYijX99LmiByN
# 1J8/Fuohreztutd/0C8dPUNhLbEfw3RvJTj51fy004PvLnaUYOwVy3WB1M2zyGFL
# h6+HeaO9PeccNlQidUhmirh+lZRJ+J8kCxiH64YegS79cay0bUywek9kYbTwh7cz
# 6uUhFLXKIQwxf8ZgHvL3esxhQdmAN9dYoEAk6Q8AS2OfHc+yZql1hKNnEgnFBtgW
# 2jJpx5YUtNRaGtyKzHyaaLycgdar6e/Nj2hD0qDRBqUODY27pW+W0ycNC1BMiQOE
# MCH6lLZ2Sl47dQJc+kZ0oPcqnRDTGQ==
# SIG # End signature block
