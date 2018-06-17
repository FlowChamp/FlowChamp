import {
   LOGIN_FAILURE,
   LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOGOUT_REQUEST,
   LOGOUT_SUCCESS,
   USER_CONFIG_REQUEST,
   USER_CONFIG_SUCCESS,
   USER_CONFIG_FAILURE,
   SET_ACTIVE_CHART_REQUEST,
   SET_ACTIVE_CHART_SUCCESS,
   ADD_CHART_REQUEST,
   ADD_CHART_SUCCESS,
   ADD_CHART_FAILURE,
   DELETE_CHART_SUCCESS,
} from './constants';

const initialState = {
   loggedIn: false,
   loggingIn: false,
   loggingOut: false,
   changingChart: false,
   credentials: null,
   error: null,
   config: null,
};

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case LOGIN_REQUEST:
         return Object.assign({}, state, {
            loggingIn: true,
            error: null,
            credentials: action.credentials,
         });
      case LOGIN_SUCCESS:
         return Object.assign({}, state, {
            loggingIn: false,
            loggedIn: true,
            config: action.config,
      });
      case LOGIN_FAILURE:
         return Object.assign({}, state, {
            loggingIn: false,
            error: action.error,
            credentials: null,
         });
      case LOGOUT_REQUEST:
         return Object.assign({}, state, {
            loggingOut: true,
            error: null,
            config: action.config,
         });
      case LOGOUT_SUCCESS:
         return Object.assign({}, state, {
            loggingOut: false,
            loggedIn: false,
            config: null,
            chartData: null,
         });
      case USER_CONFIG_REQUEST:
         return Object.assign({}, state, {
            loggingIn: true,
            error: null,
            config: action.config
         });
      case USER_CONFIG_SUCCESS:
         return Object.assign({}, state, {
            loggingIn: false,
            loggedIn: true,
            config: action.config,
      });
      case USER_CONFIG_FAILURE:
         return Object.assign({}, state, {
            loggingIn: false,
            loggedIn: false,
         });
      case SET_ACTIVE_CHART_REQUEST:
         return Object.assign({}, state, {
            changingChart: true,
         });
      case SET_ACTIVE_CHART_SUCCESS:
         return Object.assign({}, state, {
            config: {
               ...state.config,
               active_chart: action.active_chart
            }
      });
      case ADD_CHART_REQUEST:
         return Object.assign({}, state, {
            changingChart: true,
            error: null,
         });
      case ADD_CHART_SUCCESS:
         return Object.assign({}, state, {
            changingChart: false,
            config: action.config,
      });
      case ADD_CHART_FAILURE:
         return Object.assign({}, state, {
            changingChart: false,
            error: action.error
         });
      case DELETE_CHART_SUCCESS:
         return Object.assign({}, state, {
            config: action.config,
      });
      default:
         return state;
   }
};

export default authReducer;
