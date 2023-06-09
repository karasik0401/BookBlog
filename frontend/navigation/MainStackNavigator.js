import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Sign_up from '../components/Sign_up'
import Sign_in from '../components/Sing_in'
import MainPage from '../components/MainPage'
import PostPage from '../components/PostPge'
import Profile from '../components/Profile'

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode='float'>
        <Stack.Screen
          name='Sign_up'
          component={Sign_up}
          options={{title: ' '}}
          
        />
        <Stack.Screen
          name='Sign_in'
          component={Sign_in}
          options={{title: ' '}}
        />

        <Stack.Screen
          name='MainPage'
          component={MainPage}
          options={{title: 'Главная',
            headerStyle: {
            backgroundColor: '#F9B924'},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
                fontSize: 20,
          },}}
          />

<Stack.Screen
          name='PostPage'
          component={PostPage}
          options={{title: 'Обсуждение',
            headerStyle: {
            backgroundColor: '#F9B924'},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
                fontSize: 20,
          },}}
          />
          <Stack.Screen
          name='Profile'
          component={Profile}
          options={{title: 'Профиль',
            headerStyle: {
            backgroundColor: '#F9B924'},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
                fontSize: 20,
          },}}
          />


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator