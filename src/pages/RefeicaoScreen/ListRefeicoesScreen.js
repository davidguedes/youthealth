import React, {useState, useLayoutEffect, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  AddButton,
  AddButtonImage,
  NoRefeicoes,
  NoRefeicoesImage,
  NoRefeicoesText,
  FlatListRefeicoes,
  TextBottom,
} from './styles';
import {
  Box,
  HeaderItem,
  TextHeaderDate,
  TextHeaderPeriodo,
  BodyItem,
  TitleAlimentos,
} from '../../components/RefeicaoItem';
import {
  FindArea,
  FindInput,
  FindImageButton,
  FindButton,
} from '../../components/DefaultFind';
import Spinner from 'react-native-loading-spinner-overlay';
const api = require('axios');

function ListRefeicoesScreen() {
  const navigation = useNavigation();
  const {token} = useSelector(state => state.userReducer);

  const [didMount, setDidMount] = useState(false);
  const [listaRefeicoes, setListaRefeicoes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Refeições',
      headerRight: () => (
        <AddButton
          underlayColor="transparent"
          onPress={() =>
            navigation.navigate('EditRefeicao', {type: 'addRefeicao'})
          }>
          <AddButtonImage source={require('../../assets/icons/add.png')} />
        </AddButton>
      ),
      headerLeft: false,
    });
  });

  useEffect(() => {
    setDidMount(true);
    const getRefeicoes = async () => {
      try {
        const response = await api.get('http://192.168.0.12:5000/refeicoes', {
          //const response = await api.get('http://192.168.1.104:5000/refeicoes', {
          headers: {
            autorization: token,
          },
        });
        if (response.data.refeicoes.length >= 0) {
          setListaRefeicoes([...response.data.refeicoes]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getRefeicoes();
    return () => setDidMount(false);
  }, [token, listaRefeicoes]);

  if (!didMount) {
    return null;
  }

  return (
    <Container>
      <Spinner visible={isLoading} />
      {listaRefeicoes.length === 0 && (
        <NoRefeicoes>
          <NoRefeicoesImage source={require('../../assets/icons/lunch.png')} />
          <NoRefeicoesText>Nenhuma refeição</NoRefeicoesText>
        </NoRefeicoes>
      )}
      {listaRefeicoes.length > 0 && (
        <>
          <FindArea>
            <FindInput
              placeholder="Pesquise por uma refeição"
              placeholderTextColor="#555"
              returnKeyType="send"
            />
            <FindButton activeOpacity={0.6} underlayColor="#DDDDDD">
              <FindImageButton
                source={require('../../assets/icons/loupe-w.png')}
              />
            </FindButton>
          </FindArea>
          <FlatListRefeicoes
            data={listaRefeicoes}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item._id.toString()}
            renderItem={({item}) => {
              const {dataRefeicao, periodo, alimentos} = item;
              var periodoEstend;
              if (periodo === 'm') {
                periodoEstend = 'Manhã';
              } else if (periodo === 't') {
                periodoEstend = 'Tarde';
              } else if (periodo === 'n') {
                periodoEstend = 'Noite';
              } else {
                periodoEstend = 'Indefinido';
              }
              return (
                <Box
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() =>
                    navigation.navigate('EditRefeicao', {
                      type: 'editRefeicao',
                      idRefeicao: item._id,
                    })
                  }>
                  <>
                    <HeaderItem>
                      <TextHeaderDate>
                        Data: {new Date(dataRefeicao).toLocaleDateString()}
                      </TextHeaderDate>
                      <TextHeaderPeriodo>
                        Período: {periodoEstend}
                      </TextHeaderPeriodo>
                    </HeaderItem>
                    <BodyItem>
                      <TitleAlimentos>
                        Alimentos presentes na refeição: {alimentos.length}
                      </TitleAlimentos>
                    </BodyItem>
                  </>
                </Box>
              );
            }}
          />
          <TextBottom>Total de refeições: {listaRefeicoes.length}</TextBottom>
        </>
      )}
    </Container>
  );
}

export default ListRefeicoesScreen;
