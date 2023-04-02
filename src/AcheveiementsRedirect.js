// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/
// Import React
import React, { useEffect } from "react";
// Import required components
import { SafeAreaView, StyleSheet, View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const AchievementsRedirect = (props) => {
  return (
    <View style={styles.box}>
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row", display: "flex" }}
        onPress={() => {
          props.navigation.navigate("Achievements");
        }}
      >
        <Text
          style={{
            marginTop: 12,
            marginLeft: 12,
            marginRight: 12,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {"Osiągnięcia"}
        </Text>
        <Image
          style={styles.icon}
          source={require("../assets/badge.png")}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};
export default AchievementsRedirect;

//source={
//    discovered
//      ? require("../assets/yellowexcl.png")
//      : require("../assets/quest.png")
//  }

const styles = StyleSheet.create({
  box: {
    height: "5%",
    width: "auto",

    position: "absolute",
    top: 50,
    right: -5,
    zIndex: 69,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "green",
    color: "white",
  },
  icon: {
    height: 40,
    width: 30,
    position: "relative",
    marginLeft: 10,
    marginRight: 10,
    transform: [{ scale: 0.9 }],
  },
});
