import React, { useState } from "react";
import styles from "./Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform your login logic here, for example:
    if (username === "validUsername" && password === "validPassword") {
      // Successful login logic (e.g., redirect user)
      console.log("Login successful");
    } else {
      // Handle incorrect credentials
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>تسجيل الدخول</div>
      <form onSubmit={handleLogin}>
        <div className={styles.data}>
          <label>البريد الإلكتروني</label>
          <input
            type="text"
            placeholder="chouaib@9arini.dz"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.data}>
          <label>كلمة المرور</label>
          <input
            type="password"
            placeholder="●●●●●●●●●"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.forgotPass}>
          <a href="#">نسيت كلمة المرور؟</a>
        </div>
        <div className={styles.btn}>
          <div className={styles.inner}></div>
          <button type="submit">تسجيل الدخول</button>
        </div>
        {error && (
          <p style={{ color: "#ED5565", fontSize: "13px" }}>
            البريد الإلكتروني أو كلمة المرور خاطئة
          </p>
        )}
       
      </form>
    </div>
  );
}

export default Login;
