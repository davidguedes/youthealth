import React, {useState, useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';
import {Platform, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Container, KeyboardArea, ScrollView, TextButton} from './styles';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import {
  CancelButton,
  CancelButtonImage,
} from '../../components/DefaultCancelButton';
const api = require('axios');

function EditAlimentoScreen() {
  const navigation = useNavigation();
  const {token} = useSelector(state => state.userReducer);
  const route = useRoute();

  const type = route.params.type;
  const idAlimento = route.params.idAlimento;

  const [textButton, setTextButton] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');

  useLayoutEffect(() => {
    console.log('tipo:' + type + '. idAlimento: ' + idAlimento);
    if (type === 'addAlimento') {
      navigation.setOptions({
        title: 'Cadastrar Alimento',
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
    } else if (type === 'editAlimento') {
      navigation.setOptions({
        title: 'Editar Alimento',
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

      const getAlimentos = async () => {
        try {
          const response = await api.get(
            'http://192.168.0.12:5000/alimentos/' + idAlimento,
            {
              headers: {
                autorization: token,
              },
            },
          );
          if (response.data.alimento) {
            setDescricao(response.data.alimento.descricao);
            setCategoria(response.data.alimento.categoria);
          }
        } catch (err) {
          console.log(err);
        }
      };
      getAlimentos();
    }
    setTextButton(type === 'addAlimento' ? 'Cadastrar' : 'Salvar');
  }, [idAlimento, navigation, token, type]);

  const toggleRegisterClick = () => {
    if (!descricao) {
      Alert.alert('Dados inválidos', 'Você precisa de uma descrião!');
      this.input_1.focus();
      return;
    } else if (!categoria) {
      Alert.alert('Dados inválidos', 'Você precisa selecionar uma categoria!');
      this.input_2.focus();
      return;
    }

    Alert.alert('Sucesso', 'Alimento cadastrado!');
    navigation.navigate('Home');
  };

  return (
    <Container>
      <KeyboardArea behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView>
          <DefaultInput
            placeholder="Descrição"
            placeholderTextColor="#555"
            autoCapitalize="words"
            autoFocus={true}
            returnKeyType="next"
            value={descricao}
            onChangeText={n => setDescricao(n)}
            ref={input => {
              this.input_1 = input;
            }}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.input_2.focus();
            }}
          />
          <DefaultInput
            placeholder="Categoria"
            placeholderTextColor="#555"
            autoCapitalize="words"
            returnKeyType="next"
            value={categoria}
            onChangeText={n => setCategoria(n)}
            ref={input => {
              this.input_2 = input;
            }}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.input_3.focus();
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

export default EditAlimentoScreen;
