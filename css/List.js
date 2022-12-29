import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: 'white',
    },
    notificationList: {
      padding: 15,
    },
    notificationBox: {
      padding: 15,
      marginBottom: 15,
      marginTop: 5,
      marginLeft: 5,
      marginRight: 5,
      backgroundColor: 'white',
      flexDirection: 'row',
      borderRadius: 10,
      elevation: 5
    },
    icon: {
      width: 45,
      height: 45,
      marginRight: 5,
    },
    name: {
      flex: 1,
      flexDirection: 'row',
      marginStart: 5,
      paddingVertical: 10,
      fontSize: 13,
      color: "black",
      marginLeft: 10,
    },
    divider: {
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    },
    load: {
      marginStart: 5,
      paddingVertical: 10,
      fontSize: 13,
      color: "white",
      marginLeft: 10,
    }
  });

export default styles;