import React, { useCallback, useMemo, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { greaterOrEq } from "react-native-reanimated";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

const Achievements = () => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryNameContainer}>
        <Text style={styles.categoryName}>Kraków</Text>
      </View>
      <Image
        style={styles.icon}
        source={require("../../assets/icon.png")}
      ></Image>
      <Image
        style={styles.icon}
        source={require("../../assets/icon.png")}
      ></Image>
      <Image
        style={styles.icon}
        source={require("../../assets/icon.png")}
      ></Image>
      <Image
        style={styles.icon}
        source={require("../../assets/icon.png")}
      ></Image>
      <Image
        style={styles.icon}
        source={require("../../assets/icon.png")}
      ></Image>
      <Image
        style={styles.icon}
        source={require("../../assets/icon.png")}
      ></Image>
      <Image
        style={styles.icon}
        source={require("../../assets/icon.png")}
      ></Image>
      <View style={styles.categoryNameContainer}>
        <Text style={styles.categoryName}>Kraków</Text>
      </View>
      <Image
        style={styles.icon}
        source={require("../../assets/icon.png")}
      ></Image>
      <Image
        style={styles.icon}
        source={require("../../assets/icon.png")}
      ></Image>
      <Image
        style={styles.icon}
        source={require("../../assets/icon.png")}
      ></Image>
      <Image
        style={styles.icon}
        source={require("../../assets/icon.png")}
      ></Image>
      <Image
        style={styles.icon}
        source={require("../../assets/icon.png")}
      ></Image>
      <Image
        style={styles.icon}
        source={require("../../assets/icon.png")}
      ></Image>
      <Image
        style={styles.icon}
        source={require("../../assets/icon.png")}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: 50,
  },
  icon: {
    height: 90,
    width: 90,
    margin: 5,
  },
  categoryName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  categoryNameContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: 15,
  },
});

export default Achievements;
