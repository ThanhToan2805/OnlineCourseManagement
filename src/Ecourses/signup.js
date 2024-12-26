import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./header.js";
import Footer from "./footer.js";

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Mật khẩu không khớp');
            return;
        }

        const userData = {
            hond: firstName,
            tennd: lastName,
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/signup', userData);
            if (response.data.success) {
                alert('Đăng ký thành công');
                navigate('/login');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Xảy ra lỗi trong quá trình đăng ký.');
        }
    };

    return (
        <>
            <Header />

            <div className="container-fluid page-header" style={{marginBottom: "90px"}}>
                <div className="container">
                    <div className="d-flex flex-column justify-content-center" style={{minHeight: "300px"}}>
                        <h3 className="display-4 text-white text-uppercase">Đăng ký</h3>
                        <div className="d-inline-flex text-white">
                            <p className="m-0 text-uppercase"><a className="text-white" href="/login">Đăng nhập</a></p>
                            <i className="fa fa-angle-double-right pt-1 px-3"></i>
                            <p className="m-0 text-uppercase">Đăng ký</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid bg-registration py-5" style={{ margin: "90px 0" }}>
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-7 mb-5 mb-lg-0">
                            <div className="mb-4">
                                <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: "5px" }}>
                                    Bạn đang cần khóa học nào ?
                                </h5>
                                <h1 className="text-white">Giảm 30% cho sinh viên mới</h1>
                            </div>
                            <p className="text-white">
                                Hãy gia nhập ngay các khóa học của chúng tôi để nâng cao kỹ năng và kiến thức. Chúng tôi cung cấp nhiều
                                chương trình học chất lượng, phù hợp với mọi đối tượng từ người mới bắt đầu cho đến những người đã có kinh
                                nghiệm. Đừng bỏ lỡ cơ hội học hỏi từ những chuyên gia trong ngành!
                            </p>
                            <ul className="list-inline text-white m-0">
                                <li className="py-2">
                                    <i className="fa fa-check text-primary mr-3"></i>Cung cấp kiến thức chuyên sâu
                                </li>
                                <li className="py-2">
                                    <i className="fa fa-check text-primary mr-3"></i>Hỗ trợ học tập 24/7
                                </li>
                                <li className="py-2">
                                    <i className="fa fa-check text-primary mr-3"></i>Cập nhật tài liệu thường xuyên.
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-5">
                            <div className="card border-0">
                                <div className="card-header bg-light text-center p-4">
                                    <h1 className="m-0">Đăng ký ngay</h1>
                                </div>
                                <div className="card-body rounded-bottom bg-primary p-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control border-0 p-4"
                                                placeholder="Họ"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control border-0 p-4"
                                                placeholder="Tên"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                required
                                            />
                                        </div>
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
                                        <div className="form-group position-relative">
                                            <input
                                                id="confirmPassword"
                                                type="password"
                                                className="form-control border-0 p-4"
                                                placeholder="Nhập lại mật khẩu"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                            <i 
                                                id="toggleConfirmPassword" 
                                                className="fa fa-eye position-absolute" 
                                                style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                                onClick={() => {
                                                    const confirmPasswordField = document.getElementById("confirmPassword");
                                                    const eyeIcon = document.getElementById("toggleConfirmPassword");
                                                    if (confirmPasswordField.type === "password") {
                                                        confirmPasswordField.type = "text";
                                                        eyeIcon.classList.remove("fa-eye");
                                                        eyeIcon.classList.add("fa-eye-slash");
                                                    } else {
                                                        confirmPasswordField.type = "password";
                                                        eyeIcon.classList.remove("fa-eye-slash");
                                                        eyeIcon.classList.add("fa-eye");
                                                    }
                                                }}
                                            ></i>
                                        </div>
                                        <div>
                                            <button className="btn btn-dark btn-block border-0 py-3" type="submit">
                                                Đăng ký ngay
                                            </button>
                                        </div>
                                    </form>
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

export default SignUp;