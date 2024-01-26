import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EventList from '../../components/eventList/eventList';
import PostList from '../../components/postList/postList';

const styles = StyleSheet.create({
    baseContainer: {
      backgroundColor: '#fff',
      
    },
});


const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.baseContainer}>
      <View>
        <EventList/>
      </View>

      <Button
        title="test"
        onPress={() =>
          navigation.navigate('Profile', {test: "hello from home!"})
        }
      />
      <View>
        <PostList/>
      </View>
    </View>
  );
}


export default HomeScreen;