import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});


const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>You have (undefined) friends.</Text>

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