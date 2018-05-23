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
   ADD_CHART_REQUEST,
   ADD_CHART_SUCCESS,
   ADD_CHART_FAILURE,
   DELETE_CHART_REQUEST,
   DELETE_CHART_SUCCESS,
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
         localStorage.removeItem('flowchampConfig');
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
         // User token probably expired. Log them out in this case
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

export const addChart = ({ config, name, major }) => {
   return dispatch => {
      const user = new UserManager(config);
      dispatch(dispatch({
         type: ADD_CHART_REQUEST
      }));

      return user.addChart({ name, major })
      .then(newConfig => {
         dispatch({
            type: ADD_CHART_SUCCESS,
            config: newConfig
         });
      })
      .catch(error => {
         dispatch({
            type: ADD_CHART_FAILURE,
            error
         });
      });
   }
}

export const deleteChart = (config, name) => {
   return dispatch => {
      const user = new UserManager(config);
      dispatch(dispatch({
         type: DELETE_CHART_REQUEST
      }));

      return user.deleteChart(name)
      .then(newConfig => {
         dispatch({
            type: DELETE_CHART_SUCCESS,
            config: newConfig
         });
      })
      .catch(error => {
			console.error("Error: unable to delete chart: ", error);
      });
   }
}
