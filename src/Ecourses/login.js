import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header.js";
import Footer from "./footer.js";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });

            if (response.data.success) {
                // Lấy thông tin người dùng từ phản hồi API
                const userData = {
                    email: response.data.email,   // Lấy họ người dùng
                    tennd: response.data.tennd, // Lấy tên người dùng
                };

                // Đăng nhập thành công
                localStorage.setItem('user', JSON.stringify(userData));
                alert(response.data.message);
                navigate('/'); // Chuyển đến trang chủ hoặc trang khác sau khi đăng nhập
            }
        } catch (error) {
            if (error.response) {
                // Xử lý các trường hợp phản hồi từ server
                if (error.response.status === 404) {
                    // Email chưa được đăng ký, chuyển đến trang đăng ký
                    alert('Email chưa được đăng ký. Bạn có muốn đăng ký không ?');
                    navigate('/signup');
                } else if (error.response.status === 401) {
                    // Mật khẩu không chính xác
                    alert('Mật khẩu không chính xác.');
                } else {
                    // Lỗi khác
                    alert('Xảy ra lỗi trong quá trình đăng nhập.');
                }
            } else {
                console.error('Lỗi kết nối:', error);
                alert('Không thể kết nối với server.');
            }
        }
    };

    return (
        <>
            <Header />

            <div className="container-fluid page-header" style={{marginBottom: "90px"}}>
                <div className="container">
                    <div className="d-flex flex-column justify-content-center" style={{minHeight: "300px"}}>
                        <h3 className="display-4 text-white text-uppercase">Đăng nhập</h3>
                        <div className="d-inline-flex text-white">
                            <p className="m-0 text-uppercase"><a className="text-white" href="/">Trang chủ</a></p>
                            <i className="fa fa-angle-double-right pt-1 px-3"></i>
                            <p className="m-0 text-uppercase">Đăng nhập</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid bg-registration py-5" style={{ margin: "90px 0" }}>
                <div className="container py-5">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-5 col-md-8 col-sm-12 mx-auto">
                            <div className="card border-0">
                                <div className="card-header bg-light text-center p-4">
                                    <h1 className="m-0">Đăng nhập</h1>
                                </div>
                                <div className="card-body rounded-bottom bg-primary p-5">
                                    <form onSubmit={handleLogin}>
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                className="form-control border-0 p-4"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group position-relative">
                                            <input
                                                id="password"
                                                type="password"
                                                className="form-control border-0 p-4"
                                                placeholder="Mật khẩu"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <i 
                                                id="togglePassword" 
                                                className="fa fa-eye position-absolute" 
                                                style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                                onClick={() => {
                                                    const passwordField = document.getElementById("password");
                                                    const eyeIcon = document.getElementById("togglePassword");
                                                    if (passwordField.type === "password") {
                                                        passwordField.type = "text";
                                                        eyeIcon.classList.remove("fa-eye");
                                                        eyeIcon.classList.add("fa-eye-slash");
                                                    } else {
                                                        passwordField.type = "password";
                                                        eyeIcon.classList.remove("fa-eye-slash");
                                                        eyeIcon.classList.add("fa-eye");
                                                    }
                                                }}
                                            ></i>
                                        </div>
                                        <div>
                                            <button className="btn btn-dark btn-block border-0 py-3" type="submit">
                                                Đăng nhập
                                            </button>
                                        </div>
                                    </form>
                                    <div className="mt-3 text-center">
                                        <p className="m-0">Bạn chưa có tài khoản? <a href="/signup" className="text-decoration-none text-white">Đăng ký ngay</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </>
    );
};

export default Login;