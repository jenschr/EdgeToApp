// Just send some color info via MQTT at an interval
#include <Wire.h>
#include <WiFi.h>
#include <MQTT.h>
#include <Adafruit_DotStar.h>

const char ssid[] = "ssid";
const char pass[] = "pass";
const char mqtt_username[] = "YourUserName";
const char mqtt_password[] = "YourPassword";
const char mqtt_server[]   = "mqtt_server_address";

// We use our LED to show which color we're sending
#define NUMPIXELS 1
#define DATAPIN    33
#define CLOCKPIN   21
Adafruit_DotStar strip(NUMPIXELS, DATAPIN, CLOCKPIN, DOTSTAR_BGR);

WiFiClient networkClient;
MQTTClient mqttClient;

int color = 0;

unsigned long lastMillis = 0;

void connect() {
  Serial.print("checking wifi...");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }

  String clientId = "ColorClient-"; // Create a random client ID
    clientId += String(random(0xffff), HEX);

  Serial.print("\nConnecting to Wifi...");
  while (!mqttClient.connect(clientId.c_str(), mqtt_username, mqtt_password)) {
    Serial.print(".");
    delay(1000);
  }
}

void setup() {
  Serial.begin(115200);
  delay(500);

  WiFi.begin(ssid, pass);

  mqttClient.begin(mqtt_server, networkClient);

  connect();

  strip.begin();            // Initialize LED pins for output
  strip.setBrightness(255); // Blinding light!
  strip.show();             // Turn all LEDs off ASAP
}

void loop() {
  mqttClient.loop();
  delay(10);  // <- fixes some issues with WiFi stability

  if (!mqttClient.connected()) {
    connect();
  }

  // publish a message every 5 second.
  if (millis() - lastMillis > 5000) {
    lastMillis = millis();
    String colorString = "";
    if( color%3 == 0 )
    {
      colorString = "{ 'r': 255, 'g': 0, 'b': 0 }";
      strip.setPixelColor(0,0,255,0);
    } else if( color%3 == 1 )
    {
      colorString = "{ 'r': 255, 'g': 255, 'b': 0 }";
      strip.setPixelColor(0,255,255,0);
    } else if( color%3 == 2 )
    {
      colorString = "{ 'r': 0, 'g': 255, 'b': 0 }";
      strip.setPixelColor(0,255,0,0);
    }
    
    strip.show();
    mqttClient.publish("color/rgb", colorString);
    color++;
  }
}