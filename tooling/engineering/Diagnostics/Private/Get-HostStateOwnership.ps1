<#
==============================================================================
JustDefenders ©

File
    tooling\engineering\Diagnostics\Private\Get-HostStateOwnership.ps1

Work Package
    PR-006D.2

Purpose
    Determine host ownership using the engineering runtime APIs instead of
    assuming global variables.

==============================================================================
#>

function Get-HostStateOwnership {

    [CmdletBinding()]
    param()

    $records = @()

    if (Get-Command Get-JDOperationalHostStatus -ErrorAction SilentlyContinue) {

        try {

            $status = Get-JDOperationalHostStatus

            $records += [PSCustomObject]@{
                Source       = 'Get-JDOperationalHostStatus'
                Running      = $status.Running
                Initialised  = $status.Initialised
                Health       = $status.Health
                StartedAt    = $status.StartedAt
                ObjectHash   = if ($status.PSObject.Properties.Match('Hash')) { $status.Hash } else { $null }
                State        = if ($status.Running) { 'Running' } else { 'Stopped' }
            }

        }
        catch {

            $records += [PSCustomObject]@{
                Source      = 'Get-JDOperationalHostStatus'
                State       = 'Error'
                Running     = $null
                Initialised = $null
                Health      = $null
                StartedAt   = $null
                ObjectHash  = $null
                Error       = $_.Exception.Message
            }

        }

    }
    else {

        $records += [PSCustomObject]@{
            Source      = 'Get-JDOperationalHostStatus'
            State       = 'Unavailable'
            Running     = $null
            Initialised = $null
            Health      = $null
            StartedAt   = $null
            ObjectHash  = $null
        }

    }

    return $records
}
