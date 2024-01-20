// import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/home/home';
import Login from './screens/login/login';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>

      <StatusBar style="auto" />
      
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center' }}>

        <Stack.Screen
          // options={{headerShown: false}}
          name="EcoTrace"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Login"
          component={Login}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App