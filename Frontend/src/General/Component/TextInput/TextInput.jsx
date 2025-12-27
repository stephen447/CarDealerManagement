import style from "./TextInput.module.css";
function TextInput({ label, name, type, formData, setFormData }) {
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
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required
        />
      </label>
    </div>
  );
}

export default TextInput;
