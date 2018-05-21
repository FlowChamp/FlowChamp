import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import sidebarReducer from './sidebar/reducer';
import authReducer from './user/reducer';
import flowchartReducer from './apps/flowchart/reducer';

const rootReducer = combineReducers({
   auth: authReducer,
   sidebar: sidebarReducer,
   flowchart: flowchartReducer,
});

const store = createStore(
   rootReducer,
   applyMiddleware(thunkMiddleware)
);

export default store;
