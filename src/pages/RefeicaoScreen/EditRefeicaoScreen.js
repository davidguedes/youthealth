import React, {useState, useLayoutEffect, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Platform, Alert, Modal} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Container,
  KeyboardArea,
  SafeAreaView,
  TextButton,
  FlatList,
  FlatListAlimentos,
  NoAlimentos,
  NoAlimentosImage,
  NoAlimentosText,
  Box,
  BodyItem,
  Title,
  BoxAlimento,
  BodyAlimentoItem,
  AlimentoItemText,
  BodyButtonDelete,
  ButtonDelete,
  //  ButtonDeleteText,
  BoxModal,
  BoxBodyModal,
  ButtonCloseModal,
  ButtonCloseModalText,
} from './styles';
import DefaultButton from '../../components/DefaultButton';
import {
  CancelButton,
  CancelButtonImage,
} from '../../components/DefaultCancelButton';
import {
  DeleteButton,
  DeleteButtonImage,
} from '../../components/DefaultDeleteButton';
import {AddAlimento, TextAddAlimento} from '../../components/RefeicaoItem';
import {
  FindArea,
  FindInput,
  FindImageButton,
  FindButton,
} from '../../components/DefaultFind';
import {DateTouchable, DateInput} from '../../components/DefaultDateTimePicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-loading-spinner-overlay';
const api = require('axios');

function EditRefeicaoScreen() {
  const navigation = useNavigation();
  const {token} = useSelector(state => state.userReducer);
  const route = useRoute();

  const type = route.params.type;
  const idRefeicao = route.params.idRefeicao;

  const [isLoading, setIsLoading] = useState(false);
  const [dataRefeicao, setDataRefeicao] = useState(new Date());
  const [selectedPeriodo, setSelectedPeriodo] = useState('m');
  const [periodos] = useState([
    {
      periodo: 'Manhã',
      valor: 'm',
    },
    {
      periodo: 'Tarde',
      valor: 't',
    },
    {
      periodo: 'Noite',
      valor: 'n',
    },
  ]);
  const [alimentos, setAlimentos] = useState([]);
  const [show, setShow] = useState(false);
  const [modalAlimentos, setModalAlimentos] = useState(false);
  const [listaAlimentos, setListaAlimentos] = useState([]);
  const [textButton, setTextButton] = useState('');
  //const [didMount, setDidMount] = useState(false);

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || dataRefeicao;
    setShow(Platform.OS === 'ios');
    setDataRefeicao(currentDate);
  };

  useLayoutEffect(() => {
    if (type === 'addRefeicao') {
      navigation.setOptions({
        title: 'Cadastrar Refeição',
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
    } else if (type === 'editRefeicao') {
      navigation.setOptions({
        title: 'Editar Refeição',
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
              Alert.alert('Deletar', 'Deseja realmente excluir a refeição?', [
                {
                  text: 'Cancelar',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'Confirmar', onPress: () => deletarRefeicao()},
              ]);
            }}>
            <DeleteButtonImage
              source={require('../../assets/icons/delete.png')}
            />
          </DeleteButton>
        ),
      });

      const deletarRefeicao = async () => {
        try {
          await api.delete('http://192.168.0.12:5000/refeicoes/' + idRefeicao, {
            headers: {
              autorization: token,
            },
          });
          Alert.alert('Sucesso', 'Refeição deletada com sucesso!');
          navigation.navigate('ListRefeicoes');
        } catch (err) {
          console.log(err);
          Alert.alert('Erro ao deletar!', err.response.data.error);
        } finally {
          setIsLoading(false);
        }
      };
    }
    setTextButton(type === 'addRefeicao' ? 'Cadastrar' : 'Salvar');
  }, [idRefeicao, navigation, token, type]);

  useEffect(() => {
    if (type === 'editRefeicao') {
      const getRefeicoes = async () => {
        try {
          const response = await api.get(
            'http://192.168.0.12:5000/refeicoes/' + idRefeicao,
            {
              headers: {
                autorization: token,
              },
            },
          );
          if (response.data.refeicao) {
            setDataRefeicao(new Date(response.data.refeicao.dataRefeicao));
            setSelectedPeriodo(response.data.refeicao.periodo);
            setAlimentos(response.data.refeicao.alimentos);
          }
        } catch (err) {
          console.log(err);
        }
      };
      getRefeicoes();
    }
  }, [idRefeicao, token, type]);

  useEffect(() => {
    const getAlimentos = async () => {
      try {
        const response = await api.get('http://192.168.0.12:5000/alimentos', {
          headers: {
            autorization: token,
          },
        });
        if (alimentos.length > 0) {
          console.log('entra aqui');
          //var alimentosFiltrados = [];

          for (var x = 0; x < alimentos.length; x++) {
            for (var i = 0; i < response.data.alimentos.length; i++) {
              if (alimentos[x]._id === response.data.alimentos[i]._id) {
                console.log(alimentos[x].descricao);
                response.data.alimentos.splice(i, 1);
              }
            }
          }
        }
        setListaAlimentos(response.data.alimentos);
        console.log('Alimentos carregados!');
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getAlimentos();
  }, [alimentos, token, modalAlimentos]);

  const cadastrarRefeicao = async () => {
    console.log(alimentos);
    try {
      await api.post(
        'http://192.168.0.12:5000/refeicoes',
        {
          dataRefeicao: dataRefeicao,
          periodo: selectedPeriodo,
          alimentos: alimentos,
        },
        {
          headers: {
            autorization: token,
          },
        },
      );
      Alert.alert('Sucesso', 'Cadastro do refeição realizado!');
      navigation.navigate('ListRefeicoes');
    } catch (err) {
      console.log(err);
      Alert.alert('Erro ao cadastrar!', err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const editarRefeicao = async () => {
    try {
      await api.put(
        'http://192.168.0.12:5000/refeicoes/' + idRefeicao,
        {
          dataRefeicao: dataRefeicao,
          periodo: selectedPeriodo,
          alimentos: alimentos,
        },
        {
          headers: {
            autorization: token,
          },
        },
      );
      Alert.alert('Sucesso', 'Refeição alterda com sucesso!');
      navigation.navigate('ListRefeicoes');
    } catch (err) {
      console.log(err);
      Alert.alert('Erro ao atualizar!', err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRegisterClick = () => {
    setIsLoading(true);
    if (!dataRefeicao) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'Você precisa de uma data de refeição!');
      this.input_1.focus();
      return;
    } else if (!selectedPeriodo) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'Você precisa selecionar um período!');
      return;
    } else if (alimentos.length <= 0) {
      setIsLoading(false);
      Alert.alert('Dados inválidos', 'Você precisa de pelo menos um alimento!');
      return;
    }

    if (type === 'addRefeicao') {
      cadastrarRefeicao();
    } else if (type === 'editRefeicao') {
      editarRefeicao();
    }
  };

  const toggleShowAlimentos = () => {
    setModalAlimentos(!modalAlimentos);
  };

  const deleteItemLista = item => {
    var indexAlimento = alimentos.indexOf(item);
    console.log('Index do aliemento: ' + indexAlimento);
    alimentos.splice(indexAlimento, 1);

    var alimentosFiltrados = listaAlimentos.filter(
      alimento => alimentos.includes(alimento) === false,
    );
    console.log('Alimentos filtrados');
    setListaAlimentos([...alimentosFiltrados]);
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <Modal visible={modalAlimentos} animationType="slide" transparent={true}>
        <BoxModal>
          <BoxBodyModal>
            <FindArea>
              <FindInput
                placeholder="Pesquise por um alimento"
                placeholderTextColor="#555"
                returnKeyType="send"
              />
              <FindButton activeOpacity={0.6} underlayColor="#DDDDDD">
                <FindImageButton
                  source={require('../../assets/icons/loupe-w.png')}
                />
              </FindButton>
            </FindArea>
            {listaAlimentos.length === 0 && (
              <>
                <NoAlimentos>
                  <NoAlimentosImage
                    source={require('../../assets/icons/harvest.png')}
                  />
                  <NoAlimentosText>Nenhum alimento</NoAlimentosText>
                </NoAlimentos>
              </>
            )}
            {listaAlimentos.length !== 0 && (
              <FlatList
                data={listaAlimentos}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item._id.toString()}
                renderItem={({item}) => {
                  const {descricao} = item;
                  return (
                    <Box
                      activeOpacity={0.6}
                      underlayColor="#DDDDDD"
                      onPress={() => {
                        let vetAux = [];
                        vetAux.push(item);
                        setAlimentos([].concat(vetAux, alimentos));
                        setModalAlimentos(!modalAlimentos);
                        console.log(alimentos);
                      }}>
                      <>
                        <BodyItem>
                          <Title>{descricao}</Title>
                        </BodyItem>
                      </>
                    </Box>
                  );
                }}
              />
            )}
            <ButtonCloseModal
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => setModalAlimentos(!modalAlimentos)}>
              <ButtonCloseModalText>X</ButtonCloseModalText>
            </ButtonCloseModal>
          </BoxBodyModal>
        </BoxModal>
      </Modal>
      <KeyboardArea behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <SafeAreaView>
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
              onChange={onChangeTime}
            />
          )}
          <Picker
            selectedValue={selectedPeriodo}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedPeriodo(itemValue)
            }
            style={{color: '#555555'}}>
            {periodos.map((item, index) => {
              return (
                <Picker.Item
                  style={{color: '#FFFFFF'}}
                  label={item.periodo}
                  value={item.valor}
                  key={index}
                />
              );
            })}
          </Picker>
          {alimentos.length === 0 && (
            <>
              <NoAlimentos>
                <NoAlimentosImage
                  source={require('../../assets/icons/harvest.png')}
                />
                <NoAlimentosText>Nenhum alimento</NoAlimentosText>
              </NoAlimentos>
            </>
          )}
          {alimentos.length !== 0 && (
            <FlatListAlimentos
              data={alimentos}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item._id.toString()}
              renderItem={({item}) => {
                const {descricao} = item;
                return (
                  <BoxAlimento>
                    <>
                      <BodyAlimentoItem>
                        <AlimentoItemText>{descricao}</AlimentoItemText>
                      </BodyAlimentoItem>
                      <BodyButtonDelete>
                        <ButtonDelete
                          activeOpacity={0.6}
                          underlayColor="#DDDDDD"
                          onPress={() => deleteItemLista(item)}>
                          <DeleteButtonImage
                            source={require('../../assets/icons/delete.png')}
                          />
                        </ButtonDelete>
                      </BodyButtonDelete>
                    </>
                  </BoxAlimento>
                );
              }}
            />
          )}
        </SafeAreaView>
        <AddAlimento
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={toggleShowAlimentos}>
          <TextAddAlimento>+</TextAddAlimento>
        </AddAlimento>
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

export default EditRefeicaoScreen;
