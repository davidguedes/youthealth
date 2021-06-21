import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Platform, Alert, Keyboard} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {Page, KeyboardArea, ScrollView, TextButton} from './styles';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import {DateTouchable, DateInput} from '../../components/DefaultDateTimePicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-loading-spinner-overlay';
const api = require('axios');

const SettingsScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getCursos();
  }, []);

  const [cursos, setCursos] = useState([]);

  const getCursos = async () => {
    try {
      const response = await api.get('http://192.168.0.12:5000/cursos', {});
      if (response.data.cursos.length > 0) {
        setCursos([...response.data.cursos]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const [nome, setNome] = useState(user.nome);
  const [dataNasc, setDataNasc] = useState(new Date(user.dataNasc));
  const [email, setEmail] = useState(user.email);
  const [idAluno, setIdAluno] = useState(user.idAluno);
  const [selectedCurso, setSelectedCurso] = useState(user.curso);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dataNasc;
    setShow(Platform.OS === 'ios');
    setDataNasc(currentDate);
  };

  const alterAct = async () => {
    try {
      const response = await api.put(
        'http://192.168.0.12:5000/user/' + user.idUser,
        {
          nome: nome,
          dataNasc: dataNasc,
          curso: selectedCurso,
        },
        {
          headers: {
            autorization: user.token,
          },
        },
      );
      dispatch({
        type: 'ALTER_USER',
        payload: {
          nome: nome,
          dataNasc: dataNasc.toLocaleDateString(),
          curso: selectedCurso,
        },
      });
      Alert.alert('Sucesso', 'Cadastro alterado, ' + nome + '!');
      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
      Alert.alert('Erro ao alterar os dados', err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSettingsClick = () => {
    setIsLoading(true);
    if (!nome) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'Você precisa de um nome!');
      this.input_1.focus();
      return;
    } else if (!dataNasc) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'Você precisa de uma data de nascimento');
      this.input_2.focus();
      return;
    } else if (!email) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'Você precisa de um email');
      this.input_3.focus();
      return;
    } else if (!idAluno) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'Você precisa de um ID');
      this.input_4.focus();
      return;
    } else if (!selectedCurso) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'Você precisa de um curso');
      return;
    }

    alterAct();
  };

  return (
    <Page>
      <Spinner visible={isLoading} />
      <KeyboardArea behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView>
          <DefaultInput
            placeholder="Nome completo"
            placeholderTextColor="#555"
            autoFocus={true}
            autoCapitalize="words"
            returnKeyType="next"
            value={nome}
            onChangeText={n => setNome(n)}
            ref={input => {
              this.input_1 = input;
            }}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.input_2.focus();
            }}
          />
          <DateTouchable activeOpaticy={1} onPress={() => setShow(true)}>
            <DateInput
              placeholder="Data de nascimento"
              placeholderTextColor="#EEE"
              value={dataNasc.toLocaleDateString()}
              editable={false} // optional
              ref={input => {
                this.input_2 = input;
              }}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.input_3.focus();
              }}
            />
          </DateTouchable>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dataNasc}
              mode={'date'}
              maximumDate={new Date()}
              display="default"
              onChange={onChange}
            />
          )}
          <DefaultInput
            placeholder="Email"
            placeholderTextColor="#555"
            keyboardType="email-address"
            returnKeyType="next"
            editable={false}
            value={email}
            onChangeText={n => setEmail(n)}
            ref={input => {
              this.input_3 = input;
            }}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.input_4.focus();
            }}
          />
          <DefaultInput
            placeholder="ID de aluno"
            placeholderTextColor="#555"
            keyboardType="numeric"
            maxLength={8}
            returnKeyType="next"
            editable={false}
            value={idAluno}
            onChangeText={n => setIdAluno(n)}
            ref={input => {
              this.input_4 = input;
            }}
            blurOnSubmit={false}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Picker
            selectedValue={selectedCurso}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCurso(itemValue)
            }
            style={{color: '#555555'}}>
            {cursos.map((item, index) => {
              return (
                <Picker.Item
                  style={{color: '#FFFFFF'}}
                  label={item.titulo}
                  value={item._id}
                  key={index}
                />
              );
            })}
          </Picker>
        </ScrollView>
        <DefaultButton
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={toggleSettingsClick}>
          <TextButton>Alterar</TextButton>
        </DefaultButton>
      </KeyboardArea>
    </Page>
  );
};

export default SettingsScreen;
