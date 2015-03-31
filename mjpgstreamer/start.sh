#!/bin/sh
export LD_LIBRARY_PATH="$(pwd)"

./mjpg_streamer -i "./input_raspicam.so -vf -x 1280 -y 720 -fps 24 -ex night" -o "./output_http.so"
