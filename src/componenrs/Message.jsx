import { useEffect, useState } from "react";
import styles from "./Message.module.css";
import { useUser } from "../hook/useUser";

function Message({ error,text }) {
  const [state] = useUser();

  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!showMessage) return null;

  return (
    <div
      className={`${styles.message} ${
        (state.error || error) ? styles.error : styles.success
      }`}
    >
      {(state.error || error) && <h6>{state.error || error}</h6>}
      {(!state.error && !error) && text && <h6>{text}</h6>}
    </div>
  );
}

export default Message;
