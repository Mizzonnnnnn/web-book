import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotFound403 from "../NotFound/notFound403";

const RoleBaseRoute = (props) => {
    const role = useSelector(state => state.account.user.role);
    const isAdminRoute = window.location.pathname.startsWith("/admin")

    if (role === "ADMIN" && isAdminRoute || !isAdminRoute && (role === 'USER' || role === "ADMIN")) {
        return (<>{props.children}</>)
    } else {
        return (<NotFound403 />)

    }
}


const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);

    return (
        <>
            {isAuthenticated === true ?
                <>
                    <RoleBaseRoute>
                        {props.children}
                    </RoleBaseRoute>
                </>
                :
                <Navigate to='/login' replace />
            }
        </>
    )
}

export default ProtectedRoute;