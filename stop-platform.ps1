# =====================================================
# JustDefenders ©
# File:
# C:\dev\justdefenders\frontend\stop-platform.ps1
=====================================================

Write-Host ""
Write-Host "===================================================="
Write-Host "JUSTDEFENDERS PLATFORM SHUTDOWN"
Write-Host "===================================================="
Write-Host ""

pm2 stop all

pm2 delete all

Write-Host ""
Write-Host "===================================================="
Write-Host "PLATFORM OFFLINE"
Write-Host "===================================================="