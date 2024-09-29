import {
  createBrowserRouter,
  RouterProvider, Outlet,
  useOutletContext
} from "react-router-dom";
import LoginPage from "./pages/login/index.jsx";
import ContactPage from "./pages/contact/index.jsx";
import Header from "./conpoments/Header/index.jsx";
import Footer from "./conpoments/Footer/index.jsx";
import RegisterPage from "./pages/register/index.jsx";
import Index from "./conpoments/Home/index.jsx";
import React, { useEffect, useState } from 'react';
import { callFetchAccount } from "./service/api.js";
import { useDispatch, useSelector } from "react-redux";
import { getAccountAction } from "./redux/account/accountSilce.js";
import Loading from "./conpoments/Loading/index.jsx";
import AdminPage from "./pages/admin/index.jsx";
import ProtectedRoute from "./conpoments/ProtectRoute/index.jsx";
import NotFound404 from "./conpoments/NotFound/NotFound404.jsx";
import LayoutAdmin from "./conpoments/Admin/index.jsx";
import ManageUser from "./pages/admin/user/index.jsx";
import BookPage from "./pages/book/index.jsx";
import ManageBookPage from "./pages/admin/book/index.jsx";
import './styles/global.scss'
import OrderPage from "./pages/order/index.jsx";
import HistoryPage from "./pages/history/index.jsx";
import ManageOrder from "./pages/admin/order/index.jsx";
const Layout = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (

    <div className="layout-app">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet context={[searchTerm, setSearchTerm]} />
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
        { path: "order", element: <OrderPage /> },
        { path: "history", element: <HistoryPage /> },
        { path: "book/:bookId", element: <BookPage /> },
      ],
    },

    { path: "/login", element: <LoginPage />, },
    { path: "/register", element: <RegisterPage />, },

    {
      path: "/admin",
      element:
        <ProtectedRoute>
          <LayoutAdmin />
        </ProtectedRoute>
      ,
      errorElement: <NotFound404 />,
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
        },
        {
          path: "book", element:
            <ProtectedRoute>
              <ManageBookPage />
            </ProtectedRoute>
        },
        {
          path: "user", element:
            <ProtectedRoute>
              <ManageUser />
            </ProtectedRoute>
        },
        {
          path: "order", element:
            <ProtectedRoute>
              <ManageOrder />
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
        || window.location.pathname.startsWith('/book')
        || window.location.pathname.startsWith('/order')
        ? <RouterProvider router={router} />
        : <Loading />}
    </>
    // <RouterProvider router={router} />
  )
}