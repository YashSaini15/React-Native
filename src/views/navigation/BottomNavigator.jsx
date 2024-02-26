import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import COLORS from '../../consts/colors';
import CartScreen from '../screens/CartScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import BagScreen from '../screens/BagScreen';

const Tab = createBottomTabNavigator();
export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name={'home-filled'} size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LocalMall"
        component={BagScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name={'local-mall'} size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View style={{
              height: 60,
              width: 60,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.white,
              borderColor: COLORS.primary,
              borderWidth: 2,
              borderRadius: 30,
              top: -25,
              elevation: 5,

            }}>
            <Icon name={'search'} size={28} color={COLORS.primary} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name={'favorite'} size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name={'shopping-cart'} size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
