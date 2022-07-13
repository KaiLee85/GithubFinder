import { createContext, useReducer } from "react";
import alertReducer from "./AlertReducer";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = null;

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //set an alert
  const setAlert = (message, type) => {
    dispatch({
      type: "SET_ALERT",
      payload: { message, type },
    });

    setTimeout(() => dispatch({ type: "REMOVE_ALER" }), 2000);
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
