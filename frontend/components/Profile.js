import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useHistory } from "react-dom";

import { StyleSheet, Text, View, TextInput,Button,Pressable, Alert, } from 'react-native';



function Profile(props) {

    const { navigation } = props
      
    const [userState, setUserState] = React.useState({});

    const getUser = () => {
        return fetch(`http://192.168.1.246:8000/api/v1/users/me/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${localStorage.getItem("auth_token")}`,
          },
        }).then(checkResponse);
      };

    React.useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (token) {
        getUser().then((res) => {
            if (res && res.id) {
            setUserState({ id: res.id, username: res.username, email: res.email});
            }
        });
        }
    }, []);

  return (
    <View style={styles.container}>
        <View style={styles.login}>{userState.username}</View>

        <View style={styles.email}>{userState.email}</View>

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
