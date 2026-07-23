<#
==============================================================================
JustDefenders ©

File
    tooling\engineering\Diagnostics\Private\Get-DuplicateAnalysis.ps1

Work Package
    PR-006D.1

Purpose
    Analyse loaded modules, exported commands and service registrations for
    duplicate ownership that may lead to runtime ambiguity.

==============================================================================
#>

function Get-DuplicateAnalysis {

    [CmdletBinding()]
    param()

    $results = @()

    # Duplicate modules
    Get-Module |
        Group-Object Name |
        Where-Object Count -gt 1 |
        ForEach-Object {

            $results += [PSCustomObject]@{
                Category = 'Module'
                Name     = $_.Name
                Count    = $_.Count
                Status   = 'Duplicate'
                Details  = ($_.Group.Path -join '; ')
            }

        }

    # Duplicate commands
    Get-Command |
        Group-Object Name |
        Where-Object Count -gt 1 |
        ForEach-Object {

            $results += [PSCustomObject]@{
                Category = 'Command'
                Name     = $_.Name
                Count    = $_.Count
                Status   = 'Duplicate'
                Details  = ($_.Group.Source | Sort-Object -Unique) -join '; '
            }

        }

    # Duplicate registered services (if available)
    if (Get-Command Get-ServiceRegistration -ErrorAction SilentlyContinue) {

        Get-ServiceRegistration |
            Group-Object Name |
            Where-Object Count -gt 1 |
            ForEach-Object {

                $results += [PSCustomObject]@{
                    Category = 'Service'
                    Name     = $_.Name
                    Count    = $_.Count
                    Status   = 'Duplicate'
                    Details  = ($_.Group.Owner | Sort-Object -Unique) -join '; '
                }

            }

    }

    if ($results.Count -eq 0) {

        $results += [PSCustomObject]@{
            Category = 'Runtime'
            Name     = '<None>'
            Count    = 0
            Status   = 'PASS'
            Details  = 'No duplicate modules, commands or services detected.'
        }

    }

    return $results

}
