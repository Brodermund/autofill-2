Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Program Files (x86)\Cisco\Cisco AnyConnect Secure Mobility Client"
WshShell.Run "vpnui.exe"
WScript.Sleep(1000)
WshShell.AppActivate "Cisco AnyConnect Secure Mobility Client"
WScript.Sleep(500)
WshShell.SendKeys "{ENTER}"
WScript.Sleep(5000)
WshShell.SendKeys "Rodermund4652"
WScript.Sleep(500)
WshShell.SendKeys "{ENTER}"
WScript.Sleep(5000)
WshShell.SendKeys "{ENTER}"
WScript.Sleep(2000)
names = Array("USPSScript","UPSScript","FedexScript","WarehouseScript","OdysseyScript","FragilePakScript")
 For each item in names
    WScript.Sleep(1000)
    runScript(item)
    WScript.Sleep(2000)
 Next

 Wscript.Quit
Sub runScript(scriptName)
    WshShell.CurrentDirectory = "C:\Bobby\Desktop\One Drive\Eshopper Scripts"
    WshShell.Run scriptName
    WScript.Sleep(1000)
    WshShell.AppActivate scriptName
    WScript.Sleep(2000)
    WshShell.SendKeys "{ENTER}"
    WScript.Sleep(500)
    WshShell.SendKeys "{ENTER}"
    WScript.Sleep(500)
    WshShell.SendKeys "{ENTER}"
    WScript.Sleep(500)
    WshShell.SendKeys "{ENTER}"
End Sub 'runScript

