import { useSelector, useDispatch } from "react-redux";
import AuthTab from "../AuthTab/AuthTab";

const Profile = () => {
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const token = useSelector((store) => store.authReducer.token);
  console.log("isAuth", isAuth, "token", token);

  return <div>{isAuth ? <h1>Profile</h1> : <AuthTab />}</div>;
};

export default Profile;
