@echo off
echo This batch file registers the .Net assemblies used by MPXJ so that they can be called from COM
pause
regasm IKVM.AWT.WinForms.dll
regasm IKVM.OpenJDK.Beans.dll
regasm IKVM.OpenJDK.Charsets.dll
regasm IKVM.OpenJDK.Cldrdata.dll
regasm IKVM.OpenJDK.Corba.dll
regasm IKVM.OpenJDK.Core.dll
regasm IKVM.OpenJDK.Jdbc.dll
regasm IKVM.OpenJDK.Localedata.dll
regasm IKVM.OpenJDK.Management.dll
regasm IKVM.OpenJDK.Media.dll
regasm IKVM.OpenJDK.Misc.dll
regasm IKVM.OpenJDK.Naming.dll
regasm IKVM.OpenJDK.Nashorn.dll
regasm IKVM.OpenJDK.Remoting.dll
regasm IKVM.OpenJDK.Security.dll
regasm IKVM.OpenJDK.SwingAWT.dll
regasm IKVM.OpenJDK.Text.dll
regasm IKVM.OpenJDK.Tools.dll
regasm IKVM.OpenJDK.Util.dll
regasm IKVM.OpenJDK.XML.API.dll
regasm IKVM.OpenJDK.XML.Bind.dll
regasm IKVM.OpenJDK.XML.Crypto.dll
regasm IKVM.OpenJDK.XML.Parse.dll
regasm IKVM.OpenJDK.XML.Transform.dll
regasm IKVM.OpenJDK.XML.WebServices.dll
regasm IKVM.OpenJDK.XML.XPath.dll
regasm IKVM.Reflection.dll
regasm IKVM.Runtime.JNI.dll
regasm IKVM.Runtime.dll
regasm commons-collections4-4.1.dll
regasm ikvm-native-win32-x64.dll
regasm ikvm-native-win32-x86.dll
regasm junit.dll
regasm mpxj-for-csharp.dll
regasm mpxj-for-vb.dll
regasm mpxj-test.dll
regasm mpxj.dll
regasm poi-3.17.dll
regasm rtfparserkit-1.13.0.dll
regasm sqlite-jdbc-3.8.10.1.dll
