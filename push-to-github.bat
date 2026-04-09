@echo off
REM This script helps push to GitHub with authentication
REM Usage: push-to-github.bat YOUR-TOKEN-HERE

if "%1"=="" (
    echo.
    echo ===================================
    echo GitHub Push Helper Script
    echo ===================================
    echo.
    echo Usage: push-to-github.bat YOUR-TOKEN-HERE
    echo.
    echo Steps:
    echo 1. Go to: https://github.com/settings/tokens/new
    echo 2. Create token with 'repo' scope
    echo 3. Copy the token
    echo 4. Run: push-to-github.bat YOUR-TOKEN-HERE
    echo.
    echo Example:
    echo   push-to-github.bat ghp_1234567890abcdefghij
    echo.
    pause
    exit /b 1
)

cd /d "%~dp0"
git push https://Aamioluwa13:%1@github.com/Aamioluwa13/funmiano-couture-app.git main

echo.
echo ===================================
echo Push complete!
echo ===================================
echo.
echo Verify at: https://github.com/Aamioluwa13/funmiano-couture-app
echo.
pause
