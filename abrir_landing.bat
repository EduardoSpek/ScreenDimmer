@echo off
echo Iniciando servidor do ScreenDimmer...
cd /d "C:\Users\spekv\Desktop\Nanobot\landing-page"
start "" http://localhost:8000
python -m http.server 8000
pause
