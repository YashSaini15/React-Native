import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Todo from '../screens/Todo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const BottomNavigator = ({color}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {height: 55, borderTopWidth: 0},
        tabBarActiveTintColor: color,
        tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
      }}>
      <Tab.Screen
        name="My Tasks"
        component={Todo}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="clipboard-list" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  header: {},
});
