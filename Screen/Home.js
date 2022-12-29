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
import { Ionicons } from '@expo/vector-icons'
import styles from '../css/List'
import { currencyFormat, priceColor } from '../components/config';

const HomePage = ({ screenName }) => {
  const [page, setPage] = useState(5)
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [like, setLike] = useState(false);
  const navigation = useNavigation();
  screenName = "Details"

  const getCoin = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD`);
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

 const handleLike = () => {
  setLike((like) => !like)
 }

  const pageNext = data.slice(0, page)

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <ActivityIndicator size="large" style={styles.horizontal} /> :
        <ScrollView>
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
                })}>
                  <View style={styles.notificationBox} >
                    <Image style={styles.icon}
                      source={{ uri: item.image }} />
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.name}>${currencyFormat(item.current_price)}</Text>
                    <Text style={[styles.name, { color: priceColor(item.price_change_percentage_24h) }]}>{item.price_change_percentage_24h}%</Text>
                    <TouchableOpacity onPress={handleLike}>
                      {like}
                      <Ionicons style={styles.iconfavori}
                        name={like ? "star" : "star-outline"}
                        color={like ? "red" : "black"}
                        size={20} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )
            }

            } />
          <TouchableOpacity style={{ alignItems: "center" }} onPress={() => setPage(page + 5)}>
            <Text style={[styles.name, { padding: 10, backgroundColor: "blue", borderRadius: 10 }]}>
              <Ionicons style={styles.iconfavori}
                name={"arrow-down-outline"} size={20} />
            </Text>
          </TouchableOpacity>
        </ScrollView>

      }

    </SafeAreaView>
  );
}


export default HomePage;