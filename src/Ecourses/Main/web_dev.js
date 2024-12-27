import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function WebDev() {
    const { macd } = useParams();  // Lấy tham số 'macd' từ URL
    console.log('macd:', macd);
    const [filteredCourses, setFilteredCourses] = useState([]);  // Khóa học đã lọc từ API

    useEffect(() => {
        if (macd) {
            fetchCoursesByTopic(macd);
        }
    }, [macd]);

    const fetchCoursesByTopic = (macd) => {
        console.log('Fetching courses for topic:', macd); // Kiểm tra giá trị macd
        fetch(`/api/khoahoc/${macd}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                console.log('API response:', data);
                if (Array.isArray(data)) {
                    setFilteredCourses(data); // Cập nhật khóa học theo chủ đề
                } else {
                    console.error('API did not return an array');
                    setFilteredCourses([]);  // Gán mảng rỗng nếu dữ liệu không phải mảng
                }
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
                setFilteredCourses([]); // Set to empty if error occurs
            });
    };

    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>Khóa học</h5>
                    <h1>Các khóa học phổ biến</h1>
                </div>

                {/* Course List */}
                <div className="row">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course, index) => (
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
                                        <a className="h5" href="">{course.tenkh}</a>
                                        <div className="border-top mt-4 pt-4">
                                            <div className="d-flex justify-content-center">
                                                <button className="btn btn-primary">
                                                    Đăng ký
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <p className="text-center">Không có khóa học nào cho chủ đề này.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WebDev;