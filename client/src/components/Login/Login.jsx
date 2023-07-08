import Styles from "./Login.module.css";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/auth/auth.actions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = useSelector((store)=>store.authReducer.token);
  const dispatch = useDispatch();
  
  console.log(token);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className={Styles.login_holder}>
      <h3>Login</h3>
      <form className={Styles.login_form} onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
        />
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
        />
        <input type="submit" className={Styles.submit_btn} value="submit" />
      </form>
    </div>
  );
};

export default Login;
