import { createContext, useReducer } from "react";

const initialState = {
  usersIds: [],
  IsDeleteGroup: false,
  message: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_DELETE_GROUP":
      return { usersIds: [], IsDeleteGroup: true };
    case "ADD_USER_DELETE_GROUP":
      return { ...state, usersIds: [...state.usersIds, action.payload] };
    case "REMOVE_USER_DELETE_GROUP":
      return {
        ...state,
        usersIds: state.usersIds.filter((id) => id !== action.payload),
      };
    case "CLOSE_DELETE_GROUP":
      return {
        ...state,
        usersIds: [],
        IsDeleteGroup: false,
        message: action.payload,
      };

    default:
      throw new Error("Invalid action type");
  }
};

export const DeleteGroupUsersContext = createContext();

function DeleteGroupUsersProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DeleteGroupUsersContext.Provider value={{ state, dispatch }}>
      {children}
    </DeleteGroupUsersContext.Provider>
  );
}

export default DeleteGroupUsersProvider;
