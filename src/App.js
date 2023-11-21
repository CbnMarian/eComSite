import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignOutPage from "./pages/sign-inand-sing-up/sign-in-signup";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      try {
        if (userAuth) {
          const unsubscribe = await createUserProfileDocument(
            userAuth,
            null,
            (userState) => {
              this.setState({ currentUser: userState.currentUser });
              console.log(this.state);
            }
          );

          this.setState({ unsubscribeFromSnapshot: unsubscribe });
        }

        this.setState({ currentUser: userAuth });
      } catch (error) {
        console.error("Error during onAuthStateChanged:", error.message);
      }
    });
  }

  componentWillUnmount() {
    // Unsubscribe from the snapshot when the component is unmounted
    if (this.state.unsubscribeFromSnapshot) {
      this.state.unsubscribeFromSnapshot();
    }
    this.unsubscribeFromAuth();
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

export default App;
