import {
   TOGGLE_SIDEBAR,
   NEW_SIDEBAR_VIEW,
   OLD_SIDEBAR_VIEW,
   EMPTY_SIDEBAR,
} from './constants';

const initialState = {
   isOpen: false,
   viewStack: [{ name: 'main', props: {} }],
};

const sidebarReducer = (state = initialState, action) => {
   switch (action.type) {
      case TOGGLE_SIDEBAR:
         return {
            ...state,
            isOpen: action.value,
         };
      case NEW_SIDEBAR_VIEW:
         const popStack = action.view.popStack || false;
         const len = state.viewStack.length;

         return {
            ...state,
            viewStack: popStack
               ? [...state.viewStack.slice(0, len - 1), action.view]
               : [...state.viewStack, action.view],
         };
      case OLD_SIDEBAR_VIEW:
         const length = state.viewStack.length;

         return length === 1
            ? state
            : {
                 ...state,
                 viewStack: [...state.viewStack.slice(0, length - 1)],
              };
      case EMPTY_SIDEBAR:
         return {
            ...state,
            viewStack: [...state.viewStack.slice(0, 1)],
         };
      default:
         return state;
   }
};

export default sidebarReducer;
