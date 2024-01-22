import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EventList from '../../components/eventList/eventList';
import PostList from '../../components/postList/postList';

const styles = StyleSheet.create({
    baseContainer: {
      backgroundColor: '#fff',
      // alignItems: 'center',
      
    },
});


const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.baseContainer}>
      <View>

      <EventList/>
      </View>
      {/* <Text>Test</Text>

      <Button
        title="Login"
        onPress={() =>
          navigation.navigate('Login')
        }
      /> */}
      <View>
      <PostList/>
        
      </View>
    </View>
  );
}


export default HomeScreen;