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
import QuestComponent from "../components/questCard/questComponent";
import { selectquests } from "../store/slices/questSlice";
import { useSelector } from "react-redux";

const Achievements = () => {
  const { quests, loading, error } = useSelector(selectquests);
  console.log(quests);
  return (
    <View style={{ ...StyleSheet.absoluteFill, marginTop: 20 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.categoryNameContainer}>
          <Text style={styles.categoryName}>Kraków</Text>
          <Text>4/15</Text>
        </View>
        <View style={styles.achievementsContainer}>
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
        </View>
        <View style={styles.categoryNameContainer}>
          <Text style={styles.categoryName}>Zadania</Text>
        </View>

        {quests.map((quest) => (
          <QuestComponent
            key={quest.id}
            imageSource={require("../../assets/icon.png")}
            title={quest.attributes.Name}
            description="Complete all the challenges to earn the ultimate reward!"
            points="100"
          />
        ))}
      </ScrollView>
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
  achievementsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
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
    width: "80%",
    marginTop: 15,
    alignSelf: "center",
  },
});

export default Achievements;
