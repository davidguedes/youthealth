import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EditProvaScreen from '../pages/ProvaScreen/EditProvaScreen';
import ListProvasScreen from '../pages/ProvaScreen/ListProvasScreen';

const ProvaStack = createStackNavigator();

export default () => (
  <ProvaStack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
    }}>
    <ProvaStack.Screen name="ListProvas" component={ListProvasScreen} />
    <ProvaStack.Screen name="EditProva" component={EditProvaScreen} />
  </ProvaStack.Navigator>
);
