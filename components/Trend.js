import React, { useState, useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import { View, StyleSheet, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../css/Card'

const TrendPage = ({ screenName }) => {
  const navigation = useNavigation();
  screenName = "Details"

  const [isLoading, setLoading] = useState(true);
  const [trend, setTrend] = useState([]);
  const getTrend = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
      const json = await response.json();
      setTrend(json.coins);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getTrend();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headertitle}>Trend</Text>
      <Text style={styles.a}></Text>
      {isLoading ? <ActivityIndicator size="large" style={styles.horizontal} /> :
        <View style={[styles.body, { alignItems: "center" }]}>
          <FlatList
            pagingEnabled={true}
            numColumns={3}
            snapToAlignment={"center"}
            data={trend}
            enableEmptySections={true}
            keyExtractor={(item) => {
              return item.item.id;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate(screenName, {
                  id: `${item.item.id}`,
                })}>
                  <View style={styles.view} >
                    {item.item ? <Image style={styles.icon} source={{ uri: item.item.small }} /> : null}
                    <Text style={styles.text}>{item.item ? item.item.name : ''}</Text>
                  </View>
                </TouchableOpacity>
              )
            }} />

        </View>
      }
    </SafeAreaView>
  );

}


export default TrendPage;
