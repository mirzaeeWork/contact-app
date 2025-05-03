import styles from "./UsersTable.module.css";
import { useDeleteGroupUsers } from "../hook/useDeleteGroupUsers";
import { useState } from "react";
import { useUser } from "../hook/useUser";
import { deleteUser, editUser } from "../services/userActions";
import Modal from "./Modal";
import Message from "./Message";
import ModalUser from "./ModalUser";
import UserRow from "./UserRow";
import useCallApi from "../services/CallApi";
import {
  getSortIcon,
  handleBackUpdateUser,
  handleCancleDelete,
  handleDeleteUser,
  handleEditUser,
  sortData,
} from "../helper/helper";

function UsersTable({ users, setUsers }) {
  const [state] = useUser();
  const [, callApi_getAllUsers] = useCallApi({ skip: true });
  const [stateDeleteGroupUsers, dispatchDeleteGroupUsers] =
    useDeleteGroupUsers();

  const [uiState, setUiState] = useState({
    openModal: false,
    openModalUser: false,
    infoUser: null,
    sortDirection: state.sortDirection,
  });



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
    await callApi_getAllUsers({
      api: deleteUser,
      defaultData: uiState.infoUser,
      message: "کاربر حذف شد",
      sortDirection:uiState.sortDirection
    });

    setUsers(state.data)
    setUiState((prev) => ({ ...prev, infoUser: null }));
  };

  const onSubmitUser = async (user) => {
    await callApi_getAllUsers({
      api: editUser,
      defaultData: user,
      message: "کاربر ویرایش شد",
      sortDirection:uiState.sortDirection
    });
    setUsers(state.data)
    setUiState((prev) => ({ ...prev, openModalUser: false, infoUser: null }));
  };

  return (
    <>
      {state.message && <Message text={state.message} />}
      <table className={styles.table}>
        <thead>
          <tr>
            <th
              className={styles.th}
              onClick={() =>
                sortData(uiState.sortDirection, setUiState, users, setUsers)
              }
              style={{ cursor: "pointer" }}
            >
              نام و نام خانوادگی {getSortIcon(uiState.sortDirection)}
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
              onEdit={() => handleEditUser(setUiState, user)}
              onDelete={() => handleDeleteUser(setUiState, user.id)}
              handleCheck={handleCheck}
            />
          ))}
        </tbody>
      </table>

      {uiState.openModal && (
        <Modal
          handleDelete={handleDelete}
          handleCancle={() => handleCancleDelete(setUiState)}
          اheader="حذف کاربر"
          mainMessage="آیا مطمئن هستید که می خواهید این کاربر را حذف کنید؟"
        />
      )}

      {uiState.openModalUser && (
        <ModalUser
          handleUser={uiState.infoUser}
          handleCancle={() => handleBackUpdateUser(setUiState)}
          btnText="ویرایش"
          onSubmitUser={onSubmitUser}
        />
      )}
    </>
  );
}

export default UsersTable;
