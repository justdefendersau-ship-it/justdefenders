<#
==============================================================================
JustDefenders ©

File
    tooling\engineering\Diagnostics\Private\Get-ServiceRegistration.ps1

Work Package
    PR-006D.1

Purpose
    Enumerate registered engineering services and their current runtime state.

==============================================================================
#>

function Get-ServiceRegistration {

    [CmdletBinding()]
    param()

    $serviceCommands = @(
        'Get-JDOperationalHostServices',
        'Get-JDManagedServices'
    )

    foreach ($commandName in $serviceCommands) {

        $command = Get-Command -Name $commandName -ErrorAction SilentlyContinue

        if (-not $command) {
            continue
        }

        try {

            $services = & $commandName

            foreach ($service in $services) {

                [PSCustomObject]@{
                    Name        = $service.Name
                    DisplayName = $service.DisplayName
                    State       = $service.State
                    Enabled     = $service.Enabled
                    Owner       = $service.Owner
                    Runtime     = $command.Source
                    Source      = $command.ModuleName
                }

            }

        }
        catch {

            [PSCustomObject]@{
                Name        = '<Enumeration Failed>'
                DisplayName = $null
                State       = 'Error'
                Enabled     = $null
                Owner       = $null
                Runtime     = $command.Source
                Source      = $command.ModuleName
                Error       = $_.Exception.Message
            }

        }

    }

}
