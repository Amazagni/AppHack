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

  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        lottieRef.current?.reset();
        lottieRef.current?.play();
      }, 100);
    }
  }, [lottieRef.current]);
  const animation = useLottieAnim();
  const currentPoint = useSelector(selectActivePoint);

  if (!currentPoint) return null;

  const discovered = currentPoint.attributes.point_discoveries.data.length > 0;

  console.log(currentPoint.attributes);

  return (
    <View style={styles.Container}>
    <View style={{height: 3, width: "90%", backgroundColor: "black", marginBottom: 10}}></View>
    
    {discovered ? (
         <Image
           source={{ uri: currentPoint.attributes.Image.data.attributes.url }}
           style={styles.image}
         ></Image>
       ) : (
         <Image
           source={require("../../../assets/quest.png")}
           style={styles.image}
           resizeMode="contain"
           resizeMethod="resize"
         ></Image>
       )}    
    
    <Text style={styles.title}>{currentPoint.attributes.Name}</Text>
    <Text style={styles.description}>{currentPoint.attributes.Description}</Text>
    </View>
  )
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
    borderRadius: 50
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
  Container: {
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
    height: "50%",
    padding: 10
  },
  image: {
    width: 200, 
    height: 200, 
    borderRadius: 100, 
    borderWidth: 3, 
    borderColor: "black"
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  description: {
  }
});

export default PointDetails;
