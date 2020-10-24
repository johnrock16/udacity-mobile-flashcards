import React, { useState } from 'react';
import { AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FlashCardComponent from '../components/FlashCardComponent';
import { globalStyles } from '../components/globalStyles';
import SimpleButton from '../components/SimpleButton';
import useSafeAreaStyles from '../hook/useSafeAreaStyles';

const initialState={
  flashCards:[],
}

const ListDeckSreen=(props)=>{
  const [state,setState] = useState(initialState);
  const stylesSA= useSafeAreaStyles();

  const {navigation} = props;
  const {deck} = props.route.params
  const {name,cards} = deck;
  console.log(deck)

  const onHandleCardCreate=()=>{
    navigation.navigate('CreateCardScreen',{deck})
  }

  const onHandleStart=()=>{
    navigation.navigate('CardScreen',{deck})
  }

  return (
    <View style={[{flex:1},stylesSA.container]}>
        <View style={{padding:10}}>
          <Text style={globalStyles.title}>Quiz {name}</Text>
          <Text style={globalStyles.text}>You can learn anything in anywhere</Text>
        </View>
        <View style={{padding:30}}>
            <FlashCardComponent title={name} text={`${cards.length} FlashCards`} />
        </View>
        
        <View>
          <SimpleButton title={'Create new FlashCard'} style={globalStyles.button} onPress={onHandleCardCreate}/>
          <SimpleButton title={'Start'} style={globalStyles.button} onPress={onHandleStart}/>
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
