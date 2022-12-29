import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'

export default class HelpPage extends Component {

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.postContent}>
          <View style={styles.profile}>
            <Image style={styles.avatar}
              source={{ uri: 'https://pbs.twimg.com/profile_images/1534260843378008064/-vgTclTX_400x400.jpg' }} />

            <Text style={styles.name}>
              Mikail Aydoğdu
            </Text>
          </View>
          <Text style={styles.postTitle}>
            Ben kimim ?
          </Text>

          <Text style={styles.postDescription}>
            Ben benim
          </Text>


          <View style={{ marginTop: 50 }}>
          <Text style={{color:"black", margin:5, marginTop:15, marginBottom:0}}>
              Social Network
            </Text>
            <Text style={styles.a}></Text>
            

            <View style={{ flexDirection: "row", marginL: 30 }}>
              <Ionicons onPress={() => Linking.openURL('https://www.instagram.com/Mikail.Aydogduu/')} name="logo-instagram" size={40} color="black" />
              <Ionicons onPress={() => Linking.openURL('https://twitter.com/MikailAydogduu')} name="logo-twitter" size={40} color="black" />
              <Ionicons onPress={() => Linking.openURL('https://www.linkedin.com/in/mikailaydogdu/')} name="logo-linkedin" size={40} color="black" />
              <Ionicons  onPress={() => Linking.openURL('https://mikailaydogdu.pythonanywhere.com/')} name="link" size={40} color="black" />
              <Ionicons  onPress={() => Linking.openURL('https://github.com/mikailaydogdu/')} name="logo-github" size={40} color="black" />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color:"#00BFFF"
  },
  postContent: {
    flex: 1,
    padding: 30,
  },
  postTitle: {
    fontSize: 26,
    fontWeight: '600',
  },
  postDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  tags: {
    marginTop: 10,
  },
  date: {
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#00BFFF",
  },
  profile: {
    flexDirection: 'row',
    marginTop: 5
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    alignSelf: 'center',
    marginLeft: 10
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText: {
    fontSize: 20,
  },
  a: {
    height: 3,
    width: 50,
    marginTop: 10,
    marginBottom:10,
    backgroundColor: 'blue'
  },
});
