import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'
import DetailsPage from './Screen/Details';
import HomePage from './Screen/Home';
import ProfileTabs from './Screen/ProfileTabs';
import IndexPage from './Screen/İndex';
import CategoriesPage from './Screen/Categories/Categories';
import CategoryDetailsPage from './Screen/Categories/CategoriesDetail';

const DataStack = createNativeStackNavigator()
const DataScreen = () => {
  return (
    <DataStack.Navigator>
      <DataStack.Screen name='All Coin' component={HomePage} />
      <DataStack.Screen name='Details' component={DetailsPage} />
    </DataStack.Navigator>
  )
}
const IndexDataStack = createNativeStackNavigator()
const IndexDataScreen = () => {
  return (
    <IndexDataStack.Navigator>
      <IndexDataStack.Screen name='Home' component={IndexPage} options={{ title: 'Home' }} />
      <IndexDataStack.Screen name='Details' component={DetailsPage} options={{ title: "Coin Details" }} />
    </IndexDataStack.Navigator>
  )
}

const CategoriesDataStack = createNativeStackNavigator()
const CategoriesDataScreen = () => {
  return (
    <CategoriesDataStack.Navigator>
      <CategoriesDataStack.Screen name='CategoriesTabs' component={CategoriesPage} options={{ title: 'Categories' }} />
      <CategoriesDataStack.Screen name='CategoriesDetails' component={CategoryDetailsPage} options={{ title: "Categories Details" }} />
      <IndexDataStack.Screen name='Details' component={DetailsPage} options={{ title: "Coin Details" }} />
    </CategoriesDataStack.Navigator>
  )
}

const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarShowLabel: false,
      tabBarStyle: {
        display: 'flex',
        height: 70,
      },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'HomeTabs') {
          iconName = focused
            ? 'stats-chart'
            : 'stats-chart-outline';
        }
        else if (route.name === 'İndex') {
          iconName = focused ? 'home' : 'home-outline';
        }
        else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        }
        else if (route.name === 'Favori') {
          iconName = focused ? 'star' : 'star-outline';
        }
        else if (route.name === 'Profile') {
          iconName = focused ? 'cog' : 'cog-outline';
        }
        else if (route.name === 'Market') {
          iconName = focused ? 'apps' : 'apps-outline';
        }
        else if (route.name === 'Notification') {
          iconName = focused ? 'notifications' : 'notifications-outline';
        }
        else if (route.name === 'Categories') {
          iconName = focused ? 'grid' : 'grid-outline';
        }


        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'black',
    })}
  >
    <Tabs.Screen name='İndex' component={IndexDataScreen} options={{ headerShown: false, headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white', }} />
    <Tabs.Screen name='HomeTabs' component={DataScreen} options={{ headerShown: false, headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white', }} />
    <Tabs.Screen name='Categories' component={CategoriesDataScreen} options={{ headerShown: false, headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white', }} />
    <Tabs.Screen name='Profile' component={ProfileTabs} />
  </Tabs.Navigator>
)
//    <Tabs.Screen name='Market' component={CategoryScreen}  options={{headerStyle: { backgroundColor:'black'}, headerTintColor: 'white'}} />    // <Tabs.Screen name='Notification' component={NotificationScreen} options={{headerStyle: { backgroundColor:'black'}, headerTintColor: 'white',}}/>


const MainStack = createNativeStackNavigator()
const App = () => {
  return (
      <NavigationContainer>
        <MainStack.Navigator >
          <MainStack.Screen name='Tabs' component={TabsScreen} options={{ headerShown: false }} />
        </MainStack.Navigator>
      </NavigationContainer>
  );
}



export default App;
