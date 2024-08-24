import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();
    console.error(error);

    return (
        <div id="error-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", flexDirection: "column", height: "100vh", }}>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.onmessage}</i>
            </p>
            <p onClick={() => navigate("/")}>Home</p>
        </div>
    );
}