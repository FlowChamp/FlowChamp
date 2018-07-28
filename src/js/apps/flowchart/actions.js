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
   chartData,
   sourceQuarterId,
   destQuarterId,
   oldBlockIndex,
   newBlockIndex,
   boardId,
}) => {
   return dispatch => {
      const sourceQuarterSplit = sourceQuarterId.split('-');
      const sourceYear = sourceQuarterSplit[0];
      const sourceQuarter = sourceQuarterSplit[1];

      const destQuarterSplit = destQuarterId.split('-');
      const destYear = destQuarterSplit[0];
      const destQuarter = destQuarterSplit[1];
      console.log('Destination: ', destYear, destQuarter);

      // Move within the same list
      if (sourceQuarterId === destQuarterId) {
         const newBlocks = Array.from(
            chartData[sourceYear].quarters[sourceQuarter],
         );
         // Block being moved
         const [removedBlock] = newBlocks.splice(oldBlockIndex, 1);
         newBlocks.splice(newBlockIndex, 0, removedBlock);
         const newChartData = chartData;
         newChartData[destYear].quarters[destQuarter] = newBlocks;

         dispatch({
            type: 'MOVE_BLOCK',
            chartData: newChartData,
         });
      } else {
         const sourceBlocks = Array.from(
            chartData[sourceYear].quarters[sourceQuarter],
         );
         const [removedBlock] = sourceBlocks.splice(oldBlockIndex, 1);
         const destBlocks = Array.from(
            chartData[destYear].quarters[destQuarter],
         );
         destBlocks.splice(newBlockIndex, 0, removedBlock);
         const newChartData = chartData;
         newChartData[sourceYear].quarters[sourceQuarter] = sourceBlocks;
         newChartData[destYear].quarters[destQuarter] = destBlocks;

         dispatch({
            type: 'MOVE_BLOCK',
            chartData: newChartData,
         });
      }
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
