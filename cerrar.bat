@echo off
echo BACKUPEANDO BASES...
\XAMPP\MYSQL\BIN\mysqldump --user=root --password="" mlx > \XAMPP\mlx.sql

echo CERRANDO XAMPP...
\XAMPP\xampp_stop

echo YA POD�S APAGAR LA COMPU!!!
PAUSE 1