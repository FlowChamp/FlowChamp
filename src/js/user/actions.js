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
   SET_ACTIVE_CHART_REQUEST,
   SET_ACTIVE_CHART_SUCCESS,
   SET_ACTIVE_CHART_FAILURE,
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
         credentials,
      });

      return user
         .logIn(credentials)
         .then(config => {
            const loggedInUser = new UserManager(config);
            fetchActiveChart(loggedInUser, config, dispatch);
            dispatch({
               type: LOGIN_SUCCESS,
               config,
            });
            localStorage.flowchampConfig = JSON.stringify(config);
         })
         .catch(error => {
            dispatch({
               type: LOGIN_FAILURE,
               error,
            });
         });
   };
};

/* LOG OUT */
export const logOut = config => {
   return dispatch => {
      const user = new UserManager();
      dispatch({
         type: LOGOUT_REQUEST,
         config,
      });

      return user
         .logOut(config)
         .then(() => {
            localStorage.removeItem('flowchampConfig');
            dispatch({
               type: LOGOUT_SUCCESS,
               config,
            });
         })
         .catch(error => {
            dispatch({
               type: LOGOUT_FAILURE,
               error,
            });
         });
   };
};

/* GET USER CONFIG */
export const fetchUserConfig = prevConfig => {
   const user = new UserManager(prevConfig);

   return dispatch => {
      dispatch({
         type: USER_CONFIG_REQUEST,
         config: prevConfig,
      });

      return user
         .getUserConfig()
         .then(newConfig => {
            if (newConfig.active_chart) {
               fetchActiveChart(user, newConfig, dispatch);
            }
            dispatch({
               type: USER_CONFIG_SUCCESS,
               config: newConfig,
            });
         })
         .catch(error => {
            // User token probably expired. Log them out in this case
            dispatch({
               type: USER_CONFIG_FAILURE,
               error,
            });
         });
   };
};

const fetchActiveChart = (user, config, dispatch) => {
   dispatch({
      type: 'GET_ACTIVE_CHART_REQUEST',
   });

   user
      .getUserChart(config.active_chart)
      .then(chartData => {
         sortChartData(chartData).then(sortedData => {
            dispatch({
               type: 'GET_ACTIVE_CHART_SUCCESS',
               chartData: sortedData,
            });
         });
      })
      .catch(error => {
         dispatch({
            type: 'GET_ACTIVE_CHART_FAILURE',
            error,
         });
      });
};

const sortChartData = data => {
   const newData = [
      { _id: 'Freshman', quarters: [[], [], [], []] },
      { _id: 'Sophomore', quarters: [[], [], [], []] },
      { _id: 'Junior', quarters: [[], [], [], []] },
      { _id: 'Senior', quarters: [[], [], [], []] },
   ];

   return new Promise((resolve, reject) => {
      const seasons = { Fall: 0, Winter: 1, Spring: 2, Summer: 3 };

      for (let i in data) {
         const { block_metadata } = data[i];
         const { time } = block_metadata;
         const year = time[0] - 1;
         const quarter = seasons[time[1]];

         try {
            newData[year].quarters[quarter].push(data[i]);
         } catch (e) {
            console.log(block_metadata);
            reject(e);
         }
      }
      resolve(newData);
   });
};

/* SET ACTIVE CHART */
export const setActiveChart = (config, name) => {
   const user = new UserManager(config);
   let newConfig = config;

   newConfig.active_chart = name;

   return dispatch => {
      dispatch({
         type: SET_ACTIVE_CHART_REQUEST,
         name,
      });

      return user
         .updateConfig(newConfig)
         .then(() => {
            fetchActiveChart(user, newConfig, dispatch);
            dispatch({
               type: SET_ACTIVE_CHART_SUCCESS,
               active_chart: config.active_chart,
            });
         })
         .catch(error => {
            dispatch({
               type: SET_ACTIVE_CHART_FAILURE,
               error,
            });
         });
   };
};

export const addChart = ({ config, name, major }) => {
   return dispatch => {
      const user = new UserManager(config);
      dispatch(
         dispatch({
            type: ADD_CHART_REQUEST,
         }),
      );

      return user
         .addChart({ name, major })
         .then(newConfig => {
            fetchActiveChart(user, newConfig, dispatch);
            dispatch({
               type: ADD_CHART_SUCCESS,
               config: newConfig,
            });
         })
         .catch(error => {
            dispatch({
               type: ADD_CHART_FAILURE,
               error,
            });
         });
   };
};

export const deleteChart = (config, name) => {
   return dispatch => {
      const user = new UserManager(config);
      dispatch(
         dispatch({
            type: DELETE_CHART_REQUEST,
         }),
         dispatch({
            type: SET_ACTIVE_CHART_REQUEST,
         }),
      );

      return user
         .deleteChart(name)
         .then(newConfig => {
            if (newConfig.active_chart) {
               fetchActiveChart(user, newConfig, dispatch);
            } else {
               dispatch({
                  type: 'GET_ACTIVE_CHART_SUCCESS',
                  chartData: null,
               });
            }
            dispatch({
               type: DELETE_CHART_SUCCESS,
               config: newConfig,
            });
         })
         .catch(error => {
            console.error('Error: unable to delete chart: ', error);
         });
   };
};
