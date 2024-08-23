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
import { useEffect } from "react";
import { callFetchAccount } from "./service/api.js";
import { useDispatch } from "react-redux";
import { getAccountAction } from "./redux/account/accountSilce.js";
const Layout = () => {
  return (
    <div className="layout-app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}


function App() {
  const dispatch = useDispatch()
  const getAccount = async () => {
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(getAccountAction(res.data))
    }
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
    { path: "/register", element: <RegisterPage />, }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
