import {
   LOGIN_FAILURE,
   LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOGOUT_REQUEST,
   LOGOUT_SUCCESS,
   USER_CONFIG_REQUEST,
   USER_CONFIG_SUCCESS,
   USER_CONFIG_FAILURE,
   ACTIVE_CHART_SUCCESS,
} from './constants';

const initialState = {
   loggedIn: false,
   loggingIn: false,
   loggingOut: false,
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
         console.log("USER_CONFIG_FAILURE");
         return Object.assign({}, state, {
            loggingIn: false,
            error: action.error,
         });
      case ACTIVE_CHART_SUCCESS:
         return Object.assign({}, state, {
            config: {
               ...state.config,
               active_chart: action.active_chart
            }
         });
      default:
         return state;
   }
};

export default authReducer;
