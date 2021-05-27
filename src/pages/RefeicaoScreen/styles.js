import styled from 'styled-components/native';
import {Image as Img} from 'react-native';

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
  height: auto;
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

export const FlatList = styled.FlatList`
  flex: 1;
  width: 100%;
  max-height: 80%;
  padding: 0px 10px;
`;

export const FlatListRefeicoes = styled.FlatList`
  flex: 1;
  width: 80%;
  max-height: 80%;
`;

export const TextBottom = styled.Text`
  font-size: 10px;
  text-align: center;
  margin: 10px;
`;

/* EditRefeicao */
export const FlatListAlimentos = styled.FlatList`
  height: 230px;
  max-height: 230px;
`;

export const SafeAreaView = styled.SafeAreaView`
  justify-content: center;
`;

export const NoAlimentos = styled.View`
  align-items: center;
  justify-content: center;
  height: 230px;
  max-height: 230px;
`;

export const NoAlimentosImage = styled.Image`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

export const NoAlimentosText = styled.Text`
  font-size: 17px;
`;

export const Box = styled.TouchableHighlight`
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  background-color: #c1c1c1;
  border-radius: 34px;
  flex-direction: row;
  padding: 10px;
`;

export const BodyItem = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
`;

export const BoxAlimento = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  background-color: #c1c1c1;
  border-radius: 34px;
  flex-direction: row;
  padding: 10px;
`;

export const BodyAlimentoItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ButtonDelete = styled.TouchableHighlight`
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  width: 30px;
  height: 30px;
  background-color: #ff6961;
`;

export const ButtonDeleteText = styled.Text`
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
`;

export const BoxModal = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5);
  justify-content: center;
  align-items: center;
`;

export const BoxBodyModal = styled.View`
  width: 90%;
  height: 90%;
  background-color: #fff;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

export const ButtonCloseModal = styled.TouchableHighlight`
  background-color: #808080;
  padding: 10px 25px;
  border-radius: 10px;
  margin-top: 10px;
`;

export const ButtonCloseModalText = styled.Text`
  font-size: 18px;
  color: #fff;
`;
