@echo off
echo ARRANCANDO XAMPP...
cd \xampp\
xampp_start.exe
TIMEOUT 10
ECHO ARRANCANDO APP...
start chrome "localhost"

ECHO ARRANCANDO BACKEND..!
cd \mlx-app\backend
node index.js
