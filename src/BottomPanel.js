import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
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
import { useSelector, connect } from "react-redux";

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { selectActivePoint } from "./store/slices/pointsSlice";
import PointDetails from "./components/PointDetails/PointDetails";

const BottomPanel = (props) => {
  const [toPos, setToPos] = useState(0);

  const currentPoint = useSelector(selectActivePoint);

  const sheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);
  const handleSheetAnimate = useCallback(
    (from, to) => {
      setToPos(snapPoints[to]);
      console.log("handleSheetAnimate", { from, to });
    },
    [snapPoints]
  );

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  useEffect(() => {
    if (currentPoint !== null) sheetRef.current.expand();
  }, [currentPoint]);

  // renders
  return (
    <View style={styles.container}>
      <LocationMap style={{ height: toPos }} />
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
        onAnimate={handleSheetAnimate}
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
          <PointDetails />
          <Button
            onPress={() => {
              props.navigation.navigate("Achievements");
            }}
            title="Achievements"
            color={"green"}
          ></Button>
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

export default connect()(BottomPanel);

const CustomBackdrop = ({ animatedIndex, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(
      animatedIndex.value,
      [0, 1],
      [700, 500],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#a8b5eb",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return (
    <Animated.View style={containerStyle}>
      <LocationMap />
    </Animated.View>
  );
};
