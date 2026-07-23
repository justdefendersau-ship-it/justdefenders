<#
==============================================================================
JustDefenders ©
==============================================================================
Work Package       : WP-S001-04
Production Revision: PR-007A
Component          : Operational Service Bootstrap Engine
Timestamp          : 22 July 2026, 09:45
File               : C:\dev\justdefenders\frontend\tooling\engineering\Services\Private\Host-ServiceBootstrap.ps1

------------------------------------------------------------------------------
DESCRIPTION
------------------------------------------------------------------------------

The Operational Service Bootstrap Engine is responsible for constructing the
Operational Service Host runtime prior to host startup.

Responsibilities

    • Load BuiltInServices.psd1
    • Validate bootstrap manifest
    • Prevent duplicate registrations
    • Build transactional registration plan
    • Register all built-in Operational Services
    • Validate registry integrity
    • Commit bootstrap transaction
    • Produce bootstrap diagnostics
    • Maintain idempotent execution

This component deliberately DOES NOT start services.

Service startup remains the responsibility of:

    Start-JDOperationalHost

This preserves the separation between

    Bootstrap
        and
    Runtime Execution

required by the JustDefenders Operational Platform Architecture.

------------------------------------------------------------------------------
DESIGN PRINCIPLES
------------------------------------------------------------------------------

• Idempotent
• Transaction Safe
• Manifest Driven
• Registry Agnostic
• No Hard-Coded Services
• Rollback on Failure
• Production Diagnostics
• PowerShell 5.1 Compatible

------------------------------------------------------------------------------
CHANGE HISTORY
------------------------------------------------------------------------------

PR-007A

    Initial implementation.

==============================================================================
#>

Set-StrictMode -Version Latest

$ErrorActionPreference = 'Stop'

# =============================================================================
# SCRIPT RUNTIME
# =============================================================================

$script:JDBootstrapVersion = '1.0.0'

$script:JDBootstrapManifest =
    Join-Path `
        $PSScriptRoot `
        "..\Configuration\BuiltInServices.psd1"

# =============================================================================
# PRIVATE HELPERS
# =============================================================================

function New-JDBootstrapReport
{
    [CmdletBinding()]
    param()

    [PSCustomObject]@{

        BootstrapId =
            [Guid]::NewGuid().ToString()

        BootstrapVersion =
            $script:JDBootstrapVersion

        Timestamp =
            Get-Date

        Status =
            'INITIALISING'

        ManifestLoaded =
            $false

        ManifestValidated =
            $false

        DiscoveryEnabled =
            $false

        RegistryHealthy =
            $false

        TransactionCommitted =
            $false

        RollbackPerformed =
            $false

        ServicesDiscovered =
            0

        ServicesRegistered =
            0

        ServicesSkipped =
            0

        ServicesFailed =
            0

        DurationMilliseconds =
            0

        Messages =
            New-Object System.Collections.Generic.List[string]

        Services =
            New-Object System.Collections.Generic.List[object]
    }
}

# =============================================================================

function Write-JDBootstrapMessage
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [pscustomobject]
        $Report,

        [Parameter(Mandatory)]
        [string]
        $Message
    )

    $Report.Messages.Add($Message)

    Write-Verbose $Message
}

# =============================================================================

function Get-JDBuiltInServiceManifest
{
    [CmdletBinding()]
    param()

    if (-not (Test-Path $script:JDBootstrapManifest))
    {
        throw @"

BuiltInServices.psd1 was not found.

Expected:

$script:JDBootstrapManifest

"@
    }

    Import-PowerShellDataFile `
        -Path $script:JDBootstrapManifest
}

# =============================================================================

function Test-JDBootstrapManifest
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [hashtable]
        $Manifest
    )

    if (-not $Manifest.ContainsKey('Services'))
    {
        throw "Bootstrap manifest does not contain 'Services'."
    }

    if ($Manifest.Services.Count -eq 0)
    {
        throw "Bootstrap manifest contains no service definitions."
    }

    foreach ($service in $Manifest.Services)
    {
        foreach ($property in @(
            'Name'
            'DisplayName'
            'Enabled'
            'AutoStart'
            'HealthPolicy'
        ))
        {
            if (-not $service.ContainsKey($property))
            {
                throw "Service definition missing '$property'."
            }
        }
    }

    return $true
}

# =============================================================================

function New-JDBootstrapTransaction
{
    [CmdletBinding()]
    param()

    [PSCustomObject]@{

        Started =
            Get-Date

        Pending =
    New-Object System.Collections.Generic.List[psobject]

        Registered =
            New-Object System.Collections.Generic.List[object]

        Failed =
            New-Object System.Collections.Generic.List[object]

        Complete =
            $false
    }
}

# =============================================================================

function Add-JDBootstrapTransactionItem
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        $Transaction,

        [Parameter(Mandatory)]
        [pscustomobject]
        $Registration
    )

    Write-Host ""
    Write-Host "===== TRANSACTION DEBUG ====="
    Write-Host "Pending Type      : $($Transaction.Pending.GetType().FullName)"
    Write-Host "Registration Type : $($Registration.GetType().FullName)"
    Write-Host "Add() signatures:"
    $Transaction.Pending.GetType().GetMethods() |
        Where-Object Name -eq 'Add' |
        ForEach-Object { Write-Host "  $($_)" }
    Write-Host "============================="
    Write-Host ""

    $Transaction.Pending.Add($Registration)
}

# =============================================================================
# TRANSACTION EXECUTION
# =============================================================================

function Test-JDBootstrapDuplicateRegistration
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [pscustomobject]
$Registration
    )

    $existing =
        Get-JDHostRegisteredService `
            -Name $Registration.Name `
            -ErrorAction SilentlyContinue

    return ($null -ne $existing)
}

# =============================================================================

function Invoke-JDBootstrapRollback
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        $Transaction,

        [Parameter(Mandatory)]
        [pscustomobject]
        $Report
    )

    Write-JDBootstrapMessage `
        -Report $Report `
        -Message "Rolling back bootstrap transaction."

    foreach ($service in $Transaction.Registered)
    {
        try
        {
            Unregister-JDOperationalService `
                -Name $service.Name `
                -ErrorAction Stop

            Write-JDBootstrapMessage `
                -Report $Report `
                -Message "Rolled back [$($service.Name)]."
        }
        catch
        {
            Write-Warning $_
        }
    }

    $Report.RollbackPerformed = $true
}

# =============================================================================

function Invoke-JDBootstrapTransaction
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        $Transaction,

        [Parameter(Mandatory)]
        [pscustomobject]
        $Report
    )

    foreach ($registration in $Transaction.Pending)
    {
        if (Test-JDBootstrapDuplicateRegistration `
                -Registration $registration)
        {
            Write-JDBootstrapMessage `
                -Report $Report `
                -Message "Skipping duplicate service [$($registration.Name)]."

            $Report.ServicesSkipped++

            continue
        }

        try
        {

Write-Host ""
Write-Host "===== REGISTRATION DEBUG ====="
Write-Host "Type: $($registration.GetType().FullName)"
$registration | Format-List * | Out-Host
Write-Host "=============================="
Write-Host ""

            $service =
                Register-JDOperationalHostService `
                    -Registration $registration `
                    -ErrorAction Stop

            $Transaction.Registered.Add($service)

            $Report.Services.Add($service)

            $Report.ServicesRegistered++

            Write-JDBootstrapMessage `
                -Report $Report `
                -Message "Registered [$($registration.Name)]."
        }
        catch
        {
            $Transaction.Failed.Add($registration)

            $Report.ServicesFailed++

            Write-JDBootstrapMessage `
                -Report $Report `
                -Message $_.Exception.Message

            Invoke-JDBootstrapRollback `
                -Transaction $Transaction `
                -Report $Report

            throw
        }
    }

    $Transaction.Complete = $true
}

# =============================================================================
# REGISTRY VALIDATION
# =============================================================================

function Test-JDBootstrapRegistry
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [pscustomobject]
        $Report
    )

    $services =
        Get-JDHostRegisteredServices

    if ($null -eq $services)
    {
        throw "Host registry returned NULL."
    }

    foreach ($service in $services)
    {
        if ([string]::IsNullOrWhiteSpace($service.Name))
        {
            throw "Registry contains unnamed service."
        }

        if ([string]::IsNullOrWhiteSpace($service.DisplayName))
        {
            throw "Registry contains invalid display name."
        }
    }

    $Report.RegistryHealthy = $true

    return $true
}

# =============================================================================

function Update-JDBootstrapManagedServiceCount
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [pscustomobject]
        $Report
    )

    Update-JDHostManagedServiceCount

    $count =
        (Get-JDHostRegisteredServices).Count

    if ($count -ne $Report.ServicesRegistered)
    {
        throw @"

Bootstrap verification failed.

Expected registrations :

$($Report.ServicesRegistered)

Registry reports :

$count

"@
    }

    return $count
}

# =============================================================================
# MANIFEST REGISTRATION
# =============================================================================

function Add-JDBuiltInServicesToBootstrap
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory)]
        [hashtable]
        $Manifest,

        [Parameter(Mandatory)]
        $Transaction,

        [Parameter(Mandatory)]
        [pscustomobject]
        $Report
    )

    foreach ($service in $Manifest.Services)
{
    #
    # Convert manifest configuration into the runtime registration contract.
    #
    $registration = [PSCustomObject]@{

        Name                  = $service.Name
        Version               = if ($service.ContainsKey('Version')) {
                                    $service.Version
                                }
                                else {
                                    '1.0.0'
                                }

        DisplayName           = $service.DisplayName
        Description           = $service.Description

        Enabled               = $service.Enabled
        AutoStart             = $service.AutoStart

        StartupOrder          = $service.StartupOrder

        RegistrationCommand   = $service.RegistrationCommand
        StartupCommand        = $service.StartupCommand
        StopCommand           = $service.StopCommand
        HealthCommand         = $service.HealthCommand

        RestartPolicy         = $service.RestartPolicy
        RestartDelaySeconds   = $service.RestartDelaySeconds
        MaxRestartCount       = $service.MaxRestartCount

        HealthPolicy          = $service.HealthPolicy
        Dependencies          = $service.Dependencies
    }

    Add-JDBootstrapTransactionItem `
        -Transaction $Transaction `
        -Registration $registration

    $Report.ServicesDiscovered++

    Write-JDBootstrapMessage `
        -Report $Report `
        -Message "Queued [$($registration.Name)]."
}
}

# =============================================================================
# DISCOVERY (DISABLED BY DEFAULT)
# =============================================================================

function Find-JDOperationalServiceModules
{
    [CmdletBinding()]
    param
    (
        [switch]
        $EnableDiscovery
    )

    if (-not $EnableDiscovery)
    {
        return @()
    }

    $publicFolder =
        Join-Path `
            $PSScriptRoot `
            "..\Public"

    Get-ChildItem `
        $publicFolder `
        -Filter "Register-*.ps1" `
        -File
}

# =============================================================================
# BOOTSTRAP EXECUTION ENGINE
# =============================================================================

function Invoke-JDOperationalBootstrap
{
    [CmdletBinding()]
    param
    (
        [switch]
        $EnableDiscovery,

        [switch]
        $Force
    )
    $report = New-JDBootstrapReport

    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()

    try
    {
        Write-JDBootstrapMessage `
            -Report $report `
            -Message "Starting Operational Service Bootstrap."

        #
        # Load Manifest
        #

        $manifest =
            Get-JDBuiltInServiceManifest

        $report.ManifestLoaded = $true

        Write-JDBootstrapMessage `
            -Report $report `
            -Message "Bootstrap manifest loaded."

        #
        # Validate Manifest
        #

        Test-JDBootstrapManifest `
            -Manifest $manifest | Out-Null

        $report.ManifestValidated = $true

        Write-JDBootstrapMessage `
            -Report $report `
            -Message "Bootstrap manifest validated."

        #
        # Discovery
        #

        if ($EnableDiscovery)
        {
            $report.DiscoveryEnabled = $true

            $modules =
                Find-JDOperationalServiceModules `
                    -EnableDiscovery

            Write-JDBootstrapMessage `
                -Report $report `
                -Message ("Discovery located {0} registration module(s)." -f $modules.Count)
        }

        #
        # Build Transaction
        #

        $transaction =
            New-JDBootstrapTransaction

        Add-JDBuiltInServicesToBootstrap `
            -Manifest $manifest `
            -Transaction $transaction `
            -Report $report

        Write-JDBootstrapMessage `
            -Report $report `
            -Message ("Transaction contains {0} registration(s)." -f $transaction.Pending.Count)

        #
        # Execute Transaction
        #

        Invoke-JDBootstrapTransaction `
            -Transaction $transaction `
            -Report $report

        #
        # Registry Validation
        #

        Test-JDBootstrapRegistry `
            -Report $report | Out-Null

        #
        # Synchronise Runtime
        #

        Update-JDBootstrapManagedServiceCount `
            -Report $report | Out-Null

        #
        # Commit
        #

        $report.TransactionCommitted = $true
        $report.Status = 'SUCCESS'

        Write-JDBootstrapMessage `
            -Report $report `
            -Message "Operational Service Bootstrap completed successfully."
    }
    catch
    {
        $report.Status = 'FAILED'

        Write-JDBootstrapMessage `
            -Report $report `
            -Message $_.Exception.Message

        throw
    }
    finally
    {
        $stopwatch.Stop()

        $report.DurationMilliseconds =
            $stopwatch.ElapsedMilliseconds
    }

    return $report
}

# =============================================================================
# PUBLIC BOOTSTRAP ENTRY POINT
# =============================================================================

function Initialize-JDOperationalServiceBootstrap
{
    [CmdletBinding()]
    param
    (
        [switch]
        $EnableDiscovery,

        [switch]
        $Force
    )

    #
    # Idempotent execution
    #

    if (-not $Force)
    {
        try
        {
            $count =
                (Get-JDHostRegisteredServices).Count

            if ($count -gt 0)
            {
                Write-Verbose "Operational Service Bootstrap already completed."

                return Get-JDOperationalBootstrapStatus
            }
        }
        catch
        {
            #
            # Registry unavailable.
            # Continue with bootstrap.
            #
        }
    }

    Invoke-JDOperationalBootstrap `
        -EnableDiscovery:$EnableDiscovery
}

# =============================================================================
# BOOTSTRAP STATUS
# =============================================================================

function Get-JDOperationalBootstrapStatus
{
    [CmdletBinding()]
    param()

    $services =
        Get-JDHostRegisteredServices

    [PSCustomObject]@{

        BootstrapVersion =
            $script:JDBootstrapVersion

        Timestamp =
            Get-Date

        RegistryHealthy =
            ($null -ne $services)

        ManagedServices =
            $services.Count

        Services =
            $services |
                Select-Object `
                    Name,
                    DisplayName,
                    Enabled,
                    AutoStart,
                    Status
    }
}

# =============================================================================
# SELF VALIDATION
# =============================================================================

function Test-JDOperationalBootstrapEngine
{
    [CmdletBinding()]
    param()

    $manifest =
        Get-JDBuiltInServiceManifest

    Test-JDBootstrapManifest `
        -Manifest $manifest | Out-Null

    return [PSCustomObject]@{

        EngineVersion =
            $script:JDBootstrapVersion

        Manifest =
            $script:JDBootstrapManifest

        ManifestPresent =
            (Test-Path $script:JDBootstrapManifest)

        RegistryAvailable =
            ($null -ne (Get-JDHostRegisteredServices))

        Timestamp =
            Get-Date
    }
}

# =============================================================================
# END OF FILE
# =============================================================================

Write-Verbose "Operational Service Bootstrap Engine loaded."