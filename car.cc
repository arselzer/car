#include <node.h>
#include <nan.h>
#include <wiringPi.h>
#include <softPwm.h>

using v8::Number;
using v8::FunctionTemplate;
using v8::Handle;
using v8::Object;
using v8::String;

#define FORWARD 0
#define BACKWARD 1

NAN_METHOD(Init) {
  wiringPiSetup();
  pinMode(22, OUTPUT); // motor forward/backward
  pinMode(23, OUTPUT); // ^
  softPwmCreate(21, 0, 100); // Motor Controller PWM

  pinMode(1, PWM_OUTPUT); // Servo PWM
  pwmSetMode(PWM_MODE_MS);
  pwmSetClock(400);
  pwmSetRange(1000);


  pinMode(0, OUTPUT); // Light
  pinMode(7, OUTPUT); // IR
}

NAN_METHOD(SetDirection) {
  NanScope();

  int direction = args[0]->Uint32Value();

  if (direction == FORWARD) {
    digitalWrite(22, 0);
    digitalWrite(23, 1);
  }
  else {
    digitalWrite(22, 1);
    digitalWrite(23, 0);
  }
}

NAN_METHOD(SetSpeed) {
  NanScope();

  int speed = args[0]->Uint32Value();

  softPwmWrite(21, speed);
}

NAN_METHOD(SetServo) {
  int pos = args[0]-> Uint32Value();

  if (pos >= 60 && pos <= 90)
    pwmWrite(1, pos);
}


NAN_METHOD(SetPin) {
  NanScope();

  int pin = args[0]->Uint32Value();
  int value = args[1]->Uint32Value();

  digitalWrite(pin, value);
}

void init(Handle<Object> exports) {
  exports->Set(NanNew<String>("setDirection"),
      NanNew<FunctionTemplate>(SetDirection)->GetFunction());

  exports->Set(NanNew<String>("setSpeed"),
      NanNew<FunctionTemplate>(SetSpeed)->GetFunction());

  exports->Set(NanNew<String>("setServo"),
      NanNew<FunctionTemplate>(SetServo)->GetFunction());

  exports->Set(NanNew<String>("setPin"),
      NanNew<FunctionTemplate>(SetPin)->GetFunction());

  exports->Set(NanNew<String>("init"),
      NanNew<FunctionTemplate>(Init)->GetFunction());
}

NODE_MODULE(car, init)
