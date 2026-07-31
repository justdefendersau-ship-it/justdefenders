<#
==============================================================================
JustDefenders® Engineering Framework

File
C:\dev\justdefenders\frontend\
tooling\
engineering\
Services\
Private\
ManagedService\
Contract\
ManagedService-Contract.psm1

Timestamp
30 July 2026

Work Package
WP-PR-011

Component
Managed Service Contract Engine

Purpose
Implements the immutable Managed Service Contract model used throughout the
JustDefenders Engineering Framework.

Responsibilities

    • Create Managed Service Contracts.
    • Validate Contract identity.
    • Define immutable Contract structure.
    • Provide Contract object construction.
    • Publish Contract retrieval APIs.

Notes

    A Contract represents engineering intent.

    It contains no runtime state.

    It contains no execution history.

    Runtime information is maintained separately by the Runtime module.

==============================================================================
#>

Set-StrictMode -Version Latest

#==============================================================================
# PRIVATE CONSTANTS
#==============================================================================

$script:ManagedServiceContractVersion = [version]'1.0.0'

#==============================================================================
# PRIVATE FUNCTIONS
#==============================================================================

function New-ContractIdentity
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [string]
        $Name,

        [Parameter(Mandatory)]
        [version]
        $Version
    )

    return [PSCustomObject]@{

        PSTypeName = 'JD.ManagedService.Identity'

        Id         = [guid]::NewGuid()

        Name       = $Name

        Version    = $Version

        CreatedUtc = [datetime]::UtcNow
    }
}

#------------------------------------------------------------------------------

function New-ContractMetadata
{
    [CmdletBinding()]
    param
    (
        [string]
        $Author,

        [string]
        $Description
    )

    return [PSCustomObject]@{

        PSTypeName = 'JD.ManagedService.Metadata'

        Author     = $Author

        Description= $Description

        CreatedUtc = [datetime]::UtcNow

        ModifiedUtc= $null
    }
}

#------------------------------------------------------------------------------

function New-ContractCommandSet
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        PSTypeName = 'JD.ManagedService.Commands'

        Start      = $null

        Stop       = $null

        Restart    = $null

        Health     = $null

        Status     = $null

        Validate   = $null
    }
}

#------------------------------------------------------------------------------

function New-ContractCapabilities
{
    [CmdletBinding()]
    param()

    return [PSCustomObject]@{

        PSTypeName = 'JD.ManagedService.Capabilities'

        SupportsStart        = $false

        SupportsStop         = $false

        SupportsRestart      = $false

        SupportsHealthCheck  = $false

        SupportsRecovery     = $false
    }
}

#==============================================================================
# PUBLIC FUNCTIONS
#==============================================================================

function New-JDManagedServiceContract
{
    <#
    .SYNOPSIS

    Creates a new immutable Managed Service Contract.

    .DESCRIPTION

    Constructs the engineering definition for a managed service.

    The returned object contains only design-time information.

    Runtime state is maintained separately by the Runtime module.
    #>

    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Name,

        [Parameter()]
        [version]
        $Version = '1.0.0',

        [string]
        $Author,

        [string]
        $Description
    )

    $identity = New-ContractIdentity `
        -Name $Name `
        -Version $Version

    $metadata = New-ContractMetadata `
        -Author $Author `
        -Description $Description

    $commands = New-ContractCommandSet

    $capabilities = New-ContractCapabilities
    #
    # Construct immutable contract
    #

    $contract = [PSCustomObject]@{

        PSTypeName = 'JD.ManagedService.Contract'

        Identity   = $identity

        Metadata   = $metadata

        Commands   = $commands

        Capabilities = $capabilities

        Dependencies = @()

        Configuration = [ordered]@{}

        Tags = @()

        Enabled = $true

        ContractVersion = $script:ManagedServiceContractVersion
    }

    return $contract
}

#------------------------------------------------------------------------------
# PUBLIC FUNCTIONS
#------------------------------------------------------------------------------

function Get-JDManagedServiceContract
{
    <#
    .SYNOPSIS
        Returns a managed service contract.

    .DESCRIPTION
        Returns the supplied contract after validating its type.
    #>

    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory, ValueFromPipeline)]
        [ValidateNotNull()]
        [object]
        $Contract
    )

    process
    {
        if ($Contract.PSTypeNames -notcontains 'JD.ManagedService.Contract')
        {
            throw "Object is not a JD.ManagedService.Contract."
        }

        return $Contract
    }
}

#------------------------------------------------------------------------------

function Test-JDManagedServiceContract
{
    <#
    .SYNOPSIS
        Validates a managed service contract.

    .DESCRIPTION
        Performs structural validation only. Runtime validation is the
        responsibility of the Runtime and Validation modules.
    #>

    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [object]
        $Contract
    )

    $errors = [System.Collections.Generic.List[string]]::new()

    if ($Contract.PSTypeNames -notcontains 'JD.ManagedService.Contract')
    {
        $errors.Add('Invalid contract type.')
    }

    if (-not $Contract.Identity)
    {
        $errors.Add('Identity section is missing.')
    }

    if (-not $Contract.Metadata)
    {
        $errors.Add('Metadata section is missing.')
    }

    if (-not $Contract.Commands)
    {
        $errors.Add('Command set is missing.')
    }

    if (-not $Contract.Capabilities)
    {
        $errors.Add('Capabilities section is missing.')
    }

    if ([string]::IsNullOrWhiteSpace($Contract.Identity.Name))
    {
        $errors.Add('Service name is required.')
    }

    return [PSCustomObject]@{

        PSTypeName = 'JD.ManagedService.Contract.Validation'

        IsValid = ($errors.Count -eq 0)

        ErrorCount = $errors.Count

        Errors = $errors.ToArray()
    }
}

#------------------------------------------------------------------------------
# MODULE INITIALISATION
#------------------------------------------------------------------------------

Write-Host "" -ForegroundColor DarkGray
Write-Host "============================================================" -ForegroundColor DarkGray
Write-Host " Managed Service Contract Engine Loaded" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor DarkGray
Write-Host "" -ForegroundColor DarkGray

#------------------------------------------------------------------------------
# EXPORT PUBLIC API
#------------------------------------------------------------------------------

Export-ModuleMember `
    -Function @(
        'New-JDManagedServiceContract',
        'Get-JDManagedServiceContract',
        'Test-JDManagedServiceContract'
    )

#==============================================================================
# END OF FILE
#==============================================================================