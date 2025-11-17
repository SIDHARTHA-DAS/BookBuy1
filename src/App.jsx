import Hero from "./components/Homes/Hero";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import Contacts from "./pages/Contacts";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Abouts from "./pages/Abouts";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import LogIn from "./pages/LogIn";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./Store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Setting from "./components/Profile/Setting";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

function App() {
  const dispatch = useDispatch();

  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Hero />} />
        <Route path="/about-us" element={<Abouts />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/contact-us" element={<Contacts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          {role === "user" ? (
            <Route index element={<Favourites />} />
          ) : (
            <Route index element={<AllOrders />} />
          )}
          {role === "admin" && (
            <Route path="/profile/add-book" element={<AddBook />} />
          )}
          <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
          <Route path="/profile/settings" element={<Setting />} />
        </Route>
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/updateBook/:id" element={<UpdateBook/>} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
