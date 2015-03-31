// show mjpg streamer stream
document.getElementById("stream").setAttribute("src", "http://" + window.location.host + ":8080?action=stream")

var socket = io()

socket.emit("cmd", "left 10")
