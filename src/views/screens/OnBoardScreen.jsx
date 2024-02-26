import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import COLORS from '../../consts/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PrimaryButton} from '../components/Button';

const OnBoardScreen = ({navigation}) => {
  return (

    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* <ActivityIndicator/> */}
      <View style={{height: 400}}>
        <Image
          style={{width: '100%', resizeMode: 'contain', top: -150}}
          source={require('../../assets/onboardImage.png')}
        />
      </View>
      <View style={style.container}>
        <View>
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: '#000',
              textAlign: 'center',
            }}>
            Delicious Food
          </Text>
          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontSize: 20,
            }}>
            We help you to find best and Delicious Food{' '}
          </Text>
        </View>
        <View style={style.indicatorContainer}>
          <View style={style.currentIndicator}></View>
          <View style={style.indicator}></View>
          <View style={style.indicator}></View>
        </View>
        <PrimaryButton
          onPress={() => navigation.navigate('Home')}
          title="Get Started"
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  indicatorContainer: {
    // height: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentIndicator: {
    height: 12,
    width: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginHorizontal: 5,
    // top: ,-120,
  },
  indicator: {
    height: 12,
    width: 12,
    backgroundColor: COLORS.gray,
    marginHorizontal: 5,
    borderRadius: 6,
  },
});

export default OnBoardScreen;
