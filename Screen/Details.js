import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, ScrollView, Dimensions, ActivityIndicator, RefreshControl } from 'react-native';
import { useRoute } from "@react-navigation/native";
import {
  LineChart,
} from "react-native-chart-kit";
import { Ionicons  } from '@expo/vector-icons'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



const DetailsPage = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);



  const route = useRoute();
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const getCoin = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${route.params.id}?localization=false&sparkline=true`);
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

  const priceColor = (change) => {
    return change > 0 ? "#1AFF92" : "red"
  }
  const priceColorIonicons = (change) => {
    return change > 0 ? "caret-up-outline" : "caret-down-outline"
  }

  const dataLineChart = {
    datasets: [
      {
        data: data.market_data?.sparkline_7d.price,
      }
    ]
  };


  const currencyFormat = (num) => {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }


  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {isLoading ? <ActivityIndicator size="large" style={styles.horizontal} /> :
          <View style={styles.notificationList}>
            <View style={styles.notificationBox}>
             <View style={{flexDirection:"row"}}>
             {data.image ? <Image style={styles.icon} source={{ uri: data.image.small }} /> : null}
             <Text style={[styles.name]}>{data.name} <Text style={{ fontSize: 10, }}>({data.symbol}) </Text></Text>
             </View>
              <View style={{marginLeft:50, flexDirection:"row"}}>
              <Text style={[styles.name, { color:priceColor(data.market_data?.price_change_percentage_24h) }]}>
                <Ionicons name={`${priceColorIonicons(data.market_data?.price_change_percentage_24h)}`} />
                {data.market_data?.price_change_percentage_24h} %
              </Text>
              <Text style={[styles.name, { color: "green" }]}>{currencyFormat(data.market_data?.current_price.usd)} / USD</Text>
              </View>
            </View>

            <View>
              <LineChart
                data={dataLineChart}
                withDots={true}
                width={Dimensions.get("window").width}
                height={250}
                yLabelsOffset={0}
                withInnerLines={false}
                withOuterLines={false}
                yAxisSuffix="k"
                chartConfig={{
                  backgroundGradientFrom: "white",
                  backgroundGradientFromOpacity: 1,
                  backgroundGradientTo: "white",
                  backgroundGradientToOpacity: 1,
                  fillShadowGradientFrom: "black",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                  propsForDots: {
                    r: "1",
                    strokeWidth: "2",
                  },
                }}
                style={{
                }}
              />
            </View>
            <View>
              <Text style={styles.headertitle}>1h </Text>
              <Text style={styles.a}></Text>
              <View style={[styles.notificationBoxContent, { paddingBottom: 0, marginBottom: 0 }]}>
                <Text style={styles.nameBox}>try</Text>
                <Text style={styles.nameBox}>usd</Text>
                <Text style={styles.nameBox}>eur</Text>
              </View>
              <View style={[styles.notificationBoxContent]}>
                <Text style={[styles.nameBox, { color: priceColor(data.market_data?.price_change_percentage_1h_in_currency.usd) }]}>{data.market_data?.price_change_percentage_1h_in_currency.usd}%</Text>
                <Text style={[styles.nameBox, { color: priceColor(data.market_data?.price_change_percentage_1h_in_currency.try) }]}>{data.market_data?.price_change_percentage_1h_in_currency.try}%</Text>
                <Text style={[styles.nameBox, { color: priceColor(data.market_data?.price_change_percentage_1h_in_currency.eur) }]}>{data.market_data?.price_change_percentage_1h_in_currency.eur}%</Text>
              </View>
            </View>

            <View>
              <Text style={styles.headertitle}>24h</Text>
              <Text style={styles.a}></Text>
              <View style={[styles.notificationBoxContent, { paddingBottom: 0, marginBottom: 0 }]}>
                <Text style={styles.nameBox}>try</Text>
                <Text style={styles.nameBox}>usd</Text>
                <Text style={styles.nameBox}>eur</Text>
              </View>
              <View style={[styles.notificationBoxContent]}>
                <Text style={[styles.nameBox, { color: priceColor(data.market_data?.price_change_percentage_24h_in_currency.usd) }]}>{data.market_data?.price_change_percentage_24h_in_currency.usd}%</Text>
                <Text style={[styles.nameBox, { color: priceColor(data.market_data?.price_change_percentage_24h_in_currency.try) }]}>{data.market_data?.price_change_percentage_24h_in_currency.try}%</Text>
                <Text style={[styles.nameBox, { color: priceColor(data.market_data?.price_change_percentage_24h_in_currency.eur) }]}>{data.market_data?.price_change_percentage_24h_in_currency.eur}%</Text>
              </View>
            </View>

            <View>
              <Text style={styles.headertitle}>7d</Text>
              <Text style={styles.a}></Text>
              <View style={[styles.notificationBoxContent, { paddingBottom: 0, marginBottom: 0 }]}>
                <Text style={styles.nameBox}>try</Text>
                <Text style={styles.nameBox}>usd</Text>
                <Text style={styles.nameBox}>eur</Text>
              </View>
              <View style={[styles.notificationBoxContent]}>
                <Text style={[styles.nameBox, { color: priceColor(data.market_data?.price_change_percentage_7d_in_currency.usd) }]}>{data.market_data?.price_change_percentage_7d_in_currency.usd}%</Text>
                <Text style={[styles.nameBox, { color: priceColor(data.market_data?.price_change_percentage_7d_in_currency.try) }]}>{data.market_data?.price_change_percentage_7d_in_currency.try}%</Text>
                <Text style={[styles.nameBox, { color: priceColor(data.market_data?.price_change_percentage_7d_in_currency.eur) }]}>{data.market_data?.price_change_percentage_7d_in_currency.eur}%</Text>
              </View>
            </View>

            <View>
              <Text style={styles.headertitle}>30d</Text>
              <Text style={styles.a}></Text>
              <View style={[styles.notificationBoxContent, { paddingBottom: 0, marginBottom: 0 }]}>
                <Text style={styles.nameBox}>try</Text>
                <Text style={styles.nameBox}>usd</Text>
                <Text style={styles.nameBox}>eur</Text>
              </View>
              <View style={[styles.notificationBoxContent]}>
                <Text style={[styles.nameBox, { color: priceColor(data.market_data?.price_change_percentage_30d_in_currency.usd) }]}>{data.market_data?.price_change_percentage_30d_in_currency.usd}%</Text>
                <Text style={[styles.nameBox, { color: priceColor(data.market_data?.price_change_percentage_30d_in_currency.try) }]}>{data.market_data?.price_change_percentage_30d_in_currency.try}%</Text>
                <Text style={[styles.nameBox, { color: priceColor(data.market_data?.price_change_percentage_30d_in_currency.eur) }]}>{data.market_data?.price_change_percentage_30d_in_currency.eur}%</Text>
              </View>
            </View>

            <View>
              <Text style={styles.headertitle}>1y</Text>
              <Text style={styles.a}></Text>
              <View style={[styles.notificationBoxContent, { paddingBottom: 0, marginBottom: 0 }]}>
                <Text style={styles.nameBox}>try</Text>
                <Text style={styles.nameBox}>usd</Text>
                <Text style={styles.nameBox}>eur</Text>
              </View>
              <View style={[styles.notificationBoxContent]}>
                <Text style={[styles.nameBox, { color: priceColor(data.market_data?.price_change_percentage_1y_in_currency.usd) }]}>{data.market_data?.price_change_percentage_1y_in_currency.usd}%</Text>
                <Text style={[styles.nameBox, { color: priceColor(data.market_data?.price_change_percentage_1y_in_currency.try) }]}>{data.market_data?.price_change_percentage_1y_in_currency.try}%</Text>
                <Text style={[styles.nameBox, { color: priceColor(data.market_data?.price_change_percentage_1y_in_currency.eur) }]}>{data.market_data?.price_change_percentage_1y_in_currency.eur}%</Text>
              </View>
            </View>

          </View>
        }
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
  },
  notificationList: {
    backgroundColor: 'white',
  },
  notificationBox: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'white',
    shadowColor: 'blue',
    elevation: 10

  },
  notificationBoxContent: {
    padding: 15,
    flexDirection: "row",

  },
  notificationBoxContent2: {
    padding: 15,
    flexDirection: "column",

  },
  icon: {
    width: 60,
    height: 60,

  },
  name: {
    flex: 1,
    marginStart: 10,
    marginLeft: 30,
    fontSize: 15,
    marginTop: 15
  },
  nameBox: {
    marginStart: 10,
    flex: 1,
    marginLeft: 40,
    fontSize: 15,
  },
  nameBox2: {
    marginStart: 10,
    marginLeft: 30,
    fontSize: 15,
  },

  a: {
    height: 3,
    width: 30,
    marginLeft: 20,
    marginTop: 15,
    backgroundColor: 'blue',
  },
  headertitle: {
    color: 'blue',
    fontSize: 15,
    marginLeft: 20,
    marginBottom: 1,
  },
  horizontal: {
    marginTop: "60%"

  }
});

export default DetailsPage;
