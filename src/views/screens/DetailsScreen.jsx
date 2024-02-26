import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SecondaryButton} from '../components/Button';

export default function DetailsScreen({navigation, route}) {
  const item = route.params;

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <Icon
          style={{color: COLORS.dark}}
          name="arrow-back-ios"
          size={28}
          onPress={navigation.goBack}
        />
        <Text style={{fontSize: 20, color: COLORS.dark, fontWeight: 'bold'}}>
          Details
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', height: 280}}>
          <Image source={item.image} style={{height: 220, width: 220}} />
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 25, fontWeight: 'bold', color: COLORS.white}}>
              {item.name}
            </Text>
            <View style={style.iconContainer}>
              <Icon name="favorite-border" color={COLORS.primary} size={25} />
            </View>
          </View>
          <Text style={style.detailsText}>
            Lorem ipsum is dolor sit amet in consectetur adipisicing elit.
            Temporibus et out molestias, assumenda cumque libero, illo ratione
            fuga cupiditate natus quam ut?m vero labore ullam obcaecati minus repellat
            sapiente est odit alias odio soluta, voluptas nostrum voluptatum
            necessitatibus, molestias quis sequi! Quia nihil rerum quo nam quasi
            enim, eoebitis repellendus.
          </Text>
          <View style={{marginTop: 40, marginBottom: 40}}>
          <SecondaryButton title="Add to Cart" />
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'justify',
  },
});
