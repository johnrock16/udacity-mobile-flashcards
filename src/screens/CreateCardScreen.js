import React, { useState } from 'react';
import { Alert, AsyncStorage, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../components/globalStyles';
import SimpleButton from '../components/SimpleButton';

const initialState={
  question:'',
  answer:'',
  isCorrect:false,
}

const CreateCardScreen=(props)=>{
  const [state,setState] = useState(initialState);

  const {question,answer,isCorrect}= state;

  const {navigation} = props;
  const {deck} = props.route.params

  const onHandleChangeTextQuestion=(v)=>{
    setState((pv)=>({...pv,question:v}));
  }
  const onHandleChangeTextAnswer=(v)=>{
    setState((pv)=>({...pv,answer:v}));
  }
  const onHandleChangeIsCorrect=(v)=>{
    setState((pv)=>({...pv,isCorrect:v}));
  }

  const onHandleCreate=()=>{
    createFlashCard()
  }

  const createFlashCard=async ()=>{
    console.log(state)
    console.log(deck.id)
    let storage=await AsyncStorage.getItem('FlashCards');
    try {
      storage=JSON.parse(storage);
      storage[deck.id]={...storage[deck.id],cards:[...storage[deck.id].cards,state]};
      console.log(storage);
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
          <Text style={globalStyles.title}>ADD CARD</Text>
          <Text style={globalStyles.text}>Create a new card to deck</Text>
        </View>
        <View>
          <View style={{padding:30, height:'auto',width:'100%'}}>
            <Text style={[globalStyles.text,{fontWeight:'bold'}]}>Question</Text>
            <TextInput style={globalStyles.textInput} onChangeText={onHandleChangeTextQuestion} placeholder={'Question here'}/>
          </View>
          <View style={{padding:30, height:'auto',width:'100%'}}>
            <Text style={[globalStyles.text,{fontWeight:'bold'}]}>Answer</Text>
            <TextInput style={globalStyles.textInput} onChangeText={onHandleChangeTextAnswer} placeholder={'Answer here'}/>
          </View>
          <View style={{padding:30, height:'auto',width:'100%'}}>
            <Text style={[globalStyles.text,{fontWeight:'bold'}]}>Is Correct?</Text>
            <Picker
              selectedValue={isCorrect}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue) => onHandleChangeIsCorrect(itemValue)}
            >
              <Picker.Item label="Yes" value={true} />
              <Picker.Item label="No" value={false} />
            </Picker>
          </View>
          <SimpleButton title={'Create new FlashCard'} style={globalStyles.button} onPress={onHandleCreate}/>
        </View>
      </View>
    </View>
  );
}
export default CreateCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent:'center',
  },
});
