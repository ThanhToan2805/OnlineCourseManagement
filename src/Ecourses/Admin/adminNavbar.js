import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
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
            // Tải lại trang
            window.location.reload(); 
        };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/dashboard">Bảng điều khiển</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/users">Người dùng</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/courses">Khóa học</Link>
                        </li>
                    </ul>
                </div>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </nav>
    );
};

export default AdminNavbar;