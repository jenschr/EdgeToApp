// You need to fill out these three fields as well as your wifi info
#define BLYNK_TEMPLATE_ID ""
#define BLYNK_DEVICE_NAME ""
#define BLYNK_AUTH_TOKEN ""

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "your-ssid-here";
char pass[] = "your-wifi-password-here";

// Comment this out to disable prints and save space
#define BLYNK_PRINT Serial

#include <Wire.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>
#include <Adafruit_DotStar.h>

#define DATAPIN    33
#define CLOCKPIN   21
Adafruit_DotStar strip(1, DATAPIN, CLOCKPIN, DOTSTAR_BRG);

char auth[] = BLYNK_AUTH_TOKEN;

// We use these three global variables to hold our RGB colors
int redColor = 0;
int greenColor = 0;
int blueColor = 0;

void updateColor()
{
  strip.setPixelColor(0, blueColor, redColor, greenColor);
  strip.show(); 

  // Use Serial.print to see that you are receiving data from the App
  Serial.print("blueColor: ");
  Serial.print(blueColor);
  Serial.print(" redColor: ");
  Serial.print(redColor);
  Serial.print(" greenColor: ");
  Serial.println(greenColor);
}

// This function is called every time the Virtual Pin 0 state changes in the app
// For this to work, you need to setup a slider (0-255) in the Blynk app
// and connect it to Virtual Pin 0 (V0)
BLYNK_WRITE(V0)
{
  redColor = param.asInt();
  updateColor();
}
// This does the same as the one above, but for V1
BLYNK_WRITE(V1)
{
  greenColor = param.asInt();
  updateColor();
}
// This does the same as the one above, but for V2
BLYNK_WRITE(V2)
{
  blueColor = param.asInt();
  updateColor();
}

// This function is called every time the device is connected to the Blynk.Cloud
BLYNK_CONNECTED()
{
  // Change Web Link Button message to "Congratulations!"
  Blynk.setProperty(V3, "offImageUrl", "https://static-image.nyc3.cdn.digitaloceanspaces.com/general/fte/congratulations.png");
  Blynk.setProperty(V3, "onImageUrl",  "https://static-image.nyc3.cdn.digitaloceanspaces.com/general/fte/congratulations_pressed.png");
  Blynk.setProperty(V3, "url", "https://docs.blynk.io/en/getting-started/what-do-i-need-to-blynk/how-quickstart-device-was-made");
}

void setup()
{
  // Debug console
  Serial.begin(115200);
  
  strip.begin(); // Initialize pins for output
  strip.show();  // Turn all LEDs off ASAP

  // Connect to wifi and Blynk service
  Blynk.begin(auth, ssid, pass);
}

void loop()
{
  Blynk.run();
  // You can inject your own code or combine it with other sketches.
  // Check other examples on how to communicate with Blynk. Remember
  // to avoid delay() function!
}
