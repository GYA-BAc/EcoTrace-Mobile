import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: "center"
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      letterSpacing: 2,
      paddingBottom: 50
    },
    loginContainer: {
      width: "70%",
    },
    credentials: {
      alignItems: "center",
    },
    textInput: {
      width: "100%",
      height: 50,
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 10,
      marginBottom: 50,
      paddingLeft: 5
    },
    actions: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      width: "45%",
      borderColor: "#000",
      borderWidth: 2,
      borderRadius: 5,
      height: 75,
      alignItems: 'center',
      justifyContent: 'center',
    }
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

    fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/logout`).then(
      (res) => {
        if (!res.ok) {
          console.log(res.status)
          return
        }
        return res.json()
      }
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )


    fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/fetchUserData`).then(
      (res) => {
        if (!res.ok) {
          console.log(res.status)
          return
        }
        return res.json()
      }
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Here</Text>

      <View style={styles.loginContainer}>

        <SafeAreaView style={styles.credentials}>
          <TextInput style={styles.textInput} placeholder="Username"/>
          <TextInput secureTextEntry={true} style={styles.textInput} placeholder="Password"/>
        </SafeAreaView>

        <View style={styles.actions}>
          <TouchableOpacity onpress={()=>{}} style={styles.button}> 
            <Text>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onpress={()=>{}} style={styles.button}> 
            <Text>Log in</Text>
          </TouchableOpacity>
        </View>

      </View>

      

    </View>
  );
}


export default Login;