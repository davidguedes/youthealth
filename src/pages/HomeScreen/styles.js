import styled from 'styled-components/native';
import {Image as Img} from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const SettingsButton = styled.TouchableHighlight`
  margin-right: 15px;
`;

export const LogoutButton = styled.TouchableHighlight`
  margin-left: 15px;
`;

export const HeaderButtonImage = styled(Img)`
  width: 24px;
  height: 24px;
`;

export const Header = styled.View`
  width: 340px;
  height: auto;
  align-items: center;
  justify-content: center;
  background-color: #808080;
  margin: auto;
  border-radius: 30px;
`;

export const Title = styled.Text`
  font-size: 25px;
  padding: 10px;
  background-color: #a9a9a9;
  border-radius: 30px;
  color: #fff;
`;

export const Description = styled.Text`
  font-size: 18px;
  text-align: justify;
  color: #fff;
  margin: 10px;
`;

export const Image = styled(Img)`
  width: 64px;
  height: 64px;
  margin-bottom: 10px;
`;
