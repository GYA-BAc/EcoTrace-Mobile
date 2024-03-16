// import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/home/home';
import Login from './screens/login/login';
import EventView from './screens/event/event';
import ProfileView from './screens/profile/userProfile';
import CameraScreen from './screens/camera/camera';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>

      <StatusBar style="auto" />
      
      <Stack.Navigator 
        screenOptions={{headerTitleAlign: 'center' }}
        initialRouteName='Login'
      >

        <Stack.Screen
          // options={{headerShown: false}}
          name="EcoTrace"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Event"
          component={EventView}
          options={({ route }) => ({ title: route.params.test })}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileView}
          options={({ route }) => ({ title: route.params.test })}
        />
        <Stack.Screen
          name="Camera"
          options={{headerShown: false}}
          component={CameraScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App