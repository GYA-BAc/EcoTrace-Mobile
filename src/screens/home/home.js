import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EventList from '../../components/eventList/eventList';
import PostList from '../../components/postList/postList';
import BottomMenu from '../../components/bottomMenu/bottomMenu';

const styles = StyleSheet.create({
    baseContainer: {
      backgroundColor: '#fff',
      flexGrow: 1,
    },
});


const HomeScreen = () => {
  // const navigation = useNavigation();
  return (
    <View style={styles.baseContainer}>
      <EventList/>

      {/* <Button
        title="test"
        onPress={() =>
          navigation.navigate('Profile', {test: "hello from home!"})
        }
      /> */}
      <PostList/>

      <BottomMenu/>
    </View>
  );
}


export default HomeScreen;