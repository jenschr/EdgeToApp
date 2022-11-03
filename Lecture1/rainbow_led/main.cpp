#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_DotStar.h>

// There is only one pixel on the board
#define NUMPIXELS 1 

//Use these pin definitions for the ItsyBitsy M4
#define DATAPIN    26
#define CLOCKPIN   21

Adafruit_DotStar strip(NUMPIXELS, DATAPIN, CLOCKPIN, DOTSTAR_BRG);
long firstPixelHue = 0;
int counter = 0;

void setup() {
  Serial.begin(9600);
  strip.begin(); // Initialize pins for output
  strip.setBrightness(20);
  strip.show();  // Turn all LEDs off ASAP
}

void rainbow() {
  strip.setPixelColor(0, strip.gamma32(strip.ColorHSV(firstPixelHue)));
  strip.show(); // Update strip with new contents
  firstPixelHue += 32;
  if ( firstPixelHue > 5 * 65536 ) { firstPixelHue = 0; }
  delayMicroseconds(200);
}

void loop() {
  rainbow();             // Flowing rainbow cycle along the whole strip
  counter++;
  if( counter % 1000 == 0)
  {
    Serial.println(firstPixelHue);
  }
}
