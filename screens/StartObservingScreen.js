import React, { useState } from 'react';
import { Button, View, StyleSheet, FlatList } from 'react-native';

import ObservationItem from '../components/ObservationItem';
import ObservationInput from '../components/ObservationInput';
import MyButton from '../components/MyButton';

const StartObservingScreen = props => {
  const [observations, setNewObservations] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addObservationHandler = (
    birdName,
    birdRarity,
    birdNote,
    birdPicture,
    birdDate
  ) => {
    if (birdName.length === 0) {
      return;
    }
    setNewObservations(currentObservations => [
      ...currentObservations,
      {
        id: Math.random().toString(),
        name: birdName,
        rarity: birdRarity,
        note: birdNote,
        picture: birdPicture,
        date: birdDate
      }
    ]);
    setIsAddMode(false);
  };

  const cancelObservationAdditionHandler = () => {
    setIsAddMode(false);
  };

  const removeObservationHandler = observationId => {
    setNewObservations(currentObservations => {
      return currentObservations.filter(
        observation => observation.id !== observationId
      );
    });
  };

  return (
    <View style={styles.screen}>
      <MyButton style={styles.addButton} onPress={() => setIsAddMode(true)}>
        Add Observation
      </MyButton>
      <ObservationInput
        visible={isAddMode}
        onAddObservation={addObservationHandler}
        onCancel={cancelObservationAdditionHandler}
      />
      <View>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={observations}
          renderItem={itemData => (
            <ObservationItem
              id={itemData.item.id}
              onDelete={removeObservationHandler}
              name={itemData.item.name}
              rarity={itemData.item.rarity}
              date={itemData.item.date}
              picture={itemData.item.picture}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20
  },
  addButton: {
    backgroundColor: 'green'
  }
});

export default StartObservingScreen;
