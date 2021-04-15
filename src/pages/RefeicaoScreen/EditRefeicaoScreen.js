import React, {useState, useLayoutEffect} from 'react';
import {Platform, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Container, KeyboardArea, ScrollView, TextButton} from './styles';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import {
  CancelButton,
  CancelButtonImage,
} from '../../components/DefaultCancelButton';
import {DateTouchable, DateInput} from '../../components/DefaultDateTimePicker';
import DateTimePicker from '@react-native-community/datetimepicker';

function EditRefeicaoScreen() {
  const navigation = useNavigation();

  const [dataRefeicao, setDataRefeicao] = useState(new Date());
  const [periodo, setPeriodo] = useState('');
  const [alimentos, setAlimentos] = useState('');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dataRefeicao;
    setShow(Platform.OS === 'ios');
    setDataRefeicao(currentDate);
    this.input_2.focus();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Cadastrar Refeião',
      headerLeft: () => (
        <CancelButton
          underlayColor="transparent"
          onPress={() => navigation.goBack()}>
          <CancelButtonImage
            source={require('../../assets/icons/cancel.png')}
          />
        </CancelButton>
      ),
    });
  }, [navigation]);

  const toggleRegisterClick = () => {
    if (!dataRefeicao) {
      Alert.alert('Dados inválidos', 'Você precisa de uma data de refeição!');
      this.input_1.focus();
      return;
    } else if (!periodo) {
      Alert.alert('Dados inválidos', 'Você precisa selecionar um período!');
      this.input_2.focus();
      return;
    } else if (!alimentos) {
      Alert.alert('Dados inválidos', 'Você precisa de pelo menos um alimento!');
      this.input_3.focus();
      return;
    }

    Alert.alert('Sucesso', 'Refeição cadastrada!');
    navigation.navigate('Home');
  };

  return (
    <Container>
      <KeyboardArea behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView>
          <DateTouchable activeOpaticy={1} onPress={() => setShow(true)}>
            <DateInput
              placeholder="Data da refeição"
              placeholderTextColor="#EEE"
              value={dataRefeicao.toLocaleDateString()}
              editable={false} // optional
              ref={input => {
                this.input_1 = input;
              }}
            />
          </DateTouchable>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dataRefeicao}
              mode={'date'}
              maximumDate={new Date()}
              display="default"
              onChange={onChange}
            />
          )}
          <DefaultInput
            placeholder="Período"
            placeholderTextColor="#EEE"
            autoCapitalize="words"
            returnKeyType="next"
            value={periodo}
            onChangeText={n => setPeriodo(n)}
            ref={input => {
              this.input_2 = input;
            }}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.input_3.focus();
            }}
          />
          <DefaultInput
            placeholder="Alimentos"
            placeholderTextColor="#EEE"
            returnKeyType="send"
            value={alimentos}
            onChangeText={n => setAlimentos(n)}
            ref={input => {
              this.input_3 = input;
            }}
            blurOnSubmit={false}
            onSubmitEditing={toggleRegisterClick}
          />
        </ScrollView>
        <DefaultButton
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={toggleRegisterClick}>
          <TextButton>Cadastrar</TextButton>
        </DefaultButton>
      </KeyboardArea>
    </Container>
  );
}

export default EditRefeicaoScreen;
