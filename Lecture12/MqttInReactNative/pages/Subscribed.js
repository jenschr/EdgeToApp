import React from "react";
import MQTT from "@openrc/react-native-mqtt";

import {
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Platform,
  View,
  SafeAreaView,
} from "react-native";

// These two vars must live here to survive Reactive refreshes
let MqttClient;
let messageLog;

function Subscribed({ navigation, route }) {
  const [status, setStatus] = React.useState([""]);
  const [subscribed, setSubscribed] = React.useState(false);
  const [currentMessage, setMessageText] = React.useState("");

  // Make React Native only connect/disconnect when this page comes into foucs
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      console.log("focus");
      connectAndSubscribe();
    });

    navigation.addListener("blur", () => {
      console.log("blur " + MqttClient);
      unsubscribe();
    });
  }, [navigation]);

  const unsubscribe = () => {
    if (MqttClient && subscribed) {
      MqttClient.unsubscribe(
        "presence/" + route.params.userName,
        function (err) {
          if (!err) {
            console.log("Unsubscribe error " + err);
          }
          MqttClient.end();
        }
      );
    }
    setSubscribed(false);
  };

  const handleMessage = (topic, message) => {
    console.log("message to " + topic + ": " + message);
    const newMessage = topic + ": " + message + "\n";
    setMessageText((prevText) => [newMessage, ...prevText]);
  };

  const connectAndSubscribe = () => {
    setStatus("Connecting");
    MqttClient = MQTT.connect("ws://" + route.params.serverPath + "/mqtt", {
      port: route.params.serverPort,
      protocol: "ws",
      username: route.params.userName,
      password: route.params.userPass,
      reconnectPeriod: 30 * 1000,
      qos: 2,
    });

    MqttClient.on("closed", function () {
      setStatus("Disconnected");
    });

    MqttClient.on("offline", function () {
      setStatus("Offline");
    });

    MqttClient.on("error", function (msg) {
      setStatus("Error: " + msg);
    });

    MqttClient.on("disconnect", function (msg) {
      setStatus("disconnect");
    });

    MqttClient.on("reconnect", function (msg) {
      setStatus("reconnect");
    });

    MqttClient.on("connect", function () {
      setStatus("Connected");
      MqttClient.subscribe("presence/" + route.params.userName, function (err) {
        if (!err) {
          setSubscribed(true);
          MqttClient.publish("presence/" + route.params.userName, "alive");
        }
      });
    });

    MqttClient.on("message", function (topic, message) {
      handleMessage(topic, message);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pads}>
        <Text>
          Status: {status} to {route.params.serverPath}
        </Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={10}
          editable={false}
        >
          {currentMessage}
        </TextInput>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  pads: {
    flex: 1,
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: "10%",
  },
  input: {
    backgroundColor: "white",
    height: 240,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Subscribed;
