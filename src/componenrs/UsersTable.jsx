import styles from "./UsersTable.module.css";
import { useDeleteGroupUsers } from "../hook/useDeleteGroupUsers";
import { useState } from "react";
import { useUser } from "../hook/useUser";
import {
  callApi,
  deleteUser,
  editUser,
  getAllUsers,
} from "../services/userActions";
import Modal from "./Modal";
import Message from "./Message";
import ModalUser from "./ModalUser";
import UserRow from "./UserRow";

function UsersTable({ users, setUsers }) {
  const [state, dispatch] = useUser();
  const [stateDeleteGroupUsers, dispatchDeleteGroupUsers] =
    useDeleteGroupUsers();

  const [openModal, setOpenModal] = useState(false);
  const [openModalUser, setOpenModalUser] = useState(false);
  const [infoUser, setInfoUser] = useState(null);

  const [sortDirection, setSortDirection] = useState("asc");

  const handleCheck = (id) => {
    if (stateDeleteGroupUsers.usersIds.includes(id)) {
      dispatchDeleteGroupUsers({
        type: "REMOVE_USER_DELETE_GROUP",
        payload: id,
      });
    } else {
      dispatchDeleteGroupUsers({ type: "ADD_USER_DELETE_GROUP", payload: id });
    }
  };

  const handleDelete = async () => {
    await callApi({ dispatch, api: deleteUser, defaultData: infoUser });
    await callApi({ dispatch, api: getAllUsers, message: "کاربر حذف شد" });
    setUsers(state.data);
    setInfoUser(null);
  };

  const handleCancleDelete = () => {
    setOpenModal(false);
    setInfoUser(null);
  };

  const handleBackUpdateUser = () => {
    setOpenModalUser(false);
    setInfoUser(null);
  };

  const onSubmitUser = async (user) => {
    await callApi({ dispatch, api: editUser, defaultData: user });
    await callApi({ dispatch, api: getAllUsers, message: "کاربر ویرایش شد" });
    setUsers(state.data);
    setOpenModalUser(false);
    setInfoUser(null);
  };

  const handleEditUser = (user) => {
    setOpenModalUser(true);
    setInfoUser(user);
  };

  const handleDeleteUser = (userId) => {
    setOpenModal(true);
    setInfoUser(userId);
  };

  const sortData = () => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(direction);

    const sortedUsers = [...users].sort((a, b) => {
      if (a.firstName < b.firstName) return direction === "asc" ? -1 : 1;
      if (a.firstName > b.firstName) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
  };

  const getSortIcon = () => {
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <>
      {state.message && <Message text={state.message} />}

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th} onClick={sortData} style={{ cursor: "pointer" }}>
              نام و نام خانوادگی {getSortIcon()}
            </th>
            <th className={styles.th}>ایمیل</th>
            <th className={styles.th}>عملیات</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user, index) => (
            <UserRow
              key={index}
              user={user}
              stateDeleteGroupUsers={stateDeleteGroupUsers}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              handleCheck={handleCheck}
            />
          ))}
        </tbody>
      </table>

      {openModal && (
        <Modal
          handleDelete={handleDelete}
          handleCancle={handleCancleDelete}
          اheader="حذف کاربر"
          mainMessage="آیا مطمئن هستید که می خواهید این کاربر را حذف کنید؟"
        />
      )}

      {openModalUser && (
        <ModalUser
          handleUser={infoUser}
          handleCancle={handleBackUpdateUser}
          btnText="ویرایش"
          onSubmitUser={onSubmitUser}
        />
      )}
    </>
  );
}

export default UsersTable;
