import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import App from "./src/App";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.jsx to start working on your DUPA!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
