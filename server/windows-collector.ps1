# =====================================================
# JustDefenders ©
# Windows Event Collector
# =====================================================

try {

    $events =
    Get-WinEvent `
    -LogName System `
    -MaxEvents 5 |
    Select-Object `
        Id,
        LevelDisplayName,
        TimeCreated,
        ProviderName

    @($events) |
    ConvertTo-Json `
    -Compress `
    -Depth 3
}
catch {

    "[]"
}