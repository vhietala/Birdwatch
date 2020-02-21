import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';
import MyButton from './MyButton';

const setRarity = rarity => {
  if (rarity == 1) return 'Common';
  else if (rarity == 2) return 'Rare';
  else if (rarity == 3) return 'Extremely rare';
};

const ObservationItem = props => {
  return (
    <Card>
      <TouchableOpacity onPress={props.onOpen.bind(this, props.id)}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{props.name}</Text>
        </View>
        <View style={styles.cardItemContainer}>
          <View style={styles.textContainer}>
            <Text>{props.date.toString()}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text>{setRarity(props.rarity)}</Text>
          </View>
          <MyButton
            style={styles.delButton}
            onPress={props.onDelete.bind(this, props.id)}
          >
            "DEL"
          </MyButton>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  heading: {
    fontSize: 20
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    minWidth: '20%',
    justifyContent: 'center'
  },
  delButton: {
    justifyContent: 'center',
    backgroundColor: 'red'
  }
});
export default ObservationItem;
