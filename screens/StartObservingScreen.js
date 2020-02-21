import React, { useState, Component } from 'react';
import { View, StyleSheet, FlatList, AsyncStorage } from 'react-native';

import ObservationItem from '../components/ObservationItem';
import ObservationInput from '../components/ObservationInput';
import DetailedObservation from '../components/DetailedObservation';
import MyButton from '../components/MyButton';

const StartObservingScreen = props => {
  const [observations, setNewObservations] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isDetailedMode, setIsDetailedMode] = useState(false);

  const [selectedName, setSelectedName] = useState();
  const [selectedRarity, setSelectedRarity] = useState();
  const [selectedPicture, setSelectedPicture] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedNote, setSelectedNote] = useState();

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
    saveDataHandler();
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
    saveDataHandler();
  };

  const saveDataHandler = async () => {
    console.log('trying to save');
    let observationsForSaving = JSON.stringify(this.observations);
    try {
      let data = this.StaticRange.data;
      await AsyncStorage.setItem('data', JSON.stringify(data));
      await AsyncStorage.multiSet(observationsForSaving, () => {
        console.log('Saved data with multiset method');
      });
      console.log('Data saved in AsyncStorage');
    } catch (error) {
      console.log('Async storage set data error', error.message);
    }
  };

  const loadDataHandler = async () => {
    try {
      let data = await AsyncStorage.getItem('data');
      if (data === null) {
        data = this.initData;
        await AsyncStorage.setItem('data', JSON.stringify(data));
        this.ListeningStateChangedEvent({ data: data });
        return;
      }
      data = JSON.parse(data);
      this.setNewObservations({ data: data });
      let keys = this.observations;
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          let key = store[i][0]; //return one key
          let value = store[i][1]; //return value for key
          let multiGet = result; //return key and it's value
          console.log('result', result);
          console.log('key, value', key, value);
          // Now You can do something with result
        });
      });
      //console.log('Data got from AsyncStorage successfully');
    } catch (error) {
      console.log('AsyncStorage get data error', error.message);
    }
  };

  const detailedObservationHandler = observationId => {
    console.log(observationId);
    console.log(observations);
    let currentObservation = observations.filter(observation => {
      return observation.id === observationId;
    });
    const current = currentObservation[0];
    console.log('current' + current.name);
    setSelectedDate(current.date);
    setSelectedName(current.name);
    setSelectedPicture(current.picture);
    setSelectedNote(current.note);
    console.log('Rarity: ' + current.rarity);
    setSelectedRarity(current.rarity);
    console.log(selectedRarity);
    setIsDetailedMode(true);
  };

  const detailedObservationClosingHandler = () => {
    setIsDetailedMode(false);
  };

  return (
    <View style={styles.screen}>
      <MyButton style={styles.addButton} onPress={() => setIsAddMode(true)}>
        Add
      </MyButton>
      <ObservationInput
        visible={isAddMode}
        onAddObservation={addObservationHandler}
        onCancel={cancelObservationAdditionHandler}
      />
      <DetailedObservation
        date={selectedDate}
        name={selectedName}
        note={selectedNote}
        picture={selectedPicture}
        rarity={selectedRarity}
        visible={isDetailedMode}
        onRemoveObservation={removeObservationHandler}
        onClose={detailedObservationClosingHandler}
      />
      <View>
        <FlatList
          keyExtractor={(item, index) => item.id}
          async
          data={observations}
          renderItem={itemData => (
            <ObservationItem
              onOpen={loadDataHandler}
              id={itemData.item.id}
              onDelete={removeObservationHandler}
              name={itemData.item.name}
              rarity={itemData.item.rarity}
              date={itemData.item.date}
              picture={itemData.item.picture}
              onOpen={detailedObservationHandler}
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
    alignItems: 'center',
    backgroundColor: 'green'
  }
});

export default StartObservingScreen;
