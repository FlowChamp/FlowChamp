import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension';
import sidebarReducer from './sidebar/reducer';
import userReducer from './user/reducer';
import flowchartReducer from './apps/flowchart/reducer';

const rootReducer = combineReducers({
   user: userReducer,
   sidebar: sidebarReducer,
   flowchart: flowchartReducer,
});

const store = createStore(
   rootReducer,
   devToolsEnhancer(),
   applyMiddleware(thunkMiddleware)
);

export default store;
