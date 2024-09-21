import { Button, Image, Modal } from "antd";
import './ModalPicture.scss'
import ImageGallery from "react-image-gallery";

const ModalPicture = (props) => {
    const { show, setShow, data, title } = props;

    const handleCancel = () => {
        setShow(false);
    };

    const customRight = (item) => {
        return (
            <>
                <Image
                    src={item.thumbnail}
                    alt={item.alt || 'thumbnail'}
                    style={{ width: '600px', height: '600px', objectFit: 'cover', padding: "10px" }}
                />
            </>

        )
    }
    console.log(data)
    return (
        <>
            <Modal
                open={show}
                onCancel={handleCancel}
                width={1000}
                footer={null}
                style={{ top: 20 }}
                title={title}
            >
                <div style={{
                    display: "flex"
                }}>
                    <div className="picture-container">
                        <ImageGallery
                            items={data}
                            showFullscreenButton={null} 
                            showPlayButton={null}
                            renderItem={customRight}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ModalPicture
