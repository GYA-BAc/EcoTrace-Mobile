import { React, useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity ,
  Animated
} from 'react-native';
import { startShake, fetchWithTimeout } from '../../Utils';


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

  const usernameInput = useRef(null)
  const [username, setUsername] = useState('')

  const passwordInput = useRef(null)
  const [password, setPassword] = useState('')
  const [passwordShake] = useState(new Animated.Value(0))

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
        console.log(res.json())
      }
    )


    // fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/fetchUserData`).then(
    //   (res) => {
    //     if (!res.ok) {
    //       console.log(res.status)
    //       return
    //     }
    //     return res.json()
    //   }
    // ).then(
    //   data => {
    //     setData(data)
    //     console.log(data)
    //   }
    // )
  }, [])

  const incorrectLogin = () => {
    startShake(passwordShake)
    passwordInput.current.clear()
  }

  const correctLogin = () => {
    
    fetchWithTimeout(`${process.env.EXPO_PUBLIC_API_URL}/auth/fetchUserData`).then(
      (res) => {

        if (!res.ok) {
          // TODO: add bad case where server fails
          console.log(res.status)
          throw "ServerError"
        }
        return res.json()
      }
    ).then(
      async (data) => {
        // console.log(AsyncStorage)
        try {
          await AsyncStorage.setItem('currentUserID', data.content.id.toString())
        } catch (error) {
          // TODO: add error case if localstorage fails
          console.log(data)
          throw "ClientError: could not save currentUserID"
        }
        usernameInput.current.clear()
        passwordInput.current.clear()
        navigation.navigate("EcoTrace")
        navigation.reset({
          index: 0,
          routes: [{name: "EcoTrace"}]
        })
      }
    ).catch(
      () => {
        alert("Failed to fetch user data. Please try logging in again")
      }
    )

    
  }

  const attemptLogin = () => {
    // console.log(username)
    // usernameInput.current.clear()
    fetchWithTimeout(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {'Accept': 'text/plain', 'Content-Type': 'text/plain'}, 
      body: JSON.stringify({'username': username, 'password': password}),
      timeout: 10000
    }).then(
      (res) => {
        (res.ok) ? correctLogin(): incorrectLogin()
        console.log(res)
          
        console.log(res.headers)
        // return res.json()
      }
    ).catch(
      // failed to login due to timeout
      (e) => {
        console.log(e)
        alert("Could not connect to our servers. Check your internet connection")
      }
    )
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Here</Text>

      <View style={styles.loginContainer}>

        <SafeAreaView style={styles.credentials}>

          

          <Animated.View style={{width: "100%", transform: [{translateX: passwordShake}]}}>
            <TextInput 
              placeholder="Username"
              ref={usernameInput} 
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={text => setUsername(text)}
              style={styles.textInput}
            />
            
            <TextInput 
              placeholder="Password"
              ref={passwordInput} 
              autoCorrect={false}
              autoCapitalize='none'
              secureTextEntry={true} 
              onChangeText={text => setPassword(text)}
              style={styles.textInput}
            />
          </Animated.View>
          
        
        </SafeAreaView>

        <View style={styles.actions}>

          <TouchableOpacity onPress={()=>{}} style={styles.button}> 
            <Text>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={attemptLogin} style={styles.button}> 
            <Text>Log in</Text>
          </TouchableOpacity>

        </View>
      </View>

      <></>

    </View>
  );
}


export default Login;