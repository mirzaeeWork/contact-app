import React, { createContext, useReducer } from "react";

const initialState = {
  data: null,
  loading: false,
  error: null,
  message: "",
  sortDirection: "asc",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST":
      return {...state, loading: true, error: null, message: "" };
    case "SUCCESS": {
      const {
        data,
        message = "",
        sortDirection = "asc",
      } = action.payload || {};

      const isArray = Array.isArray(data);

      const sortedData = isArray
        ? [...data].sort(
            (a, b) =>
              a.firstName.localeCompare(b.firstName) *
              (sortDirection === "asc" ? 1 : -1)
          )
        : state.data;
      return {
        error: null,
        loading: false,
        data: sortedData,
        message,
        sortDirection,
      };
    }
    case "ERROR":
      return { ...state, loading: false, error: action.payload, message: "" };
    default:
      throw new Error("Invalid action type");
  }
};

export const UserContext = createContext();

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
