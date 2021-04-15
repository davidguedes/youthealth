import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../pages/HomeScreen';

const HomeStack = createStackNavigator();

export default () => (
  <HomeStack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
    }}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);
