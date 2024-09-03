import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './UserComponent/AuthComponent/Login';
import Register from './UserComponent/AuthComponent/Register';
import Home from './UserComponent/Home/Home';
import Dashboard from './UserComponent/Dashboard/Dashboard';
import AddFood from './AdminComponent/AddFood/AddFoods';
import AddCategory from './AdminComponent/AddCategory/AddCategory';
import AdminCategory from './AdminComponent/AdminCategory/AdminCategory';
import AdminFoods from './AdminComponent/AdminAllFoods/AdminFoods';
import GetContacts from './AdminComponent/ContactedUser/GetContacts';
import Users from './AdminComponent/Users/Users';
import Carts from './UserComponent/CartComponent/Carts';
import Orders from './AdminComponent/UserOrders/Orders';
import MyOrders from './UserComponent/MyOrders/MyOrders';
import OrderTrack from './UserComponent/Track/OrderTrack';
import Success from './UserComponent/PaymentSuccess/Success';
import PaymentFailed from './UserComponent/PaymentFailed/PaymentFailed';
import SingleProduct from './UserComponent/SingleProduct/SingleProduct';
import Ratings from './UserComponent/RatingsAndReviews/Ratings';
import AdminReviews from './AdminComponent/AdminReviews/AdminReviews';
import AdminPage from './AdminComponent/AdminDashboard/AdminPage';
import ProtectedRouter from './Router/ProtectedRouter';
import UserRouter from './Router/UserRouter';
import ForgetPassword from './UserComponent/AuthComponent/ForgetPassword';
import ResetPassword from './UserComponent/ResetPassword/ResetPassword';
// import TopRated from './UserComponent/TopRatedProducts/TopRated';

function App() {
  return (
    <>
      <Routes>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/forget-password" element = {<ForgetPassword/>}/>
        <Route path="/resetpassword/:token" element ={<ResetPassword/>}/>
        <Route path="/" element = {<Home/>}/>
        <Route path = "/dashboard" element={<UserRouter/>}>
          <Route path ="" element = {<Dashboard/>}/>
        </Route>
        <Route path = "/adminDashboard" element ={<ProtectedRouter/>}>
          <Route path = "" element = {<AdminPage/>}/>
        </Route>
        <Route path = "/addFood/:id" element ={<ProtectedRouter/>}>
          <Route path = "" element = {<AddFood/>}/>
        </Route>
        <Route path = "/addCategory" element ={<ProtectedRouter/>}>
          <Route path = "" element = {<AddCategory/>}/>
        </Route>
        <Route path = "/admincategory" element ={<ProtectedRouter/>}>
          <Route path = "" element = {<AdminCategory/>}/>
        </Route>
        <Route path = "/AdminFoods" element ={<ProtectedRouter/>}>
          <Route path = "" element = {<AdminFoods/>}/>
        </Route>
        <Route path = "/admincontacts" element ={<ProtectedRouter/>}>
          <Route path = "" element = {<GetContacts/>}/>
        </Route>
        <Route path = "/adminusers" element ={<ProtectedRouter/>}>
          <Route path = "" element = {<Users/>}/>
        </Route>
        <Route path = "/admin-orders" element ={<ProtectedRouter/>}>
          <Route path = "" element = {<Orders/>}/>
        </Route>
        <Route path = "/admin-reviews" element ={<ProtectedRouter/>}>
          <Route path = "" element = {<AdminReviews/>}/>
        </Route>
        <Route path = "/cart" element = {<Carts/>}/>
        <Route path = "/user-order" element = {<MyOrders/>}/>
        <Route path = "/order-track/:id" element ={<OrderTrack/>}/>
        <Route path = "/success" element = {<Success/>}/>
        <Route path = "/failed" element = {<PaymentFailed/>}/>
        <Route path = "/single-product/:id" element = {<SingleProduct/>}/>
        <Route path = "/ratings/:id" element = {<Ratings/>}/>
        {/* <Route path = "/top-rated" element = {<TopRated/>}/> */}
      </Routes>
    </>
  );
}

export default App;
