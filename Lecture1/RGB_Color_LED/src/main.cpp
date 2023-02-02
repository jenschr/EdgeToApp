/*********************************************************
  Minimal example for single APA102 RGB LED
 *********************************************************/

#include <Wire.h>
#include <Adafruit_DotStar.h>

// There is only one pixel on the board
#define NUMPIXELS 1

// Use these pin definitions for the LectureFeather ESP32-S3
#define DATAPIN    33
#define CLOCKPIN   21

// This is the instance of the Dotstar class that is controlling the RGB LED
Adafruit_DotStar strip(NUMPIXELS, DATAPIN, CLOCKPIN, DOTSTAR_BGR);

void setup() {
  // To use the LED, we need to "start it" using these methodss
  strip.begin();            // Initialize LED pins for output
  strip.setBrightness(20);  // Avoid blinding yourself
  strip.show();             // Turn all LEDs off ASAP
}

void loop() {
  int redColor = 255;
  int greenColor = 255;
  int blueColor = 255;

  strip.setPixelColor(0, 0, greenColor, 0); // green only
  strip.show(); // Update LED with new contents
  delay(1000);  // wait a second

  strip.setPixelColor(0, redColor, 0, 0); // red only
  strip.show(); // Update LED with new contents
  delay(1000);  // wait a second

  strip.setPixelColor(0, 0, 0, 20); // blue only, but very weak
  strip.show(); // Update LED with new contents
  delay(1000);  // wait a second

  // turn on all colors for white
  strip.setPixelColor(0, greenColor, redColor, blueColor);
  strip.show(); // Update LED with new contents
  delay(1000);  // wait a second
}