// import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home/index';

const Stack = createNativeStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>

        <StatusBar style="auto" />
        
        <Stack.Navigator>

          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App