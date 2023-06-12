import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Pressable, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { Stack, IconButton, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {API_URL} from "@env";
import "./Sing_in";


const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";

function Camera(props) {

  const [pickedImagePath, setPickedImagePath] = useState('');
  const { navigation } = props
  const [userData, setUserData] = React.useState({});
  const [image, setImage] = useState({});
  URL = API_URL;

  API_ENDPOINT = `${URL}/api/v1/posts/`;

  const checkResponse = (res) => {
    if(res.ok) {
      return (res.json());
    }
    return res.json().then((err) => Promise.reject(err));
  };

  const pushPost = (data) => {
    return fetch(`http://192.168.1.101:8000/api/v1/posts/`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Token ${auth_token}`,
         },
         body: data,
    }).then(checkResponse)
  };

  const onChangeInput = (e, name) => {
    setUserData({
      ...userData,
      [name]: e.nativeEvent.text,
    });
  };

  const checkValid = () => {
    if (!userData.title) {
        Alert.alert("Поле с заголовком явдяется обязательным");
        return false;
    }
    if (!userData.text) {
        Alert.alert("Поле с текстом поста является обязательным");
        return false;
    }
    return true;
  }


  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setImage(result)
    }
  }
  const handleSubmit = () => {
    let formData = new FormData();
    if (checkValid()){
        formData.append('text', userData.text)
        formData.append('title', userData.title)
        formData.append('image', {
            uri: Platform.OS === 'ios' ?
            image.assets[0].uri.replace('file://', ''):
            image.assets[0].uri,
            type: image.assets[0].type,
            name: image.assets[0].fileName
          })
            pushPost(formData)
            .then((res) => {
                if(res) {
                    navigation.navigate('MainPage')
                }
            })
            .catch((err) => {
                console.log(err)
            })
       
    }
    
  }


  return (
    <View style={styles.screen}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>

      
        <TextInput
            style={styles.text}
            editable
            multiline
            onChange={e => onChangeInput(e, "title")}
            placeholder="Название обсуждения?"
            type="text"
            id = {1}
        />

        <TextInput
            style={styles.text}
            editable
            enablesReturnKeyAutomatically = "true"
            multiline
            onChange={e => onChangeInput(e, "text")}
            placeholder="Что хотите обсудить?"
            type="text"
            id = {2}
        />

        



        </ScrollView>

    <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.footer}>
                <View style={styles.imagerow}>
                    <IconButton style={styles.btn} onPress={showImagePicker} icon={props => <Icon name="plus" {...props} color="#f9b924"/>} />
                    {
                    pickedImagePath !== '' && <Image
                        source={{ uri: pickedImagePath }}
                        style={styles.img}
                    />
                    }
                </View>
                <IconButton style={styles.btn_send} onPress={handleSubmit} icon={props => <Icon style={styles.icon} name="send" {...props} color="#fff"/>} />
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

      
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    backgroundColor: '#fff',
    flexDirection: 'column',  
    height: 844,
    },

    footer:{
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: -180,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 390,
    },

    icon:{
        alignSelf: 'center',
        marginLeft: 2,
        marginBottom: 2,
        transform: [{ rotate: '-90deg'}]
    },


  text:{
    marginTop: 16,
    alignSelf: 'center',
    width: 358,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 3,
  },

  btn:{
    width:40,
    height:40,
    borderWidth:2,
    borderColor: "#f9b924",
  },

  btn_send:{
    width:40,
    height:40,
    borderWidth:2,
    backgroundColor: '#f9b924',
    borderColor: "#f9b924",
    marginRight: 16,
  },
  
  imagerow: {
    marginLeft: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  img: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 15,
    marginLeft: 16,
    marginTop: -22,
  }
});

export default Camera;