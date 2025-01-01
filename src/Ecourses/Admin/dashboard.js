import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Bảng điều khiển</h1>

            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow-sm mb-4">
                        <Link to="/admin/users" className="text-decoration-none text-dark">
                            <div className="card-header bg-primary text-white text-center">Người dùng</div>
                        </Link>
                        <div className="card-body text-center">
                            <h5 className="card-title">Quản lý người dùng</h5>
                            <p className="card-text">Xem, chỉnh sửa hoặc xóa người dùng khỏi hệ thống.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm mb-4">
                        <Link to="/admin/students" className="text-decoration-none text-dark">
                            <div className="card-header bg-success text-white text-center">Sinh viên</div>
                        </Link>
                        <div className="card-body text-center">
                            <h5 className="card-title">Quản lý sinh viên</h5>
                            <p className="card-text">Xem, chỉnh sửa hoặc xóa sinh viên khỏi hệ thống.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm mb-4">
                        <Link to="/admin/teachers" className="text-decoration-none text-dark">
                            <div className="card-header bg-info text-white text-center">Giảng viên</div>
                        </Link>
                        <div className="card-body text-center">
                            <h5 className="card-title">Quản lý giảng viên</h5>
                            <p className="card-text">Xem, chỉnh sửa hoặc xóa giảng viên khỏi hệ thống.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm mb-4">
                        <Link to="/admin/courses" className="text-decoration-none text-dark">
                            <div className="card-header bg-warning text-white text-center">Khóa học</div>
                        </Link>
                        <div className="card-body text-center">
                            <h5 className="card-title">Quản lý khóa học</h5>
                            <p className="card-text">Thêm, chỉnh sửa hoặc xóa các khóa học.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm mb-4">
                        <Link to="/admin/subjects" className="text-decoration-none text-dark">
                            <div className="card-header bg-danger text-white text-center">Chủ đề</div>
                        </Link>
                        <div className="card-body text-center">
                            <h5 className="card-title">Quản lý chủ đề</h5>
                            <p className="card-text">Thêm, chỉnh sửa hoặc xóa các chủ đề.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm mb-4">
                        <Link to="/admin/registrations" className="text-decoration-none text-dark">
                            <div className="card-header bg-secondary text-white text-center">Đăng ký</div>
                        </Link>
                        <div className="card-body text-center">
                            <h5 className="card-title">Xem đăng ký</h5>
                            <p className="card-text">Theo dõi và quản lý đăng ký khóa học của sinh viên.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;