#!/bin/sh
dir=`dirname $0`

LD_LIBRARY_PATH=$dir/ $dir/mjpg_streamer -i "$dir/input_raspicam.so -hf -vf -x 1280 -y 720 -fps 24" -o "$dir/output_http.so"
