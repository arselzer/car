var car = require("./build/Release/car")

module.exports.init = car.init

module.exports.setDirection = car.setDirection

module.exports.setSpeed = function(speed) {
  car.setSpeed(speed)
}

module.exports.setServo = function(pos) {
  // a scale of 0 - 100 is nicer
  if (pos >= 0 && pos <= 100) {
    var val = 60 + Math.round(pos * 0.25)
    if (val < 60) val = 60
    if (val > 85) val = 85
    console.log(val)

    car.setServo(val)
  }
}

