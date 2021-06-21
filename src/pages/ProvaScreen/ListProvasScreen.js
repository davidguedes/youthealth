import React, {useState, useLayoutEffect, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  AddButton,
  AddButtonImage,
  NoProvas,
  NoProvasImage,
  NoProvasText,
  FlatList,
  TextBottom,
} from './styles';
import {
  Box,
  HeaderItem,
  TextHeaderDate,
  TextHeaderMateria,
  BodyItem,
  TextAnotacoes,
  RadioAlerta,
} from '../../components/ProvaItem';
import {
  FindArea,
  FindInput,
  FindImageButton,
  FindButton,
} from '../../components/DefaultFind';
import Spinner from 'react-native-loading-spinner-overlay';
const api = require('axios');

function ListProvasScreen() {
  const navigation = useNavigation();
  const {token} = useSelector(state => state.userReducer);

  const [didMount, setDidMount] = useState(false);
  const [listaProvas, setListaProvas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Provas',
      headerRight: () => (
        <AddButton
          underlayColor="transparent"
          onPress={() => navigation.navigate('EditProva', {type: 'addProva'})}>
          <AddButtonImage source={require('../../assets/icons/add.png')} />
        </AddButton>
      ),
      headerLeft: false,
    });
  });

  useEffect(() => {
    setDidMount(true);
    const getProvas = async () => {
      try {
        const response = await api.get('http://192.168.0.12:5000/provas', {
          headers: {
            autorization: token,
          },
        });
        if (response.data.provas.length >= 0) {
          setListaProvas([...response.data.provas]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getProvas();
    return () => setDidMount(false);
  }, [token, listaProvas]);

  if (!didMount) {
    return null;
  }

  return (
    <Container>
      <Spinner visible={isLoading} />
      {listaProvas.length === 0 && (
        <NoProvas>
          <NoProvasImage source={require('../../assets/icons/test.png')} />
          <NoProvasText>Nenhuma prova</NoProvasText>
        </NoProvas>
      )}
      {listaProvas.length > 0 && (
        <>
          <FindArea>
            <FindInput
              placeholder="Pesquise por uma prova"
              placeholderTextColor="#555"
              returnKeyType="send"
            />
            <FindButton activeOpacity={0.6} underlayColor="#DDDDDD">
              <FindImageButton
                source={require('../../assets/icons/loupe-w.png')}
              />
            </FindButton>
          </FindArea>
          <FlatList
            data={listaProvas}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item._id.toString()}
            renderItem={({item}) => {
              const {dataProva, materia, anotacoes, alerta} = item;
              return (
                <Box
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() =>
                    navigation.navigate('EditProva', {
                      type: 'editProva',
                      idProva: item._id,
                    })
                  }>
                  <>
                    <HeaderItem>
                      <TextHeaderDate>
                        Data: {new Date(dataProva).toLocaleDateString()}
                      </TextHeaderDate>
                      <TextHeaderMateria>Matéria: {materia}</TextHeaderMateria>
                    </HeaderItem>
                    {(anotacoes.length > 0 || alerta) && (
                      <BodyItem>
                        {anotacoes.length > 0 && (
                          <TextAnotacoes>{anotacoes}</TextAnotacoes>
                        )}
                        {alerta && <RadioAlerta>*ALERTA*</RadioAlerta>}
                      </BodyItem>
                    )}
                  </>
                </Box>
              );
            }}
          />
          <TextBottom>Total de provas: {listaProvas.length}</TextBottom>
        </>
      )}
    </Container>
  );
}

export default ListProvasScreen;
