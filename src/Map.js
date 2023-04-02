// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/
// Import React
import React, { useEffect, useState } from "react";
// Import required components
import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import { useDispatch, connect, useSelector } from "react-redux";
import {
  fetchPoints,
  selectPoints,
  setActivePoint,
  setLocation,
} from "./store/slices/pointsSlice";
// Import Map and Marker
import * as Location from "expo-location";

import MapView, { Marker } from "react-native-maps";
import ActiveQuest from "./ActiveQuest";
const LocationMap = (props) => {
  const dispatch = useDispatch();

  const { points, loading, error } = useSelector(selectPoints);

  useEffect(() => {
    dispatch(fetchPoints());
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      } else {
        let foregroundSubscrition = Location.watchPositionAsync(
          {
            // Tracking options
            accuracy: Location.Accuracy.High,
            distanceInterval: 10,
          },
          (location) => {
            console.log(location);
            dispatch(setLocation(location));
            /* Location object example:
              {
                coords: {
                  accuracy: 20.100000381469727,
                  altitude: 61.80000305175781,
                  altitudeAccuracy: 1.3333333730697632,
                  heading: 288.87445068359375,
                  latitude: 36.7384213,
                  longitude: 3.3463877,
                  speed: 0.051263172179460526,
                },
                mocked: false,
                timestamp: 1640286855545,
              };
            */
            // Do something with location...
          }
        );
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ ...styles.container }}>
        <ActiveQuest />
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 50.06272828419211,
            longitude: 19.93948443720206,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}
          showsUserLocation={true}
        >
          {!loading && points?.length > 0
            ? points.map((point) => {
                let discovered =
                  point.attributes.point_discoveries.data.length > 0;
                let isQuest = point.attributes.quest_points.data.length > 0;
                return (
                  <Marker
                    key={point.id}
                    onPress={() => {
                      dispatch(setActivePoint(point));
                    }}
                    coordinate={{
                      latitude: point.attributes.Long,
                      longitude: point.attributes.Lat,
                    }}
                    title={
                      discovered ? point.attributes.Name : "Nieodkryte miejsce"
                    }
                  >
                    {discovered ? (
                      <Image
                        source={{
                          uri: point.attributes.Image.data.attributes.url,
                        }}
                        style={{
                          height: 55,
                          width: 55,
                          borderRadius: 40,
                          borderWidth: 2,
                          borderColor: isQuest ? "orange" : "white",
                        }}
                      />
                    ) : (
                      <Image
                        source={require("../assets/quest.png")}
                        style={{
                          transform: [{ scale: 0.5 }],
                        }}
                      />
                    )}
                  </Marker>
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
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#193341",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c5a71",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#29768a",
      },
      {
        lightness: -37,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#406d80",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#406d80",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#3e606f",
      },
      {
        weight: 2,
      },
      {
        gamma: 0.84,
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        weight: 0.6,
      },
      {
        color: "#1a3541",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c5a71",
      },
    ],
  },
];
const styles = StyleSheet.create({
  container: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  mapStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
