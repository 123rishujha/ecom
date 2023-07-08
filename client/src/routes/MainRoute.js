import { Route,Routes } from "react-router-dom";
import Profile from "../components/Profile/Profile";
import HomePage from "../pages/HomePage";
 
const MainRoute = () =>{
    return(
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:productId" element={<h1>Product Details</h1>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<h1>Cart page</h1>} />
            </Routes>
        </div>
    )
}

export default MainRoute;

