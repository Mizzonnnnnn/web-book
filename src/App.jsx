import {
  createBrowserRouter,
  RouterProvider, Outlet
} from "react-router-dom";
import LoginPage from "./pages/login/index.jsx";
import ContactPage from "./pages/contact/index.jsx";
import Header from "./conpoments/Header/index.jsx";
import Footer from "./conpoments/Footer/index.jsx";
import RegisterPage from "./pages/register/index.jsx";
import Index from "./conpoments/Home/index.jsx";
import React, { useEffect } from 'react';
import { callFetchAccount } from "./service/api.js";
import { useDispatch, useSelector } from "react-redux";
import { getAccountAction } from "./redux/account/accountSilce.js";
import Loading from "./conpoments/Loading/index.jsx";
import AdminPage from "./pages/admin/index.jsx";
import ProtectedRoute from "./conpoments/ProtectRoute/index.jsx";
import NotFound404 from "./conpoments/NotFound/NotFound404.jsx";
import LayoutAdmin from "./conpoments/Admin/index.jsx";
import ManageUser from "./pages/admin/user/index.jsx";
import BookPage from "./pages/admin/book/index,.jsx";

const Layout = () => {
  return (
    <div className="layout-app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}


export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);

  const getAccount = async () => {

    if (window.location.pathname === "/login"
      || window.location.pathname === "/register") return;
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(getAccountAction(res.data));
    }
  }

  useEffect(() => {
    getAccount()
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound404 />,
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
        <ProtectedRoute>
          <LayoutAdmin />
        </ProtectedRoute>,
      errorElement: <NotFound404 />,
      children: [
        {
          index: true, element:
            // <ProtectedRoute>
            <AdminPage />
          // </ProtectedRoute>
        },
        { path: "contact", element: <ContactPage /> },
        { path: "book", element: <BookPage /> },
        {
          path: "user", element:

            <ProtectedRoute>
              <ManageUser />
            </ProtectedRoute>
        },

      ],
    },
  ])

  return (
    <>
      {isAuthenticated === true
        || window.location.pathname === '/login'
        || window.location.pathname === "/"
        || window.location.pathname === "/register"
        ? <RouterProvider router={router} />
        : <Loading />}
    </>

  )
}