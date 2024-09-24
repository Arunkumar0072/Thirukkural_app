import { View, Text, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Components/HomeScreen';
import AramDescription1 from './Components/AramDescription1'; 
import AramDescription2 from './Components/AramDescription2';
import PoorulDescription1 from './Components/PoorulDescription1';
import PoorulDescription2 from './Components/PoorulDescription2';
import InnbamDescription1 from './Components/InnbamDescription1';
import InnbamDescription2 from './Components/InnbamDescription2';
import Userpage from './Components/Userpage';
import Loginpages from './Components/Loginpages';
import auth from '@react-native-firebase/auth';
import MobileNumberValidation from './Components/MobileNumberValidation';
import SplashScreen from './Components/SplashScreen';
export default function App() {
  const Stack = createNativeStackNavigator();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <NavigationContainer>
      <StatusBar  barStyle={'light'}  backgroundColor={'#5a0000'} />
      {
        !user?(
          <Stack.Navigator>
            <Stack.Screen name="MobileNumberValidation" component={MobileNumberValidation} options={{headerShown:false}}/>
            <Stack.Screen name="Loginpages" component={Loginpages} options={{headerShown:false}}/>
          </Stack.Navigator>
        ):(
          <Stack.Navigator>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
          <Stack.Screen name="AramDescription1" component={AramDescription1} options={{headerShown:false}}/>
          <Stack.Screen name="AramDescription2" component={AramDescription2} options={{headerShown:false}}/>
          <Stack.Screen name="PoorulDescription1" component={PoorulDescription1} options={{headerShown:false}}/>
          <Stack.Screen name="PoorulDescription2" component={PoorulDescription2} options={{headerShown:false}}/>
          <Stack.Screen name="InnbamDescription1" component={InnbamDescription1} options={{headerShown:false}}/>
          <Stack.Screen name="InnbamDescription2" component={InnbamDescription2} options={{headerShown:false}}/>
          <Stack.Screen name="Userpage" component={Userpage} options={{headerShown:false}}/>
          
      </Stack.Navigator>
        )
      }
    </NavigationContainer>
  )
}