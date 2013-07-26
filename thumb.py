import os, sys
import Image

size = 128, 128
inpath="artisti"
outpath="artisti_thumb"

for infile in os.listdir(inpath):
	outfile = infile
	print "%s -> %s" % (inpath + "/" + infile, outpath + "/" + outfile) 
	try:
		im = Image.open(inpath + "/" + infile)
		im.thumbnail(size)
		im.save(outpath + "/" + outfile, "JPEG")
	except IOError:
		print "cannot create thumbnail for", inpath  + "/" + infile
