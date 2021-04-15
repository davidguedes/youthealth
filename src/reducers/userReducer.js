const initialState = {
  nome: '',
  dataNasc: Date(),
  email: '',
  idAluno: '',
  curso: '',
  perfil: '',
  token: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        ...state,
        nome: action.payload.nome,
        dataNasc: action.payload.dataNasc,
        email: action.payload.email,
        idAluno: action.payload.idAluno,
        curso: action.payload.curso,
        perfil: 'u',
        token: action.payload.token,
      };

    case 'SIGNIN_USER':
      return {
        ...state,
        idAluno: action.payload.idAluno,
        token: action.payload.token,
      };

    case 'ALTER_USER':
      return {
        ...state,
        nome: action.payload.nome,
        dataNasc: action.payload.dataNasc,
        email: action.payload.email,
        idAluno: action.payload.idAluno,
        curso: action.payload.curso,
      };
  }
  return state;
};
