const initialState = {
  idUser: '',
  nome: '',
  dataNasc: Date(),
  email: '',
  idAluno: '',
  curso: '',
  token: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        ...state,
        idUser: action.payload.idUser,
        nome: action.payload.nome,
        dataNasc: action.payload.dataNasc,
        email: action.payload.email,
        idAluno: action.payload.idAluno,
        curso: action.payload.curso,
        token: action.payload.token,
      };

    case 'SIGNIN_USER':
      return {
        ...state,
        idUser: action.payload.idUser,
        nome: action.payload.nome,
        dataNasc: action.payload.dataNasc,
        email: action.payload.email,
        idAluno: action.payload.idAluno,
        curso: action.payload.curso,
        token: action.payload.token,
      };

    case 'ALTER_USER':
      return {
        ...state,
        nome: action.payload.nome,
        dataNasc: action.payload.dataNasc,
        curso: action.payload.curso,
      };
  }
  return state;
};
