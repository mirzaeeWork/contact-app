import { useEffect } from "react";
import { useUser } from "../hook/useUser";

export default function useCallApi({ api, defaultData=null,message }) {
  const [state, dispatch] = useUser();

  useEffect(() => {
    const callApi = async () => {
      dispatch({ type: "REQUEST" });
      try {
        const data = await api(defaultData);
        dispatch({ type: "SUCCESS", payload: {data,message} });
      } catch (error) {
        dispatch({ type: "ERROR", payload: error.message });
      }
    };
    callApi();
  }, []);

  return [state, dispatch];
}

