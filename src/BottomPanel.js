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
  Animated,
} from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { greaterOrEq, FadeInDown } from "react-native-reanimated";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import LocationMap from "./Map";
import { useSelector, connect, useDispatch } from "react-redux";
import ActiveQuest from "./ActiveQuest";
import { selectUser } from "./store/slices/userSlice";

//import Animated, {
//  Extrapolate,
//  interpolate,
//  useAnimatedStyle,
//} from "react-native-reanimated";
import {
  markPointAsDiscovered,
  selectActivePoint,
} from "./store/slices/pointsSlice";
import PointDetails from "./components/PointDetails/PointDetails";
import { TouchableOpacity } from "react-native-gesture-handler";

const BottomPanel = (props) => {
  const [toPos, setToPos] = useState(0);

  const currentPoint = useSelector(selectActivePoint);

  const sheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);
  const handleSheetAnimate = useCallback(
    (from, to) => {
      setToPos(snapPoints[to]);
    },
    [snapPoints]
  );

  const handleSheetChange = useCallback((index) => {}, []);

  useEffect(() => {
    if (currentPoint !== null) sheetRef.current.expand();
  }, [currentPoint]);

  const { user, loading, error } = useSelector(selectUser);
  //console.log(user)

  let a = currentPoint.isClose;
  const discovered = currentPoint.attributes.point_discoveries.data.length > 0;

  // renders
  return (
    <View style={styles.container}>
      <ActiveQuest style={styles.questStyle} />

      <LocationMap style={{ height: toPos }} navigation={props.navigation} />
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        onAnimate={handleSheetAnimate}
      >
        <Animated.View style={styles.contentContainer}>
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
          {currentPoint.isClose &&
          currentPoint.attributes.point_discoveries.data.length === 0 ? (
            <PopButton />
          ) : null}

          <PointDetails />
        </Animated.View>
      </BottomSheet>
    </View>
  );
};
// currentPoint.isClose && currentPoint.attributes.point_discoveries.data.length > 0
const PopButton = () => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(markPointAsDiscovered());
      }}
      style={styles.popView}
    >
      <Text style={styles.popViewText}>ODKRYJ</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 50,
    position: "relative",
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

    justifyContent: "center",
    alignItems: "center",
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
    height: 50,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    borderRadius: 10,

    zIndex: 2000,
  },
  popViewText: {
    color: "white",
    textAlign: "center",
    width: 150,
  },
});

export default connect()(BottomPanel);
