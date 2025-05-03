import React, { useState } from "react";
import { searchUsers } from "../services/userActions";
import styles from "./Search.module.css";

function Search({ data, setUsers }) {
  const [text, setText] = useState("");

  const changHandler = (e) => {
    const { value } = e.target;
    setText(value);
    const newUsers = searchUsers(data, value);
    setUsers(newUsers);
  };
  
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="جستجوی مخاطبین"
        value={text}
        onInput={changHandler}
      />
      <span>💭</span>
    </div>
  );
}

export default Search;
