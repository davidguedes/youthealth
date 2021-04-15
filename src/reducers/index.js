import {combineReducers} from 'redux';
import userReducer from './userReducer';
import refeicaoReducer from './refeicaoReducer';

export default combineReducers({
  userReducer,
  refeicaoReducer,
});
