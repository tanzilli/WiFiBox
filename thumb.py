import os, sys
import Image

size = 256, 256
inpath="slides"
outpath="slides_thumb"

for infile in os.listdir(inpath):
	outfile = infile
	print "%s -> %s" % (inpath + "/" + infile, outpath + "/" + outfile) 
	try:
		im = Image.open(inpath + "/" + infile)
		im.thumbnail(size)
		im.save(outpath + "/" + outfile, "JPEG")
	except IOError:
		print "cannot create thumbnail for", inpath  + "/" + infile
