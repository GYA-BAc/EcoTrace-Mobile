import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { fetchWithTimeout } from '../../Utils';
// import { RCTNetworkingAndroid } from 'react-native/Libraries/Network/RCTNetworking.android';
// import { RCTNetworking } from 'react-native/Libraries/Network/RCTNetworking.ios';
import 'react-native/Libraries/Network/RCTNetworking'
import RCTNetworking, { RCTNetworkingAndroid } from 'react-native/Libraries/Network/RCTNetworking.android';
// import { RCTNetworking } from 'react-native/Libraries/Network/RCTNetworking.ios';

// import 'react-native/Libraries/Network/RCTNetworking'

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
  // console.log(RCTNetworkingAndroid)
  const logout = async () => {

    fetchWithTimeout(`${process.env.EXPO_PUBLIC_API_URL}/auth/logout`).then(
      (res) => {
        console.log(res.status)

        if (!res.ok) {
          // TODO: add bad case where server fails
          console.log(res.status)
        }
        // return res.json()
      }
    ).catch(
      // TODO: handle ios case
      () => {RCTNetworking.clearCookies()}
    )

    try {
      await AsyncStorage.removeItem('currentUserID')
    } catch (error) {
      // TODO: add error case if localstorage fails
      // throw "ClientError: could not remove currentUserID"
      console.log(error)
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