import React, { useContext, useState } from 'react';
import { Alert, AsyncStorage, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../components/globalStyles';
import SimpleButton from '../components/SimpleButton';
import { DeckContext } from '../context/DeckContext';

const initialState={
  isCorrect:true,
}

const CreateCardScreen=(props)=>{
  const [state,setState] = useState(initialState);
  const deckContext = useContext(DeckContext);

  const {isCorrect}= state;
  const {currentDeck} = deckContext;

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
    deckContext.createFlashCard(currentDeck.id,state)
  }

  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <View style={{border:'solid', margin:10, borderWidth:1}}>
        <View style={{padding:10}}>
          <Text style={globalStyles.title}>ADD CARD</Text>
          <Text style={globalStyles.text}>Create a new card to deck</Text>
        </View>
        <View>
          <TextInputField title={'Question'} onChangeText={onHandleChangeTextQuestion} placeholder={'Question here'}/>
          <TextInputField title={'Answer'} onChangeText={onHandleChangeTextAnswer} placeholder={'Answer here'}/>

          <View style={{padding:30, height:'auto',width:'100%'}}>
            <Text style={[globalStyles.text,{fontWeight:'bold'}]}>Is Correct?</Text>
            <Picker selectedValue={isCorrect} style={{ height: 50, width: 150 }} onValueChange={(itemValue) => onHandleChangeIsCorrect(itemValue)}>
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

const TextInputField=({title,...props})=>(
  <View style={{padding:30, height:'auto',width:'100%'}}>
    <Text style={[globalStyles.text,{fontWeight:'bold'}]}>{title}</Text>
    <TextInput style={globalStyles.textInput} {...props}/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent:'center',
  },
});
