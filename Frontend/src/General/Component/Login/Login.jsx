import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import TextInput from "../TextInput/TextInput";

function Login({ userType }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // setLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    // try {
    //   // TODO: Replace with actual API endpoint
    //   const response = await fetch("http://localhost:3000/api/v1/user/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.error || "Login failed");
    //   }

    //   const data = await response.json();
    //   // TODO: Handle successful login (store token, redirect, etc.)
    //   console.log("Login successful:", data);
    //   alert("Login successful!");
    // } catch (err) {
    //   setError(err.message || "An error occurred during login");
    // } finally {
    //   setLoading(false);
    // }
    // Redirect to a different page (temporary solution)
    navigate(`/${userType}`);
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-card"]}>
        <h1 className={styles["login-title"]}>Car Adverts</h1>
        <h2 className={styles["login-subtitle"]}>Sign In</h2>

        {error && <div className={styles["error-message"]}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles["login-form"]}>
          <TextInput
            label="Email"
            name="email"
            type="email"
            formData={formData}
            setFormData={setFormData}
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            formData={formData}
            setFormData={setFormData}
          />

          <button
            type="submit"
            className={styles["login-button"]}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
