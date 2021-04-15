import React, {useState, useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  AddButton,
  AddButtonImage,
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

function ListAlimentosScreen() {
  const navigation = useNavigation();
  const {token} = useSelector(state => state.userReducer);

  const [listaAlimentos, setListaAlimentos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Alimentos',
      headerRight: false,
      headerLeft: false,
    });

    navigation.setOptions({
      headerRight: () => (
        <AddButton
          underlayColor="transparent"
          onPress={() =>
            navigation.navigate('EditAlimento', {type: 'addAlimento'})
          }>
          <AddButtonImage source={require('../../assets/icons/add.png')} />
        </AddButton>
      ),
    });

    const getAlimentos = async () => {
      try {
        const response = await api.get('http://192.168.0.12:5000/alimentos', {
          headers: {
            autorization: token,
          },
        });
        if (response.data.alimentos.length > 0) {
          setListaAlimentos([...response.data.alimentos]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getAlimentos();
  }, [listaAlimentos, navigation, token]);

  return (
    <Container>
      <Spinner visible={isLoading} />
      {listaAlimentos.length === 0 && (
        <NoAlimentos>
          <NoAlimentosImage
            source={require('../../assets/icons/harvest.png')}
          />
          <NoAlimentosText>Nenhum alimento</NoAlimentosText>
        </NoAlimentos>
      )}
      {listaAlimentos.length > 0 && (
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
            data={listaAlimentos}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item._id.toString()}
            renderItem={({item}) => {
              const {descricao, categoria} = item;
              return (
                <Box
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() =>
                    navigation.navigate('EditAlimento', {
                      type: 'editAlimento',
                      idAlimento: item._id,
                    })
                  }>
                  <>
                    <BodyItem>
                      <Title>{descricao}</Title>
                      <TextCat>{categoria}</TextCat>
                    </BodyItem>
                  </>
                </Box>
                /*
                <Box>
                  <>
                    <HeaderItem>
                      <Image source={image} resizeMode="contain" />
                    </HeaderItem>
                    <BodyItem>
                      <Title>{descricao}</Title>
                      <TextCat>{categorias}</TextCat>
                    </BodyItem>
                  </>
                </Box>
                */
              );
            }}
          />
          <TextBottom>Total de alimentos: {listaAlimentos.length}</TextBottom>
        </>
      )}
    </Container>
  );
}

export default ListAlimentosScreen;
