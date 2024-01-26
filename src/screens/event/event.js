import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useNavigation, useState} from '@react-navigation/native';

import EventList from '../../components/eventList/eventList';
import PostList from '../../components/postList/postList';

const styles = StyleSheet.create({
    baseContainer: {
      backgroundColor: '#fff',
      
    },
});


const EventView = ({route}) => {
//   const navigation = useNavigation();
  // console.log(route)

  return (
    <View style={styles.baseContainer}>
      <Text>{route.params.test}</Text>
    </View>
  );
}


export default EventView;