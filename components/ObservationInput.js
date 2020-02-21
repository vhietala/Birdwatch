import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Picker
} from 'react-native';

const ObservationInput = props => {
  const [birdName, setBirdName] = useState('');
  const [birdRarity, setBirdRarity] = useState('');
  const [birdNote, setBirdNote] = useState('');
  const [birdPicture, setBirdPicture] = useState('');
  const [birdDate, setBirdDate] = useState('');

  const updateRarityHandler = rarity => {
    setBirdRarity(rarity);
  };

  const observationInputHandler = birdName => {
    setBirdName(birdName);
  };

  const observationNoteInputHandler = birdNote => {
    setBirdNote(birdNote);
  };

  const dateHandler = () => {
    const date = new Date().getDate();
    setBirdDate(date);
  };

  const addObservationHandler = () => {
    dateHandler();
    props.onAddObservation(
      birdName,
      birdRarity,
      birdNote,
      birdPicture,
      birdDate
    );
    setBirdName('');
    setBirdRarity('1');
    setBirdNote('');
    setBirdPicture('');
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Bird name"
          style={styles.input}
          onChangeText={observationInputHandler}
          value={birdName}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={birdRarity}
            onValueChange={updateRarityHandler}
          >
            <Picker.Item label="Common" value={1} />
            <Picker.Item label="Rare" value={2} />
            <Picker.Item label="Extremely Rare" value={3} />
          </Picker>
        </View>
        <View>
          <TextInput
            placeholder="Note"
            style={styles.noteInput}
            onChangeText={observationNoteInputHandler}
            value={birdNote}
            multiline={true}
          />
        </View>
        <View style={styles.buttonContailer}>
          <View style={styles.button}>
            <Button title="CANCEL" color="red" onPress={props.onCancel} />
          </View>
          <View style={styles.button}>
            <Button title="SAVE" onPress={addObservationHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },
  noteInput: {
    borderWidth: 1,
    minWidth: '80%',
    minHeight: '30%',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  buttonContailer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    height: '50%'
  },
  button: {
    width: '40%'
  },
  pickerContainer: {
    width: 150,
    borderWidth: 1,
    marginBottom: 15
  }
});
export default ObservationInput;
