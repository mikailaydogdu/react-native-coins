import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import TrendPage from '../components/Trend';
import LosersCoins from '../components/LosersCoins'
import GainersCoins from '../components/GainersCoins'

const IndexPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LosersCoins />
        <GainersCoins />
        <TrendPage />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
});
export default IndexPage;
