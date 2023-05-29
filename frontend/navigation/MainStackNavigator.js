import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Sign_up from '../components/Sign_up'
import Sign_in from '../components/Sing_in'

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode='float'>
        <Stack.Screen
          name='Авторизация'
          component={Sign_in}
          
        />
        <Stack.Screen
          name='Регистрация'
          component={Sign_up}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator