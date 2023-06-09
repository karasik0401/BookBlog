import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useHistory } from "react-dom";
import {API_URL} from "@env";
import "./Sing_in.js";


import { StyleSheet, Text, View, TextInput,Button,Pressable, Alert, } from 'react-native';



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

    React.useEffect(() => {
        const token = auth_token;
        if (token) {
        getUser();
        }
    }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.login}>{userState.username}</Text>

        <Text style={styles.email}>{userState.email}</Text>

        <Pressable style={styles.btn} onPress={() => navigation.navigate('Sign_in')}>
          <Text style={styles.btn_text}>Выйти</Text>
        </Pressable>
 
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  }, 
  login:{
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 26,
    lineHeight: 31,
  },
  email:{
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 17,
    lineHeight: 21,
    color: '#A3A6AA',
  },
  btn: {
    marginTop: 27,
    alignItems: 'center',
    justifyContent: 'center',
    width: 318,
    height: 52,
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
