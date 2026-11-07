@echo off
echo ===================================================
echo     CampusX Salesforce DX Deployment Script
echo ===================================================
echo.
set /p ORG_ALIAS="Enter your Salesforce Org Alias (or press Enter for 'campusx-org'): "
if "%ORG_ALIAS%"=="" set ORG_ALIAS=campusx-org

echo.
echo [1/4] Checking authentication for %ORG_ALIAS%...
cmd /c sf org display -o %ORG_ALIAS% >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Org not logged in. Opening browser to authenticate...
    cmd /c sf org login web -a %ORG_ALIAS%
)

echo.
echo [2/4] Deploying CampusX metadata (Objects, Fields, Tabs, Apps, Flows, LWC)...
cmd /c sf project deploy start -o %ORG_ALIAS%
if %ERRORLEVEL% neq 0 (
    echo Deployment failed! Review the errors above.
    pause
    exit /b 1
)

echo.
echo [3/4] Assigning CampusX_Admin permission set...
cmd /c sf org assign permset -n CampusX_Admin -o %ORG_ALIAS%

echo.
echo [4/4] Importing sample mock student records...
cmd /c sf data import tree -p data/sample-data-tree.json -o %ORG_ALIAS%

echo.
echo ===================================================
echo  DEPLOYMENT COMPLETE! Opening your Salesforce Org...
echo ===================================================
cmd /c sf org open -p /lightning/app/c__CampusX_Student_Portal -o %ORG_ALIAS%
pause
