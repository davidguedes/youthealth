import React from 'react';
import styled from 'styled-components/native';

export default function Input(props) {
  return (
    <>
      <TextInput {...props} />
      {props.errorText && <Text>{props.errorText}</Text>}
    </>
  );
}

const TextInput = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: ${props => (props.errorText ? '#FF0000' : '#555555')};
  color: #000;
  font-size: 18px;
  width: 300px;
  height: 45px;
  margin: 10px;
  padding-left: 10px;
`;

const Text = styled.Text`
  color: #ff0000;
`;
