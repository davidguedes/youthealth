import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {Platform, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Page, KeyboardArea, Image, TextButton, TextCopy} from './styles';
import {useForm, Controller} from 'react-hook-form';
import Input from '../../components/Form/input';
import DefaultButton from '../../components/DefaultButton';
import Spinner from 'react-native-loading-spinner-overlay';
const api = require('axios');

const LoginScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const [isLoading, setIsLoading] = useState(false);
  //const loginInputRef = React.useRef();
  //const senhaInputRef = React.useRef();
  //const [login, setLogin] = useState(user.idAluno);
  //const [senha, setSenha] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    const {login, senha} = data;
    //Alert.alert('Dados', JSON.stringify(data));
    setIsLoading(true);
    signIn(login, senha);
  };

  const handleRegisterClick = () => {
    navigation.navigate('Register');
  };

  const signIn = async (login, senha) => {
    try {
      const response = await api.post(
        'http://192.168.0.12:5000/auth/authenticate',
        {
          idAluno: login,
          senha: senha,
        },
      );
      dispatch({
        type: 'SIGNIN_USER',
        payload: {
          idUser: response.data.user._id,
          nome: response.data.user.nome,
          dataNasc: response.data.user.dataNasc,
          email: response.data.user.email,
          idAluno: response.data.user.idAluno,
          curso: response.data.user.curso,
          token: 'Bearer ' + response.data.token,
        },
      });
      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
      Alert.alert('Erro ao logar', err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page>
      <Spinner visible={isLoading} />
      <KeyboardArea behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <Image
          source={require('../../assets/logo/logo.png')}
          defaultSource={require('../../assets/logo/image-placeholder.png')}
          resizeMode="cover"
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              error={errors.login}
              errorText={errors.login?.message}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              autoFocus={true}
              value={value}
              placeholder="Digite seu login"
              placeholderTextColor="#555"
              keyboardType="numeric"
              maxLength={8}
              returnKeyType="next"
              ref={input => {
                this.loginInput = input;
              }}
              onSubmitEditing={() => {
                this.senhaInput.focus();
              }}
              blurOnSubmit={false}
            />
          )}
          name="login"
          rules={{required: {value: true, message: 'Campo Login necessário'}}}
          defaultValue=""
        />

        <Controller
          name="senha"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              error={errors.senha}
              errorText={errors.senha?.message}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              type="password"
              placeholder="Digite sua senha"
              placeholderTextColor="#555"
              returnKeyType="send"
              secureTextEntry={true}
              ref={input => {
                this.senhaInput = input;
              }}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          rules={{required: {value: true, message: 'Campo Senha necessário'}}}
          defaultValue=""
        />

        <DefaultButton
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={handleSubmit(onSubmit)}>
          <TextButton>Entrar</TextButton>
        </DefaultButton>

        <DefaultButton
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={handleRegisterClick}>
          <TextButton>Cadastrar-se</TextButton>
        </DefaultButton>
      </KeyboardArea>
      <TextCopy>© YoutHealth</TextCopy>
    </Page>
  );
};

export default LoginScreen;

/*
<Input
          name="login"
          control={control}
          placeholder="Digite seu login"
          placeholderTextColor="#555"
          keyboardType="numeric"
          maxLength={8}
          returnKeyType="next"
        />
*/
