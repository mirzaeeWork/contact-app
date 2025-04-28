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


  export { validateField,placeholders };