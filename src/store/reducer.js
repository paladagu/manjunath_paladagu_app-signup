import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import api from './modules/api'

const rootReducer = combineReducers({
    api
})

export default rootReducer