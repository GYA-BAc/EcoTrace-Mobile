import registerRootComponent from 'expo/build/launch/registerRootComponent';

// import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/home/home';
import Login from './screens/login/login';
import GroupView from './screens/group/group';
import ProfileView from './screens/profile/userProfile';
import CameraScreen from './screens/camera/camera';
import Header from './components/header/header';

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
          options={{ headerTitle: (props) => <Header {...props} /> }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Group"
          component={GroupView}
          options={({ route }) => ({ id: route.params.groupID })}
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

registerRootComponent(App)