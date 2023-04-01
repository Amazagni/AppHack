import React, { useCallback, useMemo, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectActivePoint } from "../../store/slices/pointsSlice";
import LottieView from "lottie-react-native";

export function useLottieAnim() {
  const animation = useRef(null);

  useEffect(() => {
    if (animation.current) {
      animation.current.play();
    }
    return () => {
      animation.current && animation.current.reset();
    };
  }, []);

  return animation;
}

const PointDetails = (props) => {
  const lottieRef = useRef(null);

  const currentPoint = useSelector(selectActivePoint);

  if (!currentPoint) return null;

  const discovered = currentPoint.attributes.point_discoveries.data.length > 0;

  return (
    <View style={styles.container}>
      {discovered ? (
        <Image
          source={{ uri: currentPoint.attributes.Image.data.attributes.url }}
          style={{ width: 150, height: 150 }}
        ></Image>
      ) : (
        <Image
          source={require("../../../assets/quest.png")}
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
          resizeMethod="resize"
        ></Image>
      )}

      <Text> {currentPoint.attributes.Name || "TEST"} </Text>
      <Text> {currentPoint.isClose && "KURWA BLISKO"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default PointDetails;
