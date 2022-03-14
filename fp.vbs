Option Explicit
Dim URL,WshShell,i
Set WshShell = CreateObject("WScript.shell")
WshShell.run "CMD /C start chrome.exe" 
WScript.Sleep(500)              

openUrl("https://staff.eshopperpro.com/login.php?")
WScript.Sleep(500)
WshShell.AppActivate "Google Chrome"
WScript.Sleep(2000)
WshShell.SendKeys "{TAB}"
WshShell.SendKeys "{TAB}"
WshShell.SendKeys "{ENTER}"
WScript.Sleep(2000)
WshShell.SendKeys "{TAB}"
downKeys(5)
WshShell.SendKeys "{ENTER}"
WScript.Sleep(2000)
WshShell.SendKeys "^%(I)"
WScript.Sleep(2000)
tabKeys(3)
WshShell.SendKeys "{ENTER}"
downKeys(6)
WshShell.SendKeys "{ENTER}"
WScript.Sleep(2000)
tabKeys(4)
WshShell.SendKeys "{ENTER}"
WshShell.SendKeys "{UP}"
WshShell.SendKeys "{ENTER}"
WScript.Sleep(2000)
MsgBox("Press Ctrl + Shift + F to run FragilePak Program")




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
