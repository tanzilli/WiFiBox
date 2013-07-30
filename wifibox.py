#!/usr/bin/python
import os
import tornado.httpserver
import tornado.ioloop
import tornado.web
import tornado.websocket
import tornado.gen
from   tornado.options import define, options
from   random import randint
import json
import inspect
import ablib

lcd = ablib.Daisy24(0)
lcd.backlighton()

lcd.setcurpos(0,0)
lcd.putstring("WiFi HotSpot")


def lineno():
    """Returns the current line number in our program."""
    return inspect.currentframe().f_back.f_lineno

clients = []
 
class WebSocketHandler(tornado.websocket.WebSocketHandler):
	def open(self):
		clients.append(self)

		lcd.setcurpos(0,1)
		lcd.putstring("Client: %3d" % (clients.__len__()))
		
		print "Websocket opened"

	def on_message(self, message):
		print "tornado received from client: %s" % message
		for c in clients:
			c.write_message(message)

	def on_close(self):
		clients.remove(self)		
		print "Websocket closed"
		lcd.setcurpos(0,1)
		lcd.putstring("Client: %3d" % (clients.__len__()))

# Invia la lista delle slides
class SlidesList(tornado.web.RequestHandler):
	def get(self):
		a=sorted(os.listdir("artisti"))
		b=json.dumps(a)
		self.write(b)

def redirect(self, status_code, exception=None, **kwargs):
	return("<meta http-equiv='refresh' content='0; url=/'>");


def main():
	print "hello, this is line number", lineno()

	tornado.web.StaticFileHandler.get_error_html=redirect;

	application = tornado.web.Application([
		(r"/slideslist", SlidesList),
		(r"/websocket", WebSocketHandler),
		(r"/(.*)", tornado.web.StaticFileHandler, {"path": ".","default_filename": "index.html"})
	])
	application.listen(80)
	

	mainLoop = tornado.ioloop.IOLoop.instance()
	#scheduler = tornado.ioloop.PeriodicCallback(sendSlide,1000,io_loop=mainLoop)
	#scheduler.start()
	mainLoop.start()
	
if __name__ == "__main__":
	main()
