import styles from "./ModalUser.module.css";
import InputField from "./InputField";
import { schemaUser } from "../helper/helper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function ModalUser({ handleUser = {}, handleCancle, btnText, onSubmitUser }) {
  const { id, firstName, lastName, email, job, mobile } = handleUser;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: id || Date.now().toString(),
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      job: job || "",
      mobile: mobile || "",
    },
    resolver: yupResolver(schemaUser),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    onSubmitUser(data);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.bgModal} onClick={handleCancle} />
      <form className={styles.modalContent} onSubmit={handleSubmit(onSubmit)}>
        <button
          type="button"
          onClick={handleCancle}
          className={styles.closeButton}
        >
          X
        </button>

        <InputField
          register={register}
          name="firstName"
          placeholder="نام"
          error={errors.firstName}
        />

        <InputField
          register={register}
          name="lastName"
          placeholder="نام خانوادگی"
          error={errors.lastName}
        />

        <InputField
          register={register}
          name="email"
          placeholder="ایمیل"
          error={errors.email}
        />

        <InputField
          register={register}
          name="job"
          placeholder="شغل"
          error={errors.job}
        />

        <InputField
          register={register}
          name="mobile"
          placeholder="موبایل"
          error={errors.mobile}
          type="tel"
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
