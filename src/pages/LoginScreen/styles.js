import styled from 'styled-components/native';
import {Image as Img} from 'react-native';

export const Page = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const KeyboardArea = styled.KeyboardAvoidingView`
  align-items: center;
  justify-content: center;
`;

export const Image = styled(Img)`
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
`;

export const TextButton = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const TextCopy = styled.Text`
  position: absolute;
  bottom: 10px;
`;
