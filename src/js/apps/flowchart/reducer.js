import {
   STOCK_CHART_REQUEST,
   STOCK_CHART_SUCCESS,
   STOCK_CHART_FAILURE,
   ACTIVE_CHART_REQUEST,
   ACTIVE_CHART_SUCCESS,
   ACTIVE_CHART_FAILURE,
   GET_ACTIVE_CHART_REQUEST,
   GET_ACTIVE_CHART_SUCCESS,
   GET_ACTIVE_CHART_FAILURE,
} from './constants';

const initialState = {
   fetching: false,
   error: null,
   data: [],
   stockCharts: [],
   chartData: [],
};

const flowchartReducer = (state = initialState, action) => {
   switch (action.type) {
      case STOCK_CHART_REQUEST:
         return Object.assign({}, ...state, {
            fetching: true,
         });
      case STOCK_CHART_SUCCESS:
         return Object.assign({}, ...state, {
            fetching: false,
            stockCharts: action.stockCharts,
         });
      case STOCK_CHART_FAILURE:
         return Object.assign({}, ...state, {
            fetching: false,
            error: action.error,
         });
      case ACTIVE_CHART_REQUEST:
         return Object.assign({}, ...state, {
            fetchingChart: true,
         });
      case ACTIVE_CHART_SUCCESS:
         return Object.assign({}, ...state, {
            fetchingChart: false,
            data: action.chartData,
         });
      case ACTIVE_CHART_FAILURE:
         return Object.assign({}, ...state, {
            fetchingChart: false,
            error: action.error,
         });
      case GET_ACTIVE_CHART_REQUEST:
         return Object.assign({}, state, {
            changingChart: true,
         });
      case GET_ACTIVE_CHART_SUCCESS:
         return Object.assign({}, state, {
            changingChart: false,
            chartData: action.chartData,
         });
      case GET_ACTIVE_CHART_FAILURE:
         return Object.assign({}, state, {
            changingChart: false,
         });
      case 'MOVE_CARD': {
         const years = { Freshman: 0, Sophomore: 1, Junior: 2, Senior: 3 };
         const seasons = { Fall: 0, Winter: 1, Spring: 2, Summer: 3 };
         const {
            oldCardIndex,
            newCardIndex,
            sourceListId,
            destListId,
         } = action.payload;
         const sourceListSplit = sourceListId.split('-');
         const destListSplit = destListId.split('-');
         const sourceYear = years[sourceListSplit[1]];
         const sourceSeason = seasons[sourceListSplit[0]];
         // Move within the same list
         if (sourceListId === destListId) {
            const newCards = Array.from(
               state.chartData[sourceYear].quarters[sourceSeason],
            );
            const [removedCard] = newCards.splice(oldCardIndex, 1);
            newCards.splice(newCardIndex, 0, removedCard);
            let newChartData = state.chartData;
            newChartData[sourceYear].quarters[sourceSeason] = newCards;
            return {
               ...state,
               chartData: newChartData
            };
         }
         break;
         /*
         // Move card from one list to another
         const sourceCards = Array.from(state[sourceListId].cards);
         const [removedCard] = sourceCards.splice(oldCardIndex, 1);
         const destinationCards = Array.from(state[destListId].cards);
         destinationCards.splice(newCardIndex, 0, removedCard);
         return {
            ...state,
            [sourceListId]: { ...state[sourceListId], cards: sourceCards },
            [destListId]: { ...state[destListId], cards: destinationCards },
         };
         */
      }
      default:
         return state;
   }
};

export default flowchartReducer;
