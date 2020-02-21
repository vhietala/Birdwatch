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

  updateRarity = rarity => {
    this.setBirdRarity(rarity);
  };

  const observationInputHandler = birdName => {
    setBirdName(birdName);
  };

  const observationNoteInputHandler = birdNote => {
    setBirdNote(birdNote);
  };

  const addObservationHandler = () => {
    props.onAddObservation(birdName, birdRarity, birdNote, birdPicture);
    setBirdName('');
    setBirdRarity('common');
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

        <Picker selectedValue={birdRarity} onValueChange={updateRarity}>
          <Picker.Item label="Common" value="common" />
          <Picker.Item label="Rare" value="rare" />
          <Picker.Item label="Extremely Rare" value="extremely rare" />
        </Picker>
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
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },
  noteInput: {},
  buttonContailer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    height: '50%'
  },
  button: {
    width: '40%'
  }
});
export default ObservationInput;
