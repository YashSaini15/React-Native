import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MyStack from './src/navigation'
import { NavigationContainer } from '@react-navigation/native'
import {requestUserPermission, notificationListner} from './src/utils/notificationServices'
const App = () => {
  useEffect(()=>{
    requestUserPermission()
    notificationListner()
  })
  return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    padding:40,
    paddingHorizontal:16
  }
})