<#
==============================================================================
JustDefenders ©

File
    tooling\engineering\Diagnostics\Private\Get-CommandOwnership.ps1

Purpose
    Resolve ownership of engineering runtime commands.

Timestamp
    21 July 2026

==============================================================================
#>

function Get-CommandOwnership {

    [CmdletBinding()]
    param(
        [string[]]$Command = @(
            'Initialize-JDPlatform',
            'Start-JDPlatform',
            'Stop-JDPlatform',
            'Restart-JDPlatform',
            'Get-JDPlatformStatus',
            'Start-JDOperationalHost',
            'Stop-JDOperationalHost',
            'Get-JDOperationalHostStatus',
            'Get-JDOperationalHostServices',
            'Register-JDOperationalHostService',
            'Start-JDHarvester',
            'Stop-JDHarvester',
            'Get-JDHarvesterStatus'
        )
    )

    $engineeringModules = @(
        'Platform-Runtime',
        'Operational-ServiceHost',
        'ManagedService-Engine',
        'Harvester-Runtime',
        'Engineering-Common'
    )

    foreach ($name in $Command) {

        $matches = @(Get-Command -Name $name -ErrorAction SilentlyContinue |
            Where-Object {
                ($_.ModuleName -and $_.ModuleName -in $engineeringModules) -or
                ($_.Source -and $_.Source -in $engineeringModules)
            })

        if ($matches.Count -eq 0) {
            [PSCustomObject]@{
                Command      = $name
                Status       = 'Missing'
                ModuleName   = $null
                ParentModule = $null
                Source       = $null
                CommandType  = $null
                Visibility   = $null
                MatchCount   = 0
            }
            continue
        }

        foreach ($cmd in $matches) {

            $visibility = $null
            if ($cmd.PSObject.Properties['Visibility']) {
                $visibility = $cmd.Visibility
            }

            [PSCustomObject]@{
                Command      = $cmd.Name
                Status       = if ($matches.Count -gt 1) { 'Duplicate' } else { 'Present' }
                ModuleName   = $cmd.ModuleName
                ParentModule = if ($cmd.ModuleName) { $cmd.ModuleName } else { $cmd.Source }
                Source       = $cmd.Source
                CommandType  = $cmd.CommandType
                Visibility   = $visibility
                MatchCount   = $matches.Count
            }
        }
    }
}
