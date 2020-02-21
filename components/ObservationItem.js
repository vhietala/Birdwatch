import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Card from './Card';

const ObservationItem = props => {
  return (
    <Card>
      <View style={styles.cardItemContainer}>
        <Text>{props.date}</Text>
        <Text>{props.name}</Text>
        <Button
          title="delete"
          color="red"
          onPress={props.onDelete.bind(this, props.id)}
        ></Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardItemContainer: {
    flex: 1,
    flexDirection: 'row'
  }
});
export default ObservationItem;
