import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom"
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from './pages/Auth/Login'
import Test from "./store/demo/Test";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./Components/Routes/Private";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./Components/Routes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Product from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import { useEffect } from "react";
import { setAuthData } from "./store/slices/auth";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const data = localStorage.getItem('auth')
    if (data) {
      const parseData = JSON.parse(data)
      dispatch(setAuthData({
        user: parseData.user,
        token: parseData.token
      }))
    }
  }, [])

  const authData = useSelector((state) => state.authS)
  axios.defaults.headers.common['Authorization'] = authData?.token
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/update-product/:slug" element={<UpdateProduct />} />
        <Route path="admin/products" element={<Product />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="admin/orders" element={<AdminOrders />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/*" element={<Pagenotfound />} />
      <Route path="/demo" element={<Test />} />
    </Routes>
  );
}

export default App;
