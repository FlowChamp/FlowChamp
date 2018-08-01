import {
   STOCK_CHART_SUCCESS,
   STOCK_CHART_FAILURE,
   GET_ACTIVE_CHART_REQUEST,
   GET_ACTIVE_CHART_SUCCESS,
   GET_ACTIVE_CHART_FAILURE,
} from './constants';

const initialState = {
   fetching: false,
   error: null,
   data: [],
   stockCharts: [],
   chartRevision: 0,
   chartData: [],
   departmentData: [],
};

const flowchartReducer = (state = initialState, action) => {
   let newChartData;
   switch (action.type) {
      case STOCK_CHART_SUCCESS:
         return {
            ...state,
            stockCharts: action.stockCharts,
         };
      case STOCK_CHART_FAILURE:
         return Object.assign({}, ...state, {
            error: action.error,
         });
      case GET_ACTIVE_CHART_REQUEST:
         return Object.assign({}, state, {
            fetching: true,
         });
      case 'LOGOUT_SUCCESS':
         return {
            ...state,
            fetching: false,
            chartData: null,
         };
      case 'FETCH_ACTIVE_CHART_REQUEST':
         return {
            ...state,
            fetching: true,
         };
      case GET_ACTIVE_CHART_SUCCESS:
         return Object.assign({}, state, {
            fetching: false,
            chartData: action.chartData,
         });
      case GET_ACTIVE_CHART_FAILURE:
         return Object.assign({}, state, {
            fetching: false,
         });
      case 'MOVE_BLOCK':
         return {
            ...state,
            chartData: action.chartData,
         };
      case 'UPDATE_COURSE_REQUEST':
         newChartData = state.chartData;
         newChartData[action.year].quarters[action.quarter][action.index] =
            action.course;
         return {
            ...state,
            prevChartData: state.chartData,
            chartData: newChartData,
         };
      case 'UPDATE_COURSE_FAILURE':
         return {
            ...state,
            prevChartData: null,
            chartData: state.prevChartData,
         };
      case 'GET_DEPARTMENTS_SUCCESS':
         return {
            ...state,
            departmentData: action.departmentData,
         };
      case 'GET_COURSE_LIST_SUCCESS':
         return {
            ...state,
            departmentData: state.departmentData.map((item, index) => {
               return {
                  name: item.name,
                  courses:
                     item.name === action.department
                        ? action.courses
                        : state.departmentData[index].courses,
               };
            }),
         };
      default:
         return state;
   }
};

export default flowchartReducer;
