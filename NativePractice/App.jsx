import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomBottom from './components/CustomBottom'
import BottomSheets from './components/BottomSheets'
import ListAPI from './components/ListAPI'
import FlatlistAPI from './components/FlatlistAPI'
import InfiniteScrollFlatlist from './components/InfiniteScrollFlatlist'

const App = () => {
  return (
  //  <CustomBottom />
  // <BottomSheets />
  // <ListAPI />
  // <FlatlistAPI />
  <InfiniteScrollFlatlist />
  )
}

export default App

const styles = StyleSheet.create({})