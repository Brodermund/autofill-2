Option Explicit
Dim URL,WshShell,i
Set WshShell = CreateObject("WScript.shell")
WshShell.run "CMD /C start chrome.exe" 
WScript.Sleep(500)              

openUrl("https://myapps.paychex.com/landing_remote/html")
WScript.Sleep(500)
WshShell.AppActivate "Google Chrome"
WScript.Sleep(4000)
WshShell.SendKeys "Brodermund"
WScript.Sleep(100)
WshShell.SendKeys "{ENTER}"
WScript.Sleep(4000)
WshShell.SendKeys "{ENTER}"



Sub openUrl(URL)
    
    For i = 0 to 50
        WshShell.SendKeys(chr(175))
    Next
    WshShell.run "CMD /C start chrome.exe " & URL & "",0,False  
    End Sub ' openUrl
Sub downKeys(num)
    For i=1 To num
        WshShell.SendKeys "{DOWN}"
    Next 'i
    
 End Sub ' downKeys
Sub tabKeys(num)
    For i=1 To num
        WshShell.SendKeys "{Tab}"
    Next 'i
    
 End Sub ' tabKeys
