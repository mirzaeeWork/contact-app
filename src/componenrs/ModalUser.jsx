import { useState } from "react";
import styles from "./ModalUser.module.css";
import InputField from "./InputField"; // ایمپورت کامپوننت جدید
import { placeholders, validateField } from "../helper/helper";

function ModalUser({ handleUser = {}, handleCancle, btnText, onSubmitUser }) {
  const { id, firstName, lastName, email, job, mobile } = handleUser;

  const [user, setUser] = useState({
    id: id || Date.now().toString(),
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    job: job || "",
    mobile: mobile || "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    job: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "mobile") {
      const onlyNumbers = value.replace(/\D/g, ""); // فقط عدد بگیر
      const limitedNumbers = onlyNumbers.slice(0, 11); // حداکثر 11 رقم
      setUser((prev) => ({ ...prev, [name]: limitedNumbers }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleBlur = (e) => {
    const { name, value, placeholder } = e.target;
    const errorText = validateField(name, value, placeholder);
    setError((prev) => ({ ...prev, [name]: errorText }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    Object.keys(user).forEach((key) => {
      if (key !== "id") {
        const placeholder = placeholders[key];
        const errorText = validateField(key, user[key], placeholder);
        newErrors[key] = errorText;
      }
    });

    setError(newErrors);
    if (!Object.values(newErrors).some((error) => error)) {
      onSubmitUser(user);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.bgModal} onClick={handleCancle} />

      <form className={styles.modalContent} onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={handleCancle}
          className={styles.closeButton}
        >
          X
        </button>
        <InputField
          name="firstName"
          placeholder="نام"
          value={user.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={error.firstName}
        />

        <InputField
          name="lastName"
          placeholder="نام خانوادگی"
          value={user.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={error.lastName}
        />

        <InputField
          name="email"
          placeholder="ایمیل"
          value={user.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={error.email}
        />

        <InputField
          name="job"
          placeholder="شغل"
          value={user.job}
          onChange={handleChange}
          onBlur={handleBlur}
          error={error.job}
        />

        <InputField
          name="mobile"
          placeholder="موبایل"
          value={user.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
          error={error.mobile}
          inputMode="numeric"
        />

        <div>
          <button className={styles.buttonDelete} type="submit">
            {btnText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalUser;
