import React, { useState } from 'react';
import { Button, View, StyleSheet, FlatList } from 'react-native';

import ObservationItem from '../components/ObservationItem';
import ObservationInput from '../components/ObservationInput';

const StartObservingScreen = props => {
  const [observations, setNewObservation] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addObservationHandler = (
    birdName,
    birdRarity,
    birdNote,
    birdPicture
  ) => {
    if (birdName.length === 0) {
      return;
    }
    setNewObservation(currentObservations => [
      ...currentObservations,
      {
        id: Math.random().toString(),
        name: birdName,
        rarity: birdRarity,
        note: birdNote,
        picture: birdPicture
      }
    ]);
    setIsAddMode(false);
  };

  const cancelObservationAdditionHandler = () => {
    setIsAddMode(false);
  };

  const removeObservationHandler = observationId => {
    setObservations(currentObservations => {
      return currentObservations.filter(
        observation => observation.id !== observationId
      );
    });
  };

  return (
    <View style={styles.screen}>
      <Button
        title="Add Observation"
        color="green"
        onPress={() => setIsAddMode(true)}
      />
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
  }
});

export default StartObservingScreen;
