@echo off
cls
MODE con: COLS=125 LINES=35
:menu
echo. 
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo 请选择要进行的操作，然后按回车
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo.
echo   1.注册InforCenterTimerService(%~dp0Hoteam.InforCenter.Service.TimerConsole.exe)
echo.
echo   2.启动InforCenterTimerService
echo.
echo   3.停止InforCenterTimerService
echo.
echo   4.删除InforCenterTimerService
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
sc create InforCenterTimerService binPath= %~dp0Hoteam.InforCenter.Service.TimerConsole.exe start= auto
sc failure InforCenterTimerService reset= 86400 actions= restart/60000/restart/60000/restart/60000
goto menu
:s2
cls
net start InforCenterTimerService
goto menu
:s3
cls
net stop InforCenterTimerService
goto menu
:s4
cls
sc delete InforCenterTimerService
goto menu

:end
exit