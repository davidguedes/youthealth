import React, {useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  SettingsButton,
  LogoutButton,
  HeaderButtonImage,
  Header,
  Title,
  Description,
  Image,
} from './styles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {nome, dataNasc, curso} = useSelector(state => state.userReducer);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerRight: () => (
        <SettingsButton
          underlayColor="transparent"
          onPress={() => navigation.navigate('Settings')}>
          <HeaderButtonImage
            source={require('../../assets/icons/settings.png')}
          />
        </SettingsButton>
      ),
      headerLeft: () => (
        <LogoutButton
          underlayColor="transparent"
          onPress={() => navigation.navigate('Login')}>
          <HeaderButtonImage
            source={require('../../assets/icons/logout.png')}
          />
        </LogoutButton>
      ),
    });
  }, [navigation]);

  return (
    <Container>
      <Header>
        <Title>Seja bem-vindo, {nome}!</Title>
        <Description>
          Data de data de nascimento: {dataNasc}
          Curso: {curso}O YoutHealth foi criado para ajudar você, estudade, a
          ter um melhor controle sobre sua alimentação! Navegue entre o nosso
          menu de opções e comece agora mesmo a aproveitar nosso App da melhor
          forma possível.
        </Description>
        <Image source={require('../../assets/logo/logo.png')} />
      </Header>
    </Container>
  );
};

export default HomeScreen;
