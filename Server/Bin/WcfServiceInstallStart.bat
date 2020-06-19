reg add "HKEY_CURRENT_USER\Software\Microsot\Windows NT\CurrentVersion\AppCompatFlags\Layers" /v "c:\windows\system32\cmd.exe" /d "RUNASADMIN" /f

sc create InforCenterService binPath= "%~dp0Hoteam.InforCenter.Service.Console.exe" start= auto

net start InforCenterService 