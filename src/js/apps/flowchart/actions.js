import ApiManager from '../../helpers/api_manager';
import {
   STOCK_CHART_REQUEST,
   STOCK_CHART_SUCCESS,
   STOCK_CHART_FAILURE,
   USER_CHARTS_REQUEST,
   USER_CHARTS_SUCCESS,
   USER_CHARTS_FAILURE,
} from './constants';

const stockChartRequest = () => {
   return {
      type: STOCK_CHART_REQUEST,
   }
}

const stockChartSuccess = stockCharts => {
   return {
      type: STOCK_CHART_SUCCESS,
      stockCharts
   }
}

const stockChartFailure = error => {
   return {
      type: STOCK_CHART_FAILURE,
      error
   }
}

/* Fetches the user's saved charts */
const userChartsRequest = () => {
   return {
      type: USER_CHARTS_REQUEST,
   }
}

const userChartsSuccess = userCharts => {
   return {
      type: USER_CHARTS_SUCCESS,
      userCharts
   }
}

const userChartsFailure = error => {
   return {
      type: USER_CHARTS_FAILURE,
      error
   }
}


export const fetchStockCharts = () => {
   return dispatch => {
      const api = new ApiManager();
      dispatch(stockChartRequest());

      return api.getStockCharts()
      .then(stockCharts => {
         dispatch(stockChartSuccess(stockCharts.charts));
      })
      .catch(error => {
         dispatch(stockChartFailure(error));
      });
   }
}

export const fetchUserCharts = (config) => {
   return dispatch => {
      const api = new ApiManager(config);
      dispatch(userChartsRequest());

      return api.getUserCharts()
      .then(userCharts => {
         console.log(userCharts);
         dispatch(userChartsSuccess(userCharts));
      })
      .catch(error => {
         dispatch(userChartsFailure(error));
      });
   }
}
