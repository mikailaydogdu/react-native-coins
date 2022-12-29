import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../css/List'

const CategoriesPage = ({ screenName }) => {
  const navigation = useNavigation();
  screenName = "CategoriesDetails"

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(5);

  const getCoin = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/categories');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  const pageNext = data.slice(0, page)


  useEffect(() => {
    getCoin();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {isLoading ? <ActivityIndicator size="large" style={styles.horizontal} /> :
          <FlatList
            style={styles.notificationList}
            enableEmptySections={true}
            data={pageNext}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (

                <TouchableOpacity onPress={() => navigation.navigate(screenName, {
                  id: `${item.id}`,
                  name: `${item.name}`,
                })}>

                  <View style={styles.notificationBox} >
                    <Text style={styles.name}>{item.name}</Text>
                    <Ionicons style={styles.iconfavori}
                      name={"chevron-forward"} color={"black"} size={20}/>
                  </View>
                </TouchableOpacity>
              )
            }

            } />}
        <TouchableOpacity style={{alignItems:"center"}} onPress={() => setPage(page + 5)}>
        <Text style={[styles.name, {padding:10, backgroundColor:"blue", borderRadius:10}]}>
            <Ionicons style={styles.iconfavori}
              name={"arrow-down-outline"} />
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}



export default CategoriesPage;