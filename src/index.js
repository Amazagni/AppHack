import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, connect, useSelector } from "react-redux";
import { fetchPoints, selectPoints } from "./store/slices/pointsSlice";

function Index() {
  const dispatch = useDispatch();
  const { points, loading, error } = useSelector(selectPoints);

  useEffect(() => {
    console.log("test");

    dispatch(fetchPoints());
  }, []);
  return (
    <View className="App">
      {error ? <Text> error</Text> : <Text>huuj </Text>}
      <Text> assd </Text>
    </View>
  );
}

export default connect()(Index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
