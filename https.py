import tornado.ioloop
import tornado.web
import tornado.httpserver
import os


class HelloHandler(tornado.web.RequestHandler):
	def get(self):
		self.write("<script>window.location.href='http://' + location.host</script>")

application = tornado.web.Application([
	(r"/.*",HelloHandler)
])

#http://www.akadia.com/services/ssh_test_certificate.html
http_server = tornado.httpserver.HTTPServer(application, ssl_options={
    "certfile": os.path.join("ssl", "server.crt"),
    "keyfile": os.path.join("ssl", "server.key"),
})


if __name__ == "__main__":
    http_server.listen(443)
    tornado.ioloop.IOLoop.instance().start()
