import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyStack from './src/navigation'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
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