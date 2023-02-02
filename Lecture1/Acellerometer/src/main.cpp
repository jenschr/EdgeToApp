/*********************************************************
  Minimal example for LIS3D Accelerometer
 *********************************************************/

#include <Wire.h>
#include <SPI.h>
#include <Adafruit_LIS3DH.h>
#include <Adafruit_Sensor.h>

Adafruit_LIS3DH lis = Adafruit_LIS3DH();

void setup()
{
  Serial.begin(115200);

  if (! lis.begin(0x18)) {   // change this to 0x19 for alternative i2c address
    Serial.println("Couldnt start");
    while (1) yield();
  }
  Serial.println("LIS3DH found!");

  // Adjust the sensitivity with this command
  lis.setRange(LIS3DH_RANGE_4_G);   // 2, 4, 8 or 16 G!

  // Adjust how often the board should read the sensor with this command
  lis.setDataRate(LIS3DH_DATARATE_50_HZ);
}

void loop()
{
  lis.read();      // get X Y and Z data at once

  Serial.print("X:  "); Serial.print(lis.x);
  Serial.print("  \tY:  "); Serial.print(lis.y);
  Serial.print("  \tZ:  "); Serial.println(lis.z);
  
  /*
  We'll have to take a tiny break here or it'll be hard 
  to "stop" the Serial output for uploading. We can 
  obviously take a longer break as well, but this 20 ms
  example will show you very tiny movement of the device.
  
  Note that delays shorter than 20ms may cause issues 
  uploading to the device if the device is not doing much 
  other than reading this sensor
  */
  delay(20);
}