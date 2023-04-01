import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const QuestComponent = ({ imageSource, title, description, points }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{points}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#444",
  },
  pointsContainer: {
    backgroundColor: "#f7c81e",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
  },
  points: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default QuestComponent;
