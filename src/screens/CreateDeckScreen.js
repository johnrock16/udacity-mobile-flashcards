import React, { useContext, useState } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../components/globalStyles';
import { DeckContext } from '../context/DeckContext';
import useSafeAreaStyles from '../hook/useSafeAreaStyles';

const initialState={
  text:'',
}

const CreateDeckScreen=()=>{
  const [state,setState] = useState(initialState);
  const deckContext = useContext(DeckContext);
  const stylesSA = useSafeAreaStyles();

  const {text}= state;

  const onHandleChangeText=(v)=>{
    setState((pv)=>({...pv,text:v}));
  }

  const onHandleCreate=()=>{
    createFlashCard(text)
  }

  const createFlashCard=async (text)=>{
    deckContext.createDeck(text)
  }

  return (
    <View style={{flex:1,justifyContent:'center',...stylesSA.container}}>
      <View style={{border:'solid', margin:10, borderWidth:1}}>
        <View style={{padding:10}}>
          <Text style={globalStyles.title}>ADD DECK</Text>
          <Text style={globalStyles.text}>Create a new deck of FlashCards</Text>
        </View>
        <View style={{padding:30, height:'auto',width:'100%'}}>
          <Text style={[globalStyles.text,{fontWeight:'bold'}]}>FlashCard Name</Text>
          <TextInput style={globalStyles.textInput} onChangeText={onHandleChangeText} placeholder={'History FlashCards...'}/>
          <TouchableOpacity style={globalStyles.button} onPress={onHandleCreate}>
            <Text style={globalStyles.buttonText}>Create new FlashCard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default CreateDeckScreen;