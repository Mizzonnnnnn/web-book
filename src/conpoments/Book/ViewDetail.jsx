import { useLocation } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import './Book.scss'
import { DotChartOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Input, message, Popover, Rate, Skeleton } from "antd";
import { useEffect, useState } from "react";
import ModalPicture from "./ModalPicture";
import { useDispatch } from "react-redux";
import { doGetDetailBook } from "../../redux/order/orderSilce";


const ViewDetail = (props) => {
    const location = useLocation();
    const [image, setImage] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowImage, setIsShowImage] = useState(false);
    const data = location.state;
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            setIsLoading(true);
            handleImage()
            setIsLoading(false)
        }
    }, [data])

    useEffect(() => {
        setSubtotal(price * quantity)
    }, [quantity])

    useEffect(() => {
        setPrice(handleMoney(data.price, data.discount));
    }, [])

    const handleImage = () => {
        if (data.thumbnail) {
            setImage([{
                original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${data.thumbnail}`,
                thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${data.thumbnail}`,
            }])
        }

        if (data.slider.length > 0) {
            data.slider.map((item) => {
                setImage(pre => [
                    ...pre,
                    {
                        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    }])
            })
        }
    }

    const handleConvert = (data) => {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return formatter.format(data);;
    }

    const handleMoney = (price, discount) => {
        const discountedPrice = price - price * (discount / 100);
        return Math.round(discountedPrice * 100) / 100;
    }

    const [price, setPrice] = useState(handleMoney(data.price, data.discount));
    const [subtotal, setSubtotal] = useState(price * quantity);

    const content = (
        <div>
            <p>Giá gốc: {handleConvert(data.price)}</p>
            <p>Giá bán: {handleConvert(handleMoney(data.price, data.discount))}</p>
        </div>
    );

    const handlePlus = async () => {
        if (data.quantity > quantity) {
            setQuantity(quantity => quantity + 1);
        }
    }

    const handleMinus = () => {
        if (quantity > 0) {
            setQuantity(quantity => quantity - 1);
        }
    }

    const handleInputMoney = (e) => {
        const values = Number(e.target.value);
        if (+values < 0) {
            setQuantity(1);
        }
        if (+values <= data.quantity) {
            setQuantity(values);
        } else if (values > data.quantity) {
            setQuantity(data.quantity)
        }

    }

    const handleShowImage = () => {
        setIsShowImage(true)
    }

    const customs = (item) => {
        return (
            <div onClick={handleShowImage}
                style={{
                    border: '1px solid #ded4d4',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center "
                }}>
                <img src={item.thumbnail}
                    alt={item.alt || 'thumbnail'} className="image" />
            </div>
        )
    }

    const handleAddToCart = (quantity, book) => {
        dispatch(doGetDetailBook({ quantity, "_id": book._id, "detail": { book } }))
    }

    return (
        <div className="book-container">
            <div className="left" >
                {
                    isLoading === false ?
                        <div style={{
                            width: '100%',
                        }}>
                            <ImageGallery
                                items={image}
                                showPlayButton={false}
                                showFullscreenButton={false}
                                renderLeftNav={() => null}
                                renderRightNav={() => null}
                                renderItem={customs}
                            />
                        </div>
                        :
                        <div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingBottom: "20px"
                            }}>
                                <Skeleton.Node active
                                    style={{
                                        width: "250px",
                                        height: "294px"
                                    }}>
                                    <DotChartOutlined
                                        style={{
                                            fontSize: 40,
                                            color: '#bfbfbf',
                                        }}
                                    />
                                </Skeleton.Node>
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "8px"
                            }}>
                                <div>
                                    {data.thumbnail &&
                                        <Skeleton.Image active />
                                    }
                                </div>
                                <div style={{
                                    display: "flex",
                                    gap: "8px"
                                }}>
                                    {data.slider.length > 0 &&
                                        data.slider.map((index) => (
                                            <Skeleton.Image active key={index} />
                                        ))}
                                </div>
                            </div>
                        </div>
                }
            </div>

            <div className="center">
                <div className="center1">
                    {
                        isLoading === false ?
                            <>
                                <div className="brand">
                                    <img src="/images/30.png" alt="" className="image1" />
                                    <img src="/images/real.png" alt="" className="image2" />
                                    <span>
                                        Tác giả:<span style={{ color: "rgb(13, 92, 182)", lineHeight: "20px" }}> {data.author}</span>
                                    </span>
                                </div>

                                <div>
                                    <span className="title">
                                        {data.mainText}
                                    </span>
                                </div>

                                <div style={{
                                    display: "flex",
                                    gap: "5px",
                                    alignItems: "center"
                                }}>
                                    <div>
                                        <span><Rate disabled defaultValue={2} style={{
                                            fontSize: '14px'
                                        }} /></span>
                                    </div>
                                    <div className='line'></div>
                                    <div>
                                        <span className="sold">Đã bán {data.sold}</span>
                                    </div>
                                </div>

                                <div className="money">
                                    <div>
                                        <span className="price">
                                            {handleConvert(handleMoney(data.price, data.discount))}
                                        </span>
                                    </div>

                                    <div>
                                        <span className="sale">
                                            (-{data.discount}%)
                                        </span>
                                    </div>

                                    <div >
                                        <img src="/images/titket.png" alt="" className="titket" />
                                    </div>

                                    <div>
                                        <span className="price-real">
                                            {handleConvert(data.price)}
                                        </span>
                                    </div>

                                    <div>
                                        <span>
                                            <Popover placement="bottomLeft" content={content} title="Chi tiết giá">
                                                <InfoCircleOutlined />
                                            </Popover>
                                        </span>
                                    </div>
                                </div>

                                <div className="teXt">
                                    <span className="text">
                                        Giá sau áp dụng mã khuyến mãi
                                    </span>
                                </div>
                                <div className="foote-c1">
                                    <div>
                                        <img src="/images/titket.png" alt="" className="titket" />
                                    </div>
                                    <div>
                                        <span>
                                            Giảm 5.000₫
                                        </span>
                                        <span className="text">
                                            từ mã khuyến mãi của nhà bán
                                        </span>
                                    </div>
                                </div>
                            </>
                            :
                            <Skeleton
                                active
                                title={{ width: '60%' }}
                                paragraph={{
                                    rows: 5,
                                    width: ['80%', '30%', '55%', '45%', '59%'],
                                }}
                                style={{ padding: "10px" }}
                            />
                    }
                </div>
            </div>


            <div className="right">
                {
                    isLoading === false ?
                        <div>
                            <div >
                                <span style={{
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "150%",
                                    margin: "0px",
                                }}>Số lượng</span>
                            </div>
                            <div style={{
                                display: "flex",
                                gap: '5px',
                                paddingTop: "10px",
                                paddingBottom: "20px",
                                alignItems: "center"
                            }}>
                                {quantity === 0 || quantity === 1 ?
                                    <div>
                                        <Button disabled>-</Button>
                                    </div> :
                                    <div>
                                        <Button onClick={handleMinus}>-</Button>
                                    </div>
                                }

                                <div>
                                    <div>
                                        <Input
                                            onChange={(event) => handleInputMoney(event)}
                                            min={1}
                                            value={quantity}
                                            style={{
                                                width: "60px",
                                                textAlign: "center"  // Canh giữa số
                                            }} />
                                    </div>
                                </div>
                                <div>
                                    <Button onClick={handlePlus}>+</Button>
                                </div>

                                <div>
                                    <span style={{
                                        fontSize: "14px",
                                        color: "rgb(120, 120, 120)",
                                        lineHeight: '24px',
                                        paddingLeft: "15px",
                                        whiteSpace: "nowrap"
                                    }}>
                                        {data.quantity} sản phẩm có sẵn
                                    </span>
                                </div>
                            </div>
                            {
                                quantity >= data.quantity &&
                                <div style={{
                                    marginBottom: "10px",
                                    marginTop: "-15px",
                                }}>
                                    <span style={{
                                        fontSize: "12px",
                                        color: "rgb(255, 66, 78)",
                                        whiteSpace: "nowrap"
                                    }}>
                                        Số lượng bạn chọn đã đạt mức tối đa của sản phẩm
                                    </span>
                                </div>
                            }
                            <div>
                                <div style={{
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "150%",
                                }}>
                                    <span>Tạm Tính</span>
                                </div>
                                <div style={{
                                    fontSize: "24px",
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    lineHeight: "150%",
                                    paddingTop: "14px",
                                    paddingBottom: "15px"
                                }}>
                                    {handleConvert(subtotal)}
                                </div>
                            </div>

                            <div className="button">
                                <div>
                                    <Button className="button-buy">Mua ngay</Button>
                                </div>
                                <div >
                                    <Button className="button-add" onClick={() => handleAddToCart(quantity, data)}>Thêm vào giỏ</Button>
                                </div>
                            </div>
                        </div> :
                        <div>
                            <div>

                            </div>
                            <Skeleton
                                active
                                title={{ width: '60%' }}
                                paragraph={{
                                    rows: 4,
                                    width: ['20%', '30%', "50%", '32%'],
                                }}
                                style={{ padding: "10px 0px 5px 0px" }}
                            />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px"
                            }}>
                                <Skeleton.Button active size={"small"} style={{ height: '20px', width: '320px' }} />
                                <Skeleton.Button active size={"small"} style={{ height: '20px', width: '320px' }} />
                            </div>
                        </div>
                }
            </div>
            <ModalPicture
                show={isShowImage}
                setShow={setIsShowImage}
                data={image}
                title={data.mainText}
            />
        </div >
    )
}

export default ViewDetail;