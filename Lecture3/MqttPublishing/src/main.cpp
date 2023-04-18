/*
Simple example showing how to publish to a topic

Based on an example by Joël Gähwiler
*/

#include <WiFi.h>
#include <MQTT.h>

const char ssid[] = "ssid";
const char pass[] = "pass";
const char mqtt_username[] = "YourUserName";
const char mqtt_password[] = "YourPassword";
const char mqtt_server[]   = "mqtt_server_address";

WiFiClient networkClient;
MQTTClient mqttClient;

unsigned long lastMillis = 0;

void setup() {
  Serial.begin(115200);
  delay(4000);

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

  Serial.print("\nConnecting to Wifi...");
  while (!mqttClient.connect(clientId.c_str(), mqtt_username, mqtt_password)) {
    Serial.print(".");
    delay(1000);
  }
}

void loop() {
  // Make the library maintain our connection to the server
  mqttClient.loop();

  // Publish a message to a topic every 5 second.
  if (millis() - lastMillis > 5000) {
    lastMillis = millis();

    // Contruct the topic we should post to
    String yourPersonalTopic = "students/";
    yourPersonalTopic += mqtt_username;

    // Make each message a little different
    String yourPersonalMessage = "Hello ";
    yourPersonalMessage += int(lastMillis/1000);

    // Send that message to the server on the topic we just made
    mqttClient.publish(yourPersonalTopic, yourPersonalMessage);
  }

  // Just wait a little before the next loop
  delay(10);
}