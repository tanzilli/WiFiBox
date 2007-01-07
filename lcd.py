import ablib
import os
import time

lcd = ablib.Daisy24(0)
lcd.backlighton()

lcd.setcurpos(0,0)
lcd.putstring("Rieti 8spot")

while True:
	if lcd.pressed(0):
		lcd.clear()
		lcd.setcurpos(0,0)
		lcd.putstring("Shutdown")
		os.system("shutdown -h now")
		i=0
		while True:
			print "Shutdown",i
			time.sleep(1)
			i=i+1
		
		
		
