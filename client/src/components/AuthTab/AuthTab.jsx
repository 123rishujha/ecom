import Styles from "./AuthTab.module.css";
import { useState } from "react";

//components;
import Login from "../Login/Login";
import SignUp from "../SingUp/SignUp";

const AuthTab = () => {
  const [loginTab, setLoginTab] = useState(true);

  return (
    <div className={Styles.main_holder}>
      <div  className={Styles.btn_tab_holder}>
        <button style={{ flex: 1 }} onClick={() => setLoginTab(true)}>
          Login
        </button>
        <button style={{ flex: 1 }} onClick={() => setLoginTab(false)}>
          SignUp
        </button>
      </div>
      <div className={Styles.tab_component_holder}>
        {loginTab ? <Login /> : <SignUp />}
      </div>
    </div>
  );
};

export default AuthTab;
