var car = require("./build/Release/car")

car.init()
car.setServo(70)

setTimeout(function() {
  car.setServo(80)
}, 1000)
