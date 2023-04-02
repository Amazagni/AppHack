import React, { useRef, useCallback, useMemo } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Layout } from "react-native-reanimated";

const Achievement = ({ imageSource, achievementTitle, style, ...props }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{ alignItems: "center" }}
      >
        <View style={styles.imageContainer}>
          <Image
            resizeMode="repeat"
            source={imageSource}
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>{achievementTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5,
    flexGrow: 2,
    maxWidth: "45%",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
});

export default Achievement;
