
// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/
// Import React
import React, { useEffect } from "react";
// Import required components
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useDispatch, connect, useSelector } from "react-redux";
import { fetchPoints, selectPoints } from "./store/slices/pointsSlice";
// Import Map and Marker
import MapView, { Marker } from "react-native-maps";

const ActiveQuest = () => {

  //useEffect(() => {
  //  dispatch(fetchPoints());
  //}, []);

  return (
    <View style={styles.box}>
    </View>
  );
};
export default ActiveQuest;

const styles = StyleSheet.create({
    box: {
        height: 100,
        width: 100,
        backgroundColor: "red",
    }
  });
