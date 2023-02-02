/*
 Very simple example to show that HTTP Requests are hard
 to get right and that it's better to use the dedicated
 library for the purpose of REST services
 */

#include <WiFi.h>
#include <WiFiMulti.h>

const char* ssid     = "your-ssid-goes-here";
const char* password = "your-wifi-password-goes-here";

WiFiMulti WiFiMulti;

void setup()
{
    Serial.begin(115200);
    delay(10);

    // We start by connecting to a WiFi network
    WiFiMulti.addAP(ssid, password);

    Serial.println();
    Serial.println();
    Serial.print("Waiting for WiFi... ");

    while(WiFiMulti.run() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    delay(500);
}


void loop()
{
    const uint16_t port = 80;
    const char * host = "setcolor.at"; // ip or dns

    Serial.print("Connecting to ");
    Serial.println(host);

    // Use WiFiClient class to create TCP connections
    WiFiClient client;

    if (!client.connect(host, port)) {
        Serial.println("Connection failed.");
        Serial.println("Waiting 5 seconds before retrying...");
        delay(5000);
        return;
    }

    // These two variants will return status 200, but no page is returned
    //client.print("GET / HTTP/1.1\r\nHost: setcolor.at\r\n\r\n");
    //client.print("GET / HTTP/1.0\r\n\r\n");

    // This line will used the first HTTP standard (0.9) and it'll just work
    client.print("GET / \r\n\r\n");

  int maxloops = 0;

  //wait for the server's reply to become available
  while (!client.available() && maxloops < 1000)
  {
    maxloops++;
    delay(1); //delay 1 msec
  }
  if (client.available() > 0)
  {
    //read back one line from the server
    String line = client.readStringUntil('\r');
    Serial.println(line);
  }
  else
  {
    Serial.println("client.available() timed out ");
  }

    Serial.println("Closing connection.");
    client.stop();

    Serial.println("Waiting 15 seconds before restarting...");
    delay(15000);
}