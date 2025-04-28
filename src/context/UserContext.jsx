import React, { createContext, useReducer } from "react";

const initialState = {
  data: null,
  loading: false,
  error: null,
  message:""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST":
      return { data: null, loading: true, error: null,message:"" };
    case "SUCCESS":
      return { error: null, loading: false, data: action.payload.data,message:action.payload.message };
    case "ERROR":
      return { data: null, loading: false, error: action.payload,message:"" };
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
