import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
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

  //get single user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`https://api.github.com/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //get latest repo info

  const getUserRepos = async (login) => {
    setLoading();

    const response = await fetch(
      `https://api.github.com/users/${login}/repos`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    dispatch({
      //dispatch action object
      //get user data and dispatch the data to reducer
      type: "GET_REPOS",
      payload: data,
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
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUser,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
