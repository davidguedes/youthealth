import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Platform, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Page, KeyboardArea, ScrollView, TextButton} from './styles';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import {DateTouchable, DateInput} from '../../components/DefaultDateTimePicker';
import DateTimePicker from '@react-native-community/datetimepicker';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const [nome, setNome] = useState(user.nome);
  const [dataNasc, setDataNasc] = useState(new Date(user.dataNasc));
  const [email, setEmail] = useState(user.email);
  const [idAluno, setIdAluno] = useState(user.idAluno);
  const [curso, setCurso] = useState(user.curso);
  const [senha, setSenha] = useState(user.senha);
  const [confirmarSenha, setConfirmarSenha] = useState(user.senha);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dataNasc;
    setShow(Platform.OS === 'ios');
    setDataNasc(currentDate);
  };

  const toggleSettingsClick = () => {
    if (!nome) {
      Alert.alert('Dados inválidos', 'Você precisa de um nome!');
      this.input_1.focus();
      return;
    } else if (!dataNasc) {
      Alert.alert('Dados inválidos', 'Você precisa de uma data de nascimento');
      this.input_2.focus();
      return;
    } else if (!email) {
      Alert.alert('Dados inválidos', 'Você precisa de um email');
      this.input_3.focus();
      return;
    } else if (!idAluno) {
      Alert.alert('Dados inválidos', 'Você precisa de um ID');
      this.input_4.focus();
      return;
    } else if (!curso) {
      Alert.alert('Dados inválidos', 'Você precisa de um curso');
      this.input_5.focus();
      return;
    } else if (!senha) {
      Alert.alert('Dados inválidos', 'Você precisa de uma senha');
      this.input_6.focus();
      return;
    } else if (!confirmarSenha) {
      Alert.alert('Dados inválidos', 'Você precisa confirmar a senha');
      this.input_7.focus();
      return;
    } else if (senha !== confirmarSenha) {
      Alert.alert('Dados inválidos', 'As senhas não conferem');
      setSenha('');
      setConfirmarSenha('');
      this.input_6.focus();
      return;
    }
    dispatch({
      type: 'ALTER_USER',
      payload: {nome, dataNasc, email, idAluno, curso, senha},
    });
    Alert.alert('Sucesso', 'Cadastro alterado, ' + nome + '!');
    navigation.navigate('Home');
  };

  return (
    <Page>
      <KeyboardArea behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView>
          <DefaultInput
            placeholder="Nome completo"
            placeholderTextColor="#EEE"
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
            placeholderTextColor="#EEE"
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
            placeholderTextColor="#EEE"
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
          <DefaultInput
            placeholder="Curso"
            placeholderTextColor="#EEE"
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
            placeholderTextColor="#EEE"
            //editable={false}
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
            placeholderTextColor="#EEE"
            //editable={false}
            returnKeyType="send"
            value={confirmarSenha}
            secureTextEntry={true}
            onChangeText={n => setConfirmarSenha(n)}
            ref={input => {
              this.input_7 = input;
            }}
            blurOnSubmit={false}
            onSubmitEditing={toggleSettingsClick}
          />
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
