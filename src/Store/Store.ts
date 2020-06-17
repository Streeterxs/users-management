import {createStore, combineReducers} from 'redux';
import {coreReducer} from './Core';
import {usersReducer} from './Users'


const reducers = combineReducers({coreReducer, usersReducer});

export type RootState = ReturnType<typeof reducers>;

export const store = createStore(reducers);