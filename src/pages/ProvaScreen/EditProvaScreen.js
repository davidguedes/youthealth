import React, {useState, useLayoutEffect} from 'react';
import {Platform, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  KeyboardArea,
  ScrollView,
  InputAnotacoes,
  TextButton,
} from './styles';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import {
  CancelButton,
  CancelButtonImage,
} from '../../components/DefaultCancelButton';
import {DateTouchable, DateInput} from '../../components/DefaultDateTimePicker';
import DateTimePicker from '@react-native-community/datetimepicker';

function EditProvaScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Cadastrar Prova',
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

  const [dataProva, setDataProva] = useState(new Date());
  const [materia, setMateria] = useState('');
  const [anotacoes, setAnotacoes] = useState('');
  const [alerta, setAlerta] = useState('');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dataProva;
    setShow(Platform.OS === 'ios');
    setDataProva(currentDate);
    this.input_2.focus();
  };

  const toggleRegisterClick = () => {
    if (!dataProva) {
      Alert.alert('Dados inválidos', 'Você precisa de uma data de prova!');
      this.input_1.focus();
      return;
    } else if (!materia) {
      Alert.alert('Dados inválidos', 'Você precisa infomar a matéria!');
      this.input_2.focus();
      return;
    }

    Alert.alert('Sucesso', 'Prova cadastrada!');
    navigation.navigate('Home');
  };

  return (
    <Container>
      <KeyboardArea behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView>
          <DateTouchable activeOpaticy={1} onPress={() => setShow(true)}>
            <DateInput
              placeholder="Data da prova"
              placeholderTextColor="#EEE"
              value={dataProva.toLocaleDateString()}
              editable={false} // optional
              ref={input => {
                this.input_1 = input;
              }}
            />
          </DateTouchable>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dataProva}
              mode={'date'}
              maximumDate={new Date()}
              display="default"
              onChange={onChange}
            />
          )}
          <DefaultInput
            placeholder="Matéria"
            placeholderTextColor="#EEE"
            autoCapitalize="words"
            returnKeyType="next"
            value={materia}
            onChangeText={n => setMateria(n)}
            ref={input => {
              this.input_2 = input;
            }}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.input_3.focus();
            }}
          />
          <InputAnotacoes
            placeholder="Anotações"
            placeholderTextColor="#EEE"
            autoCapitalize="words"
            value={anotacoes}
            multiline={true}
            textAlignVertical="top"
            onChangeText={n => setAnotacoes(n)}
            ref={input => {
              this.input_3 = input;
            }}
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

export default EditProvaScreen;
