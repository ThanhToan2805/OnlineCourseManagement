import React, { useState, useEffect } from 'react';
import Header from '../Main/header.js';
import Footer from '../Main/footer.js';

const CloudComp = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Dữ liệu tĩnh mô phỏng các khóa học đã đăng ký
        const staticCourses = [
            {
                tenkh: 'Kiến trúc và triển khai điện toán đám mây',
                anh: 'course-8.jpg',
                ngaybatdau: '2025-01-03',
                ngayketthuc: '2025-02-28'
            },
        ];

        // Gán dữ liệu tĩnh vào state
        setCourses(staticCourses);
    }, []);

    return (
        <>
            <Header />

            <div className="container-fluid page-header" style={{marginBottom: "90px"}}>
                <div className="container">
                    <div className="d-flex flex-column justify-content-center" style={{minHeight: "300px"}}>
                        <h3 className="display-4 text-white text-uppercase">Điện toán đám mây</h3>
                        <div className="d-inline-flex text-white">
                            <p className="m-0 text-uppercase"><a className="text-white" href="/">Trang chủ</a></p>
                            <i className="fa fa-angle-double-right pt-1 px-3"></i>
                            <p className="m-0 text-uppercase">Điện toán đám mây</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="text-center mb-5">
                    <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>Chủ đề</h5>
                        <h1>Điện toán đám mây</h1>
                    </div>
                    <div className="row">
                        {courses.map((course, index) => (
                            <div key={index} className="col-lg-4 col-md-6 mb-4">
                                <div className="rounded overflow-hidden mb-2">
                                    <img className="img-fluid" src={`/img/${course.anh}`} alt={course.tenkh} />
                                    <div className="p-4" style={{ backgroundColor: '#f5f5f5' }}>
                                    <div className="d-flex justify-content-between mb-3">
                                        <small className="m-0">
                                            <i className="fa fa-calendar-days text-primary mr-2"></i>
                                            {new Date(course.ngaybatdau).toLocaleDateString('vi-VN')}
                                        </small>
                                        <small className="m-0">
                                            <i className="far fa-calendar-days text-primary mr-2"></i>
                                            {new Date(course.ngayketthuc).toLocaleDateString('vi-VN')}
                                        </small>
                                        </div>
                                        <a className="h5 text-decoration-none" href="">{course.tenkh}</a>
                                        <div className="border-top mt-4 pt-4">
                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-danger">
                                                Hủy
                                            </button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default CloudComp;