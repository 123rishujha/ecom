import Styles from "./SingUp.module.css";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (data) => {
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/register`,
        data
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    console.log("type", typeof mobile);
    let payload = { username, email, number: Number(mobile), password };
    console.log(payload);
    handleLogin(payload);
  };

  return (
    <div className={Styles.SignUp_holder}>
      <h3>SignUp</h3>
      <form className={Styles.singup_form} onSubmit={handlSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Mobile</label>
        <input
          type="number"
          value={mobile}
          placeholder="please enter you contact no."
          onChange={(e) => setMobile(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          placeholder="create password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" className={Styles.submit_btn} value="submit" />
      </form>
    </div>
  );
};

export default SignUp;
