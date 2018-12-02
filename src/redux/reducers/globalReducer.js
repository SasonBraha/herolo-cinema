import { SET_TOAST, REMOVE_TOAST } from "../reduxConstants";

const initialState = {
  toasts: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_TOAST:
      return {
        ...state,
        toasts: [
          ...state.toasts,
          action.payload
        ]
      }

    case REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(({ id }) => id !== action.payload.id)
      }

    default: 
      return {
        ...state
      }
  }
}

