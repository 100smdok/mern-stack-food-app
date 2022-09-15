import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import Signin from "./components/common/Signin"
import Buyer from "./components/users/Buyer";
import Vendor from "./components/users/Vendor";
import EditVendor from "./components/users/EditVendor";
import EditBuyer from "./components/users/EditBuyer";
import AddMoney from "./components/users/AddMoney";
import AddFood from "./components/users/AddFood";
import FoodMenu from "./components/users/FoodMenu";
import EditFood from "./components/users/EditFood";
import PlaceOrder from "./components/users/PlaceOrder";
import BuyerOrder from "./components/users/BuyerOrders";
import Statistics from "./components/users/Statistics";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="signin" element={<Signin />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="buyer" element={<Buyer />} />
          <Route path="vendor" element={<Vendor />} />
          <Route path="editvendor" element={<EditVendor />} />
          <Route path="editbuyer" element={<EditBuyer />} />
          <Route path="addmoney" element={<AddMoney />} />
          <Route path="addfood" element={<AddFood />} />
          <Route path="foodmenu" element={<FoodMenu />} />
          <Route path="editfood" element={<EditFood />} />
          <Route path="placeorder" element={<PlaceOrder />} />
          <Route path="buyerorder" element={<BuyerOrder />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
