import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignOutPage from "./pages/sign-inand-sing-up/sign-in-signup";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">SHOP PAGE</Link>
          </li>
          <li>
            <Link to="/signin">signin</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/signin" element={<SignInAndSignOutPage />} />
      </Routes>
    </>
  );
}

export default App;
