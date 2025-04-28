import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useUser = () => {
  const {state,dispatch}=useContext(UserContext);
  return [state,dispatch]
};
