// show mjpg streamer stream
document.getElementById("stream").setAttribute("src", "http://" + window.location.host + ":8080?action=stream")

var socket = io()

document.onkeydown = function(e) {
  var key = String.fromCharCode(e.keyCode)


  if (key === "Q") {
    socket.emit("cmd", {
      cmd: "speed",
      value: 0
    })
  }

  if (key === "W") {
    socket.emit("cmd", {
      cmd: "direction",
      value: 0
    })

    socket.emit("cmd", {
      cmd: "speed",
      value: 1
    })
  }

  if (key === "S") {
    socket.emit("cmd", {
      cmd: "direction",
      value: 1
    })

    socket.emit("cmd", {
      cmd: "speed",
      value: 1
    })
  }


  if (key === "A") {
    socket.emit("cmd", {
      cmd: "servo",
      value: 0
    })
  }


  if (key === "D") {
    socket.emit("cmd", {
      cmd: "servo",
      value: 100
    })
  }
}
