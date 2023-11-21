import React from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.acction";
import "./App.css";
import HomePage from "./pages/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignOutPage from "./pages/sign-inand-sing-up/sign-in-signup";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      try {
        if (userAuth) {
          const userRef = await createUserProfileDocument(
            userAuth,
            null,
            (updatedState) => {
              console.log("Updated State:", updatedState);
              setCurrentUser(updatedState.currentUser);
            }
          );
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
          <Route path="/signin" element={<SignInAndSignOutPage />} />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
