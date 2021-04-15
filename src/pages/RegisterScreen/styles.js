import styled from 'styled-components/native';

export const Page = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

//background-color: #ddff55;
//background-color: #e55e55;

export const KeyboardArea = styled.KeyboardAvoidingView`
  align-items: center;
  justify-content: center;
`;

export const DateArea = styled.View`
  flex: 1;
  background-color: #e55e55;
  width: 300px;
  height: 45px;
  justify-content: center;
  align-items: center;
`;

export const ScrollView = styled.ScrollView`
  max-height: 460px;
`;

export const TextButton = styled.Text`
  font-size: 18px;
  color: #fff;
`;
