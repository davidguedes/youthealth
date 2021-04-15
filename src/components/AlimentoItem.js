import styled from 'styled-components/native';

export const Box = styled.TouchableHighlight`
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  background-color: #c1c1c1;
  border-radius: 34px;
  flex-direction: row;
  padding: 10px;
`;

export const HeaderItem = styled.View`
  width: 30%;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-right-color: #fff;
  border-right-width: 1px;
  background-color: green;
`;

export const BodyItem = styled.View`
  width: 70%;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
`;

export const TextCat = styled.Text`
  font-size: 15px;
  text-align: center;
  margin-top: 5px;
  text-transform: uppercase;
`;
