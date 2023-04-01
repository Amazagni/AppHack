import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image, ScrollView } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { greaterOrEq } from "react-native-reanimated";
import LocationMap from "./Map";

const BottomPanel = () => {
  // ref
  const bottomSheetModalRef = useRef(null);
  
  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  },[])

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  //<LocationMap/>

  // renders
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={(props) => {<CustomBackdrop {...props}/>}}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Nickname</Text>
            <Image style={styles.icon} source={require('../assets/icon.png')}></Image>
            <Text>Map completion: 70%</Text>
            <View style={styles.expBar}>
              <View style={styles.expProgress}></View>
            </View>
            <Text style={styles.levelText}>Level: 20</Text>
            <Button title="Achievements" color={"green"}>
            </Button>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 50
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    
  },
  expBar: {
    width: '70%',
    height: 15,
    backgroundColor: 'white',
    borderWidth: 2,
    marginBottom: 20
  },
  expProgress: {
    width: '70%',
    height: '100%',
    backgroundColor: 'orange'
  },
  icon: {
    height: 50,
    width: 50,
    marginBottom: 15

  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10
  },
  levelText: {
    fontSize: 25,
    marginBottom: 25
  },
  contentBackground: {
    height: '40%'
  }
});

export default BottomPanel;

import Animated, {
  Extrapolate,
  interpolate,
  interpolateColors,
} from 'react-native-reanimated';

const CustomBackdrop = ({ animatedIndex, style }) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
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

  return <Animated.View style={containerStyle} />;
};