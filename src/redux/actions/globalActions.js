import { SET_TOAST, REMOVE_TOAST } from "../reduxConstants";
import { generateId } from "../../utils";

export const setToast = message => ({
  type: SET_TOAST,
  payload: {
    id: generateId(),
    message
  }
});

export const removeToast = id => ({
  type: REMOVE_TOAST,
  payload: {
    id
  }
});