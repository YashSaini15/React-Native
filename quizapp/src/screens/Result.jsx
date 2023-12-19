import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Title from '../components/Title';

const Result = ({navigation, route}) => {
  const {score} = route.params
  const resultBanner = score>40 ? "https://cdni.iconscout.com/illustration/premium/thumb/business-victory-3142053-2617867.png": "https://cdni.iconscout.com/illustration/premium/preview/concept-about-business-failure-1862195-1580189.png"
  return (
    <View style={styles.container}>
    <Title titleText='RESULTS'/>
    <Text style={styles.scoreValue}>{score}</Text>
    <View style={styles.bannerContainer}>
      <Image
        source={{uri:resultBanner}}
        style={styles.banner}
        resizeMode="contain"
      />
    </View>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Home')}>
      <Text style={styles.buttonText}>GO TO HOME</Text>
    </TouchableOpacity>
  </View>
  )
}

export default Result

const styles = StyleSheet.create({
  banner: {
    height: 300,
    width: 300,
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    height: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: '#1a759f',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  scoreValue:{
    fontSize:24,
    fontWeight:'800',
    alignSelf:'center'
  }
});
