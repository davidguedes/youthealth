import styled from 'styled-components/native';

export const FindArea = styled.View`
  flex-direction: row;
`;

export const FindInput = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: #555;
  color: #000;
  font-size: 18px;
  width: 270px;
  height: 45px;
  margin: 10px;
  padding-left: 10px;
`;

export const FindButton = styled.TouchableHighlight`
  background-color: #808080;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
`;

export const FindImageButton = styled.Image`
  width: 24px;
  height: 24px;
`;
