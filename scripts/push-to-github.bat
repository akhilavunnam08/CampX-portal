@echo off
echo ===================================================
echo     CampusX Salesforce Portal - Push to GitHub
echo ===================================================
echo.
set /p REPO_URL="Enter your GitHub repository URL (e.g. https://github.com/YourUsername/campusx-salesforce-portal.git): "

if "%REPO_URL%"=="" (
    echo Error: Repository URL cannot be empty!
    pause
    exit /b 1
)

echo.
echo Initializing Git repository...
git init
git add .
git commit -m "Initial commit: CampusX Salesforce Student Portal with Custom Objects, Flows, LWC, and Mock Data"
git branch -M main
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo.
echo Pushing to GitHub main branch...
git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ===================================================
    echo  SUCCESS! Your CampusX project is now on GitHub!
    echo ===================================================
) else (
    echo.
    echo Pushing failed. Please check your GitHub permissions or credentials.
)
pause
