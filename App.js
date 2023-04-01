// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/
// Import React
import React from 'react';
// Import required components
import {SafeAreaView, StyleSheet, View} from 'react-native';
// Import Map and Marker
import MapView, {Marker} from 'react-native-maps';
import LocationMap from './src/Map'
import BottomPanel from './src/BottomPanel';

const App = () => {
  return (
    <View>
        <LocationMap />
        <BottomPanel />
    </View>
  );
};
export default App;