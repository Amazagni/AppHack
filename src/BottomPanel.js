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
import LocationMap from "./Map";

const BottomPanel = () => {
  // ref
  const sheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );

  // renders
  return (
    <View style={styles.container}>
      <LocationMap />
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Nickname</Text>
          <Image
            style={styles.icon}
            source={require("../assets/icon.png")}
          ></Image>
          <Text>Map completion: 70%</Text>
          <View style={styles.expBar}>
            <View style={styles.expProgress}></View>
          </View>
          <Text style={styles.levelText}>Level: 20</Text>
          <Button title="Achievements" color={"green"}></Button>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 50,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  expBar: {
    width: "70%",
    height: 15,
    backgroundColor: "white",
    borderWidth: 2,
    marginBottom: 20,
  },
  expProgress: {
    width: "70%",
    height: "100%",
    backgroundColor: "orange",
  },
  icon: {
    height: 50,
    width: 50,
    marginBottom: 15,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  levelText: {
    fontSize: 25,
    marginBottom: 25,
  },
  contentBackground: {
    height: "45%",
  },
});

export default BottomPanel;
