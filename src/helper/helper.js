const validateField = (name, value, placeholder) => {
    let errorMessage = "";

    if (value.trim().length < 3) {
      errorMessage = `${placeholder} باید حداقل ۳ کاراکتر باشد.`;
    }

    if (name === "email") {
        const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(value)) {
        errorMessage = "ایمیل معتبر نیست.";
      }
    }

    if (name === "mobile") {
      const mobileRegex = /^09\d{9}$/;
      if (!mobileRegex.test(value)) {
        errorMessage = "شماره موبایل باید با 09 شروع شود و فقط 11 رقم عددی باشد.";
      }
    }

    return errorMessage;
  };

  const placeholders = {
    firstName: "نام",
    lastName: "نام خانوادگی",
    email: "ایمیل",
    job: "شغل",
    mobile: "موبایل",
  };

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




  export { validateField,placeholders,sortData,handleCancleDelete,handleBackUpdateUser,handleEditUser,handleDeleteUser,getSortIcon };