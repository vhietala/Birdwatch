import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Picker
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ObservationInput = props => {
  const [birdName, setBirdName] = useState('');
  const [birdRarity, setBirdRarity] = useState('');
  const [birdNote, setBirdNote] = useState('');
  const [birdPicture, setBirdPicture] = useState('');
  const [birdDate, setBirdDate] = useState('');
  const [image, setImage] = useState(null);

  const updateRarityHandler = rarity => {
    setBirdRarity(rarity);
  };

  const observationInputHandler = birdName => {
    setBirdName(birdName);
    dateHandler();
  };

  const observationNoteInputHandler = birdNote => {
    setBirdNote(birdNote);
  };

  const dateHandler = () => {
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    setBirdDate(date + '/' + month + '/' + year + ' ' + hours + ':' + min);
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
    setBirdRarity(1);
    setBirdNote('');
    setBirdPicture('');
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setBirdPicture({ image: result.uri });
    }
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.screen}>
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
          <Button
            title="Pick image"
            onPress={_pickImage}
            style={styles.imageButton}
          />
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <View style={styles.buttonContailer}>
            <View style={styles.button}>
              <Button title="CANCEL" color="red" onPress={props.onCancel} />
            </View>
            <View style={styles.button}>
              <Button title="SAVE" onPress={addObservationHandler} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  inputContainer: {
    flex: 1,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
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
  imageButton: {
    flex: 1,
    margin: 15
  },
  buttonContailer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    height: '50%',
    marginVertical: 15
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
