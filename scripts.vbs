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
names = Array("ground_usps_goedekers","ground_ups_goedekers","ground_fedex_goedekers","warehousepickup_goedekers_no_print","odyssey_goedekers_no_print","fragilepak_goedekers_no_print")
 For each item in names
    WScript.Sleep(1000)
    runScript(item)
    WScript.Sleep(2000)
 Next

 Wscript.Quit
Sub runScript(scriptName)
    WshShell.CurrentDirectory = "C:\Users\BobbyRodermu_\OneDrive - Eshopper Pro Mail\Desktop\auto_close_print_goedekers"
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

