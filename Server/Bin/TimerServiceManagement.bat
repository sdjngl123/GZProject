@echo off
cls
MODE con: COLS=125 LINES=35
:menu
echo. 
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo ��ѡ��Ҫ���еĲ�����Ȼ�󰴻س�
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo.
echo   1.ע��InforCenterTimerService(%~dp0Hoteam.InforCenter.Service.TimerConsole.exe)
echo.
echo   2.����InforCenterTimerService
echo.
echo   3.ֹͣInforCenterTimerService
echo.
echo   4.ɾ��InforCenterTimerService
echo.
echo   9.�˳�
echo.
:cho
set /p choice=��ѡ��:
if  "%choice%"=="1" goto s1
if  "%choice%"=="2" goto s2
if  "%choice%"=="3" goto s3
if  "%choice%"=="4" goto s4
if  "%choice%"=="9" goto end
echo ѡ����Ч������������
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