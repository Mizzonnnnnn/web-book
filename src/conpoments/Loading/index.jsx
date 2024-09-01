import { ScaleLoader, SyncLoader } from "react-spinners";


const Loading = () => {
    return (
        <div style={{
            position: "fixed",
            bottom: "30px",
            right: "35px",
        }}>
            <SyncLoader
                speedMultiplier='1'
            // color="#b37373"
            />

        </div>

    )
}

export default Loading;