import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EditAlimentoScreen from '../pages/AlimentoScreen/EditAlimentoScreen';
import ListAlimentosScreen from '../pages/AlimentoScreen/ListAlimentosScreen';

const AlimentoStack = createStackNavigator();

export default () => (
  <AlimentoStack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
    }}>
    <AlimentoStack.Screen
      name="ListAlimentos"
      component={ListAlimentosScreen}
    />
    <AlimentoStack.Screen name="EditAlimento" component={EditAlimentoScreen} />
  </AlimentoStack.Navigator>
);
