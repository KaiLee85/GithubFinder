import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  //get state and call dispatch method
  //dispatch method is like setSomething in useState
  const [state, dispatch] = useReducer(githubReducer, initialState);

  //Get search results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({ q: text });
    const response = await fetch(
      `https://api.github.com/search/users?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    const { items } = await response.json();

    //use redux
    dispatch({
      //dispatch action object
      //get user data and dispatch the data to reducer
      type: "GET_USERS",
      payload: items,
    });
  };

  //set loading
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  //clear user
  const clearUser = () =>
    dispatch({
      type: "CLEAR_USER",
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
