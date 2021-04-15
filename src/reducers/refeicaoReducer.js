const initialState = {
  idRefeicao: '',
  dataHora: '',
  idAluno: '',
  alimentos: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_REFEICAO':
      return {
        ...state,
        idRefeicao: action.payload.idRefeicao,
        dataHora: action.payload.dataHora,
        idAluno: action.payload.idAluno,
        alimentos: action.payload.alimentos,
      };

    case 'ALTER_REEFICAO':
      return {
        ...state,
        idRefeicao: action.payload.idRefeicao,
        dataHora: action.payload.dataHora,
        idAluno: action.payload.idAluno,
        alimentos: action.payload.alimentos,
      };
  }
  return state;
};
