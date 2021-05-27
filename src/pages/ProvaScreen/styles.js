import styled from 'styled-components/native';
import {Image as Img, FlatList as FlatProvas} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const KeyboardArea = styled.KeyboardAvoidingView`
  align-items: center;
  justify-content: center;
`;

export const ScrollView = styled.ScrollView`
  max-height: 460px;
`;

export const TextButton = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const InputAnotacoes = styled.TextInput`
  background-color: #555;
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
  width: 300px;
  min-height: 300px;
  height: auto;
  margin: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const AddButton = styled.TouchableHighlight`
  margin-right: 15px;
`;

export const AddButtonImage = styled(Img)`
  width: 24px;
  height: 24px;
`;

export const NoProvas = styled.View`
  align-items: center;
  justify-content: center;
`;

export const NoProvasImage = styled(Img)`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

export const NoProvasText = styled.Text`
  font-size: 17px;
`;

export const FlatList = styled(FlatProvas)`
  flex: 1;
  width: 80%;
  max-height: 80%;
`;

export const TextBottom = styled.Text`
  font-size: 10px;
  text-align: center;
  margin: 10px;
`;

export const CheckBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CheckBoxText = styled.Text`
  font-size: 18px;
  text-transform: uppercase;
`;
