import {
  createBrowserRouter,
  RouterProvider, Outlet
} from "react-router-dom";
import ErrorPage from './error-page.jsx'
import LoginPage from "./pages/login/index.jsx";
import ContactPage from "./pages/contact/index.jsx";
import Header from "./conpoments/Header/index.jsx";
import Footer from "./conpoments/Footer/index.jsx";
import BookPage from "./pages/book/index.jsx";
import RegisterPage from "./pages/register/index.jsx";
import Index from "./conpoments/Home/index.jsx";
import React, { useEffect } from 'react';
import { callFetchAccount } from "./service/api.js";
import { useDispatch, useSelector } from "react-redux";
import { getAccountAction } from "./redux/account/accountSilce.js";
import Loading from "./conpoments/Loading/index.jsx";
import AdminPage from "./pages/admin/index.jsx";
import ProtectedRoute from "./conpoments/ProtectRoute/index.jsx";

const Layout = () => {
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);

  return (
    <div className="layout-app">
      <Header />
      <Outlet />
      <Footer />
      {
        isAuthenticated === false &&
        <Loading />
      }
    </div>
  )
}


export default function App() {
  const dispatch = useDispatch();

  const getAccount = async () => {

    if (window.location.pathname === "/login" || window.location.pathname === "/admin") return;
    const res = await callFetchAccount();
    setTimeout(() => {
      if (res && res.data) {
        dispatch(getAccountAction(res.data));
      }
    }, 1000);
  }

  useEffect(() => {
    getAccount()
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Index /> },
        { path: "contact", element: <ContactPage /> },
        { path: "book", element: <BookPage /> },
      ],
    },
    { path: "/login", element: <LoginPage />, },
    { path: "/register", element: <RegisterPage />, },
    {
      path: "/admin",
      element:
        <ProtectedRoute >
          <Layout />
        </ProtectedRoute>,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <AdminPage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "book", element: <BookPage /> },
      ],
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}