import React, {useEffect, useState, } from 'react';
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


import filter from 'lodash.filter'
import './Sing_in.js';

import {
  StyleSheet,
  Text,
  View, ScrollView, Image, FlatList, Alert, TextInput, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
} from 'react-native';

function PostPage({ route }) {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState([]);
  const [userData, setUserData] = useState([]);


  const checkResponse = (res) => {
    if(res.ok) {
      return (res.json());
    }
    return res.json().then((err) => Promise.reject(err));
  };

  

  const onChangeInput = (e, name) => {
    setUserData({
      ...userData,
      [name]: e.nativeEvent.text,
    });
  };
  
  const getPost = (id) => {
    return fetch(`${URL}/api/v1/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
        authorisation: `Token ${auth_token}`,
      },
    }
    ).then(checkResponse)
  };

  const getComments = (id) => {
      return fetch(`${URL}/api/v1/posts/${id}/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorisation: `Token ${auth_token}`,
        },
      }).then(checkResponse)
    
  };

  const postComments = (id, text) => {
    return fetch(`${URL}/api/v1/posts/${id}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${auth_token}`,
      },
      body: JSON.stringify( { text } ),
    }).then((res) => {
      userData.text = '';
      if(res.status === 201) {
        userData.text = '';
        return {status: true};
      }
      return {status: false};
    })
  };

  const checkValid = () => {
    if (!userData.text) {
      Alert.alert("Поле с текстом комментария не может быть пустым");
      return false;
    }
    return true;
  }

  const handleSubmit = () => {
      checkValid &&
      postComments(data.id, userData.text);
  }

  useEffect(() => {
    getPost(route.params)
      .then((res) => {
        if (res) {
          setAuthor(res.author);
          setData(res);
        }
      })
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
    getComments(route.params)
      .then((res) => {
        if (res) {
          setComments(res);
        }
      })
    }, 200)

    return () => clearInterval(interval);
  }, [setComments, comments])

  return (
    <View style={styles.container}>

      
    <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
      <View style={styles.post}>

        <View style={styles.header}>
            <Image style={styles.post_user_img} source={{uri: author.photo}}/>
            <View style={styles.header_col}>
              <Text style={styles.item_user_header}>{author.username}</Text>
              <Text style={styles.item_data_header}>{data.pub_date}</Text>
            </View>
        </View>
        {data.image ?
        <Image style={styles.post_img} source={{uri: data.image}}/>:
        null}

        <View style={styles.rec_one}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.text}>{data.text}</Text>          
        </View>

      </View>

      <View style={styles.line}></View>


      <FlatList style={styles.list}
              data={comments}
              key={(item) => item}
              renderItem={({item}) => (
                <View style={styles.comment}>
                    <View style={styles.header}>
                      <Image style={styles.item_img} source={{uri: item.author.photo}}/>
                      <View style={styles.header_colum}>
                        <Text style={styles.item_user}> {item.author.username}</Text>
                        <Text style={styles.item_data}>{item.created}</Text>
                      </View>
                      
                    </View>

                    <Text style={styles.text_com}>{item.text}</Text>
                </View>
                    
                    )}
        />
    </ScrollView>

    <KeyboardAvoidingView behavior="padding" style={styles.screen}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.footer}> 

          <View>
            <TextInput
              style={styles.put_txt}
              onChange={e => onChangeInput(e, "text")}
              placeholder="Ваше мнение?"
              value={userData.text}
              id = {1}
              />
            </View>   

              

              <IconButton style={styles.btn_send} onPress={handleSubmit} icon={props => <Icon style={styles.icon} name="send" {...props} color="#fff"/>} />


          </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    
    </View>
  );
    

}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 844,

  },

  rec_one:{
    marginTop: -20,
    backgroundColor: "#F5F5F5",
    width: 390,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexWrap: "wrap"
  },

  item_data:{
    color: "#A3A6AA",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    lineHeight:19,

  },

  btn_send:{
    width:40,
    height:40,
    borderWidth:2,
    backgroundColor: '#f9b924',
    borderColor: "#f9b924",
    marginRight: 16,
  },
  icon:{
    alignSelf: 'center',
    marginLeft: 1,
    marginBottom: 2,
    transform: [{ rotate: '-90deg'}]
},

  footer:{
    position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: -160,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 390,
        backgroundColor: '#fff',
        paddingTop: 8,
        height: 160,
        
        

},
  post:{
    paddingTop: 8,
    backgroundColor: "#fff",
  },
  put_txt:{
    fontSize: 18,
    paddingLeft: 8,
    borderColor: '#000',
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: 302,
    marginRight: 16,
    marginLeft: 16,
  },

  put_btn:{
    backgroundColor: "#000",
  },

  comment:{
    marginBottom: 8,
    borderRadius: 18,
    width: 358,
    marginLeft: 16,
    backgroundColor: '#fff'

  },

  post_img:{
    paddingTop:0,
    width:390,
    height:350,
  },

  post_user_img:{
    width:45,
    height:45,
    alignItems: "flex-start",
    borderRadius: 25,
    marginLeft:16,
    borderWidth: 1,
    borderColor: '#F9B924'
  },
  item_img:{
    width:45,
    height:45,
    alignItems: "flex-start",
    borderRadius: 25,
    marginLeft:16,
    borderWidth: 1,
    borderColor: "#f9b924",
    marginTop: 8,
  },

  header:{
    display: "flex",
    flexDirection: "row",
    marginBottom:8,
  },

  header_col:{
    marginTop: 4,
    display: "flex",
    flexDirection: "column",
    marginLeft:16,
  },

  header_column:{
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
    marginLeft:16,
  },

  item_user_header:{
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 18,
  },
  item_user:{
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 18,
    marginTop: 16,
    marginLeft: 16
  },

  item_data_header:{
    color: "#A3A6AA",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight:19,

  },
  item_data:{
    color: "#A3A6AA",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight:19,
    marginLeft: 16

  },
  text:{
    width: 358,
    marginLeft: 32,
    marginTop:16,
    marginBottom: 16,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 18,
    alignSelf:'center'

  },

  text_com:{
    width: 358,
    marginLeft: 32,
    marginTop:16,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 18,
    alignSelf:'center'

  },
  title:{
    marginLeft: 16,
    marginTop:21,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 20,
    alignSelf:'center'

  },

  text_com:{
    width: 358,
    marginLeft: 16,
    marginTop:8,
    marginBottom: 16,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
  },

  line:{
    width: 390,
    marginBottom: 16,
  },

  list:{
    marginBottom: 159,
  }



})


export default PostPage