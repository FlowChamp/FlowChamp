import UserManager from '../helpers/user_manager';
import {
   LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOGIN_FAILURE,
   LOGOUT_FAILURE,
   LOGOUT_REQUEST,
   LOGOUT_SUCCESS,
   USER_CONFIG_REQUEST,
   USER_CONFIG_SUCCESS,
   USER_CONFIG_FAILURE,
   ACTIVE_CHART_REQUEST,
   ACTIVE_CHART_SUCCESS,
   ACTIVE_CHART_FAILURE,
} from './constants';

/* LOG IN */
export const logIn = credentials => {
   return dispatch => {
      const user = new UserManager();
      dispatch({
            type: LOGIN_REQUEST,
            credentials
         });

      return user.logIn(credentials)
      .then(config => {
         dispatch({
            type: LOGIN_SUCCESS,
            config
         });
         localStorage.flowchampConfig = JSON.stringify(config);
      })
      .catch(error => {
         dispatch({
            type: LOGIN_FAILURE,
            error
         });
      });
   }
}


/* LOG OUT */
export const logOut = config => {
   return dispatch => {
      const user = new UserManager();
      dispatch({
         type: LOGOUT_REQUEST,
         config
      });

      return user.logOut(config)
      .then(() => {
         dispatch({
            type: LOGOUT_SUCCESS,
            config
         });
      })
      .catch(error => {
         dispatch({
            type: LOGOUT_FAILURE,
            error
         });
      });
   }
}

/* GET USER CONFIG */
export const fetchUserConfig = (prevConfig) => {
   const user = new UserManager(prevConfig);

   return dispatch => {
      dispatch({
         type: USER_CONFIG_REQUEST,
         config: prevConfig
      });

      return user.getUserConfig()
      .then(newConfig => {
         dispatch({
            type: USER_CONFIG_SUCCESS,
            config: newConfig
         });
      })
      .catch(error => {
         // User token probably expired
         dispatch({
            type: USER_CONFIG_FAILURE,
            error
         });
      });
   }
}


/* SET ACTIVE CHART */
export const setActiveChart = (config, name) => {
   const user = new UserManager(config);
   let newConfig = config;

   newConfig.active_chart = name;

   return dispatch => {
      dispatch({
         type: ACTIVE_CHART_REQUEST,
         name
      });

      return user.updateConfig(newConfig)
      .then(() => {
         dispatch({
            type: ACTIVE_CHART_SUCCESS,
            active_chart: config.active_chart
         });
      })
      .catch(error => {
         dispatch({
            type: ACTIVE_CHART_FAILURE,
            error
         });
      });
   }
}

