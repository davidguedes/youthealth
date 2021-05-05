const initialState = {
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
        nome: action.payload.nome,
        dataNasc: action.payload.dataNasc.toLocaleDateString(),
        email: action.payload.email,
        idAluno: action.payload.idAluno,
        selectedCurso: action.payload.selectedCurso,
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
        selectedCurso: action.payload.selectedCurso,
      };
  }
  return state;
};
