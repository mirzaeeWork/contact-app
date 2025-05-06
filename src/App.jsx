import Message from "./componenrs/Message";
import Loading from "./componenrs/Loading";
import ThemeToggle from "./componenrs/Theme/ThemeToggle";
import useCallApi from "./services/CallApi";
import { getAllUsers } from "./services/userActions";
import UsersTable from "./componenrs/UsersTable";
import { useEffect, useState } from "react";
import Search from "./componenrs/Search";
import ButtonsHandleUsers from "./componenrs/ButtonsHandleUsers";
import { useDeleteGroupUsers } from "./hook/useDeleteGroupUsers";

export default function App() {
  const [state] = useCallApi({ api: getAllUsers });
  const [,dispatchDeleteGroupUsers]=useDeleteGroupUsers()
  const [users, setUsers] = useState(null);

  useEffect(() => {
    setUsers(state.data);
  }, [state.data]);

  if (state.loading) return <Loading />;

  const handleDeleteGroup = () => {
    dispatchDeleteGroupUsers({type:"OPEN_DELETE_GROUP"})
  };

  return (
    <>
    {state.error && <Message />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Search data={state.data} setUsers={setUsers} />
        <ButtonsHandleUsers handleDeleteGroup={handleDeleteGroup} setUsers={setUsers}/>
      </div>
      <UsersTable users={users} handleDeleteGroup={handleDeleteGroup} setUsers={setUsers}/>
    </>
  );
}
