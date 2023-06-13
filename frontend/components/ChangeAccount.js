import {API_URL} from "@env";
const URL = API_URL;

import { Stack, IconButton, TextInput } from "@react-native-material/core";
import "./Sing_in.js";

import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Alert,
  SafeAreaView,
  ActivityIndicator, FlatList, Image, TouchableOpacity, ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function ChangeAccount(props){
    const { navigation } = props;
    const [pickedImagePath, setPickedImagePath] = useState('');
    const [image, setImage] = useState({});
    const [isImage, setIsImage] = useState(false);
    const [data, setData] = useState([]);



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
      };

    const patchAccount = (data) => {
        return fetch(`${URL}/api/v1/users/me/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Token ${auth_token}`,
             },
             body: data,
        }).then(checkResponse)
    }


    const handleSubmit = () => {
        let formData = new FormData();
        if (true){
            if (isImage){
                formData.append('photo', {
                uri: image.assets[0].uri.replace('file://', ''),
                type: image.assets[0].type,
                name: image.assets[0].fileName
              })
            }
                patchAccount(formData)
                .then((res) => {
                    if(res) {
                        navigation.navigate('Profile')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
      };

    const showImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
          alert("You've refused to allow this app to access your photos!");
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
          setPickedImagePath(result.uri);
          setImage(result)
          setIsImage(true);
        }
  }

    useEffect(() => {
        getUser().then((res) => {
            setData(res);
        })
    }, []);


    return(
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
            {
              pickedImagePath !== ''? <Image
                source={{ uri: pickedImagePath }}
                style={styles.img}
              /> : (
                  <Image style={styles.img} source={
                      data.photo ? {uri: data.photo} : null
                  }/>
              )
            }

        <View style={styles.rec_t}>
          <Pressable style={styles.btn_icon} onPress={showImagePicker}>
            <Text style={styles.btn_icon}>Изменить фото</Text>
            </Pressable>

          <Pressable style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btn_text}>Coхранить </Text>
          </Pressable>         
        </View>
        </ScrollView>
      </View>
    )

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
  
  screen: {
    display: 'flex',
    backgroundColor: '#fff', },
  btn: {
    marginTop: 27,
    alignSelf: "center",
    width: 150,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#f9b924',
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

  btn_text:{
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 20,
    alignSelf: "center",
    color: "#fff",
    marginTop: 12,
  },

  btn_icon:{
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 31,
    marginBottom:8,
    alignSelf: "center",
    color: "#A3A6AA",
    marginTop: -60,
  },
  text:{
    marginTop: 16,
    alignSelf: 'center',
    width: 358,
  },
  imagerow: {
    marginTop: 60,
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    gap: 16
  },
  img: {
    width:390,
    height: 481,
    resizeMode: 'cover'
  }
});


export default ChangeAccount