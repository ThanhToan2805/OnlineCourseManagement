import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './header.js';
import Footer from './footer.js';

const RegisteredCourses = ({ idSv }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                console.log('ID Sinh viên:', idSv);  // Kiểm tra xem idSv có đúng không

                const response = await axios.get(`http://localhost:5000/api/dangky_khoahoc/${idSv}`);

                if (response.status === 200) {
                    setCourses(response.data); // Dữ liệu trả về từ server
                } else {
                    throw new Error('Không thể lấy dữ liệu khóa học.');
                }
            } catch (error) {
                console.error('Lỗi khi lấy khóa học:', error);
            }
        };

        if (idSv) {  // Chỉ gọi API nếu idSv có giá trị
            fetchCourses();
        }
    }, [idSv]);

    return (
        <>
            <Header />

            <div className="container-fluid page-header" style={{marginBottom: "90px"}}>
                <div className="container">
                    <div className="d-flex flex-column justify-content-center" style={{minHeight: "300px"}}>
                        <h3 className="display-4 text-white text-uppercase">Khóa học đã đăng ký</h3>
                        <div className="d-inline-flex text-white">
                            <p className="m-0 text-uppercase"><a className="text-white" href="/">Trang chủ</a></p>
                            <i className="fa fa-angle-double-right pt-1 px-3"></i>
                            <p className="m-0 text-uppercase">Khóa học đã đăng ký</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3>Danh sách khóa học đã đăng ký</h3>
                <ul>
                    {courses.map((course, index) => (
                        <li key={index}>
                            <h4>{course.tenkh}</h4>
                            <img src={`/img/${course.anh}`} alt={course.tenkh} />
                        </li>
                    ))}
                </ul>
            </div>

            <Footer />
        </>
    );
};

export default RegisteredCourses;
