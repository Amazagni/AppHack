// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/
// Import React
import React, { useEffect } from "react";
// Import required components
import { SafeAreaView, StyleSheet, View, Image, Text} from "react-native";
import { useDispatch, connect, useSelector } from "react-redux";
import { fetchPoints, selectPoints } from "./store/slices/pointsSlice";
// Import Map and Marker
import MapView, { Marker } from "react-native-maps";
import { fetchquests, selectquests } from "./store/slices/questSlice";

import {selectActiveQuest} from "./store/slices/questSlice"

const ActiveQuest = () => {
  const dispatch = useDispatch();

  const { quests, loading, error } = useSelector(selectquests);
  useEffect(() => {
    dispatch(fetchquests());
  }, []);

  const activeQuest = useSelector(selectActiveQuest);
  return (<View style={styles.box}>
    <Image style={styles.icon} 
    source={activeQuest ? require('../assets/yellowexcl.png') : require('../assets/excl.png')}>
    </Image>
    <Text style={{marginTop: 12, marginLeft: 12, marginRight: 25, fontWeight: "bold"}}>
        {activeQuest ? activeQuest.attributes.Name : "Brak aktywnego"}
    </Text>
  </View>);
};
export default ActiveQuest;

//source={
//    discovered
//      ? require("../assets/yellowexcl.png")
//      : require("../assets/quest.png")
//  }

const styles = StyleSheet.create({
  box: {
    height: '5%',
    width: "auto",
    backgroundColor: "red",
    position: "absolute",
    top: 50,
    left: -10,
    zIndex: 69,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
  icon: {
    height: 40,
    width : 30,
    position: "relative",
    marginLeft: 15
  }
});
