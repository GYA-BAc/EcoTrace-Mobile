import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
    container: {
      width: "90%",
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 50,
    },
    title: {
      fontSize: 35,
      fontWeight: "bold"
    }
});


const Header = () => {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('currentUserID')
    } catch (error) {
      // TODO: add error case if localstorage fails
      throw "ClientError: could not remove currentUserID"
    }

    navigation.navigate("Login")
    navigation.reset({
      index: 0,
      routes: [{name: "Login"}]
    })
  }

  return (
    <View style={styles.container}>
        
      <TouchableOpacity
        onPress={() => {
          alert('Left');
        }}>
        <Text>Left</Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        EcoTrace
      </Text>
      
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>

    </View>
    )
}


export default Header;