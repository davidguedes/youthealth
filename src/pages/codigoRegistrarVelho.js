import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Platform, Alert, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {Page, KeyboardArea, ScrollView, TextButton} from './styles';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import {DateTouchable, DateInput} from '../../components/DefaultDateTimePicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-loading-spinner-overlay';
const api = require('axios');

const RegisterScren = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState(new Date());
  const [email, setEmail] = useState('');
  const [idAluno, setIdAluno] = useState('');
  const [selectedCurso, setSelectedCurso] = useState();
  const [curso, setCurso] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || dataNasc;
    setShow(Platform.OS === 'ios');
    setDataNasc(currentDate.toLocaleDateString());
    this.input_3.focus();
  };

  const signUpAct = async () => {
    try {
      const response = await api.post(
        'http://192.168.0.12:5000/auth/register',
        {
          nome: nome,
          dataNasc: dataNasc,
          email: email,
          idAluno: idAluno,
          curso: selectedCurso,
          senha: senha,
        },
      );
      dispatch({
        type: 'CREATE_USER',
        payload: {
          nome,
          dataNasc,
          email,
          idAluno,
          curso,
          token: response.token,
        },
      });
      Alert.alert('Sucesso', 'Cadastro realizado, ' + nome + '!');
      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
      Alert.alert('Erro ao cadastrar-se', err.response.data.error);
      this.input_1.focus();
      setSenha('');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = () => {
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
    } else if (!curso) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'Você precisa de um curso');
      this.input_5.focus();
      return;
    } else if (!senha) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'Você precisa de uma senha');
      this.input_6.focus();
      return;
    } else if (!confirmarSenha) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'Você precisa confirmar a senha');
      this.input_7.focus();
      return;
    } else if (senha !== confirmarSenha) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'As senhas não conferem');
      setSenha('');
      setConfirmarSenha('');
      this.input_6.focus();
      return;
    }

    signUpAct();
  };

  const toggleRegisterClick = () => {
    setIsLoading(true);
    signUp();
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
              setShow(true);
            }}
          />

          <DateTouchable activeOpaticy={1} onPress={() => setShow(true)}>
            <DateInput
              placeholder="Data de nascimento"
              placeholderTextColor="#555"
              value={dataNasc.toLocaleDateString()}
              editable={false} // optional
              ref={input => {
                this.input_2 = input;
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
              onChange={onChangeTime}
            />
          )}

          <DefaultInput
            placeholder="Email"
            placeholderTextColor="#555"
            keyboardType="email-address"
            returnKeyType="next"
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
            value={idAluno}
            onChangeText={n => setIdAluno(n)}
            ref={input => {
              this.input_4 = input;
            }}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.input_5.focus();
            }}
          />

          <Picker
            selectedValue={selectedCurso}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCurso(itemValue)
            }
            style={styles.picker}>
            <Picker.Item
              label="Ciência da Computação"
              value="cienciacomputacao"
            />
            <Picker.Item
              label="Engenharia de Software"
              value="engenhariaSoftware"
            />
            <Picker.Item label="Fisioterapia" value="fisioterapia" />
          </Picker>

          <DefaultInput
            placeholder="Curso"
            placeholderTextColor="#555"
            returnKeyType="next"
            value={curso}
            onChangeText={n => setCurso(n)}
            ref={input => {
              this.input_5 = input;
            }}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.input_6.focus();
            }}
          />

          <DefaultInput
            placeholder="Senha"
            placeholderTextColor="#555"
            returnKeyType="next"
            value={senha}
            secureTextEntry={true}
            onChangeText={n => setSenha(n)}
            ref={input => {
              this.input_6 = input;
            }}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.input_7.focus();
            }}
          />

          <DefaultInput
            placeholder="Confirmar senha"
            placeholderTextColor="#555"
            returnKeyType="send"
            value={confirmarSenha}
            secureTextEntry={true}
            onChangeText={n => setConfirmarSenha(n)}
            ref={input => {
              this.input_7 = input;
            }}
            blurOnSubmit={false}
            onSubmitEditing={toggleRegisterClick}
          />
        </ScrollView>
        <DefaultButton
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={toggleRegisterClick}>
          <TextButton>Cadastrar-se</TextButton>
        </DefaultButton>
      </KeyboardArea>
    </Page>
  );
};

const styles = StyleSheet.create({
  picker: {
    borderWidth: 1,
    borderColor: '#555',
    color: '#000',
    fontSize: 18,
    width: 300,
    height: 45,
    margin: 10,
    paddingLeft: 10,
  },
});

export default RegisterScren;
