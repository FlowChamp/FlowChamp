const initialState = {
   popupStack: [],
};

const popupReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'PUSH_POPUP':
         return {
            ...state,
            popupStack: state.popupStack.concat(action.popup),
         };
      case 'POP_POPUP':
         return {
            ...state,
            popupStack: state.popupStack.slice(0, state.popupStack.length - 1),
         };
      default:
         return state;
   }
};

export default popupReducer;
