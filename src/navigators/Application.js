import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

import MapView from "../views/MapView";
import Achievements from "../views/Achievements";
//import { useFlipper } from '@react-navigation/devtools';
const Stack = createStackNavigator();
// @refresh reset
const ApplicationNavigator = () => {
  const navigationRef = useNavigationContainerRef();
  //useFlipper(navigationRef);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MapView" component={MapView} />
          <Stack.Screen name="Achievements" component={Achievements} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default ApplicationNavigator;
