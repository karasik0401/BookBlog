import { StatusBar } from 'expo-status-bar';
import { IconButton, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React from 'react';
import { useHistory } from "react-dom";
import {API_URL} from "@env";
import "./Sing_in.js";


import { StyleSheet, Text, Image, View, ScrollView, Button,Pressable, Alert, SafeAreaView, } from 'react-native';
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
        

        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>

        <Image style={styles.photo} source={{uri: userState.photo}}/>

        <View style={styles.rec_one}>
          <Text style={styles.login}>{userState.username}</Text>

          <Text style={styles.email}>{userState.email}</Text>
        </View>
        
        <View style={styles.rec_t}>

          <View style={styles.group_big}>

            <Pressable style={styles.group} onPress={() => navigation.navigate('Camera')}>
                <IconButton style={styles.btn} onPress={() => navigation.navigate('Camera')} icon={props => <Icon name="plus" {...props} color="#f9b924"/>} />
                <Text style={styles.text}>Добавить обсуждение</Text> 
            </Pressable>

            <Pressable style={styles.group} onPress={() => navigation.navigate('HumanPosts', userState.email)}>
                <IconButton style={styles.btn} onPress={() => navigation.navigate('HumanPosts', userState.email)} icon={props => <Icon name="message" {...props} color="#f9b924"/>} />
                <Text style={styles.text}>Мои обсуждения</Text>           
            </Pressable>

            <Pressable style={styles.group} onPress={() => navigation.navigate('ChangeAccount')}>
              <IconButton style={styles.btn} onPress={() => navigation.navigate('ChangeAccount')} icon={props => <Icon name="account" {...props} color="#f9b924"/>} />
              <Text style={styles.text}>Настройки</Text> 
            </Pressable> 

            <Pressable style={styles.btn_exit} onPress={() => navigation.navigate('Sign_in')}>
            <Text style={styles.btn_text}>Выйти</Text>
            </Pressable>
          </View>

          

        </View>
        
        </ScrollView>

        

        
        
 
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
  body:{
    zIndex: 1,
    
  },
  text:{
    fontSize: 18,
    color: '#A3A6AA',
    marginTop: 20,
    marginLeft: 16,

  },
  group_big:{
    marginTop: 0,
  },

  rec_one:{
    marginTop: -50,
    backgroundColor: "#F5F5F5",
    width: 390,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height:142,
  },
  rec_t:{
    marginTop: -50,
    width: 390,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: 324,
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center'
  },

  group:{
    display: 'flex',
    flexDirection: "row",
    width: 283,
    marginLeft: 52,
    marginBottom: 21,

    
  },

  photo:{
    width:390,
    height: 481,
    zIndex: 0,
    
  },

  login:{
    marginTop: 16,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 26,
    lineHeight: 31,
    marginBottom:8,
    alignSelf: "center"
  },
  email:{
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 17,
    lineHeight: 21,
    color: '#A3A6AA',
    marginBottom:30,
    alignSelf: "center"
  },

  btn:{
    width:50,
    height:50,
    borderRadius: 17,
    borderWidth:2,
    borderColor: "#f9b924",
  },

  icon:{
    alignSelf: 'center',
    marginLeft: 2,
    marginBottom: 2,
    transform: [{ rotate: '-90deg'}]
},
  btn_exit: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 94,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',   
  },
  btn_text:{
    fontSize: 20,
    color: '#fff',
    paddingBottom: 5,
  },
  
})

export default Profile
