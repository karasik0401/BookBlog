import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useHistory } from "react-dom";
import {API_URL} from '@env'

import { StyleSheet, Text, View, TextInput,Button,Pressable, Alert, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';



function Sign_in(props) {
  URL=API_URL

    const { navigation } = props
    const [userData, setUserData] = React.useState({});

    const checkResponse = (res) => {
      if (res.ok) {
        return (res.json());
      }
      return res.json().then((err) => Promise.reject(err));
    };

    const loginUser = (username, password) => {
      return fetch(`${URL}/api/v1/auth/token/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }).then(checkResponse)
        .then((data) => {
          if (data) {
            global.auth_token = data.auth_token;
            return data;
          }
          return null;
        });
    };
    

    const onChangeInput = (e, name) => {
        setUserData({
          ...userData,
          [name]: e.nativeEvent.text,
        });
      };

      
      const checkValid = () => {
        if (!userData.username) {
          Alert.alert("Поле с почтой является обязательным");
          return false;
        }
        if (!userData.password) {
          Alert.alert("Поле с паролем является обязательным");
          return false;
        }
        return true;
      };

    const handleSubmit = () => {
        checkValid() &&
        loginUser(userData.username, userData.password)
        .then((res) => {
          if (res) {
            navigation.navigate('MainPage')
          }
        })
        .catch((err) => {
            Alert.alert("Неверное имя пользователя или пароль");
          }
        );
    
      };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

        <Text style={styles.text}>Авторизация</Text>
        <View>
        <TextInput
        style={styles.Login}
        onChange={e => onChangeInput(e, "username")}
        placeholder="Логин"
        type="text"
        id = {1}
        />
        
        <TextInput
        style={styles.Mail}
        secureTextEntry={true}
        onChange={e => onChangeInput(e, "password")}
        placeholder="Пароль"
        id = {2}
        />
        
        <View style={styles.btnContainer}>
        <Pressable style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btn_text}>Войти</Text>
        </Pressable>

        <View style={styles.lines}>
            <View style={styles.left_lines}></View>
            <Text>или</Text>
            <View style={styles.right_lines}></View>
        </View>

        <View style={styles.footer}>
            <Text style={styles.footer_text}>Нет аккаунта?</Text>
            <View style={styles.footer_btn}>
              <Button
              title="Зарегистрироваться"
              color="#f9b924"
              onPress={() => navigation.navigate('MainPage')}
            />  
            </View>
            
        </View>
        </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

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
    width: 390,
  },
  text: {
    marginTop: -45,
    fontSize: 32,
    color: '#f9b924',
  },
  Login: {
    marginTop: 50,
    height: 52,
    width: 318,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  Mail: {
    marginTop: 27,
    height: 52,
    width: 318,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  btn: {
    marginTop: 27,
    alignItems: 'center',
    justifyContent: 'center',
    width: 318,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#f9b924',
    marginLeft:12    
  },
  btn_text:{
    fontSize: 20,
    color: '#fff',
    paddingBottom: 5,
  },
  lines:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 17,
  },
  left_lines: {
    width: 139.01,
    height: 1,
    backgroundColor: '#A3A6AA',
    marginTop:10,
    marginRight: 7
  },
  right_lines: {
    width: 139.01,
    height: 1,
    backgroundColor: '#A3A6AA',
    marginTop:10,
    marginLeft: 7,
  },
  footer:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 17,
    marginLeft:12  
  },
  footer_text:{
    fontSize: 14,
    color: '#A3A6AA'
  },
  footer_btn:{
    marginTop: -11,
    
  }

})

export default Sign_in
