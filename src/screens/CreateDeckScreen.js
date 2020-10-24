import React, { useState } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../components/globalStyles';

const initialState={
  text:'',
}

const CreateDeckScreen=()=>{
  const [state,setState] = useState(initialState);

  const {text}= state;

  const onHandleChangeText=(v)=>{
    setState((pv)=>({...pv,text:v}));
  }

  const onHandleCreate=()=>{
    createFlashCard(text)
  }

  const createFlashCard=async (text)=>{
    let storage=await AsyncStorage.getItem('FlashCards');
    try {
      storage=JSON.parse(storage);
      if(!storage){
        storage=[{name:text,cards:[],id:0}];
      }
      else{
        storage.push({name:text,cards:[],id:storage.length});
      }
      AsyncStorage.setItem('FlashCards',JSON.stringify(storage))
      Alert.alert('Card Criado com Sucesso!')
    } catch (error) {
      console.log('Erro ao criar FlashCard');
    }
  }

  return (
    <View style={{flex:1,justifyContent:'center'}}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent:'center',
  },
});
