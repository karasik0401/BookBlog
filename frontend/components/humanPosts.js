import React, {useEffect, useState} from 'react';
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import filter from 'lodash.filter'
import { Feather, Entypo } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import {API_URL} from "@env";


import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button, 
  SafeAreaView, FlatList, Image, TouchableOpacity,
} from 'react-native';

function HumanPosts(props) {

  URL = API_URL;

  API_ENDPOINT = `${URL}/api/v1/posts`;


    const { navigation } = props;
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setsearchQuery] = useState("");

    


    const handleSearch = (query) => {
      setsearchQuery(query);
      const filteredData = filter(fullData, (user) => {
        return contains(user, query);
      });
      setData(filteredData);
    };

    const contains = ({author, text}, query) => {
      const {username, email} = author
      if (username.includes(query) || email.includes(query) || text.includes(query)){
        return true;
      }
      return false;
    };

    const fetchData = async(url) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);

        setFullData(json);

      } catch (error) {
        setError(error);
        }
    };

    const isFocused = useIsFocused();
    React.useEffect(() => {
        fetchData(`${API_ENDPOINT}/?author=${props.route.params}`);
        
    }, [isFocused]);



  return (
    <View style={styles.container}>
      <SafeAreaView >
        <Feather
          name="search"
          size={20}
          color='#ccc'
          style={{ marginLeft: 6,
          marginBottom: -35,
          marginTop: 16,
          zIndex: 1, }}
        />
        <TextInput placeholder='seach' clearButtonMode='always'
                   style={styles.search}
                   autoCapitalize="none"
                   autoCorrect={false}
                   value={searchQuery} onChangeText={(query) => handleSearch(query)}/>
      </SafeAreaView>

        <FlatList style={styles.list}
              data={data}
              key={(item) => item}
              renderItem={({item}) => (
                  <TouchableOpacity style={styles.items} onPress={() => navigation.navigate('PostPage', item.id)}>
                    <View style={styles.header}>
                      <Image style={styles.item_img} source={{uri: item.author.photo}}/>
                      <View style={styles.header_colum}>
                        <Text style={styles.item_user}> {item.author.username}</Text>
                        <Text style={styles.item_data}>{item.pub_date}</Text>
                      </View>
                    </View>

                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.footer}>
                      <IconButton style={styles.btn_send}  icon={props => <Icon style={styles.icon} name="message" {...props} color="#f9b924"/>} />
                      <Text style={styles.count}>{item.comment_count}</Text>
                    </View>
                    

                  </TouchableOpacity>)}
        />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  footer:{
    display: 'flex',
    flexDirection: "row",
    justifyContent:"flex-end"
  },
  count:{
    marginRight: 16,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    alignSelf:"flex-end"
  },
  btn_send:{
    marginBottom: -16,
  },
  title:{
    marginLeft: 16,
    marginRight:16,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 20,

  },
  item_data:{
    color: "#A3A6AA",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight:19,
    marginLeft: 4

  },
  body:{
    width: 390,
  },
  search:{
    width:358,
    height:32,
    borderWidth:2,
    borderColor: '#ccc',
    borderRadius:10,
    marginTop:8,
    marginBottom: 8,
    alignItems:"center",
    backgroundColor: "#fff",
    paddingLeft: 25,

  },
  list:{
    width:358,
    marginTop:0,
    
  },

  items:{
    paddingTop: 8,
    paddingBottom: 8,
    marginTop:8,
    backgroundColor: '#fff',
    borderRadius: 20,
  },

  header:{
    display: "flex",
    flexDirection: "row",
    marginBottom:16,
  },

  header_colum:{
    marginTop: 0,
    display: "flex",
    flexDirection: "column",
    marginLeft:16,
  },

  item_img:{
    width:45,
    height:45,
    alignItems: "flex-start",
    borderRadius: 25,
    marginLeft:16,
    borderWidth: 1,
    borderColor: "#f9b924",
  },

  item_user:{
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 20,
  },

  post_img:{
    paddingTop:-300,
    width:390,
    height:250,
  },

  item_text:{
    width: 358,
    marginLeft: 16,
    marginTop:16,
    marginBottom: 16,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    alignSelf:'center'

  }





})


export default HumanPosts