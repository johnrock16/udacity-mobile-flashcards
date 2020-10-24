import React, { useState } from 'react';
import { AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FlashCardComponent from '../components/FlashCardComponent';
import { globalStyles } from '../components/globalStyles';
import useSafeAreaStyles from '../hook/useSafeAreaStyles';

const initialState={
  flashCards:[],
}

const ListDeckSreen=({navigation})=>{
  const [state,setState] = useState(initialState);
  const stylesSA= useSafeAreaStyles();
  const {flashCards}= state;


  const onHandleSelectDeck=(deck)=>{
    navigation.navigate('DeckScreen',{deck})
  }

  React.useEffect(() => {
    AsyncStorage.getItem('FlashCards').then((result)=>{
      if(result && result.length>0){
        setState((pv)=>({...pv,flashCards:JSON.parse(result)}))
      }
    })
  }, []);

  return (
    <View style={[{flex:1},stylesSA.container]}>
      <View style={{padding:20}}>
        <View style={{padding:10}}>
          <Text style={globalStyles.title}>LIST DECK SCREEN</Text>
          <Text style={globalStyles.text}>You can learn anything in anywhere</Text>
        </View>
        <View style={{padding:5,height:'auto',width:'100%'}}>
          <Text style={globalStyles.title}>{flashCards.length} DECKS</Text>

          {
            (flashCards.map((item,index)=>(
              <FlashCardComponent key={`card${item.name}${index}`} onPress={()=>onHandleSelectDeck(item)} title={item.name} text={`${item.cards.length} FlashCards`} />
            )))
          }

        </View>
      </View>
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
