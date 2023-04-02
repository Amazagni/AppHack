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
  Animated
} from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { greaterOrEq } from "react-native-reanimated";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import LocationMap from "./Map";
import { useSelector, connect } from "react-redux";
import ActiveQuest from "./ActiveQuest";
import { selectUser } from "./store/slices/userSlice";

//import Animated, {
//  Extrapolate,
//  interpolate,
//  useAnimatedStyle,
//} from "react-native-reanimated";
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

  const {user, loading, error} = useSelector(selectUser);
  //console.log(user)

  let a = currentPoint.isClose;
  const discovered = currentPoint.attributes.point_discoveries.data.length > 0;
  console.log(user);

  // renders
  return (
    <View style={styles.container}>
      <ActiveQuest style={styles.questStyle} />
      <PopButton/>
      <LocationMap style={{ height: toPos }} navigation={props.navigation} />
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        onAnimate={handleSheetAnimate}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>
            {user ? user.attributes.Name : "..."}
          </Text>
          <Image
            style={styles.icon}
            source={require("../assets/kot.jpg")}
          ></Image>

          <Text>Ukończenie mapy: 27%</Text>
          <View style={styles.expBar}>
            <View style={styles.expProgress}></View>
          </View>
          <Text style={styles.levelText}>
            Poziom: {user ? (user.attributes.Experience || 250) / 10 : "..."}
          </Text>
          <PointDetails />
        </View>
      </BottomSheet>
    </View>
  );
};
// currentPoint.isClose && currentPoint.attributes.point_discoveries.data.length > 0
const PopButton = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const currentPoint = useSelector(selectActivePoint)

  // useEffect(() => {
  //   Animated.timing(
  //     animatedValue,
  //     {
  //       toValue: 1,
  //       duration: 1000,
  //       useNativeDriver: true //Add this line if you're using RN > 0.62
  //     }
  //   ).start();
  // }, [animatedValue]);

  // const op = animatedValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, 1],
  // });

  return (
    <View style={styles.popView}>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 50,
    position: "relative"
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
    width: "27%",
    height: "100%",
    backgroundColor: "orange",
  },
  icon: {
    height: 80,
    width: 80,
    marginBottom: 15,
    borderRadius: 100,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  levelText: {
    fontSize: 25,
    marginBottom: 10,
  },
  contentBackground: {
    height: "45%",
  },
  questStyle: {
    position: "absolute",
  },
  popView: {
    height: "15%", 
    width: "100%", 
    position: "absolute", 
    backgroundColor:"black", 
    zIndex: 2000
  }
});

export default connect()(BottomPanel);
