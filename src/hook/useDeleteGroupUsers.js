import { useContext } from "react";
import { DeleteGroupUsersContext } from "../context/DeleteGroupUsersContext";

export const useDeleteGroupUsers = () => {
  const {state,dispatch}=useContext(DeleteGroupUsersContext);
  return [state,dispatch]
};
