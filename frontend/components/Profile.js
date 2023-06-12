import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useHistory } from "react-dom";
import {API_URL} from "@env";
import "./Sing_in.js";


import { StyleSheet, Text, Image, View, TextInput,Button,Pressable, Alert, SafeAreaView, } from 'react-native';
import { Stack } from '@react-native-material/core';
import { useIsFocused } from '@react-navigation/native';



function Profile(props) {
  URL = API_URL;

    const { navigation } = props;
      
    const [userState, setUserState] = React.useState({});

    const checkResponse = (res) => {
      if (res.ok) {
        return (res.json());
      }
      return res.json().then((err) => Promise.reject(err));
    };

    const getUser = () => {
        return fetch(`${URL}/api/v1/users/me/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${auth_token}`,
          },
        }).then(checkResponse)
        .then((res) => setUserState(res))
      };
    const isFocused = useIsFocused();
    React.useEffect(() => {
        const token = auth_token;
        if (token) {
        getUser();
        }
    }, [isFocused]);

  return (

    <View style={styles.container}>
        <Image style={styles.photo} source={{uri: userState.photo}}/>

        <Text style={styles.login}>{userState.username}</Text>

        <Text style={styles.email}>{userState.email}</Text>



        <Pressable style={styles.btn} onPress={() => navigation.navigate('Sign_in')}>
          <Text style={styles.btn_text}>Выйти из аккаунта</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => navigation.navigate('Camera')}>
          <Text style={styles.btn_text}>Добавить обсуждение</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => navigation.navigate('HumanPosts', userState.email)}>
          <Text style={styles.btn_text}>список моих обсуждений</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => navigation.navigate('ChangeAccount')}>
          <Text style={styles.btn_text}>Настройки аккаунта</Text>
        </Pressable>
 
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 844,
  }, 

  photo:{
    marginTop: -290,
    marginBottom: 32,
    width:150,
    height: 150,
    borderRadius:100,
    borderColor: '#f9b924',
    borderWidth: 2,
  },

  login:{
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 26,
    lineHeight: 31,
    marginBottom:16
  },
  email:{
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 17,
    lineHeight: 21,
    color: '#A3A6AA',
    marginBottom:47,
  },
  btn: {
    marginTop: 27,
    alignItems: 'center',
    justifyContent: 'center',
    width: 214,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#f9b924',   
  },
  btn_text:{
    fontSize: 20,
    color: '#fff',
    paddingBottom: 5,
  },
  
})

export default Profile
