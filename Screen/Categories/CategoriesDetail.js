import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { currencyFormat, priceColor } from '../../components/config'

const CategoryDetailsPage = ({ screenName }) => {
  const route = useRoute();
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();
  screenName = "Details"
  const getCoin = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&category=${route.params.id}`);
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
      <Text style={styles.headertitle}>{route.params.name}</Text>
      <Text style={styles.a}></Text>
      {isLoading ? <ActivityIndicator size="large" style={styles.horizontal} /> :
        <View style={styles.body}>
          <FlatList
            pagingEnabled={true}
            numColumns={3}
            snapToAlignment={"center"}
            data={data}
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
                    <Text style={[styles.text, { color: priceColor(item.price_change_percentage_24h) }]}>{item.price_change_percentage_24h}%</Text>
                  </View>
                </TouchableOpacity>

              )
            }} />
        </View>
      }

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flexDirection: "column",
    marginBottom: 100,
    alignItems: "center",

  },
  view: {
    backgroundColor: 'white',
    width: 100,
    margin: 15,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
  },
  icon: {
    margin: 5,
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  headertitle: {
    color: 'blue',
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 1,
    marginTop: 30,
  },
  a: {
    height: 3,
    width: 30,
    marginLeft: 10,
    marginTop: 15,
    backgroundColor: 'blue'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
});

export default CategoryDetailsPage;
