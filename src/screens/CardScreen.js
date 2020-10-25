import React, { useContext, useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FlashCardComponent from '../components/FlashCardComponent';
import { globalStyles } from '../components/globalStyles';
import SimpleButton from '../components/SimpleButton';
import { DeckContext } from '../context/DeckContext';
import useSafeAreaStyles from '../hook/useSafeAreaStyles';

const initialState = {
  cards:[],
  currentCard:{},
  idCard:0,
  acerts:0,
  showAnswer: false,
  lastAnswer:false,
}

const CardScreen = (props) => {
  const [state, setState] = useState(initialState);
  const deckContext = useContext(DeckContext);
  const stylesSA = useSafeAreaStyles();

  const { showAnswer,lastAnswer, currentCard,acerts,idCard } = state;
  const { cards} = deckContext.currentDeck
  

  const onHandleShow = () =>{
    setState((pv)=>({...pv,showAnswer:true}))
  }

  const onHandleAnswer = (v) => {
    let accerts=acerts;
    if(v==currentCard?.isCorrect) accerts+=1
    setState((pv)=>({...pv,acerts:accerts,idCard:pv.idCard+1}))
  }

  useEffect(()=>{
    if(idCard<cards.length){
      setState((pv)=>({...pv,currentCard:cards[idCard]}))
    }
    else if(!lastAnswer){
      setState((pv)=>({...pv,lastAnswer:true}))
    }
  },[idCard])

  useEffect(()=>{
    setState((pv)=>({...pv,cards:cards}))
  },[])

  return (
    <View style={[{ flex: 1, padding: 10 }, stylesSA.container]}>
      <View style={{ padding: 10, alignItems: 'center' }}>
        <Text style={[globalStyles.title]}>QUIZ</Text>
        <Text style={[globalStyles.text]}>You can learn anything in anywhere</Text>
      </View>
      <View style={{ padding: 30 }}>
        <FlashCardComponent title={'HISTORIA'} text={`${idCard}/${cards.length} Questions`} />
      </View>
      <View style={{ padding: 30 }}>
        {
          (lastAnswer)?
          <View style={{width:'100%',alignItems:'center'}}>
            <Text style={globalStyles.title}>QUIZ COMPLETED</Text>
            <Text style={globalStyles.text}>{`${acerts}/${cards.length} correct Answers`}</Text>
          </View>
          :
          <View>
            <CardTopic title={'QUESTION'} text={currentCard?.question} />
            {
              (showAnswer) ? (
                <View style={{padding:5}}>
                  <CardTopic title={'ANSWER'} text={currentCard?.answer} />
                  <CardTopic title={`That's correct?`} text={'YES OR NO?'} />
                  <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <SimpleButton title={'YES'} onPress={()=>onHandleAnswer(true)}/>
                    <SimpleButton title={'NO'} onPress={()=>onHandleAnswer(false)}/>
                  </View>
                </View>
              ):
              <SimpleButton title={'SHOW ANSWER'} onPress={onHandleShow}/>
            }
          </View>
        }
      </View>
    </View>
  );
}
export default CardScreen;

const CardTopic=({title,text})=>(
  <View>
    <Text style={[globalStyles.title]}>{title}</Text>
    <Text style={[globalStyles.text, { padding: 10 }]}>{text}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
});
