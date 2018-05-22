import ApiManager from '../../helpers/api_manager';
import {
   STOCK_CHART_REQUEST,
   STOCK_CHART_SUCCESS,
   STOCK_CHART_FAILURE,
   USER_CHARTS_REQUEST,
   USER_CHARTS_SUCCESS,
   USER_CHARTS_FAILURE,
} from './constants';

export const fetchStockCharts = () => {
   return dispatch => {
      const api = new ApiManager();
      dispatch({
      type: STOCK_CHART_REQUEST,
   });

      return api.getStockCharts()
      .then(stockCharts => {
         dispatch({
            type: STOCK_CHART_SUCCESS,
            stockCharts: stockCharts.charts
         });
      })
      .catch(error => {
         dispatch({
            type: STOCK_CHART_FAILURE,
            error
         });
      });
   }
}

export const fetchUserCharts = (config) => {
   return dispatch => {
      const api = new ApiManager(config);
      dispatch({
         type: USER_CHARTS_REQUEST,
      });

      return api.getUserCharts()
      .then(userCharts => {
         console.log(userCharts);
         dispatch({
            type: USER_CHARTS_SUCCESS,
            userCharts
         });
      })
      .catch(error => {
         dispatch({
            type: USER_CHARTS_FAILURE,
            error
         });
      });
   }
}
