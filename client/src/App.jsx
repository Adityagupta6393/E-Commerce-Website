import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Home from "./pages/shop/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProductDetails from "./pages/shop/ProductDetails";
import Cart from "./pages/shop/Cart";
import Checkout from "./pages/shop/Checkout";
import MyOrders from "./pages/shop/MyOrders";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import Categories from "./pages/admin/Categories";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import Profile from "./pages/Profile";
import Wishlist from "./pages/shop/Wishlist";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/my-orders"
            element={<MyOrders />}
          />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />

            <Route
              path="products"
              element={<Products />}
            />

            <Route
              path="products/add"
              element={<AddProduct />}
            />

            <Route
              path="categories"
              element={<Categories />}
            />

            <Route
              path="orders"
              element={<Orders />}
            />

            <Route
              path="users"
              element={<Users />}
            />

          </Route>

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;