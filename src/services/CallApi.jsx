import { useEffect } from "react";
import { useUser } from "../hook/useUser";
import { getAllUsers } from "./userActions";

export default function useCallApi({
  api,
  defaultData = null,
  message,
  skip = false,
}) {
  const [state, dispatch] = useUser();

  const callApi = async ({
    customApi = api,
    customData = defaultData || null,
    customMessage = message || null,
    sortDirection = "asc",
  } = {}) => {
    dispatch({ type: "REQUEST" });
    try {
      const data = await customApi(customData);
      dispatch({
        type: "SUCCESS",
        payload: { data, message: customMessage, sortDirection },
      });
      return true;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
      return false;
    }
  };

  const callApi_getAllUsers = async ({
    api,
    defaultData,
    message,
    sortDirection,
  } = {}) => {
    try {
      const isSuccessful = await callApi({
        customApi: api,
        customData: defaultData,
      });
      if (isSuccessful) {
        await callApi({
          customApi: getAllUsers,
          customMessage: message,
          sortDirection,
        });
      }
    } catch (error) {
      console.error("Error in callApi_getAllUsers:", error.message);
    }
  };

  useEffect(() => {
    if (!skip) callApi();
  }, []);

  return [state, callApi_getAllUsers];
}
