import React, {useState, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import data from '../../data/provas';
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

function ListProvasScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Provas',
      headerRight: () => (
        <AddButton
          underlayColor="transparent"
          onPress={() => navigation.navigate('EditProva')}>
          <AddButtonImage source={require('../../assets/icons/add.png')} />
        </AddButton>
      ),
      headerLeft: false,
    });
  }, [navigation]);

  const [ListProvas] = useState(data);

  return (
    <Container>
      {ListProvas.length === 0 && (
        <NoProvas>
          <NoProvasImage source={require('../../assets/icons/test.png')} />
          <NoProvasText>Nenhuma prova</NoProvasText>
        </NoProvas>
      )}
      {ListProvas && (
        <>
          <FindArea>
            <FindInput
              placeholder="Pesquise por uma prova"
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
            data={ListProvas}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              const {date, materia, anotacoes, alerta} = item;
              return (
                <Box>
                  <>
                    <HeaderItem>
                      <TextHeaderDate>Data: {date}</TextHeaderDate>
                      <TextHeaderMateria>Matéria: {materia}</TextHeaderMateria>
                    </HeaderItem>
                    <BodyItem>
                      <TextAnotacoes>{anotacoes}</TextAnotacoes>
                      {alerta && <RadioAlerta>*ALERTA*</RadioAlerta>}
                    </BodyItem>
                  </>
                </Box>
              );
            }}
          />
          <TextBottom>Total de provas: {ListProvas.length}</TextBottom>
        </>
      )}
    </Container>
  );
}

export default ListProvasScreen;
