import {
   STOCK_CHART_REQUEST,
   STOCK_CHART_SUCCESS,
   STOCK_CHART_FAILURE,
} from './constants';

const initialState = {
   fetching: false,
   error: null,
   stockCharts: [],
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
      default:
         return state;
   }
};

export default flowchartReducer;
