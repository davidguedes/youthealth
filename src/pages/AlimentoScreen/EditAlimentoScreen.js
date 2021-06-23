import React, {useState, useLayoutEffect, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Platform, Alert, Keyboard} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Container, KeyboardArea, ScrollView, TextButton} from './styles';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import {
  CancelButton,
  CancelButtonImage,
} from '../../components/DefaultCancelButton';
import {
  DeleteButton,
  DeleteButtonImage,
} from '../../components/DefaultDeleteButton';
import Spinner from 'react-native-loading-spinner-overlay';
const api = require('axios');

function EditAlimentoScreen() {
  const navigation = useNavigation();
  const {token} = useSelector(state => state.userReducer);
  const route = useRoute();

  const type = route.params.type;
  const idAlimento = route.params.idAlimento;

  const [isLoading, setIsLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [textButton, setTextButton] = useState('');
  const [descricao, setDescricao] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState();

  useEffect(() => {
    getCategorias();
  }, []);

  const getCategorias = async () => {
    try {
      const response = await api.get('http://192.168.0.12:5000/categorias', {});
      if (response.data.categorias.length > 0) {
        setCategorias([...response.data.categorias]);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        headerRight: () => (
          <DeleteButton
            underlayColor="transparent"
            onPress={() => {
              Alert.alert('Deletar', 'Deseja realmente excluir o alimento?', [
                {
                  text: 'Cancelar',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'Confirmar', onPress: () => deletarAlimento()},
              ]);
            }}>
            <DeleteButtonImage
              source={require('../../assets/icons/delete.png')}
            />
          </DeleteButton>
        ),
      });

      const deletarAlimento = async () => {
        try {
          await api.delete('http://192.168.0.12:5000/alimentos/' + idAlimento, {
            headers: {
              autorization: token,
            },
          });
          Alert.alert('Sucesso', 'Alimento deletado com sucesso!');
          navigation.navigate('ListAlimentos');
        } catch (err) {
          console.log(err);
          Alert.alert('Erro ao deletar', err.response.data.error);
        } finally {
          setIsLoading(false);
        }
      };

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
            setSelectedCategoria(response.data.alimento.categoria._id);
          }
        } catch (err) {
          console.log(err);
        }
      };
      getAlimentos();
    }
    setTextButton(type === 'addAlimento' ? 'Cadastrar' : 'Salvar');
  }, [idAlimento, navigation, token, type]);

  const cadastrarAlimento = async () => {
    try {
      await api.post(
        'http://192.168.0.12:5000/alimentos',
        {
          descricao: descricao,
          categoria: selectedCategoria,
        },
        {
          headers: {
            autorization: token,
          },
        },
      );
      Alert.alert(
        'Sucesso',
        'Cadastro do alimento ' + descricao + ' realizado!',
      );
      navigation.navigate('ListAlimentos');
    } catch (err) {
      console.log(err);
      Alert.alert('Erro ao cadastrar!', err.response.data.error);
    } finally {
      setIsLoading(false);
      Alert.alert(
        'Dados',
        'Descrição: ' + descricao + ', Categoria: ' + selectedCategoria,
      );
    }
  };

  const editarAlimento = async () => {
    try {
      await api.put(
        'http://192.168.0.12:5000/alimentos/' + idAlimento,
        {
          descricao: descricao,
          categoria: selectedCategoria,
        },
        {
          headers: {
            autorization: token,
          },
        },
      );
      Alert.alert(
        'Sucesso',
        'Alteração do alimento ' + descricao + ' realizada!',
      );
      navigation.navigate('ListAlimentos');
    } catch (err) {
      console.log(err);
      Alert.alert('Erro ao atualizar!', err.response.data.error);
    } finally {
      setIsLoading(false);
      Alert.alert(
        'Dados',
        'Descrição: ' + descricao + ', Categoria: ' + selectedCategoria,
      );
    }
  };

  /*
  dispatch({
        type: 'CREATE_ALIMENTO',
        payload: {
          descricao,
          selectedCategoria,
        },
      }); */

  const toggleRegisterClick = () => {
    setIsLoading(true);
    if (!descricao) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'Você precisa de uma descrição!');
      this.input_1.focus();
      return;
    } else if (!selectedCategoria) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'Você precisa selecionar uma categoria!');
      return;
    }

    if (type === 'addAlimento') {
      cadastrarAlimento();
    } else if (type === 'editAlimento') {
      editarAlimento();
    }
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
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
            onSubmitEditing={Keyboard.dismiss}
          />

          <Picker
            selectedValue={selectedCategoria}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategoria(itemValue)
            }
            style={{color: '#555555'}}>
            {categorias.map((item, index) => {
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
          onPress={toggleRegisterClick}>
          <TextButton>{textButton}</TextButton>
        </DefaultButton>
      </KeyboardArea>
    </Container>
  );
}

export default EditAlimentoScreen;
