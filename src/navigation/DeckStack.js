import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListDeckSreen from '../screens/ListDecksScreen';
import DeckScreen from '../screens/DeckScreen';
import CardScreen from '../screens/CardScreen';
import CreateCardScreen from '../screens/CreateCardScreen';

const Stack = createStackNavigator();

const DeckStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={ListDeckSreen} />
      <Stack.Screen name="DeckScreen" component={DeckScreen} />
      <Stack.Screen name="CardScreen" component={CardScreen} />
      <Stack.Screen name="CreateCardScreen" component={CreateCardScreen} />
    </Stack.Navigator>
  );
};

export default DeckStack;