import * as React from 'react';
import HelpPage from '../components/Help'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';


function HelpScreen({ navigation }) {
  return (
    <HelpPage/>
  );
}

const Tab = createMaterialTopTabNavigator();
const ProfileTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          backgroundColor: 'black',
          height: 50,
          display:"none"
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'white',
      })}
    >
      <Tab.Screen name="Help" component={HelpScreen}  />
    </Tab.Navigator>
  )
}

export default ProfileTabs;