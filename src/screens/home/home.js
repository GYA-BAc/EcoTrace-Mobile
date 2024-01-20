import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EventList from '../../components/eventList/eventList';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
    },
});


const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <EventList/>
      <Text>Test</Text>

      <Button
        title="Login"
        onPress={() =>
          navigation.navigate('Login')
        }
      />
    </View>
  );
}


export default HomeScreen;