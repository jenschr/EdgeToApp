import React from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  StatusBar,
  Platform,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";

// Here we setup the server values and we then pass them via the navigator to the next page
// https://aboutreact.com/react-native-pass-value-from-one-screen-to-another-using-react-navigation/
function Setup({ navigation }) {
  const [serverPath, onChangeServerPath] = React.useState(
    "mqtt.toytronics.com"
  );
  const [serverPort, onChangeServerPort] = React.useState("8883");
  const [userName, onChangeUserName] = React.useState("YourUserName");
  const [userPass, onChangeUserPass] = React.useState("YourPassword");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pads}>
        <Text>Your username</Text>
        <TextInput
          autoFocus={true}
          style={styles.input}
          onChangeText={onChangeUserName}
          value={userName}
        />
        <Text>Your password</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUserPass}
          value={userPass}
          secureTextEntry={true}
          textContentType="password"
          autoComplete="password"
        />
        <Text>MQTT Server (Websockets)</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeServerPath}
          value={serverPath}
        />
        <Text>MQTT Port</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeServerPort}
          value={serverPort}
        />
        <Pressable
          style={styles.butt}
          title="Connect"
          onPress={() =>
            navigation.navigate("SecondPage", {
              serverPath: serverPath,
              serverPort: serverPort,
              userName: userName,
              userPass: userPass,
            })
          }
        >
          <Text>Connect</Text>
        </Pressable>
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  butt: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderRadius: 20,
    borderColor: "#CCC",
    borderWidth: 2,
    backgroundColor: "#FFF",
  },
});

export default Setup;
