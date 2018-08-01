import ApiManager from '../../api/api_manager';
import {
   STOCK_CHART_REQUEST,
   STOCK_CHART_SUCCESS,
   STOCK_CHART_FAILURE,
   USER_CHARTS_REQUEST,
   USER_CHARTS_SUCCESS,
   USER_CHARTS_FAILURE,
} from './constants';

export const moveBlock = ({
   config,
   chartData,
   sourceQuarterId,
   destQuarterId,
   oldBlockIndex,
   newBlockIndex,
   boardId,
}) => {
   return dispatch => {
      const [sourceYear, sourceQuarter] = sourceQuarterId.split('-');
      const [destYear, destQuarter] = destQuarterId.split('-');
      let newChartData;

      // Move within the same list
      if (sourceQuarterId === destQuarterId) {
         const newBlocks = Array.from(
            chartData[sourceYear].quarters[sourceQuarter],
         );
         // Block being moved
         const [removedBlock] = newBlocks.splice(oldBlockIndex, 1);
         newBlocks.splice(newBlockIndex, 0, removedBlock);
         newChartData = chartData;
         newChartData[destYear].quarters[destQuarter] = newBlocks;
      } else {
         const sourceBlocks = Array.from(
            chartData[sourceYear].quarters[sourceQuarter],
         );
         const [removedBlock] = sourceBlocks.splice(oldBlockIndex, 1);
         const destBlocks = Array.from(
            chartData[destYear].quarters[destQuarter],
         );
         destBlocks.splice(newBlockIndex, 0, removedBlock);
         newChartData = chartData;
         newChartData[sourceYear].quarters[sourceQuarter] = sourceBlocks;
         newChartData[destYear].quarters[destQuarter] = destBlocks;
      }

      dispatch({
         type: 'MOVE_BLOCK',
         chartData: newChartData,
      });
   };
};

export const fetchStockCharts = () => {
   return dispatch => {
      const api = new ApiManager();
      dispatch({
         type: STOCK_CHART_REQUEST,
      });

      return api
         .getStockCharts()
         .then(stockCharts => {
            dispatch({
               type: STOCK_CHART_SUCCESS,
               stockCharts: stockCharts.charts,
            });
         })
         .catch(error => {
            dispatch({
               type: STOCK_CHART_FAILURE,
               error,
            });
         });
   };
};

export const fetchUserCharts = config => {
   return dispatch => {
      const api = new ApiManager(config);
      dispatch({
         type: USER_CHARTS_REQUEST,
      });

      return api
         .getUserCharts()
         .then(userCharts => {
            dispatch({
               type: USER_CHARTS_SUCCESS,
               userCharts,
            });
         })
         .catch(error => {
            dispatch({
               type: USER_CHARTS_FAILURE,
               error,
            });
         });
   };
};
