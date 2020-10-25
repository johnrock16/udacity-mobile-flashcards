import React, { createContext, useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import * as Notifications from 'expo-notifications';
import { todayToTommorowDiff, todayUTC } from '../utils';

const defaultValue = {
  addScheduleNotification: () => { },
  removeScheduleNotification: () => { },
}

export const NotificationContext = createContext(defaultValue);

export const NotificationContextProvider = ({ children }) => {
  const AddNotificatioPerDay = ()=>{
    const notification=Notifications.scheduleNotificationAsync({
      content: {
        title: "Study with your FlashCards",
        body: 'study now!',
      },
      trigger: {
        seconds: todayToTommorowDiff(),
      },
    });
    const saveNotification={notification,date:todayUTC()}
    AsyncStorage.setItem('NotificationPerDay',JSON.stringify(saveNotification));
  }

  const removeSchedulePerDayNotification=()=>{
    AsyncStorage.getItem('NotificationPerDay').then((result) => {
      if (!result || (typeof result.notification !=='undefined') ) {
        Notifications.cancelScheduledNotificationAsync(result.notification);
      }
    })
  }

  useEffect(() => {
    AsyncStorage.getItem('NotificationPerDay').then((result) => {
      if (!result || (typeof result.date !=='undefined' && todayUTC()!=result.date) ) {
        console.log('nao possui notificacao');
        AddNotificatioPerDay();
      }
    })
  }, [])


  return (
    <NotificationContext.Provider value={{ AddNotificatioPerDay, removeSchedulePerDayNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}