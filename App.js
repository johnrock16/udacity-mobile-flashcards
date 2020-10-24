import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CreateDeckScreen from './src/screens/CreateDeckScreen';
import { NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DeckStack from './src/navigation/DeckStack';

const Tab = createBottomTabNavigator();

const App=()=>{
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
          <Tab.Screen name="Home" component={DeckStack} />
          <Tab.Screen name="CreateDeck" component={CreateDeckScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

const screenOptions=({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    const iconName = (route.name === 'Home') ? 'ios-list' : 'ios-add-circle-outline';
    color = focused? 'red' : 'black'
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});
const tabBarOptions={
  activeTintColor: 'tomato',
  inactiveTintColor: 'gray',
}