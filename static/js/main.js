// show mjpg streamer stream
document.getElementById("stream").setAttribute("src", "http://" + window.location.host + ":8080?action=stream")

var socket = io()

var menu = {
  light: document.getElementById("button-light"),
  irLed: document.getElementById("button-ir-led")
}

var state = {
  speed: 0,
  servo: 50,
  light: false,
  irLed: false
}

// turn LEDs off initially
socket.emit("cmd", {
  cmd: "light",
  value: 0
})
socket.emit("cmd", {
  cmd: "ir-led",
  value: 0
})

// set servo to middle position
socket.emit("cmd", {
  cmd: "servo",
  value: state.servo
})

menu.light.onclick = function() {
  state.light = !state.light
  socket.emit("cmd", {
    cmd: "light",
    value: +state.light
  })
  if (state.light) {
    menu.light.classList.add("active")
  }
  else {
    menu.light.classList.remove("active")
  }
}


menu.irLed.onclick = function() {
  state.irLed = !state.irLed
  socket.emit("cmd", {
    cmd: "ir-led",
    value: +state.irLed
  })
  if (state.irLed) {
    menu.irLed.classList.add("active")
  }
  else {
    menu.irLed.classList.remove("active")
  }
}

document.onkeydown = function(e) {
 var key = String.fromCharCode(e.keyCode)

  // brake key
  if (key === "Q") {
    state.speed = 0
    socket.emit("cmd", {
      cmd: "speed",
      value: state.speed
    })
  }

  if (key === "W") {
    state.speed = 100
    socket.emit("cmd", {
      cmd: "speed",
      value: state.speed
    })
  }

  if (key === "S") {
    state.speed = -100
    socket.emit("cmd", {
      cmd: "speed",
      value: state.speed
    })
  }

  // left turn
  if (key === "A") {
    socket.emit("cmd", {
      cmd: "servo",
      value: 0
    })
  }

  // right turn
  if (key === "D") {
    socket.emit("cmd", {
      cmd: "servo",
      value: 100
    })
  }
}

var gamma = null, beta = null

var gyroAvailable = false

window.ondeviceorientation = function(e) {
  if (e.gamma !== null) {
    gyroAvailable = true

    // gamma = speed
    // beta = left / right
    var dGamma = e.gamma - gamma,
        dBeta = e.beta - beta

    gamma = e.gamma
    beta = e.beta

    state.speed = state.speed + dGamma * 6
    if (state.speed > 100) state.speed = 100
    if (state.speed < -100) state.speed = -100

    state.servo = state.servo + dBeta
    if (state.servo > 100) state.servo = 100
    if (state.servo < 0) state.servo = 0
  }
}

//if (gyroAvailable) {
  setInterval(function() {
      socket.emit("cmd", {
        cmd: "speed",
        value: Math.round(state.speed)
      })
  }, 40)


  setInterval(function() {
      socket.emit("cmd", {
        cmd: "servo",
        value: Math.round(state.servo)
      })
  }, 80)
//}
