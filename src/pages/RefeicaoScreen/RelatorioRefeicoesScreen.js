import React, {useState, useLayoutEffect, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  CancelButton,
  CancelButtonImage,
  FlatListRelatorio,
} from './styles';
import {Box, BodyItem, Title, TextCat} from '../../components/AlimentoItem';
import {TitleAlimentos} from '../../components/RefeicaoItem';
import Spinner from 'react-native-loading-spinner-overlay';
const api = require('axios');

function RelatorioRefeicoesScreen() {
  const navigation = useNavigation();
  const {token} = useSelector(state => state.userReducer);

  const [didMount, setDidMount] = useState(false);
  const [ultimaRefeicao, setUltimaRefeicao] = useState([]);
  const [totalRefeicoes, setTotalRefeicoes] = useState([]);
  const [rankingAlimentos, setRankingAlimentos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Relatório Refeições',
      headerLeft: () => (
        <CancelButton
          underlayColor="transparent"
          onPress={() => navigation.goBack()}>
          <CancelButtonImage
            source={require('../../assets/icons/cancel.png')}
          />
        </CancelButton>
      ),
      headerRight: false,
    });
  });

  useEffect(() => {
    setDidMount(true);
    const getUltimaRefeicao = async () => {
      try {
        const response = await api.get(
          'http://192.168.0.12:5000/refeicoes/all/last',
          {
            headers: {
              autorization: token,
            },
          },
        );
        if (response.data.refeicao.length >= 0) {
          setUltimaRefeicao(response.data.refeicao[0].dataRefeicao);
        } else {
          setUltimaRefeicao('Nenhum registros');
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    const getTotalRefeicoes = async () => {
      try {
        const response = await api.get(
          'http://192.168.0.12:5000/refeicoes/all/quantity',
          {
            headers: {
              autorization: token,
            },
          },
        );
        setTotalRefeicoes(response.data.refeicoes);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    const getRankingAlimentos = async () => {
      try {
        const response = await api.get(
          'http://192.168.0.12:5000/alimentos/ranking/refeicoesAluno/',
          {
            headers: {
              autorization: token,
            },
          },
        );
        setRankingAlimentos([...response.data.alimentos]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getUltimaRefeicao();
    getTotalRefeicoes();
    getRankingAlimentos();
    return () => setDidMount(false);
  }, [token]);

  if (!didMount) {
    return null;
  }

  return (
    <Container>
      <Spinner visible={isLoading} />
      {ultimaRefeicao.length !== 0 && (
        <TitleAlimentos>Última refeição: {ultimaRefeicao}</TitleAlimentos>
      )}
      {ultimaRefeicao.length === 0 && (
        <TitleAlimentos>Última refeição: sem registro</TitleAlimentos>
      )}
      <TitleAlimentos>
        Total de refeições realizadas: {totalRefeicoes}
      </TitleAlimentos>
      {rankingAlimentos.length === 0 && (
        <TitleAlimentos>
          Alimentos mais consumidos: sem registros
        </TitleAlimentos>
      )}
      {rankingAlimentos.length > 0 && (
        <>
          <FlatListRelatorio
            data={rankingAlimentos}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item._id.toString()}
            renderItem={({item}) => {
              const {descricao, refeicoesPresentes} = item;
              return (
                <Box>
                  <>
                    <BodyItem>
                      <Title>{descricao}</Title>
                      <TextCat>
                        Refeições presentes: {refeicoesPresentes}
                      </TextCat>
                    </BodyItem>
                  </>
                </Box>
              );
            }}
          />
        </>
      )}
    </Container>
  );
}

export default RelatorioRefeicoesScreen;
