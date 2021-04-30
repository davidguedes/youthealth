const initialState = {
  descricao: '',
  categoria: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ALIMENTO':
      return {
        ...state,
        descricao: action.payload.descricao,
        categoria: action.payload.categoria,
      };

    case 'ALTER_ALIMENTO':
      return {
        ...state,
        descricao: action.payload.descricao,
        categoria: action.payload.categoria,
      };
  }
  return state;
};
