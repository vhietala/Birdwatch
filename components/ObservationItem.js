import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';

const ObservationItem = props => {
  return (
    <Card>
      <View>
        <Text>{props.name}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({});
export default ObservationItem;
