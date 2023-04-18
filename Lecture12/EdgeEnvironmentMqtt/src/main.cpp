/*********************************************************
  Minimal example for sending enviroment data to an MQTT
  Broker/server. Use with React graph example to view
  realtime data.
 *********************************************************/

#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_DotStar.h>
#include "Adafruit_SHT31.h"
#include <WiFi.h>
#include <MQTT.h>
/*
const char ssid[] = "ssid";
const char pass[] = "pass";
const char mqtt_username[] = "YourUserName";
const char mqtt_password[] = "YourPassword";
const char mqtt_server[]   = "mqtt_server_address";
*/
const char ssid[] = "Jensa";
const char pass[] = "Kristiania1914";
const char mqtt_username[] = "machine";
const char mqtt_password[] = "Passord1ErRoest";
const char mqtt_server[]   = "mqtt.toytronics.com";

#define NUMPIXELS 1
#define DATAPIN    33
#define CLOCKPIN   21
Adafruit_DotStar strip(NUMPIXELS, DATAPIN, CLOCKPIN, DOTSTAR_BGR);

Adafruit_SHT31 sht31 = Adafruit_SHT31();
WiFiClient networkClient;
MQTTClient mqttClient;

unsigned long lastMillis = 0;

void stayConnectedToWifi() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.print("Wifi connection lost");
    strip.setPixelColor(0, 255, 0, 0); // red LED to show connection problem
    strip.show(); // Update LED with new contents

    // if connection is lost, wait 3 seconds and try connecting again
    while (WiFi.status() != WL_CONNECTED) {
      delay(3000);
      Serial.print(".");
      WiFi.reconnect();
    }
    Serial.print("Wifi connection regained!");
  }
}

void stayConnectedToMqtt() {
  if( !mqttClient.connected() )
  {
    // Setup and connect the the MQTT broker
    mqttClient.begin(mqtt_server, networkClient);

    String clientId = "ESP32Client-"; // Create a random client ID
      clientId += String(random(0xffff), HEX);

    Serial.print("\nConnecting to MQTT...");
    while (!mqttClient.connect(clientId.c_str(), mqtt_username, mqtt_password)) {
      Serial.print(".");
      delay(1000);
    }
    Serial.println("\nMQTT Connected!");
  } else {
    // Make the library maintain our connection to the server
    mqttClient.loop();
  }
}

void setup() {
  Serial.begin(115200);

  // To use the RGB LED, we need to "start it" using these methodss
  strip.begin();            // Initialize LED pins for output
  strip.setBrightness(20);  // Avoid blinding yourself
  strip.setPixelColor(0, 255, 255, 0); // Yellow LED to show connecting
  strip.show(); // Update LED with new contents

  // start up the sensor
  if (! sht31.begin(0x44)) {
    Serial.println("Couldn't find SHT31");
    while (1) delay(1);
  }

  // Connect to wifi
  Serial.print("\nConnecting to Wifi");
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("\nWifi Connected!");

  
}

void loop() {
  stayConnectedToWifi();
  stayConnectedToMqtt();

  // if all is good, we'll set the RGB LED to be Green
  strip.setPixelColor(0, 0, 255, 0);
  strip.show();

  // Publish a message to a topic every 5 second.
  if (millis() - lastMillis > 250) {
    lastMillis = millis();

    // read sensors, but only if result is sensible
    bool sensorReadingDidWork = true;
    float temperature = sht31.readTemperature();
    if (isnan(temperature)) {  // check if 'is not a number'
      sensorReadingDidWork = false;
    }
    
    float humidity = sht31.readHumidity();
    if (isnan(humidity)) {  // check if 'is not a number'
      sensorReadingDidWork = false;
    }

    if( sensorReadingDidWork ) {
      // Contruct the topic we should post to
      String mqttTopicWeSendDataTo = "defaultTopic/";

      // Make each message a little different
      String jsonData = "{\"temp\":"+String(temperature)+",\"moist\":"+String(humidity)+"}";

      // Send that message to the server on the topic we just made
      mqttClient.publish(mqttTopicWeSendDataTo, jsonData);
      Serial.print("Sent to MQTT: ");
      Serial.println(jsonData);
    }
  }

  // Just wait a little before the next loop
  delay(10);
}