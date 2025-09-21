@echo off
echo Starting Smart Water Management System...
echo.

echo Killing any existing processes...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000') do taskkill /f /pid %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do taskkill /f /pid %%a 2>nul

echo.
echo Starting Backend Server...
cd backend
start "Backend Server" cmd /k "node server.js"

echo.
echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo.
echo Starting Frontend Server...
cd ..\frontend
start "Frontend Server" cmd /k "npm start"

echo.
echo System started successfully!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause