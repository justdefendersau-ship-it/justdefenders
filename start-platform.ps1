# =====================================================
# JustDefenders ©
# File:
# C:\dev\justdefenders\frontend\start-platform.ps1
# =====================================================

Write-Host ""
Write-Host "===================================================="
Write-Host "JUSTDEFENDERS PLATFORM STARTUP"
Write-Host "===================================================="
Write-Host ""

Set-Location "C:\dev\justdefenders\frontend"

pm2 start ecosystem.config.js

pm2 start `
server/runtime-watchdog.js `
--name justdefenders-watchdog

pm2 save

Write-Host ""
Write-Host "===================================================="
Write-Host "PLATFORM ONLINE"
Write-Host "===================================================="
Write-Host ""

pm2 status
