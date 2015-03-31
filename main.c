#include <wiringPi.h>
#include <stdlib.h>
#include <stdio.h>

#define FORWARD 0
#define BACKWARD 1

void set_direction(int direction) {
  if (direction == FORWARD) {
    digitalWrite(22, 0);
    digitalWrite(23, 1);
  }
  else {
    digitalWrite(22, 1);
    digitalWrite(23, 0);
  }
}

int set_servo(int pos) {
  if (pos < 60 || pos > 90)
    return -1;

  pwmWrite(1, pos);
  return 0;
}

void test() {
  pwmWrite(1, 60);
  set_direction(FORWARD);
  digitalWrite(21, 1);
  delay(600);

  set_servo(70);
  digitalWrite(21, 0);
  delay(1000);

  set_servo(90);
  set_direction(BACKWARD);
  digitalWrite(21, 1);
  delay(800);

  set_servo(75);
  digitalWrite(21, 0);
  delay(100);
}

int main(int argc, char ** argv) {
  wiringPiSetup();
  pinMode(21, OUTPUT);
  pinMode(22, OUTPUT);
  pinMode(23, OUTPUT);

  pinMode(1, PWM_OUTPUT);
  pwmSetMode(PWM_MODE_MS);
  pwmSetClock(400);
  pwmSetRange(1000);

  // servo range: 30 - 75 - 120
  // steering range: 60 - 90

  while (1) {
    char c[2];
    scanf("%c", &c);
   
    if (strncmp(c, "w", 1) == 0) {
      set_direction(FORWARD);
      digitalWrite(21, 1);
    }
    else if (strncmp(c, "a", 1) == 0) {
      set_servo(60);
    }
    else if (strncmp(c, "s", 1) == 0) {
      set_direction(BACKWARD);
      digitalWrite(21, 1);
    }

    else if (strncmp(c, "q", 1) == 0) {
      set_servo(75);
    }
    else if (strncmp(c, "d", 1) == 0) {
     set_servo(86);
    }
    else if (strncmp(c, "o", 1) == 0) {
      digitalWrite(21, 0);
    }
  
  }

  return 0;
}
