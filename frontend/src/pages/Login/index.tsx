import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { setUser } from "../../utils";
import styles from "./Login.module.css";

type LocationState = {
  from?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { apiFetch } = useApi();
  const from = (location.state as LocationState)?.from || "/products";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Not logged in. Please fill in all fields.");
      return;
    }

    try {
      const response = await apiFetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      setUser(data.user);
      navigate(from);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.field}>
          <label className={styles.label}>Username</label>
          <input
            type="text"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
