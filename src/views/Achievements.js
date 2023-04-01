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
import PointDetails from "../components/PointDetails/PointDetails";
import Achievement from "../components/achievement/Achievement";

const Achievements = () => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryNameContainer}>
        <Text style={styles.categoryName}>Kraków</Text>
        <Text>4/15</Text>
      </View>
      <Achievement
        imageSource={require("../../assets/icon.png")}
        achievementTitle="Achievement Name"
      />
      <Achievement
        imageSource={require("../../assets/icon.png")}
        achievementTitle="Achievement Name"
      />
      <Achievement
        imageSource={require("../../assets/icon.png")}
        achievementTitle="Achievement Name"
      />
      <Achievement
        imageSource={require("../../assets/icon.png")}
        achievementTitle="Achievement Name"
      />
      <View style={styles.categoryNameContainer}>
        <Text style={styles.categoryName}>Kraków</Text>
      </View>
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
    gap: 10,
    maxWidth: "90%",
    margin: "auto",
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 15,
  },
});

export default Achievements;
