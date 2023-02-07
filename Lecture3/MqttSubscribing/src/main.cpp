/*
Simple example showing how to subscribe to a topic
and use the data we receive. This example requires
that someone is publishing a JSON message with RGB
values to the topic we listen to. See the example
named SetColorMqtt for this.

Based on an example by Joël Gähwiler
*/

#include <WiFi.h>
#include <MQTT.h>
 #include <Wire.h>
#include <ArduinoJson.h>
#include <Adafruit_DotStar.h>

// Informatio required to control the RGB LED on our board
#define NUMPIXELS 1
#define DATAPIN    33
#define CLOCKPIN   21
Adafruit_DotStar strip(NUMPIXELS, DATAPIN, CLOCKPIN, DOTSTAR_BGR);

// connection information
const char ssid[] = "ssid";
const char pass[] = "pass";
const char mqtt_username[] = "YourUserName";
const char mqtt_password[] = "YourPassword";
const char mqtt_server[]   = "mqtt_server_address";

WiFiClient networkClient;
MQTTClient mqttClient;

// Whenever we receive a message from our subscription, we'll execute this method
void messageReceived(String &topic, String &payload) {
  // If you subscribe to multiple topics, you'd filter that here
  Serial.println("incoming message: " + topic + " - " + payload);

  // The payload should be in this format: {"r":255,"g":0,"b":0}
  StaticJsonDocument<64> doc;
  DeserializationError error = deserializeJson(doc, payload);

  if (error) {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.c_str());
    return;
  }

  int r = doc["r"]; // 255
  int g = doc["g"]; // 0
  int b = doc["b"]; // 0

  // Now that we have parsed out the color values from JSON, we can use them
  // to control the color of the RGB LED in our device
  strip.setPixelColor(0, r, g, b); // Set the color
  strip.show();                    // Show the color
}

void setup() {
  Serial.begin(115200);
  delay(4000);

  // Turn off the LED
  strip.begin();            // Initialize LED pins for output
  strip.setBrightness(255); // Blinding light!
  strip.show();             // Turn all LEDs off ASAP

  // Connect to wifi
  WiFi.begin(ssid, pass);  
  Serial.print("checking wifi...");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }

  // Setup and connect the the MQTT broker
  mqttClient.begin(mqtt_server, networkClient);

  String clientId = "ESP32Client-"; // Create a random client ID
    clientId += String(random(0xffff), HEX);

  Serial.print("\nConnecting to Mqtt Broker...");
  while (!mqttClient.connect(clientId.c_str(), mqtt_username, mqtt_password)) {
    Serial.print(".");
    delay(1000);
  }

  // Here we tell the client what to call upon new messages to our subscription
  mqttClient.onMessage(messageReceived);

  // Once we are setup, we start subscribing to messages on the topic we want
  mqttClient.subscribe( "color/rgb" );
  
}

void loop() {
  // maintain the mqtt-connection
  mqttClient.loop();

  // Just wait a little before the next loop (we're not doing much here unless we get a message)
  delay(10);
}
