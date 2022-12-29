import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container:{
    },
    body: {
      marginBottom: 0,
    },
    view: {
      backgroundColor: 'white',
      width: 100,
      margin: 15,
      height: 100,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
    icon: {
      margin: 5,
      width: 35,
      height: 35,
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
      marginTop: 25,
    },
    headertitleRight:{
      color: 'blue',
      marginRight:10,
      fontSize: 15,
      marginBottom: 1,
      textAlign:"right"
    },
    a: {
      height: 3,
      width: 30,
      marginLeft: 10,
      marginTop: 15,
      backgroundColor: 'blue'
    }
  });

  export default styles;