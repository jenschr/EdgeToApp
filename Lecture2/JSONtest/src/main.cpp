/*
Example of how to call a JSON API

To use this example, you'll need to:
- Change SSID and wifi password
- Register an account with OpenWeatherMap.org
- Confirm your email account
- Find your API key after logging into OpenWeatherMap.org
- Replace "YourApikeyGoesHere" with the key down in this code
*/

#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define USE_SERIAL Serial

WiFiMulti wifiMulti;

void setup() {
    USE_SERIAL.begin(115200);
    delay(500);
    wifiMulti.addAP("your-ssid-goes-here", "your-wifi-password-goes-here");
}

void loop() {
    if((wifiMulti.run() == WL_CONNECTED)) { // wait for WiFi connection
        HTTPClient http;
        http.begin("https://api.openweathermap.org/data/2.5/weather?q=Lisbon,pt&appid=YourApikeyGoesHere"); // Replace this last bit
        int httpCode = http.GET();

        if(httpCode > 0) { // httpCode will be negative on error
            if(httpCode == HTTP_CODE_OK) { // file found at server
                // This is where we receive the JSON data from the API we're using
                String payload = http.getString();
                Serial.println(payload);
                
                // This is where we paste in the code from the ArduinoJSON Assistant
                StaticJsonDocument<1024> doc;

                DeserializationError error = deserializeJson(doc, payload);

                if (error) {
                Serial.print("deserializeJson() failed: ");
                Serial.println(error.c_str());
                return;
                }

                float coord_lon = doc["coord"]["lon"]; // 10.7461
                float coord_lat = doc["coord"]["lat"]; // 59.9127

                JsonObject weather_0 = doc["weather"][0];
                int weather_0_id = weather_0["id"]; // 804
                const char* weather_0_main = weather_0["main"]; // "Clouds"
                const char* weather_0_description = weather_0["description"]; // "overcast clouds"
                const char* weather_0_icon = weather_0["icon"]; // "04d"

                const char* base = doc["base"]; // "stations"

                JsonObject main = doc["main"];
                float main_temp = main["temp"]; // 277.77
                float main_feels_like = main["feels_like"]; // 275.94
                int main_temp_min = main["temp_min"]; // 277
                float main_temp_max = main["temp_max"]; // 278.54
                int main_pressure = main["pressure"]; // 1016
                int main_humidity = main["humidity"]; // 100
                int main_sea_level = main["sea_level"]; // 1016
                int main_grnd_level = main["grnd_level"]; // 1013

                int visibility = doc["visibility"]; // 37

                JsonObject wind = doc["wind"];
                float wind_speed = wind["speed"]; // 2.13
                int wind_deg = wind["deg"]; // 192
                float wind_gust = wind["gust"]; // 7.55

                int clouds_all = doc["clouds"]["all"]; // 100

                long dt = doc["dt"]; // 1674637678

                JsonObject sys = doc["sys"];
                int sys_type = sys["type"]; // 2
                long sys_id = sys["id"]; // 237284
                const char* sys_country = sys["country"]; // "NO"
                long sys_sunrise = sys["sunrise"]; // 1674632805
                long sys_sunset = sys["sunset"]; // 1674659486

                int timezone = doc["timezone"]; // 3600
                long id = doc["id"]; // 3143244
                const char* name = doc["name"]; // "Oslo"
                int cod = doc["cod"]; // 200

                // Now we can use any of the objects above
                Serial.print("Temp in Lisbon, Portugal is currently: ");
                Serial.println(main_temp - 273.15);
            }
        } else {
            USE_SERIAL.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
        }
        http.end();
    }
    delay(15000);
}
