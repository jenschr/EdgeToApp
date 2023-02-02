/*********************************************************
  Minimal example for the builtin Hall Sensor
  Turns on the BUILTIN LED if a magnet is near
 *********************************************************/
#include <Arduino.h>

#define HALL_SENSOR_PIN 1

bool isThereAMagnetNearTheSensor = false;

void setup() {
  pinMode( LED_BUILTIN, OUTPUT );
  pinMode( HALL_SENSOR_PIN, INPUT );
}

void loop() {
  // Test this with the magnet you got in the lectures
  isThereAMagnetNearTheSensor = digitalRead( HALL_SENSOR_PIN );
  digitalWrite( LED_BUILTIN, !isThereAMagnetNearTheSensor );
}