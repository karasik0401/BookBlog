import * as React from 'react'
import { StyleSheet, Text, Image, View,Button,Pressable, Alert, SafeAreaView, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { IconButton, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Sign_up from '../components/Sign_up'
import Sign_in from '../components/Sing_in'
import MainPage from '../components/MainPage'
import PostPage from '../components/PostPge'
import Profile from '../components/Profile'
import Camera from '../components/Camera'
import ChangeAccount from '../components/ChangeAccount'
import HumanPosts from '../components/humanPosts'

const Stack = createStackNavigator()

function MainStackNavigator(props) {

  const { navigation } = props
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={({ navigation }) => ({
          headerRight: () => (
            <IconButton  onPress={() => navigation.navigate('Profile')} icon={props => <Icon name="account" {...props} color="#fff"/>} />
    ),
    headerLeft: () => (
      <IconButton  onPress={() => navigation.navigate('Camera')} icon={props => <Icon name="plus" {...props} color="#fff"/>} />
    )
      }
      )}
        headerMode='float'>
        <Stack.Screen
          name='Sign_up'
          component={Sign_up}
          options={{title: ' ',
          headerShown: false,
          headerLeft: () => null,}}
          
        />
        <Stack.Screen
          name='Sign_in'
          component={Sign_in}
          options={{title: ' ',
          headerShown: false,
          headerLeft: () => null,}}
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
          },
          headerShadowVisible: false,
          
        }}
          />
          <Stack.Screen
          name='HumanPosts'
          component={HumanPosts}
          
          options={{title: 'Мои обсуждения',
            headerStyle: {
            backgroundColor: '#F9B924'},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
                fontSize: 20,
          },
          headerShadowVisible: false,
          
        }}
          />
          <Stack.Screen
          name='Camera'
          component={Camera}
          options={{title: 'Новое обсуждение',
          headerLeft: () => null,
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
          headerRight: () => null,
          headerShown: false,
            headerStyle: {
            backgroundColor: 'null'},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
                fontSize: 20,
          },}}
          />

          <Stack.Screen
          name='ChangeAccount'
          component={ChangeAccount}
          options={{title: 'Профиль',
          headerLeft: () => null,
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