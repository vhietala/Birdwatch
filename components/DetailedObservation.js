import React from 'react';
import { View, StyleSheet, Modal, Text, Button, Image } from 'react-native';

const DetailedObservation = props => {
  console.log('Pic:' + props.picture);
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.screen}>
        <Text style={styles.heading}>{props.name}</Text>
        <View style={styles.imageContainer}>
          {/*             <Image
              source={{ uri: props.picture }}
              style={styles.image}
              resizeMode="cover"
            /> */}
        </View>
        <Text>{props.date}</Text>
        <Text>{props.note}</Text>
        <Button title="CLOSE" onPress={props.onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  }
});
export default DetailedObservation;
