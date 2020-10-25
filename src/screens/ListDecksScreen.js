import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FlashCardComponent from '../components/FlashCardComponent';
import { globalStyles } from '../components/globalStyles';
import { DeckContext } from '../context/DeckContext';
import useSafeAreaStyles from '../hook/useSafeAreaStyles';


const ListDeckSreen=({navigation})=>{
  const deckContext = useContext(DeckContext);
  const stylesSA= useSafeAreaStyles();
  const {decks}= deckContext;


  const onHandleSelectDeck=(deck)=>{
    deckContext.setCurrentDeck(deck)
    navigation.navigate('DeckScreen');
  }

  return (
    <View style={[{flex:1},stylesSA.container]}>
      <View style={{padding:30}}>
        <View>
          <Text style={globalStyles.title}>LIST DECK SCREEN</Text>
          <Text style={globalStyles.text}>You can learn anything in anywhere</Text>
        </View>
      </View>
      <Text style={[globalStyles.title,{paddingHorizontal:30}]}>{decks.length} DECKS</Text>
      <FlatList
        style={{paddingHorizontal:30}}
        data={decks}
        keyExtractor={(item,index) =>`card${item.name}${index}`}
        renderItem={({item})=>{
          return(<FlashCardComponent onPress={()=>onHandleSelectDeck(item)} title={item.name} text={`${item.cards.length} FlashCards`} />)}}
        scrollEnabled={true}
      />
    </View>
  );
}
export default ListDeckSreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent:'center',
  },
});
