
import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { formReducer } from './formReducer';
import { planeReducer } from './planeReducer';

const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    plane: planeReducer,
});

export default rootReducer;
