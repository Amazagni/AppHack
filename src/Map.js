// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/
// Import React
import React, { useEffect } from "react";
// Import required components
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useDispatch, connect, useSelector } from "react-redux";
import { fetchPoints, selectPoints } from "./store/slices/pointsSlice";
// Import Map and Marker
import MapView, { Marker } from "react-native-maps";
const LocationMap = () => {
  const dispatch = useDispatch();
  const { points, loading, error } = useSelector(selectPoints);

  useEffect(() => {
    dispatch(fetchPoints());
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 50.06272828419211,
            longitude: 19.93948443720206,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}
        >
          {!loading && points?.length > 0
            ? points.map((point) => {
                let discovered =
                  point.attributes.point_discoveries.data.length > 0;
                return (
                  <Marker
                    key={point.id}
                    icon={
                      discovered
                        ? require("../assets/yellowexcl.png")
                        : require("../assets/quest.png")
                    }
                    coordinate={{
                      latitude: point.attributes.Long,
                      longitude: point.attributes.Lat,
                    }}
                    title={point.attributes.Name}
                  />
                );
              })
            : null}
        </MapView>
      </View>
    </SafeAreaView>
  );
};
export default LocationMap;
const mapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mapStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
