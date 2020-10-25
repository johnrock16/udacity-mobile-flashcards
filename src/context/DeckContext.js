import React, { createContext, useEffect, useState } from 'react';
import { Alert, AsyncStorage } from 'react-native';

const defaultValue = {
  decks: [],
  currentDeck: {},
  setDecks: () => { },
  setCurrentDeck: () => { },
  createDeck: () => { },
  createFlashCard: ()=> { },
}

export const DeckContext = createContext(defaultValue);

export const DeckContextProvider = ({ children }) => {
  const [state, setState] = useState(defaultValue);

  const { decks, currentDeck } = state;

  const setDecks = (decks) => {
    setState((pv) => ({ ...pv, decks }))
  }

  const setCurrentDeck = (currentDeck) => {
    setState((pv) => ({ ...pv, currentDeck }))
  }

  const setCards = (cards) => {
    setState((pv) => ({ ...pv, currentDeck:{...pv.currentDeck,cards} }))
  }

  const createDeck = async (deckName) => {
    let storage = await AsyncStorage.getItem('FlashCards');
    try {
      storage = JSON.parse(storage);
      if (!storage) {
        storage = [{ name: deckName, cards: [], id: 0 }];
      }
      else {
        storage.push({ name: deckName, cards: [], id: storage.length });
      }
      AsyncStorage.setItem('FlashCards', JSON.stringify(storage))
      setDecks(storage);
      Alert.alert('Sucess!','Deck has been successfully created!')
    } catch (error) {
      console.log('Error on create Deck', error);
    }
  }

  const createFlashCard=async (id,flashCard)=>{
    let storage=await AsyncStorage.getItem('FlashCards');
    try {
      storage=JSON.parse(storage);
      storage[id]={...storage[id],cards:[...storage[id].cards,flashCard]};
  
      AsyncStorage.setItem('FlashCards',JSON.stringify(storage))
      setCards(storage[id].cards);
      setDecks(storage);
      Alert.alert('Sucess','Card has been successfully created!')
    } catch (error) {
      console.log('Error on create FlashCard',error);
    }
  }

  useEffect(() => {
    AsyncStorage.getItem('FlashCards').then((result) => {
      if (result && result.length > 0) {
        setDecks(JSON.parse(result));
      }
    });
  }, []);

  return (
    <DeckContext.Provider value={{ decks, currentDeck, setDecks, setCurrentDeck, createDeck,createFlashCard, setCards }}>
      {children}
    </DeckContext.Provider>
  )
}