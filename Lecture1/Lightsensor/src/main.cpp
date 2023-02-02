/*********************************************************
  Minimal example for LTR329ALS Light sensor
 *********************************************************/

#include "Adafruit_LTR329_LTR303.h"

Adafruit_LTR329 ltr = Adafruit_LTR329();

void setup() {
  Serial.begin(115200);

  if ( ! ltr.begin() ) {
    Serial.println("Couldn't find LTR sensor!");
    while (1) delay(10);
  }

  // Setup LTR sensor (see advanced demo in library for all options!)
  Serial.println("Found LTR sensor!");
  ltr.setGain(LTR3XX_GAIN_4);
  ltr.setIntegrationTime(LTR3XX_INTEGTIME_50);
  ltr.setMeasurementRate(LTR3XX_MEASRATE_50);
}

void loop() {
  uint16_t visible_plus_ir, infrared;
  if (ltr.newDataAvailable()) {
    bool valid = ltr.readBothChannels(visible_plus_ir, infrared);
    if (valid) {
      Serial.print("CH0 Visible + IR: ");
      Serial.print(visible_plus_ir);
      Serial.print("\tCH1 Infrared: ");
      Serial.println(infrared);
    }
  }

  // if you don't do much in a loop, always take a small break
  delay(20);
}