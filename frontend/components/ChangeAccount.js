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
        <View>
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

            <IconButton onPress={showImagePicker} icon={props => <Icon name="plus" {...props} color="#f9b924"/>} />
            
            <Pressable style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btn_text}>Изменить </Text>
            </Pressable>

        </View>
    )

}

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    backgroundColor: '#fff', },
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
    width: 90,
    height: 90,
    resizeMode: 'cover'
  }
});


export default ChangeAccount