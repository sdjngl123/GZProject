@echo off
cls
MODE con: COLS=125 LINES=35
:menu
echo. 
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo 请选择要进行的操作，然后按回车
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo.
echo   1.注册HoteamsoftUpdateService(%~dp0Hoteam.HoteamsoftUpdateService.exe)
echo.
echo   2.启动HoteamsoftUpdateService
echo.
echo   3.停止HoteamsoftUpdateService
echo.
echo   4.删除HoteamsoftUpdateService
echo.
echo   9.退出
echo.
:cho
set /p choice=请选择:
if  "%choice%"=="1" goto s1
if  "%choice%"=="2" goto s2
if  "%choice%"=="3" goto s3
if  "%choice%"=="4" goto s4
if  "%choice%"=="9" goto end
echo 选择无效，请重新输入
echo.
goto cho
@echo off

:s1
cls
sc create HoteamsoftUpdateService binPath= "%~dp0HoteamsoftUpdateService.exe" start= auto
sc failure HoteamsoftUpdateService reset= 86400 actions= restart/60000/restart/60000/restart/60000
goto menu
:s2
cls
net start HoteamsoftUpdateService
goto menu
:s3
cls
net stop HoteamsoftUpdateService
goto menu
:s4
cls
sc delete HoteamsoftUpdateService
goto menu

:end
exit