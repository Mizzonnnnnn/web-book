import { useLocation } from "react-router-dom";

const BookPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams?.get("id");
    return (
        <>
            book page
        </>
    )
}

export default BookPage;