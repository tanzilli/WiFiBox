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


def lineno():
    """Returns the current line number in our program."""
    return inspect.currentframe().f_back.f_lineno

clients = []
smartphones = []
 
class WebSocketHandler(tornado.websocket.WebSocketHandler):
	def open(self):
		clients.append(self)
		print "Websocket opened"

	def on_message(self, message):
		print "tornado received from client: %s" % message
		for c in clients:
			c.write_message(message)

	def on_close(self):
		clients.remove(self)		
		print "Websocket closed"

# Invia la lista delle slides
class SlidesList(tornado.web.RequestHandler):
	def get(self):
		a=sorted(os.listdir("artisti"))
		b=json.dumps(a)
		self.write(b)

# Lista degli smartphones connessi
class SmartphonesList(tornado.web.RequestHandler):
	def get(self):
		print smartphones
		self.write("Ciao")

def redirect(self, status_code, exception=None, **kwargs):
	return("<meta http-equiv='refresh' content='0; url=/'>");
	
def hitcounter(self):
	if self.request.uri=="/":
		smartphones.append(self.request.remote_ip)
	return

def main():
	print "hello, this is line number", lineno()

	tornado.web.StaticFileHandler.get_error_html=redirect;
	tornado.web.StaticFileHandler.prepare=hitcounter;

	application = tornado.web.Application([
		(r"/smartphones", SmartphonesList),
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
