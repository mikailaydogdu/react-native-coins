import React, {  useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Ionicons  } from '@expo/vector-icons'

const Allcoin = ({ screenName }) => {
  const [liked, setLiked] = useState(false);
  
  const navigation = useNavigation();
  screenName = "Details"

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getCoin = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=50&page=1&sparkline=false');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCoin();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.notificationList}
        enableEmptySections={true}
        data={data}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate(screenName, {
              name: `${item.name}`,
              src: `${item.src}`,
              description: `${item.description}`,
            })}>

              <View style={styles.notificationBox} >
                <Image style={styles.icon}
                  source={{ uri: item.image }} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.iconfavori}></Text>
                <TouchableOpacity style={styles.iconfavori} onPress={() => [item.id,setLiked((isLiked) => !isLiked)]}>
                  <Ionicons
                      name={liked ? "star" : "star-outline"}
                      size={20}
                      color={liked ? "blue" : "white"} />
                  </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        }

        } />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black',
  },

  notificationList: {
    padding: 15,
    marginBottom:0
  },
  notificationBox: {
    padding: 15,
    marginBottom: 15,
    marginTop:5,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'black',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: 'blue',
    shadowOpacity: 1,
    shadowRadius:10,
    shadowOffset: {
      height: 4,
      width: -4
    },
    elevation: 10
  },
  icon: {
    width: 45,
    height: 45,
    marginRight: 5,
  },
  iconfavori: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: 'white'
  },
  name: {
    flex: 1,
    flexDirection: 'row',
    marginStart: 5,
    paddingVertical: 10,
    fontSize: 13,
    color: "white",
    marginLeft: 10,
  },
  divider: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  }
});

export default Allcoin;