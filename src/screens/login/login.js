import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});


const Login = () => {

  const navigation = useNavigation();

  const [data, setData] = useState([{}])

  useEffect( () => {
    // fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
    //   method: "POST",
    //   headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, 
    //   body: JSON.stringify({'username': 'asdf', 'password': 'asdf'})
    // }).then(
    //   res => res.json()
    // )


    fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/fetchUserData`).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])


  return (
    <View style={styles.container}>
    <Text>Login Here</Text>
    </View>
  );
}


export default Login;