import UserManager from '../api/user_manager';

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

// Query the API with the provided username, password, and remember bool
export const logIn = credentials => {
   return dispatch => {
      const user = new UserManager();
      dispatch({
         type: LOGIN_REQUEST,
         credentials,
      });

      return new Promise((resolve, reject) => {
         user
            .logIn(credentials)
            .then(config => {
               const loggedInUser = new UserManager(config);

               dispatch({
                  type: LOGIN_SUCCESS,
                  config,
               });
               // Fetch logged in user's currently selected chart
               fetchActiveChart(loggedInUser, config, dispatch);
               localStorage.flowchampConfig = JSON.stringify(config);
               resolve(config);
            })
            .catch(error => {
               dispatch({
                  type: LOGIN_FAILURE,
                  error,
               });
               reject(error);
            });
      });
   };
};

// Query the API and remove the user's current config
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

// Get the most up-to-date config from the API (Assuming user is logged in)
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
            dispatch({
               type: USER_CONFIG_SUCCESS,
               config: newConfig,
            });
            if (newConfig.active_chart) {
               fetchActiveChart(user, newConfig, dispatch);
            }
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

// Using the user's current config, grab the active_chart (if there is one)
const fetchActiveChart = (user, config, dispatch) => {
   if (!config.active_chart) {
      return;
   }
   dispatch({
      type: 'GET_ACTIVE_CHART_REQUEST',
   });

   user
      .getUserChart(config.active_chart)
      .then(chartData => {
         sortChartData(chartData, config).then(sortedData => {
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

/* Sort the data returned from the API into a useable 2D array. This is
 * required so that we can keep track of what courses have been moved.
 */
const sortChartData = (data, config) => {
   let { start_year } = config;
   const newData = [
      { _id: 'Freshman', year: start_year++, quarters: [[], [], [], []] },
      { _id: 'Sophomore', year: start_year++, quarters: [[], [], [], []] },
      { _id: 'Junior', year: start_year++, quarters: [[], [], [], []] },
      { _id: 'Senior', year: start_year++, quarters: [[], [], [], []] },
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
      dispatch({
         type: 'FETCH_ACTIVE_CHART_REQUEST',
      });

      return user
         .updateConfig(newConfig)
         .then(() => {
            dispatch({
               type: SET_ACTIVE_CHART_SUCCESS,
               active_chart: config.active_chart,
            });
            fetchActiveChart(user, newConfig, dispatch);
         })
         .catch(error => {
            dispatch({
               type: SET_ACTIVE_CHART_FAILURE,
               error,
            });
         });
   };
};

/* SET START YEAR */
export const setStartYear = (config, year) => {
   const user = new UserManager(config);
   let newConfig = config;

   newConfig.start_year = year;

   return dispatch => {
      dispatch({
         type: 'UPDATE_CONFIG_REQUEST',
      });

      return user
         .updateConfig(newConfig)
         .then(() => {
            dispatch({
               type: 'UPDATE_CONFIG_SUCCESS',
               config: newConfig,
            });
         })
         .catch(error => {
            dispatch({
               type: 'UPDATE_CONFIG_FAILURE',
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
            dispatch({
               type: ADD_CHART_SUCCESS,
               config: newConfig,
            });
            fetchActiveChart(user, newConfig, dispatch);
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
      );

      return user
         .deleteChart(name)
         .then(newConfig => {
            dispatch({
               type: DELETE_CHART_SUCCESS,
               config: newConfig,
            });
            if (!newConfig.active_chart) {
               dispatch({
                  type: 'GET_ACTIVE_CHART_SUCCESS',
                  chartData: null,
               });
            } else if (newConfig.active_chart !== config.active_chart) {
               fetchActiveChart(user, newConfig, dispatch);
            }
         })
         .catch(error => {
            console.error('Error: unable to delete chart: ', error);
         });
   };
};

export const updateCourse = ({ config, course, year, quarter, index }) => {
   return dispatch => {
      const user = new UserManager(config);

      dispatch(
         dispatch({
            type: 'UPDATE_COURSE_REQUEST',
            course,
            year,
            quarter,
            index,
         }),
      );

      return new Promise((resolve, reject) => {
         user
            .updateCourse(course)
            .then(response => {
               resolve(course);
            })
            .catch(error => {
               dispatch({
                  type: 'UPDATE_COURSE_FAILURE',
               });
               reject(error);
            });
      });
   };
};
