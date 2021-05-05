import React, {useState, useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';
import {Platform, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
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
import Spinner from 'react-native-loading-spinner-overlay';
const api = require('axios');

function EditProvaScreen() {
  const navigation = useNavigation();
  const {token} = useSelector(state => state.userReducer);
  const route = useRoute();

  const type = route.params.type;
  const idProva = route.params.idProva;

  const [isLoading, setIsLoading] = useState(false);
  const [textButton, setTextButton] = useState('');
  const [dataProva, setDataProva] = useState(new Date());
  const [show, setShow] = useState(false);
  const [materia, setMateria] = useState('');
  const [anotacoes, setAnotacoes] = useState('');
  const [alerta, setAlerta] = useState(false);

  useLayoutEffect(() => {
    console.log('tipo:' + type + '. idProva: ' + idProva);
    if (type === 'addProva') {
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
    } else if (type === 'editProva') {
      navigation.setOptions({
        title: 'Editar Prova',
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

      const getProvas = async () => {
        try {
          const response = await api.get(
            'http://192.168.0.12:5000/provas/' + idProva,
            {
              headers: {
                autorization: token,
              },
            },
          );
          if (response.data.prova) {
            setDataProva(new Date(response.data.prova.dataProva));
            setMateria(response.data.prova.materia);
            setAnotacoes(response.data.prova.anotacoes);
            setAlerta(response.data.prova.alerta);
          }
        } catch (err) {
          console.log(err);
        }
      };
      getProvas();
    }
    setTextButton(type === 'addProva' ? 'Cadastrar' : 'Salvar');
  }, [idProva, navigation, token, type]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dataProva;
    setShow(Platform.OS === 'ios');
    setDataProva(currentDate);
    this.input_2.focus();
  };

  const cadastrarProva = async () => {
    try {
      const response = await api.post(
        'http://192.168.0.12:5000/provas',
        {
          dataProva: dataProva,
          materia: materia,
          anotacoes: anotacoes,
          alerta: alerta,
        },
        {
          headers: {
            autorization: token,
          },
        },
      );
      Alert.alert('Sucesso', 'Prova cadastrada com sucesso!');
      navigation.navigate('ListProvas');
    } catch (err) {
      console.log(err);
      Alert.alert('Erro ao cadastrar!', err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const editarProva = async () => {
    try {
      const response = await api.put(
        'http://192.168.0.12:5000/provas/' + idProva,
        {
          dataProva: dataProva,
          materia: materia,
          anotacoes: anotacoes,
          alerta: false,
        },
        {
          headers: {
            autorization: token,
          },
        },
      );
      Alert.alert('Sucesso', 'Prova alterada com sucesso!');
      navigation.navigate('ListProvas');
    } catch (err) {
      console.log(err);
      Alert.alert('Erro ao atualizar!', err.response.data.error);
    } finally {
      setIsLoading(false);
      Alert.alert(
        'Dados',
        'Data da Prova: ' +
          dataProva +
          ', Materia: ' +
          materia +
          ', Anotações: ' +
          anotacoes +
          ', Alerta: ' +
          alerta,
      );
    }
  };

  const toggleRegisterClick = () => {
    setIsLoading(true);
    if (!dataProva) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'Você precisa de uma data de prova!');
      this.input_1.focus();
      return;
    } else if (!materia) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'Você precisa infomar a matéria!');
      this.input_2.focus();
      return;
    }

    if (type === 'addProva') {
      cadastrarProva();
    } else if (type === 'editProva') {
      editarProva();
    }
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <KeyboardArea behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView>
          <DateTouchable activeOpaticy={1} onPress={() => setShow(true)}>
            <DateInput
              placeholder="Data da prova"
              placeholderTextColor="#555"
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
              minimumDate={new Date()}
              display="default"
              onChange={onChange}
            />
          )}
          <DefaultInput
            placeholder="Matéria"
            placeholderTextColor="#555"
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
          <TextButton>{textButton}</TextButton>
        </DefaultButton>
      </KeyboardArea>
    </Container>
  );
}

export default EditProvaScreen;
