/*Login
    <Page>
      <Spinner visible={isLoading} />
      <KeyboardArea behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <Image
          source={require('../../assets/logo/logo.png')}
          defaultSource={require('../../assets/logo/image-placeholder.png')}
          resizeMode="cover"
        />

        <DefaultInput
          placeholder="Digite seu login"
          placeholderTextColor="#555"
          keyboardType="numeric"
          maxLength={8}
          returnKeyType="next"
          value={login}
          onChangeText={n => setLogin(n)}
          ref={input => {
            this.input_1 = input;
          }}
          blurOnSubmit={false}
          onSubmitEditing={() => {
            this.input_2.focus();
          }}
        />
        <DefaultInput
          placeholder="Digite sua senha"
          placeholderTextColor="#555"
          returnKeyType="send"
          value={senha}
          secureTextEntry={true}
          onChangeText={n => setSenha(n)}
          ref={input => {
            this.input_2 = input;
          }}
          blurOnSubmit={false}
          onSubmitEditing={handleLoginClick}
        />
        <DefaultButton
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={handleLoginClick}>
          <TextButton>LOGIN</TextButton>
        </DefaultButton>
        <DefaultButton
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={handleRegisterClick}>
          <TextButton>Cadastrar-se</TextButton>
        </DefaultButton>
        <Form onSubmit={handleSubmit}>
          <TextInput name="login" />
          <TextInput name="senha" type="password" />
          <Button title="Login" />
        </Form>
      </KeyboardArea>
      <TextCopy>© YoutHealth</TextCopy>
    </Page>
*/
