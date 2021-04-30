import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Platform, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Page, KeyboardArea, ScrollView, TextButton} from './styles';
import DefaultButton from '../../components/DefaultButton';
import {DateTouchable, DateInput} from '../../components/DefaultDateTimePicker';
import {useForm, Controller} from 'react-hook-form';
import Input from '../../components/Form/input';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import {response} from 'express';
const api = require('axios');

const RegisterScren = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    Alert.alert('Cai aqui', 'cai aqui');
  };

  const enviar = () => {
    Alert.alert('Cai aqui', 'cai aqui');
  };

  /*
  const {nome, email, idAluno, curso, senha, confirmarSenha} = data;
    Alert.alert('Dados', JSON.stringify(data));
    setIsLoading(true);
    signUp(nome, dataNasc, email, idAluno, curso, senha, confirmarSenha);
  */

  const [dataNasc, setDataNasc] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || dataNasc;
    setShow(Platform.OS === 'ios');
    setDataNasc(currentDate);
  };

  const signUp = async (nome, email, idAluno, curso, senha, confirmarSenha) => {
    try {
      const response = await api.post(
        'http://192.168.0.12:5000/auth/register',
        {
          nome: nome,
          dataNasc: dataNasc,
          email: email,
          idAluno: idAluno,
          curso: curso,
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page>
      <Spinner visible={isLoading} />
      <KeyboardArea behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView>
          <Controller
            name="nomeCompleto"
            control={control}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <Input
                error={errors.nomeCompleto}
                errorText={errors.nomeCompleto?.message}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder="Nome completo"
                placeholderTextColor="#555"
                autoFocus={true}
                autoCapitalize="words"
                returnKeyType="next"
                inputRef={ref}
              />
            )}
            rules={{required: {value: true, message: 'Campo Nome necessário'}}}
            defaultValue=""
          />

          <Controller
            name="dataNasc"
            control={control}
            render={({field: {ref}}) => (
              <>
                <DateTouchable activeOpaticy={1} onPress={() => setShow(true)}>
                  <DateInput
                    placeholder="Data de nascimento"
                    placeholderTextColor="#555"
                    value={dataNasc.toLocaleDateString()}
                    editable={false} // optional
                    inputRef={ref}
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
              </>
            )}
            rules={{required: {value: true, message: 'Campo Nome necessário'}}}
          />

          <Controller
            name="email"
            control={control}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <Input
                error={errors.email}
                errorText={errors.email?.message}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor="#555"
                returnKeyType="next"
                inputRef={ref}
              />
            )}
            rules={{required: {value: true, message: 'Campo Email necessário'}}}
            defaultValue=""
          />

          <Controller
            name="idAluno"
            control={control}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <Input
                error={errors.idAluno}
                errorText={errors.idAluno?.message}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder="ID de aluno"
                keyboardType="numeric"
                maxLength={8}
                placeholderTextColor="#555"
                returnKeyType="next"
                inputRef={ref}
              />
            )}
            rules={{
              required: {value: true, message: 'Campo ID do Aluno necessário'},
            }}
            defaultValue=""
          />

          <Controller
            name="curso"
            control={control}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <Input
                error={errors.curso}
                errorText={errors.curso?.message}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder="Curso"
                placeholderTextColor="#555"
                returnKeyType="next"
                inputRef={ref}
              />
            )}
            rules={{
              required: {value: true, message: 'Campo Curso necessário'},
            }}
            defaultValue=""
          />

          <Controller
            name="senha"
            control={control}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <Input
                error={errors.senha}
                errorText={errors.senha?.message}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder="Senha"
                secureTextEntry={true}
                placeholderTextColor="#555"
                returnKeyType="next"
                inputRef={ref}
              />
            )}
            rules={{
              required: {value: true, message: 'Campo Senha necessário'},
              minLength: {
                message: 'Use pelo menos 8 caracteres.',
                value: 8,
              },
            }}
            defaultValue=""
          />

          <Controller
            name="confirmarSenha"
            control={control}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <Input
                error={errors.confirmarSenha}
                errorText={errors.confirmarSenha?.message}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder="Confirmar senha"
                secureTextEntry={true}
                placeholderTextColor="#555"
                returnKeyType="send"
                blurOnSubmit={false}
                onSubmitEditing={handleSubmit(onSubmit)}
                inputRef={ref}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Campo Confirmar Senha necessário',
              },
            }}
            defaultValue=""
          />
        </ScrollView>
        <DefaultButton
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={handleSubmit(enviar)}>
          <TextButton>Cadastrar-se</TextButton>
        </DefaultButton>
      </KeyboardArea>
    </Page>
  );
};

export default RegisterScren;
