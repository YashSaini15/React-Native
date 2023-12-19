import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
    getfcmToken()
  }
}

const getfcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  // console.log(fcmToken, 'the old token');
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, 'the new generated token');
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error,"error raised in fcmToken");
      Alert.alert("Show Error")
    }
  }
};

export const notificationListner = async () =>{
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',remoteMessage.notification,
    );
  });

  messaging().onMessage(async remoteMessage=>{
    console.log("received in foreground",remoteMessage);
  })

  messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification,
      );
    }
  });
}
