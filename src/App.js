import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { setCurrentUser } from "./redux/user/user.acction";
import "./App.css";
import HomePage from "./pages/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignOutPage from "./pages/sign-inand-sing-up/sign-in-signup";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout/checkout";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { selectCurrentUser } from "./redux/user/user.selector";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      try {
        if (userAuth) {
          await createUserProfileDocument(userAuth, null, (updatedState) => {
            console.log("Updated State:", updatedState);
            setCurrentUser(updatedState.currentUser);
          });
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error during onAuthStateChanged:", error.message);
      }
    });
  }

  componentWillUnmount() {
    // Unsubscribe from the snapshot when the component is unmounted
    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
    }
  }

  render() {
    return (
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/signin"
            element={
              this.props.currentUser ? (
                <Navigate to="/" />
              ) : (
                <SignInAndSignOutPage />
              )
            }
          />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
