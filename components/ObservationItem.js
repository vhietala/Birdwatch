import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import MyButton from './MyButton';

const ObservationItem = props => {
  return (
    <Card>
      <View style={styles.cardItemContainer}>
        <View style={styles.textContainer}>
          <Text>{props.date.toString()}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text>{props.name}</Text>
        </View>

        <MyButton color="red" onPress={props.onDelete.bind(this, props.id)}>
          "DEL"
        </MyButton>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardItemContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-evenly'
  }
});
export default ObservationItem;
