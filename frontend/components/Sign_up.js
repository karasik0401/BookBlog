import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useHistory } from "react-dom";
import {API_URL} from "@env";

import { StyleSheet, Text, View, TextInput,Button,Pressable, Alert, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';


function Sign_up(props) {
  URL = API_URL
  
    const { navigation } = props
    const [userData, setUserData] = React.useState({});
    const checkResponse = (res) => {
      if (res.ok) {
        return (res);
      }
      return res.json().then((err) => Promise.reject(err));
    };


    const registerUser = (username, email, password, re_password) => {
      return fetch(`${URL}/api/v1/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, re_password }),
      }).then(checkResponse);
    };

    const onChangeInput = (e, name) => {
        setUserData({
          ...userData,
          [name]: e.nativeEvent.text,
        });
      };

      
      const checkValid = () => {
        if (!userData.login) {
          Alert.alert("Поле с логином является обязательным");
          return false;
        }
        if (!userData.email) {
          Alert.alert("Поле с почтой является обязательным");
          return false;
        }
        if (!userData.password) {
          Alert.alert("Поле с паролем является обязательным");
          return false;
        }
        if (!userData.re_password) {
          Alert.alert("Поле с повторным вводом пароля является обязательным");
          return false;
        }
        return true;
      };

    const handleSubmit = () => {
      checkValid()&&
      registerUser(userData.login, userData.email, userData.password, userData.re_password)
        .then((res) =>  {
          if (res.status === 201) {
            navigation.navigate('Profile');
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.non_field_errors){
            Alert.alert("Пароли не совпадают");
          }
          else if (err.password){
            Alert.alert("Пароль слишком простой");
          }
          else if (err.username){
            if (err.username[0] === "Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.")
              Alert.alert("Введите коректный логин. Он может содержать только буквы, цифры, и @/./+/-/_");
            else {
              Alert.alert("Пользователь с таким логином уже существует");
            }
          }
          else if (err.email){
            Alert.alert("Клиент с такой почтой уже существует");
          }
        });
    
      };
  
  return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.text}>Регистрация</Text>

          <View>
            <TextInput
              style={styles.Login}
              onChange={e => onChangeInput(e, 'login')}
              placeholder="Логин"
              type="text"
              id = {1}
            />
            <TextInput
              style={styles.Mail}
              onChange={e => onChangeInput(e, 'email')}
              placeholder="Почта"
              id = {2}
              type='text'
              keyboardType='email-address'
            />
            <TextInput
              style={styles.Mail}
              secureTextEntry={true}
              textContentType={'password'}
              onChange={e => onChangeInput(e, 'password')}
              placeholder="Пароль"
              id = {3}
            />
            <TextInput
              style={styles.Mail}
              secureTextEntry={true}
              textContentType={'password'}
              onChange={e => onChangeInput(e, 're_password')}
              placeholder="Пароль еще раз"
              id = {4}
            />
            <View style={styles.btnContainer}>
              <Pressable style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btn_text}>Зарегистрироваться</Text>
              </Pressable>

              <View style={styles.lines}>
                <View style={styles.left_lines}></View>
                <Text>или</Text>
                <View style={styles.right_lines}></View>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footer_text}>Уже есть аккаунт?</Text>
                <View style={styles.footer_btn}>
                  <Button 
                    title="Войти"
                    color="#f9b924"
                    size="sm"
                    onPress={() => navigation.navigate('Sign_in')}
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
  text: {
    marginTop: 130,
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
  },
  footer_text:{
    fontSize: 14,
    color: '#A3A6AA',
  },
  footer_btn:{
    marginTop: -11,
    
  }

})


export default Sign_up
