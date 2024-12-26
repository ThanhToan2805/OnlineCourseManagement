import React, {useEffect, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Topbar = () => {
    return (
        <div className="container-fluid d-none d-lg-block">
            <div className="row align-items-center py-4 px-xl-5">
                <div className="col-lg-3">
                    <a href="/" className="text-decoration-none">
                        <h1 className="m-0"><span className="text-primary">E</span>COURSES</h1>
                    </a>
                </div>
                <div className="col-lg-3 text-right">
                    <div className="d-inline-flex align-items-center">
                        <i className="fa fa-2x fa-map-marker-alt text-primary mr-3"></i>
                        <div className="text-left">
                            <h6 className="font-weight-semi-bold mb-1">Văn phòng</h6>
                            <small>123 Phan Văn Trị, Quận Gò Vấp, thành phố Hồ Chí Minh</small>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 text-right">
                    <div className="d-inline-flex align-items-center">
                        <i className="fa fa-2x fa-envelope text-primary mr-3"></i>
                        <div className="text-left">
                            <h6 className="font-weight-semi-bold mb-1">Emaill</h6>
                            <small>ecoursesonl@gmailgmail.com</small>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 text-right">
                    <div className="d-inline-flex align-items-center">
                        <i className="fa fa-2x fa-phone text-primary mr-3"></i>
                        <div className="text-left">
                            <h6 className="font-weight-semi-bold mb-1">Liên hệ</h6>
                            <small>0915026830</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Navbar = () => {
    const [user, setUser] = useState(null); // Quản lý trạng thái người dùng
    const navigate = useNavigate();

    // Lấy thông tin người dùng từ localStorage khi component được render
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login'); // Điều hướng về trang đăng nhập sau khi đăng xuất
    };

    const userName = user ? `${user.tennd}` : '';

    return (
        <div className="container-fluid">
            <div className="row border-top px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <a
                        className="d-flex align-items-center justify-content-between bg-secondary w-100 text-decoration-none"
                        data-toggle="collapse"
                        href="#navbar-vertical"
                        style={{ height: '67px', padding: '0 30px' }}
                    >
                        <h5 className="text-primary m-0">
                            <i className="fa fa-book-open mr-2"></i>Chủ đề
                        </h5>
                        <i className="fa fa-angle-down text-primary"></i>
                    </a>
                    <nav
                        className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light"
                        id="navbar-vertical"
                        style={{ width: 'calc(100% - 30px)', zIndex: 9 }}
                    >
                        <div className="navbar-nav w-100">
                            <a href="" className="nav-item nav-link">Phát triển ứng dụng web</a>
                            <a href="" className="nav-item nav-link">Kỹ thuật phần mềm</a>
                            <a href="" className="nav-item nav-link">Khoa học dữ liệu</a>
                            <a href="" className="nav-item nav-link">SEO</a>
                            <a href="" className="nav-item nav-link">Khoa học máy tính</a>
                            <a href="" className="nav-item nav-link">An toàn thông tin</a>
                            <a href="" className="nav-item nav-link">Điện toán đám mây</a>
                            <a href="" className="nav-item nav-link">Mạng máy tính</a>
                        </div>
                    </nav>
                </div>
                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                        <a href="/" className="text-decoration-none d-block d-lg-none">
                            <h1 className="m-0">
                                <span className="text-primary">E</span>COURSES
                            </h1>
                        </a>
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav py-0">
                                <NavLink to="/" className="nav-item nav-link" activeClassName="active">Trang chủ</NavLink>
                                <NavLink to="/about" className="nav-item nav-link" activeClassName="active">Giới thiệu</NavLink>
                                <NavLink to="/course" className="nav-item nav-link" activeClassName="active">Khóa học</NavLink>
                                <NavLink to="/teacher" className="nav-item nav-link" activeClassName="active">Giảng viên</NavLink>
                                <NavLink to="/contact" className="nav-item nav-link" activeClassName="active">Liên hệ</NavLink>
                            </div>

                            {/* Kiểm tra trạng thái người dùng để hiển thị nội dung động */}
                            {user ? (
                                <div className="ml-auto d-none d-lg-block">
                                    <div className="dropdown">
                                        <button className="btn btn-primary dropdown-toggle" type="button" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {`Xin chào, ${userName}`}
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="userDropdown">
                                            <NavLink to="/profile" className="dropdown-item">Thông tin cá nhân</NavLink>
                                            <button className="dropdown-item" onClick={handleLogout}>Đăng xuất</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <a className="btn btn-primary py-2 px-4 ml-auto d-none d-lg-block" href="/login">
                                    Tham gia ngay
                                </a>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

const Header = () => {
    return (
        <>
            <Topbar />
            <Navbar />
        </>
    );
};

export default Header;