import styled from 'styled-components/native';
import {Image as Img, FlatList as FlatRefeicoes} from 'react-native';

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

export const CancelButton = styled.TouchableHighlight`
  margin-left: 15px;
`;

export const CancelButtonImage = styled(Img)`
  width: 24px;
  height: 24px;
`;

export const TextButton = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const AddButton = styled.TouchableHighlight`
  margin-right: 15px;
`;

export const AddButtonImage = styled(Img)`
  width: 24px;
  height: 24px;
`;

export const ProvasList = styled(FlatRefeicoes)`
  flex: 1;
  width: 100%;
`;

export const NoRefeicoes = styled.View`
  align-items: center;
  justify-content: center;
`;

export const NoRefeicoesImage = styled(Img)`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

export const NoRefeicoesText = styled.Text`
  font-size: 17px;
`;

export const FlatList = styled(FlatRefeicoes)`
  flex: 1;
  width: 80%;
  max-height: 80%;
`;

export const TextBottom = styled.Text`
  font-size: 10px;
  text-align: center;
  margin: 10px;
`;
