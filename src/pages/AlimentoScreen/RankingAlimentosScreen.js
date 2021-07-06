import React, {useState, useLayoutEffect, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  CancelButton,
  CancelButtonImage,
  NoAlimentos,
  NoAlimentosImage,
  NoAlimentosText,
  FlatList,
  TextBottom,
} from './styles';
import {
  FindArea,
  FindInput,
  FindImageButton,
  FindButton,
} from '../../components/DefaultFind';
import {Box, BodyItem, Title, TextCat} from '../../components/AlimentoItem';
import Spinner from 'react-native-loading-spinner-overlay';
const api = require('axios');

function RankingAlimentosScreen() {
  const navigation = useNavigation();
  const {token} = useSelector(state => state.userReducer);

  const [didMount, setDidMount] = useState(false);
  const [rankingAlimentos, setRankingAlimentos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Ranking Alimentos',
      headerRight: false,
      headerLeft: false,
    });

    navigation.setOptions({
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
    const getRankingAlimentos = async () => {
      try {
        const response = await api.get(
          'http://192.168.0.12:5000/alimentos/ranking/refeicoes',
          {
            headers: {
              autorization: token,
            },
          },
        );
        if (response.data.alimentos.length >= 0) {
          setRankingAlimentos([...response.data.alimentos]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getRankingAlimentos();
    return () => setDidMount(false);
  }, [token, rankingAlimentos]);

  if (!didMount) {
    return null;
  }

  return (
    <Container>
      <Spinner visible={isLoading} />
      {rankingAlimentos.length === 0 && (
        <NoAlimentos>
          <NoAlimentosImage
            source={require('../../assets/icons/harvest.png')}
          />
          <NoAlimentosText>
            Nenhum alimento para compor o ranking
          </NoAlimentosText>
        </NoAlimentos>
      )}
      {rankingAlimentos.length > 0 && (
        <>
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
          <FlatList
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
                      <TextCat>Refeições: {refeicoesPresentes}</TextCat>
                    </BodyItem>
                  </>
                </Box>
              );
            }}
          />
          <TextBottom>Total de alimentos: {rankingAlimentos.length}</TextBottom>
        </>
      )}
    </Container>
  );
}

export default RankingAlimentosScreen;
