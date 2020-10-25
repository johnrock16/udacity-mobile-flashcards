import React, { useContext, useState } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FlashCardComponent from '../components/FlashCardComponent';
import { globalStyles } from '../components/globalStyles';
import SimpleButton from '../components/SimpleButton';
import { DeckContext } from '../context/DeckContext';
import useSafeAreaStyles from '../hook/useSafeAreaStyles';

const initialState = {
  flashCards: [],
}

const ListDeckSreen = (props) => {
  const [state, setState] = useState(initialState);
  const deckContext = useContext(DeckContext);
  const stylesSA = useSafeAreaStyles();

  const { navigation } = props;
  const { currentDeck } = deckContext
  const { name, cards } = currentDeck;

  const onHandleCardCreate = () => {
    navigation.navigate('CreateCardScreen');
  }

  const onHandleStart = () => {
    if(cards.length>0){
      navigation.navigate('CardScreen');
      return;
    } 
    Alert.alert('Wait','Before start add flashcards')
  }

  return (
    <View style={[{ flex: 1 }, stylesSA.container]}>
      <View style={{ padding: 10 }}>
        <Text style={globalStyles.title}>Quiz {name}</Text>
        <Text style={globalStyles.text}>You can learn anything in anywhere</Text>
      </View>
      <View style={{ padding: 30 }}>
        <FlashCardComponent title={name} text={`${cards.length} FlashCards`} />
      </View>

      <View>
        <SimpleButton title={'Create new FlashCard'} style={globalStyles.button} onPress={onHandleCardCreate} />
        <SimpleButton title={'Start'} style={globalStyles.button} onPress={onHandleStart} />
      </View>
    </View>
  );
}
export default ListDeckSreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
});
