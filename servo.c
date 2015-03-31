#include <wiringPi.h>
#include <stdlib.h>
#include <stdio.h>

int main(int argc, char ** argv) {
  wiringPiSetup();
  pinMode(1, PWM_OUTPUT);
  pwmSetMode(PWM_MODE_MS);
  pwmSetClock(400);
  pwmSetRange(1000);

  //pwmWrite(1, 30); delay(1000);
  //pwmWrite(1, 120); delay(1000);

  pwmWrite(1, 60); delay(1000);
  pwmWrite(1, 90); delay(1000);
  pwmWrite(1, 75); delay(1000);

  return 0;
}
