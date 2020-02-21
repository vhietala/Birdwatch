import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

import Header from './components/Header';
import StartObservingScreen from './screens/StartObservingScreen';

export default function App() {
  return (
    <View style={styles.screen}>
      <Header title="Birdwatch" />
      <StartObservingScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
