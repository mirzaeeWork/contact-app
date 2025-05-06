import * as yup from "yup";
import { phoneNumberValidator  } from "@persian-tools/persian-tools";

const schemaUser = yup.object().shape({
  firstName: yup
    .string()
    .required("نام الزامی است")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد"),

  lastName: yup
    .string()
    .required("نام خانوادگی الزامی است")
    .min(3, "نام خانوادگی باید حداقل ۳ کاراکتر باشد"),

  email: yup
    .string()
    .required("ایمیل الزامی است")
    .email("ایمیل معتبر نیست"),

  job: yup
    .string()
    .required("شغل الزامی است")
    .min(3, "شغل باید حداقل ۳ کاراکتر باشد"),

  mobile: yup
    .string()
    .required("شماره موبایل الزامی است")
    .test("is-valid-iranian-mobile", "شماره موبایل معتبر نیست", (value) =>
      phoneNumberValidator(value || "")
    ),
});


  const sortData = (sortDirection,setUiState,users=[],setUsers) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    setUiState(prev => ({ ...prev, sortDirection: direction }));

    const sortedUsers = [...users].sort((a, b) => {
      if (a.firstName < b.firstName) return direction === "asc" ? -1 : 1;
      if (a.firstName > b.firstName) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
  };

  const handleCancleDelete = (setUiState) => {
    setUiState(prev => ({ ...prev,openModal: false ,infoUser: null }));
  };

  const handleBackUpdateUser = (setUiState) => {
    setUiState(prev => ({ ...prev,openModalUser: false ,infoUser: null }));
  };


  const handleEditUser = (setUiState,user) => {
    setUiState(prev => ({ ...prev,openModalUser: true ,infoUser: user }));
  };

  const handleDeleteUser = (setUiState,userId) => {
    setUiState(prev => ({ ...prev,openModal: true ,infoUser: userId }));
  };

  const getSortIcon = (sortDirection) => {
    return sortDirection === "asc" ? "↑" : "↓";
  };




  export { schemaUser,sortData,handleCancleDelete,handleBackUpdateUser,handleEditUser,handleDeleteUser,getSortIcon };