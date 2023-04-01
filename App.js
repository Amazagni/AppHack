import { StatusBar } from "expo-status-bar";
import { store, persistor } from "./src/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/
// Import React
import React from "react";
// Import required components
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
// Import Map and Marker
import MapView, { Marker } from "react-native-maps";
import LocationMap from "./src/Map";
import BottomPanel from "./src/BottomPanel";
import { registerRootComponent } from "expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        {/* <View style={styles.container}>
          <Index />
        </View> */}
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomPanel />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};
export default App;
