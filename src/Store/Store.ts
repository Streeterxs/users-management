import {createStore, combineReducers} from 'redux';
import {coreReducer} from './Core';


const reducers = combineReducers({coreReducer});

export type RootState = ReturnType<typeof reducers>;

export const store = createStore(reducers);