var http = require("http")
var exec = require("child_process").exec
var static = require("node-static")
var car = require("./car.js")

exec("./mjpgstreamer/start.sh", function(err) {
  if (err) {
    console.error("error starting mjpg-streamer:", err)
  }
})

var staticServer = new static.Server("./static")

var server = http.createServer(function(req, res) {
  req.addListener("end", function() {
    staticServer.serve(req, res)
  }).resume()
}).listen(80)

var io = require("socket.io")(server)

car.init()

io.on("connection", function(socket) {
  socket.on("cmd", function(data) {
    console.log(data)
    if (data.cmd === "servo") {
      car.setServo(data.value)
    }
    else if (data.cmd === "speed") {
      car.setSpeed(data.value)
    }
    else if (data.cmd === "ir-led") {
      car.setPin(0, data.value)
    }
    else if (data.cmd === "light") {
      car.setPin(7, data.value)
    }
  })
})
