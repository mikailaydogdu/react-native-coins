import React, { useState, useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../css/Card'
import { currencyFormat, priceColor } from '../components/config';

const GainersCoins = ({ screenName, screenHome, screenExpired }) => {
  const navigation = useNavigation();
  screenName = "Details"
  screenHome = 'HomeTabs'
  screenExpired = 'HomeTabs', { name: 'Expired' };
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  const getCoin = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD');
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
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator size="large" style={styles.horizontal} /> :
        <View style={styles.body}>
          <Text style={[styles.headertitle, {color:"green"}]}>Top Gainers</Text>
          <Text style={[styles.a, {backgroundColor:"green"}]}></Text>
          <FlatList
            pagingEnabled={true}
            horizontal={true}
            snapToAlignment={"center"}
            maxToRenderPerBatch={1}
            data={data.sort(function (a, b) { return b.price_change_percentage_24h - a.price_change_percentage_24h }).slice(0, 5)}
            enableEmptySections={true}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate(screenName, {
                  id: `${item.id}`,
                })}>
                  <View style={styles.view} >
                    <Image style={styles.icon} source={{ uri: item.image }} />
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>{currencyFormat(item.current_price)} / USD</Text>
                    <Text style={[styles.text, { color: priceColor(item.price_change_percentage_24h) }]}>{currencyFormat(item.price_change_percentage_24h)}%</Text>
                  </View>
                </TouchableOpacity>
              )
            }} />

        </View>
      }
    </View>
  );

}
export default GainersCoins;
