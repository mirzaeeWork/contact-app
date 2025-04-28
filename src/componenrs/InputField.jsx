// InputField.jsx
import styles from "./InputField.module.css";

function InputField({ name, placeholder, value, onChange, onBlur, error, inputMode = "text" }) {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputMode={inputMode}
        className={styles.input}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default InputField;
