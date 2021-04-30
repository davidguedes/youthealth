import React, {forwardRef} from 'react';
import styled from 'styled-components/native';

const Input = forwardRef(function Input(props, ref) {
  return (
    <>
      <TextInput {...props} innerRef={ref} />
      {props.errorText && <Text>{props.errorText}</Text>}
    </>
  );
});

export default Input;

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
