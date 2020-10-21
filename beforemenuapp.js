// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import 'react-native-gesture-handler';

import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image,color,size,Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

import HomeScreen from './pages/HomeScreen';
import DetailsScreen from './pages/DetailsScreen';
import ProfileScreen from './pages/ProfileScreen'; 
import SettingsScreen from './pages/SettingsScreen';
import Uploadblog from './pages/Uploadblog';
import Login from './pages/Login';
import Register from './pages/Register';
import OtpScreen from './pages/OtpScreen';
import Photos from './pages/Photos';
import Blog from './pages/Blogdetails';
import Audio from './pages/Audios';

//import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import { useState, useEffect } from 'react';
import Uploadphoto from './pages/Uploadphoto';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
//import Icon from 'react-native-ionicons';
import { AppLoading } from 'expo';
//import * as Font from 'expo-font';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function HomeStack({navigation}) {
  //console.log(navigation.state.index);
 // if (navigation.state.index > 0) {

  navigation.setOptions({ tabBarVisible: false,header:null });
  
  //}

  return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#561D7B' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <Ionicons 
            name={`${Platform.OS === "ios" ? "ios" : "md"}-share`} color="#fff" size={20}
          />
  
           
          ),

          
        }}>
              <Stack.Screen name="Login" component={Login}    options={{ title:'', headerShown: false ,tabBarVisible:false}} />
              <Stack.Screen name="Uploadblog" component={Uploadblog} options={{ title: 'Upload Blog' }}/>
              <Stack.Screen name="Uploadphoto" component={Uploadphoto} options={{ title: 'Programs' }}/>
              <Stack.Screen name="Register" component={Register}    options={{ title:'', headerShown: false ,tabBarVisible:false}}/>
              <Stack.Screen name="OtpScreen" component={OtpScreen}   options={{ title:'', headerShown: false ,tabBarVisible:false}}/>
              <Stack.Screen name="Photos" component={Photos}  options={{ title: 'Photos' }}/>
              <Stack.Screen name="Audio" component={Audio} options={{ title: '' }}/>
          
        <Stack.Screen name="Home" component={HomeScreen} options={{  headerTitle: (props) => ( // App Logo
      <Image
        style={{ width: 150, height: 40 }}
        source={require('./assets/app_logo.png')}
        resizeMode='contain'
      /> 
      
    ),
    headerTitleStyle: { flex: 1, textAlign: 'center' },
    }}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details Page' }} />
      
      </Stack.Navigator>
  );
}

function SettingsStack() { 
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: { backgroundColor: '#800080' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
            <Stack.Screen name="Photos" component={Photos}  options={{ title: '' }}/>
            <Stack.Screen name="Audio" component={Audio} options={{ title: '' }}/>
          
         <Stack.Screen name="Uploadblog" component={Uploadblog} options={{ title: '' }}/>
         <Stack.Screen name="Blogdetails" component={Blog} options={{ title: '' }}/>
         <Stack.Screen name="Uploadphoto" component={Uploadphoto} options={{ title: '' }}/>
         <Stack.Screen name="Register" component={Register}  options={{ title: 'Register' }}/>
         <Stack.Screen name="OtpScreen" component={OtpScreen} options={{ title: 'OTP' }}/>
         
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Setting Page' }}/>
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details Page' }}/>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile Page' }}/>
    </Stack.Navigator>
  );
}

function App() {
  
  return (
    
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#800080',
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}  />
        <Tab.Screen
          name="People Pulse"
          component={SettingsStack}
          options={{
            tabBarLabel: 'People Pulse',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="settings" color={color} size={size} />
            ),
          }} />
          <Tab.Screen
          name="Blogs"
          component={HomeStack}
          options={{
            tabBarLabel: 'Blogs',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}  />
          <Tab.Screen
          name="Offers"
          component={SettingsStack}
          options={{
            tabBarLabel: 'Offers',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="settings" color={color} size={size} />
            ),
          }} />
        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            tabBarLabel: 'My Account',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="settings" color={color} size={size} />
            ),
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;