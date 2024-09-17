import { Empty, Flex, Form, Space } from "antd";
import './Home.scss'
import { Tabs, Button, Checkbox, Col, InputNumber, Rate, Row, Card, Pagination } from 'antd';
import { callPaginationBook } from "../../service/api";
import { useEffect, useState } from "react";
import { FilterOutlined, LineOutlined, SyncOutlined } from '@ant-design/icons'
import { callBookCategory } from "../../service/api";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const [form] = Form.useForm();
    const [cateGory, setCateGory] = useState([]);
    const [data, setData] = useState([])
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortQuery, setSortQuery] = useState("sort=-sold")
    const [meta, setMeta] = useState("");
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();
    const items = [
        {
            key: 'sort=-sold',
            label: 'Phổ biến',
            children: <></>
        },
        {
            key: 'sort=-update',
            label: 'Hàng mới',
            children: <></>,
        },
        {
            key: 'sort=price',
            label: 'Giá thấp đến cao',
            children: <></>,
        },
        {
            key: 'sort=-price',
            label: 'Giá cao đến thấp',
            children: <></>,
        },
    ];

    useEffect(() => {
        fetchBook()
    }, [currentPage, pageSize, filter, sortQuery,])

    useEffect(() => {
        const fetchBookk = async () => {
            const res = await callBookCategory();
            if (res && res.data) {
                const d = res.data.map((item) => {
                    return {
                        label: item, value: item
                    }
                })
                setCateGory(d)
            }
        }
        fetchBookk()
    }, [])

    const fetchBook = async () => {
        let query = `current=${currentPage}&pageSize=${pageSize}`;

        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }

        const res = await callPaginationBook(query);

        if (res && res.data) {
            setData(res.data.result);
            setMeta(res.data.meta);
        }
    }

    // right
    const onShowSizeChange = (current, pageSize) => {
        setCurrentPage(current)
        setPageSize(pageSize)
    };

    const handlePrice = (data) => {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return formatter.format(data);;
    }

    //left
    const onFinish = (values) => {
        if (values.range.from >= 0 && values?.range?.to >= 0) {
            let query = `&price>=${values?.range.from}&price<=${values?.range?.to}`;
            setFilter(query)
        }
    };

    const handleRefesh = () => {
        setCurrentPage(1)
        setFilterCategory("")
        setFilter("")
        form.resetFields()
    }

    const handleChangeFIlter = (checkedValues) => {
        if (checkedValues.categories) {
            setFilter(`category=${checkedValues.categories}`)
        } else {
            setFilter('')
        }
    }
    const toSlug = (str) => {
        str = str.toLowerCase();

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // Xóa ký tự - liên tiếp
        str = str.replace(/-+/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }
    const handleRedirectBook = (book) => {
        const bookId = toSlug(book.mainText);
        navigate(`/book/${bookId}?id=${book._id}`)
    }
    return (
        <div className="home-container" >
            <div className="filter-section">
                <Form
                    form={form}
                    onFinish={onFinish}
                    onValuesChange={(checkedValues, values) => handleChangeFIlter(checkedValues, values)}
                >
                    <div className="header">
                        <div className='header-1'>
                            <FilterOutlined className='icon' /> BỘ LỌC TÌM KIẾM
                        </div>
                        <div className='header-2'>
                            <SyncOutlined onClick={handleRefesh} />
                        </div>
                    </div>
                    <div>
                        <hr className='line' />
                    </div>
                    <div className='catalogue'>
                        <div className='title'>
                            Khám phá theo danh mục
                        </div>
                        <div className='checkBox'>
                            <Form.Item name="categories">
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Row style={{ gap: 10 }}>
                                        {
                                            cateGory && cateGory.length > 0 &&
                                            cateGory.map((item, index) => {
                                                return (
                                                    <Col span={24} key={index}>
                                                        <Checkbox value={item.value}>{item.label}</Checkbox>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                        </div>
                    </div>

                    <div>
                        <hr className='line' />
                    </div>

                    <div className='price-range'>
                        <div className='title'>
                            Khoảng Giá
                        </div>
                        <div className='input'>
                            <Form.Item name={["range", 'from']}>
                                <InputNumber
                                    name="from"
                                    placeholder="₫ TỪ"
                                    min={0}
                                    style={{ width: "auto" }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Form.Item>
                            <Form.Item>
                                <LineOutlined />
                            </Form.Item>
                            <Form.Item name={["range", 'to']}>
                                <InputNumber
                                    name="to"
                                    placeholder="₫ ĐẾN"
                                    min={0}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    style={{ width: "auto" }}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Button className='submit' htmlType="submit">ÁP DỤNG</Button>
                        </div>
                    </div>

                    <div>
                        <hr className='line' />
                    </div>

                    <div className='rate'>
                        <div className='title'>Đánh Giá</div>
                        <div className='rate1'>
                            <Flex gap="middle" vertical>
                                <Flex gap="middle"> <Rate value={3} /><span>Trở lên</span></Flex>
                                <Flex gap="middle"> <Rate value={3} /><span>Trở lên</span></Flex>
                                <Flex gap="middle"> <Rate value={3} /><span>Trở lên</span></Flex>
                                <Flex gap="middle"> <Rate value={3} /><span>Trở lên</span></Flex>
                                <Flex gap="middle"> <Rate value={3} /><span>Trở lên</span></Flex>
                            </Flex>
                        </div>
                    </div>
                </Form>
            </div>
            <div className="main-section">
                <div>
                    <Tabs defaultActiveKey="1" items={items} onChange={(value) => setSortQuery(value)} />
                </div>
                <div>
                    <Row
                        style={{ gap: 10 }}
                        className='card-main'
                    >
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => (
                                    <Col key={item.id || index} >
                                        <Card
                                            key={index}
                                            hoverable
                                            style={{
                                                paddingTop: "5px",
                                                width: 229,
                                                height: 438,
                                            }}
                                            cover={
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                    <img
                                                        alt="example"
                                                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`}
                                                        style={{ width: 220 }}
                                                    />
                                                </div>
                                            }
                                            onClick={() => handleRedirectBook(item)}
                                        >
                                            <div className='priceSale-book'>
                                                <div className='price'>{handlePrice(item.price)}</div>
                                                <div className='sale'>(-27%)</div>
                                            </div>

                                            <div className='author-book'>
                                                <span className='clamp-text'>{item.author}</span>
                                            </div>
                                            <div className='title-book' >
                                                <span className='clamp-text'>{item.mainText}</span>
                                            </div>
                                            <div className='rate-sold'>
                                                <div className='rate'><Rate disabled defaultValue={2.5} style={{ fontSize: "12px" }} /></div>
                                                <div className='line'></div>
                                                <div className='sold'>Đã bán {item.sold}</div>
                                            </div>

                                            <hr style={{ backgroundColor: "rgb(229 237 232)", height: "1px", border: "none" }} />

                                            <div className='cuoi'>
                                                <div className='icon'>
                                                    <img src="./images/now.png" alt="" style={{ width: "32px", height: "16px" }} />
                                                </div>
                                                <div className='text'>
                                                    Giao siêu tốc 2h
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                )) : (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "100%",
                                            minHeight: "100vh"
                                        }}>
                                        <Empty />
                                    </div>
                                )
                        }
                    </Row>
                    {
                        data.length > 0 &&
                        <div style={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: 'center',
                            padding: "19px 10px 10px 10px"
                        }}>
                            <Pagination
                                onShowSizeChange={onShowSizeChange}
                                onChange={onShowSizeChange}
                                total={meta.total}
                                pageSize={meta.pageSize}
                                current={currentPage}
                            />
                        </div>
                    }

                </div >
            </div>
        </div>
    )
}

export default Index;