#include <node.h>
#include <nan.h>
#include <wiringPi.h>

using v8::Number;
using v8::FunctionTemplate;
using v8::Handle;
using v8::Object;
using v8::String;

#define FORWARD 0
#define BACKWARD 1

NAN_METHOD(Init) {
  wiringPiSetup();
  pinMode(21, OUTPUT);
  pinMode(22, OUTPUT);
  pinMode(23, OUTPUT);

  pinMode(1, PWM_OUTPUT);
  pwmSetMode(PWM_MODE_MS);
  pwmSetClock(400);
  pwmSetRange(1000);
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

NAN_METHOD(SetServo) {
  int pos = args[0]-> Uint32Value();

  if (pos >= 60 && pos <= 90)
    pwmWrite(1, pos);
}

void init(Handle<Object> exports) {
  exports->Set(NanNew<String>("setDirection"),
      NanNew<FunctionTemplate>(SetDirection)->GetFunction());


  exports->Set(NanNew<String>("setServo"),
      NanNew<FunctionTemplate>(SetServo)->GetFunction());

  exports->Set(NanNew<String>("init"),
      NanNew<FunctionTemplate>(Init)->GetFunction());
}

NODE_MODULE(car, init)
