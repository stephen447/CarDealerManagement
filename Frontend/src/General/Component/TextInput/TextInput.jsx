import style from "./TextInput.module.css";
function TextInput({
  label,
  name,
  type,
  formData,
  setFormData,
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
    <div className={style["text-input"]}>
      <label>
        {label}
        {!required && " (Opt)"}
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required={required}
        />
      </label>
    </div>
  );
}

export default TextInput;
