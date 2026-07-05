# ============================================================================
# JustDefenders©
#
# File:
# C:\dev\justdefenders\frontend\tooling\engineering\Engineering-Dashboard.ps1
#
# Timestamp:
# 30 June 2026 17:35 Sydney
#
# Work Package:
# WP-003D
#
# Section:
# 1 of 8
#
# Purpose:
# Engineering Dashboard
#
# ============================================================================

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# -----------------------------------------------------------------------------
# Platform Information
# -----------------------------------------------------------------------------

$PlatformName = "JustDefenders Engineering Dashboard"
$PlatformVersion = "1.0.0"

# -----------------------------------------------------------------------------
# Resolve Project Paths
# -----------------------------------------------------------------------------

$ProjectRoot = Split-Path $PSScriptRoot -Parent
$ProjectRoot = Split-Path $ProjectRoot -Parent

$OutputFolder = Join-Path `
    $ProjectRoot `
    "tooling\output"

$InventoryFile = Join-Path `
    $OutputFolder `
    "platform-inventory.json"

# -----------------------------------------------------------------------------
# Console Banner
# -----------------------------------------------------------------------------

function Show-Banner
{
    Clear-Host

    Write-Host ""
    Write-Host "============================================================"
    Write-Host " JustDefenders Engineering Dashboard"
    Write-Host "============================================================"
    Write-Host ""

    Write-Host ("Project           : {0}" -f $ProjectRoot)
    Write-Host ("Platform Version  : {0}" -f $PlatformVersion)
    Write-Host ("Generated         : {0}" -f (Get-Date))
    Write-Host ""
}

# -----------------------------------------------------------------------------
# Console Helper
# -----------------------------------------------------------------------------

function Write-Section
{
    param(
        [Parameter(Mandatory)]
        [string]$Title
    )

    Write-Host ""
    Write-Host "------------------------------------------------------------"
    Write-Host (" {0}" -f $Title)
    Write-Host "------------------------------------------------------------"
    Write-Host ""
}

# -----------------------------------------------------------------------------
# Read Inventory
# -----------------------------------------------------------------------------

function Read-Inventory
{
    Write-Section "Loading Discovery Inventory"

    if (-not (Test-Path $InventoryFile))
    {
        throw "Discovery inventory not found."
    }

    $json = [System.IO.File]::ReadAllText($InventoryFile)

    $inventory = $json | ConvertFrom-Json

    Write-Host ("Routes Loaded : {0}" -f $inventory.Count)
    Write-Host ""

    return $inventory
}


# -----------------------------------------------------------------------------
# Statistics Engine
# -----------------------------------------------------------------------------

function Build-PlatformStatistics
{
    param(
    [Parameter(Mandatory)]
    $Inventory
)

    Write-Section "Building Platform Statistics"

    $statistics = [PSCustomObject]@{

        TotalRoutes =
            $Inventory.Count

        CapabilityGroups =
            ($Inventory |
                Group-Object Capability).Count

        DynamicRoutes =
            ($Inventory |
                Where-Object {
                    $_.DynamicRoute -eq $true
                }).Count

        AuthenticatedRoutes =
            ($Inventory |
                Where-Object {
                    $_.RequiresAuthentication -eq $true
                }).Count

        JsonProducers =
            ($Inventory |
                Where-Object {
                    $_.ProducesJson -eq $true
                }).Count

        JsonConsumers =
            ($Inventory |
                Where-Object {
                    $_.ConsumesJson -eq $true
                }).Count
    }

    Write-Host ("Routes            : {0}" -f $statistics.TotalRoutes)
    Write-Host ("Capabilities      : {0}" -f $statistics.CapabilityGroups)
    Write-Host ("Dynamic Routes    : {0}" -f $statistics.DynamicRoutes)
    Write-Host ("Authenticated     : {0}" -f $statistics.AuthenticatedRoutes)
    Write-Host ("JSON Producers    : {0}" -f $statistics.JsonProducers)
    Write-Host ("JSON Consumers    : {0}" -f $statistics.JsonConsumers)

    Write-Host ""

    return $statistics
}

Write-Host "Statistics engine loaded."
Write-Host ""


# -----------------------------------------------------------------------------
# Temporary Entry Point
# -----------------------------------------------------------------------------

try
{
    Show-Banner

    $Inventory = Read-Inventory

    $Statistics = Build-PlatformStatistics `
        -Inventory $Inventory

    Write-Host ""
    Write-Host "Foundation initialised successfully."
}
catch
{
    Write-Host ""
    Write-Host "============================================================"
    Write-Host " DASHBOARD FAILED"
    Write-Host "============================================================"
    Write-Host ""

    Write-Host $_.Exception.ToString()

    exit 1
}