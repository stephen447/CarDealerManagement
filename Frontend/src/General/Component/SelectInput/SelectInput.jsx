import styles from "./SelectInput.module.css";

function SelectInput({
  label,
  name,
  formData,
  setFormData,
  options,
  required = true,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles["select-input"]}>
      <label>
        {label}
        {!required && " (Opt)"}
        <select
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          required={required}
          className={styles.select}
        >
          <option value="" disabled>
            Select an option
          </option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default SelectInput;
