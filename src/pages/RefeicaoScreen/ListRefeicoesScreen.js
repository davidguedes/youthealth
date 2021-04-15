import React, {useState, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  AddButton,
  AddButtonImage,
  NoRefeicoes,
  NoRefeicoesImage,
  NoRefeicoesText,
  FlatList,
  TextBottom,
} from './styles';
import {
  Box,
  HeaderItem,
  TextHeaderDate,
  TextHeaderPeriodo,
  BodyItem,
  TitleAlimentos,
  TextAlimentos,
} from '../../components/RefeicaoItem';
import {
  FindArea,
  FindInput,
  FindImageButton,
  FindButton,
} from '../../components/DefaultFind';

function ListRefeicoesScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Refeições',
      headerRight: () => (
        <AddButton
          underlayColor="transparent"
          onPress={() => navigation.navigate('EditRefeicao')}>
          <AddButtonImage source={require('../../assets/icons/add.png')} />
        </AddButton>
      ),
      headerLeft: false,
    });
  }, [navigation]);

  const [ListRefeicoes] = useState([]);

  return (
    <Container>
      {ListRefeicoes.length === 0 && (
        <NoRefeicoes>
          <NoRefeicoesImage source={require('../../assets/icons/lunch.png')} />
          <NoRefeicoesText>Nenhuma refeição</NoRefeicoesText>
        </NoRefeicoes>
      )}
      {ListRefeicoes.length > 0 && (
        <>
          <FindArea>
            <FindInput
              placeholder="Pesquise por uma refeição"
              placeholderTextColor="#EEE"
              returnKeyType="send"
            />
            <FindButton activeOpacity={0.6} underlayColor="#DDDDDD">
              <FindImageButton
                source={require('../../assets/icons/loupe-w.png')}
              />
            </FindButton>
          </FindArea>
          <FlatList
            data={ListRefeicoes}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              const {date, periodo, alimentos} = item;
              let periodoEstend;
              if (periodo === 'm') {
                periodoEstend = 'Matutino';
              } else if (periodo === 'v') {
                periodoEstend = 'Vespertino';
              } else {
                periodoEstend = 'Noturno';
              }
              return (
                <Box>
                  <>
                    <HeaderItem>
                      <TextHeaderDate>Data: {date}</TextHeaderDate>
                      <TextHeaderPeriodo>
                        Período: {periodoEstend}
                      </TextHeaderPeriodo>
                    </HeaderItem>
                    <BodyItem>
                      <TitleAlimentos>Alimentos</TitleAlimentos>
                      <TextAlimentos>{alimentos}</TextAlimentos>
                    </BodyItem>
                  </>
                </Box>
              );
            }}
          />
          <TextBottom>Total de refeições: {ListRefeicoes.length}</TextBottom>
        </>
      )}
    </Container>
  );
}

export default ListRefeicoesScreen;
