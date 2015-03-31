var http = require("http")
var exec = require("child_process").exec
var static = require("node-static")
var car = require("./car")

exec("./mjpgstreamer/start.sh", function(err) {
  if (err) {
    return console.error("error:", err)
  }
})

var staticServer = new static.Server("./static")

var server = http.createServer(function(req, res) {
  req.addListener("end", function() {
    staticServer.serve(req, res)
  }).resume()
}).listen(80)

var io = require("socket.io")(server)

io.on("connection", function(socket) {
  socket.on("cmd", function(data) {
    if (data.cmd === "direction") {
      car.setDirection(data.direction)
    }
    else if (data.cmd === "servo") {
      car.setServo(data.degrees)
    }
    else if (data.cmd === "speed") {
      car.setSpeed(data.speed)
    }
    else if (data.cmd === "ir-led") {
      car.setPin(7, data.state)
    }
    else if (data.cmd === "light") {
      car.setPin(0, data.state)
    }
  })
})
