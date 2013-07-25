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

clients = []
 
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

def main():
	application = tornado.web.Application([
		(r"/slideslist", SlidesList),
		(r"/websocket", WebSocketHandler),
		(r"/(.*)", tornado.web.StaticFileHandler, {"path": ".","default_filename": "index.html"}),
	])
	application.listen(80)
 

	mainLoop = tornado.ioloop.IOLoop.instance()
	#scheduler = tornado.ioloop.PeriodicCallback(sendSlide,1000,io_loop=mainLoop)
	#scheduler.start()
	mainLoop.start()
	
if __name__ == "__main__":
	main()
