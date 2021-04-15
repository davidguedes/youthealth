import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EditRefeicaoScreen from '../pages/RefeicaoScreen/EditRefeicaoScreen';
import ListRefeicoesScreen from '../pages/RefeicaoScreen/ListRefeicoesScreen.js';

const AlimentoStack = createStackNavigator();

export default () => (
  <AlimentoStack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
    }}>
    <AlimentoStack.Screen
      name="ListRefeicoes"
      component={ListRefeicoesScreen}
    />
    <AlimentoStack.Screen name="EditRefeicao" component={EditRefeicaoScreen} />
  </AlimentoStack.Navigator>
);
