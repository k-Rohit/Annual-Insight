import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack' 
import Home from './src/screens/appScreens/Home/Home'

const Main = () => {

    const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main