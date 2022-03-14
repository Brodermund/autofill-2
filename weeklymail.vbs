Option Explicit
Dim URL,WshShell,i
Set WshShell = CreateObject("WScript.shell")
openUrl("https://www.fedex.com/en-us/home.html")
WScript.Sleep(500)
WshShell.AppActivate "Google Chrome"
WScript.Sleep(10000)
FedexLogin()
WScript.Sleep(5000)
       

WshShell.SendKeys "{TAB 37}", True 
WScript.Sleep(100) 
WshShell.SendKeys "Anup K", True 
WScript.Sleep(500)
WshShell.SendKeys "{TAB 2}", True 
WScript.Sleep(100) 
WshShell.SendKeys "1870 Bath Ave", True 
WScript.Sleep(500)
WshShell.SendKeys "{TAB 2}", True 
WScript.Sleep(100) 
WshShell.SendKeys "11214", True 
WScript.Sleep(500)
WshShell.SendKeys "{TAB}", True
WScript.Sleep(500) 
WshShell.SendKeys "{TAB}", True
WScript.Sleep(1000) 
WshShell.SendKeys "{DOWN}", True
WScript.Sleep(500)  
WshShell.SendKeys "{ENTER}", True
WScript.Sleep(500)
WshShell.SendKeys "{DOWN}", True
WScript.Sleep(500)  
WshShell.SendKeys "{ENTER}", True
WScript.Sleep(500)
WshShell.SendKeys "{TAB 3}", True 
WScript.Sleep(100) 
WshShell.SendKeys "314-537-3052", True
WScript.Sleep(100)
WshShell.SendKeys "{TAB 2}", True 
WScript.Sleep(100) 
WshShell.SendKeys "{DOWN 10}", True
WScript.Sleep(500)  
WshShell.SendKeys "{TAB 8}", True 
WScript.Sleep(500) 
WshShell.SendKeys "{ENTER}", True
WScript.Sleep(500) 	
WshShell.SendKeys "{TAB}", True
WScript.Sleep(500)
WshShell.SendKeys "{ENTER}", True
WScript.Sleep(500) 	
WshShell.SendKeys "{TAB 5}", True 
WScript.Sleep(100) 	
WshShell.SendKeys "2.5", True
WScript.Sleep(100)
WshShell.SendKeys "{TAB 20}", True 
WScript.Sleep(500)
WshShell.SendKeys "{ENTER}", True
WScript.Sleep(500)
WshShell.SendKeys "{TAB}", True 
WScript.Sleep(500)
WshShell.SendKeys "{DOWN 2}", True
WScript.Sleep(500)
WshShell.SendKeys "{TAB 16}", True 
WScript.Sleep(500)
WshShell.SendKeys "{ENTER}", True
WScript.Sleep(500)   	 																				









Sub openUrl(URL)
    
    For i = 0 to 50
        WshShell.SendKeys(chr(175))
    Next
    WshShell.run "CMD /C start chrome.exe " & URL & "",0,False  
    End Sub ' openUrl
Sub FedexLogin()
    WshShell.SendKeys "{TAB 13}", True 
    WScript.Sleep(100)
    WshShell.SendKeys "{ENTER}", True
    WScript.Sleep(3000)
    WshShell.SendKeys "{TAB 2}", True 
    WScript.Sleep(100)
    WshShell.SendKeys "{ENTER}", True 
    WScript.Sleep(500)
    WshShell.SendKeys "{TAB}", True
    WScript.Sleep(100)
    WshShell.SendKeys "{ENTER}", True 
    WScript.Sleep(3000)
    WshShell.SendKeys "{TAB 9}", True 
    WScript.Sleep(100)
    WshShell.SendKeys "{ENTER}", True
End Sub ' FedexLogin