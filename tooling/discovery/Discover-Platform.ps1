# ============================================================================
# JustDefenders©
#
# File:
# C:\dev\justdefenders\frontend\tooling\discovery\Discover-Platform.ps1
#
# Timestamp:
# 30 June 2026 16:15 Sydney
#
# Work Package:
# WP-003C.2 - Discovery Engine Rebuild
#
# Section:
# 1 of 10 - Foundation
#
# Purpose:
# Initialise the JustDefenders Engineering Toolkit Discovery Engine.
#
# Compatibility:
# Windows PowerShell 5.1+
#
# ============================================================================

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# -----------------------------------------------------------------------------
# Platform Information
# -----------------------------------------------------------------------------

$PlatformName    = "JustDefenders Engineering Toolkit"
$PlatformVersion = "1.1.0"
$DiscoveryEngine = "Platform Discovery Engine"

# -----------------------------------------------------------------------------
# Resolve Project Paths
# -----------------------------------------------------------------------------

$ProjectRoot = Split-Path $PSScriptRoot -Parent
$ProjectRoot = Split-Path $ProjectRoot -Parent

$ApiRoot      = Join-Path $ProjectRoot "app\api"
$ToolingRoot  = Join-Path $ProjectRoot "tooling"
$OutputFolder = Join-Path $ToolingRoot "output"

# -----------------------------------------------------------------------------
# Ensure Output Folder Exists
# -----------------------------------------------------------------------------

if (-not (Test-Path $OutputFolder))
{
    New-Item `
        -ItemType Directory `
        -Path $OutputFolder `
        -Force | Out-Null
}

# -----------------------------------------------------------------------------
# Generation Timestamp
# -----------------------------------------------------------------------------

$Generated = Get-Date -Format "dd/MM/yyyy HH:mm:ss"

# -----------------------------------------------------------------------------
# Console Banner
# -----------------------------------------------------------------------------

Clear-Host

Write-Host ""
Write-Host "============================================================"
Write-Host " JustDefenders Engineering Toolkit"
Write-Host " Platform Discovery Engine"
Write-Host "============================================================"
Write-Host ""

Write-Host ("Project           : {0}" -f $ProjectRoot)
Write-Host ("Platform Version  : {0}" -f $PlatformVersion)
Write-Host ("Generated         : {0}" -f $Generated)

Write-Host ""

# -----------------------------------------------------------------------------
# Helper Functions
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

function Test-RequiredFolder
{
    param(
        [Parameter(Mandatory)]
        [string]$Path,

        [Parameter(Mandatory)]
        [string]$Description
    )

    if (-not (Test-Path $Path))
    {
        throw ("{0} not found: {1}" -f $Description, $Path)
    }
}

# -----------------------------------------------------------------------------
# Validate Project Structure
# -----------------------------------------------------------------------------

Test-RequiredFolder `
    -Path $ApiRoot `
    -Description "API folder"

Write-Host "Foundation initialised successfully."
Write-Host ""

# -----------------------------------------------------------------------------
# Capability Classification
# -----------------------------------------------------------------------------

function Get-Capability
{
    param(
        [Parameter(Mandatory)]
        [string]$Route
    )

    switch -Wildcard ($Route)
    {
        "/api/garage/*"               { return "Garage Intelligence" }

        "/api/mobile/*"               { return "Mobile Intelligence" }

        "/api/parts/*"                { return "Parts Intelligence" }

        "/api/member/parts/*"         { return "Parts Intelligence" }

        "/api/search/parts*"          { return "Parts Intelligence" }

        "/api/fitment/*"              { return "Vehicle Intelligence" }

        "/api/vehicle*"               { return "Vehicle Intelligence" }

        "/api/vehicles*"              { return "Vehicle Intelligence" }

        "/api/vin*"                   { return "Vehicle Intelligence" }

        "/api/scanning/*"             { return "Scanning & Identification" }

        "/api/suppliers/*"            { return "Supplier Intelligence" }

        "/api/supplier*"              { return "Supplier Intelligence" }

        "/api/procurement/*"          { return "Procurement Intelligence" }

        "/api/runtime/*"              { return "Platform Runtime" }

        "/api/platform/*"             { return "Platform Runtime" }

        "/api/telemetry/*"            { return "Telemetry Intelligence" }

        "/api/diagnostics/*"          { return "Diagnostics Intelligence" }

        "/api/expedition/*"           { return "Expedition Intelligence" }

        "/api/knowledge/*"            { return "Knowledge Intelligence" }

        "/api/ai/*"                   { return "AI Intelligence" }

        "/api/auth/*"                 { return "Identity & Security" }

        "/api/security/*"             { return "Identity & Security" }

        "/api/audit/*"                { return "Governance & Audit" }

        "/api/governance/*"           { return "Governance & Audit" }

        "/api/dashboard*"             { return "Dashboard Services" }

        "/api/dashboards/*"           { return "Dashboard Services" }

        "/api/analytics*"             { return "Analytics" }

        "/api/digital-twin/*"         { return "Digital Twin" }

        "/api/events*"                { return "Event Bus" }

        "/api/graph/*"                { return "Knowledge Graph" }

        "/api/harvester/*"            { return "Data Acquisition" }

        "/api/workflow/*"             { return "Workflow Engine" }

        "/api/workflows/*"            { return "Workflow Engine" }

        "/api/orchestration/*"        { return "Orchestration" }

        "/api/engine/*"               { return "Intelligence Engine" }

        "/api/realtime*"              { return "Real-Time Services" }

        "/api/observability/*"        { return "Observability" }

        "/api/predictive*"            { return "Predictive Intelligence" }

        "/api/executive*"             { return "Executive Services" }

        "/api/commercial/*"           { return "Commercial Services" }

        "/api/enterprise/*"           { return "Enterprise Services" }

        "/api/detections/*"           { return "Detection Engine" }

        default                       { return "Platform Services" }
    }
}

Write-Host "Capability classification loaded."
Write-Host ""

# -----------------------------------------------------------------------------
# HTTP Method Discovery
# -----------------------------------------------------------------------------

function Test-HttpMethod
{
    param(
        [Parameter(Mandatory)]
        [string]$Content,

        [Parameter(Mandatory)]
        [string]$Method
    )

    #
    # Standard App Router
    #
    if ($Content -match ("export\s+(async\s+)?function\s+{0}\b" -f $Method))
    {
        return $true
    }

    #
    # Handler Re-export
    #
    if ($Content -match ("handler\s+as\s+{0}\b" -f $Method))
    {
        return $true
    }

#
# Named Export
#

$namedExportPattern = "export\s*\{[^}]*\b" +
                      [regex]::Escape($Method) +
                      "\b"

if ($Content -match $namedExportPattern)
{
    return $true
}

    return $false
}

function Get-HttpMethods
{
    param(
        [Parameter(Mandatory)]
        [string]$Content
    )

    $methods = @()

    foreach ($method in @(
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",
        "HEAD"
    ))
    {
        if (Test-HttpMethod `
                -Content $Content `
                -Method $method)
        {
            $methods += $method
        }
    }

    if ($methods.Count -eq 0)
    {
        return "-"
    }

    return ($methods -join ",")
}

Write-Host "HTTP method discovery loaded."
Write-Host ""

# -----------------------------------------------------------------------------
# Route Metadata Discovery
# -----------------------------------------------------------------------------

function Get-RouteMetadata
{
    param(
        [Parameter(Mandatory)]
        [System.IO.FileInfo]$RouteFile
    )

    #
    # Read the entire route file
    #

    $content = [System.IO.File]::ReadAllText(
        $RouteFile.FullName
    )

    #
    # Determine HTTP methods
    #

    $httpMethods = Get-HttpMethods `
        -Content $content

    #
    # Dynamic route?
    #

    $isDynamic = $RouteFile.FullName -match "\["

    #
    # JSON usage
    #

    $producesJson =
        ($content -match "NextResponse\.json") -or
        ($content -match "Response\.json")

    $consumesJson =
        ($content -match "request\.json") -or
        ($content -match "await\s+request\.json")

    #
    # Authentication hints
    #

    $requiresAuth =
        ($content -match "getServerSession") -or
        ($content -match "authOptions") -or
        ($content -match "NextAuth") -or
        ($content -match "@supabase/auth")

    #
    # Handler style
    #

    $handlerStyle = "Standard"

    if ($content -match "NextAuth")
    {
        $handlerStyle = "NextAuth"
    }
    elseif ($content -match "handler\s+as")
    {
        $handlerStyle = "HandlerReExport"
    }
    elseif ($content -match "export\s*\{")
    {
        $handlerStyle = "NamedExport"
    }

    #
    # Return metadata
    #

    return [PSCustomObject]@{

        Methods = $httpMethods

        DynamicRoute = $isDynamic

        ProducesJson = $producesJson

        ConsumesJson = $consumesJson

        RequiresAuthentication = $requiresAuth

        HandlerStyle = $handlerStyle
    }
}

Write-Host "Route metadata discovery loaded."
Write-Host ""

# -----------------------------------------------------------------------------
# Route Discovery Engine
# -----------------------------------------------------------------------------

function Discover-Routes
{
    Write-Section "Discovering API Routes"

    $routeFiles = Get-ChildItem `
        -Path $ApiRoot `
        -Filter "route.ts" `
        -Recurse `
        -File

    $inventory = @()

    foreach ($file in $routeFiles)
    {
        #
        # Build API Route
        #

        $relative = $file.FullName.Replace($ApiRoot, "")

        $route = $relative `
            -replace "\\route\.ts$", "" `
            -replace "\\", "/"

        $route = "/api$route"

        #
        # Capability
        #

        $capability = Get-Capability `
            -Route $route

        #
        # Metadata
        #

        $metadata = Get-RouteMetadata `
            -RouteFile $file

        #
        # Console Output
        #

        Write-Host (
            "[{0,-28}] [{1,-12}] {2}" -f
            $capability,
            $metadata.Methods,
            $route
        )

        #
        # Inventory Record
        #

        $inventory += [PSCustomObject]@{

            Capability = $capability

            Route = $route

            Methods = $metadata.Methods

            DynamicRoute = $metadata.DynamicRoute

            ProducesJson = $metadata.ProducesJson

            ConsumesJson = $metadata.ConsumesJson

            RequiresAuthentication = $metadata.RequiresAuthentication

            HandlerStyle = $metadata.HandlerStyle

            File = $file.FullName
        }
    }

    Write-Host ""
    Write-Host ("Routes discovered : {0}" -f $inventory.Count)
    Write-Host ""

    return $inventory
}

Write-Host "Route discovery engine loaded."
Write-Host ""



# -----------------------------------------------------------------------------
# Capability Summary
# -----------------------------------------------------------------------------

function Build-CapabilitySummary
{
    param(
        [Parameter(Mandatory)]
        [array]$Inventory
    )

    Write-Section "Building Capability Summary"

    $summary = $Inventory |
        Group-Object Capability |
        Sort-Object Count -Descending |
        ForEach-Object {

            [PSCustomObject]@{

                Capability = $_.Name

                RouteCount = $_.Count

            }

        }

    Write-Host ("Capability Groups : {0}" -f $summary.Count)
    Write-Host ""

    return $summary
}

Write-Host "Capability summary engine loaded."
Write-Host ""

# -----------------------------------------------------------------------------
# JSON Export
# -----------------------------------------------------------------------------

function Export-InventoryJson
{
    param(
        [Parameter(Mandatory)]
        [array]$Inventory
    )

    Write-Section "Exporting Platform Inventory (JSON)"

    $jsonFile = Join-Path `
        $OutputFolder `
        "platform-inventory.json"

    $Inventory |
        Sort-Object Route |
        ConvertTo-Json `
            -Depth 10 |
        Set-Content `
            -Path $jsonFile `
            -Encoding UTF8

    Write-Host ("Inventory File : {0}" -f $jsonFile)
    Write-Host ("Routes Exported: {0}" -f $Inventory.Count)
    Write-Host ""

    return $jsonFile
}

Write-Host "JSON export engine loaded."
Write-Host ""

# -----------------------------------------------------------------------------
# CSV Export
# -----------------------------------------------------------------------------

function Export-CapabilityCsv
{
    param(
        [Parameter(Mandatory)]
        [array]$Summary
    )

    Write-Section "Exporting Capability Summary (CSV)"

    $csvFile = Join-Path `
        $OutputFolder `
        "platform-summary.csv"

    $Summary |
        Sort-Object `
            RouteCount `
            -Descending |
        Export-Csv `
            -Path $csvFile `
            -NoTypeInformation `
            -Encoding UTF8

    Write-Host ("Summary File   : {0}" -f $csvFile)
    Write-Host ("Capabilities   : {0}" -f $Summary.Count)
    Write-Host ""

    return $csvFile
}

Write-Host "CSV export engine loaded."
Write-Host ""

# -----------------------------------------------------------------------------
# Markdown Report
# -----------------------------------------------------------------------------

function Export-MarkdownReport
{
    param(
        [Parameter(Mandatory)]
        [array]$Summary,

        [Parameter(Mandatory)]
        [array]$Inventory
    )

    Write-Section "Exporting Engineering Report (Markdown)"

    $reportFile = Join-Path `
        $OutputFolder `
        "platform-report.md"

    $generated = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

    $markdown = @()

    $markdown += "# JustDefenders Platform Discovery Report"
    $markdown += ""

    $markdown += "**Platform Version:** $PlatformVersion"
    $markdown += "**Generated:** $generated"
    $markdown += "**Total Routes:** $($Inventory.Count)"
    $markdown += "**Capability Groups:** $($Summary.Count)"
    $markdown += ""

    $markdown += "## Capability Summary"
    $markdown += ""

    $markdown += "| Capability | Routes |"
    $markdown += "|------------|------:|"

    foreach ($item in ($Summary | Sort-Object RouteCount -Descending))
    {
        $markdown += "| $($item.Capability) | $($item.RouteCount) |"
    }

    $markdown += ""
    $markdown += "## Output Files"
    $markdown += ""
    $markdown += "- platform-inventory.json"
    $markdown += "- platform-summary.csv"
    $markdown += "- platform-report.md"

    $markdown | Set-Content `
        -Path $reportFile `
        -Encoding UTF8

    Write-Host ("Report File    : {0}" -f $reportFile)
    Write-Host ""

    return $reportFile
}

Write-Host "Markdown report engine loaded."
Write-Host ""



# -----------------------------------------------------------------------------
# Main Application
# -----------------------------------------------------------------------------

function Main
{
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()

    try
    {
        Write-Section "Starting Platform Discovery"

        #
        # Discovery
        #

        $inventory = Discover-Routes

        #
        # Summary
        #

        $summary = Build-CapabilitySummary `
            -Inventory $inventory

        #
        # Exports
        #

        $jsonFile = Export-InventoryJson `
            -Inventory $inventory

        $csvFile = Export-CapabilityCsv `
            -Summary $summary

        $reportFile = Export-MarkdownReport `
            -Summary $summary `
            -Inventory $inventory

        #
        # Finish
        #

        $stopwatch.Stop()

        Write-Host ""
        Write-Host "============================================================"
        Write-Host " Discovery Complete"
        Write-Host "============================================================"
        Write-Host ""

        Write-Host ("Routes Discovered : {0}" -f $inventory.Count)
        Write-Host ("Capabilities      : {0}" -f $summary.Count)

        Write-Host ""

        Write-Host ("Inventory JSON    : {0}" -f $jsonFile)
        Write-Host ("Summary CSV       : {0}" -f $csvFile)
        Write-Host ("Markdown Report   : {0}" -f $reportFile)

        Write-Host ""

        Write-Host ("Execution Time    : {0:N2} seconds" -f $stopwatch.Elapsed.TotalSeconds)

        Write-Host ""
        Write-Host "JustDefenders Discovery Engine completed successfully."
        Write-Host ""

        return 0
    }
    catch
    {
        $stopwatch.Stop()

        Write-Host ""
        Write-Host "============================================================"
        Write-Host " DISCOVERY FAILED"
        Write-Host "============================================================"
        Write-Host ""

        Write-Host $_.Exception.Message
        Write-Host ""

        return 1
    }
}

# -----------------------------------------------------------------------------
# Application Entry Point
# -----------------------------------------------------------------------------

exit (Main)