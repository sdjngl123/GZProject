@echo off
cls
MODE con: COLS=125 LINES=35
:menu
echo. 
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo ��ѡ��Ҫ���еĲ�����Ȼ�󰴻س�
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo.
echo   1.ע��HoteamsoftUpdateService(%~dp0Hoteam.HoteamsoftUpdateService.exe)
echo.
echo   2.����HoteamsoftUpdateService
echo.
echo   3.ֹͣHoteamsoftUpdateService
echo.
echo   4.ɾ��HoteamsoftUpdateService
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