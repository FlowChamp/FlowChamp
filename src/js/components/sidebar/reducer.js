import {
   TOGGLE_SIDEBAR,
   NEW_SIDEBAR_VIEW,
   OLD_SIDEBAR_VIEW,
   EMPTY_SIDEBAR,
} from './constants';

const initialState = {
   isOpen: false,
   stack: [
      {
         name: 'main',
         props: {},
      },
   ],
   viewStack: [{ name: 'main', props: {} }],
};

const sidebarReducer = (state = initialState, action) => {
   switch (action.type) {
      case TOGGLE_SIDEBAR:
         return {
            ...state,
            isOpen: action.value,
         };
      case 'PUSH_VIEW':
         return {
            ...state,
            stack: [...state.stack, action.view],
         };
      case 'POP_VIEW':
         return {
            ...state,
            stack: state.stack.slice(0, state.stack.length - 1),
         };
      case 'EMPTY_VIEWS':
         return {
            ...state,
            stack: state.stack.slice(0, 1),
         }
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
