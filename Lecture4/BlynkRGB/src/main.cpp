/*************************************************************

  This is a simple demo of sending and receiving some data.
  Be sure to check out other examples!
 *************************************************************/

// Template ID, Device Name and Auth Token are provided by the Blynk.Cloud
// See the Device Info tab, or Template settings
#define BLYNK_TEMPLATE_ID ""
#define BLYNK_DEVICE_NAME "RGBtester"
#define BLYNK_AUTH_TOKEN ""

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "ssid";
char pass[] = "password";

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

int redColor = 0;
int greenColor = 0;
int blueColor = 0;

BlynkTimer timer;

void updateColor()
{
  strip.setPixelColor(0, blueColor, redColor, greenColor);
  strip.show(); 
}
// This function is called every time the Virtual Pin 0 state changes
BLYNK_WRITE(V0)
{
  redColor = param.asInt();
  updateColor();
}
BLYNK_WRITE(V1)
{
  greenColor = param.asInt();
  updateColor();
}
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

// This function sends Arduino's uptime every second to Virtual Pin 2.
void myTimerEvent()
{
  // You can send any value at any time.
  // Please don't send more that 10 values per second.
  Blynk.virtualWrite(V2, millis() / 1000);
}

void setup()
{
  // Debug console
  Serial.begin(115200);
  
  strip.begin(); // Initialize pins for output
  strip.show();  // Turn all LEDs off ASAP

  Blynk.begin(auth, ssid, pass);
  // You can also specify server:
  //Blynk.begin(auth, ssid, pass, "blynk.cloud", 80);
  //Blynk.begin(auth, ssid, pass, IPAddress(192,168,1,100), 8080);

  // Setup a function to be called every second
  timer.setInterval(1000L, myTimerEvent);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop()
{
  Blynk.run();
  timer.run();
  // You can inject your own code or combine it with other sketches.
  // Check other examples on how to communicate with Blynk. Remember
  // to avoid delay() function!
}
