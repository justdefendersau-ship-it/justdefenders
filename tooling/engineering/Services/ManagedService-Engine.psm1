#
# =====================================================
# JustDefenders ©
# File: C:\dev\justdefenders\frontend\tooling\engineering\Services\ManagedService-Engine.psm1
# Work Package: PR-005A.1 – Managed Service Engine Bootstrap
# Timestamp: 19 July 2026, 17:00
# =====================================================

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# ----------------------------------------------------------------------
# Phase 0 - Module Initialisation
# ----------------------------------------------------------------------
$script:ManagedServiceEngineMetadata = $null

# ----------------------------------------------------------------------
# Phase 1 - Resolve Paths
# ----------------------------------------------------------------------
$ModuleRoot  = Split-Path -Parent $PSCommandPath
$PrivatePath = Join-Path $ModuleRoot 'Private'
$PublicPath  = Join-Path $ModuleRoot 'Public'

# ----------------------------------------------------------------------
# Phase 2 - Import Dependencies
# ----------------------------------------------------------------------
foreach($dependency in @(
    (Join-Path $ModuleRoot 'Engineering-Common.psm1'),
    (Join-Path $ModuleRoot 'Operational-ServiceHost.psm1')
)){
    if(Test-Path $dependency){
        Import-Module $dependency -Force -ErrorAction Stop
    }
}

# ----------------------------------------------------------------------
# Phase 3 - Runtime Manifest
# ----------------------------------------------------------------------
$PrivateModules = @(
    'ManagedService-Bootstrap.ps1',
    'ManagedService-Diagnostics.ps1'
)

$PublicModules = @(
    'Initialize-JDManagedServiceEngine.ps1',
    'Get-JDManagedServiceEngineMetadata.ps1'
)

# ----------------------------------------------------------------------
# Phase 4 - Load Private Modules
# ----------------------------------------------------------------------
foreach($module in $PrivateModules){
    $path = Join-Path $PrivatePath $module
    if(Test-Path $path){ . $path }
    else{ throw "Missing private module: $module" }
}

# ----------------------------------------------------------------------
# Phase 5 - Load Public Modules
# ----------------------------------------------------------------------
foreach($module in $PublicModules){
    $path = Join-Path $PublicPath $module
    if(Test-Path $path){ . $path }
    else{ throw "Missing public module: $module" }
}

# ----------------------------------------------------------------------
# Phase 6 - Runtime Validation
# ----------------------------------------------------------------------
$Required = @(
    'Initialize-JDManagedServiceEngine',
    'Get-JDManagedServiceEngineMetadata'
)

foreach($fn in $Required){
    if(-not (Get-Command $fn -ErrorAction SilentlyContinue)){
        throw "Required function not loaded: $fn"
    }
}

# ----------------------------------------------------------------------
# Phase 7 - Metadata
# ----------------------------------------------------------------------
$script:ManagedServiceEngineMetadata = [pscustomobject]@{
    Name           = 'JustDefenders Managed Service Engine'
    Version        = '1.0.0'
    Build          = 'PR-005A.1'
    Loaded         = Get-Date
    Status         = 'Loaded'
    PrivateModules = $PrivateModules.Count
    PublicModules  = $PublicModules.Count
    Dependencies   = @(
        'Engineering-Common',
        'Operational-ServiceHost'
    )
}

# ----------------------------------------------------------------------
# Phase 8 - Export Public API
# ----------------------------------------------------------------------
Export-ModuleMember -Function @(
    'Initialize-JDManagedServiceEngine',
    'Get-JDManagedServiceEngineMetadata'
)
