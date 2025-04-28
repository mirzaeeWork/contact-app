import { useDeleteGroupUsers } from "../hook/useDeleteGroupUsers";
import {
  addUser,
  callApi,
  deleteUsers,
  getAllUsers,
} from "../services/userActions";
import { useUser } from "../hook/useUser";
import Message from "./Message";
import { useState } from "react";
import Modal from "./Modal";
import ModalUser from "./ModalUser";

function DeleteGroup({ handleDeleteGroup, setUsers }) {
  const [stateDeleteGroupUsers, dispatchDeleteGroupUsers] =
    useDeleteGroupUsers();
  const [state, dispatch] = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [openModalUser, setOpenModalUser] = useState(false);

  const handleDeleteGroupUsers = async () => {
    setOpenModal(false);

    await callApi({
      dispatch,
      api: deleteUsers,
      defaultData: stateDeleteGroupUsers.usersIds,
    });
    await callApi({ dispatch, api: getAllUsers });
    setUsers(state.data);
    dispatchDeleteGroupUsers({
      type: "CLOSE_DELETE_GROUP",
      payload: "کاربران حذف شدند",
    });
  };

  const handleSelectGroup = () => {
    setError("");
    if (stateDeleteGroupUsers.usersIds.length > 0) {
      setOpenModal(true);
    } else {
      dispatchDeleteGroupUsers({
        type: "CLOSE_DELETE_GROUP",
        payload: "",
      });
      setTimeout(() => {
        setError("لطفا کاربرانی را برای حذف انتخاب کنید");
      }, 0);
    }
  };

  const handleCancle = () => {
    dispatchDeleteGroupUsers({
      type: "CLOSE_DELETE_GROUP",
      payload: "",
    });
    setOpenModal(false);
  };

  const handleBackUpdateUser = () => {
    setOpenModalUser(false);
  };

  const onSubmitUser = async (user) => {
    await callApi({
      dispatch,
      api: addUser,
      defaultData: user,
    });
    await callApi({ dispatch, api: getAllUsers, message: "کاربر اضافه شد" });
    setUsers(state.data);
    setOpenModalUser(false);
  };

  return (
    <>
      {stateDeleteGroupUsers.message && (
        <Message text={stateDeleteGroupUsers.message} />
      )}
      {error && <Message error={error} />}

      <div>
        {stateDeleteGroupUsers.IsDeleteGroup ? (
          <>
            <button onClick={handleSelectGroup}>
              ❌ <span>حذف </span>
            </button>
            <button style={{ marginRight: "10px" }} onClick={handleCancle}>
              🔙 <span> بازگشت </span>
            </button>
          </>
        ) : (
          <>
            <button onClick={handleDeleteGroup}>
              🗑️ <span>حذف گروهی</span>
            </button>
            <button style={{ marginRight: "10px" }} onClick={()=>setOpenModalUser(true)}>
            👤 <span> افزودن کاربر </span>
            </button>
          </>
        )}
      </div>
      {openModal && (
        <Modal
          handleDelete={handleDeleteGroupUsers}
          handleCancle={handleCancle}
          اheader="حذف گروهی"
          mainMessage="آیا مطمئن هستید که می خواهید این گروه را حذف کنید؟"
        />
      )}
      {openModalUser && (
        <ModalUser
          handleCancle={handleBackUpdateUser}
          btnText="افزودن"
          onSubmitUser={onSubmitUser}
        />
      )}
    </>
  );
}

export default DeleteGroup;
