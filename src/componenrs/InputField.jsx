import styles from "./InputField.module.css";

function InputField({ name, placeholder, error, register, type = "text" }) {
  const handleInput = (e) => {
    if (name === "mobile") {
      const value = e.target.value;
      e.target.value = value.replace(/[^0-9]/g, "");
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type={type}
        name={name}
        {...register(name)}
        placeholder={placeholder}
        className={styles.input}
        inputMode={name === "mobile" ? "numeric" : null}
        onInput={handleInput}
        maxLength={name === "mobile" ? 11 :null}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
}

export default InputField;
