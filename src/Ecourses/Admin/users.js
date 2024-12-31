import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; // Số người dùng hiển thị trên mỗi trang

    // Lấy dữ liệu từ API khi component mount
    useEffect(() => {
        axios.get('http://localhost:5000/api/nguoidung')
            .then(response => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    // Hàm tìm kiếm người dùng
    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearch(searchValue);
        setFilteredUsers(users.filter(nguoidung =>
            nguoidung.hond.toLowerCase().includes(searchValue) ||
            nguoidung.tennd.toLowerCase().includes(searchValue) ||
            nguoidung.email.toLowerCase().includes(searchValue)
        ));
        setCurrentPage(1); // Reset lại trang hiện tại khi tìm kiếm
    };

    // Hàm xóa người dùng
    const handleDelete = (id) => {
        // Gọi API để xóa người dùng và cập nhật danh sách
        axios.delete(`http://localhost:5000/api/nguoidung/${id}`)
            .then(() => {
                // Cập nhật lại danh sách người dùng sau khi xóa thành công
                setUsers(users.filter(nguoidung => nguoidung.mand !== id));
                setFilteredUsers(filteredUsers.filter(nguoidung => nguoidung.mand !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the user!', error);
            });
    };

    // Tính toán người dùng trên trang hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Thay đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Tạo danh sách các nút phân trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Quản lý người dùng</h2>

            <div className="row mb-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm người dùng"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
                <div className="col-md-6 text-right">
                    <a href="/admin/addUser">
                        <button className="btn btn-primary">
                            Thêm Người Dùng
                        </button>
                    </a>
                </div>
            </div>

            <table className="table table-bordered table-hover table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Email</th>
                        <th>Mật khẩu</th>
                        <th>Họ và đệm</th>
                        <th>Tên</th>
                        <th>Vai trò</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(nguoidung => (
                        <tr key={nguoidung.mand}>
                            <td>{nguoidung.email}</td>
                            <td>{nguoidung.password}</td>
                            <td>{nguoidung.hond}</td>
                            <td>{nguoidung.tennd}</td>
                            <td>{nguoidung.vaitro}</td>
                            <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {/* Nút Xem */}
                                <button className="btn btn-info btn-sm" onClick={() => console.log(`View user ${nguoidung.mand}`)}>
                                    Xem
                                </button>
                                {/* Nút Sửa */}
                                <button className="btn btn-warning btn-sm" onClick={() => console.log(`Edit user ${nguoidung.mand}`)}>
                                    Sửa
                                </button>
                                {/* Nút Xóa */}
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(nguoidung.mand)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Phân trang */}
            <nav>
                <ul className="pagination justify-content-center">
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <a 
                                href="/" 
                                onClick={(e) => {
                                    e.preventDefault(); // Ngăn điều hướng trang
                                    paginate(number);   // Chuyển sang trang mới
                                }} 
                                className="page-link"
                            >
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Users;