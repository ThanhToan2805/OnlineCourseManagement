import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Teachers = () => {
    const [teachers, setteachers] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredteachers, setFilteredteachers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const teachersPerPage = 5; // Số  hiển thị trên mỗi trang

    // Lấy dữ liệu từ API khi component mount
    useEffect(() => {
        axios.get('http://localhost:5000/api/giangvien')
            .then(response => {
                setteachers(response.data);
                setFilteredteachers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the teachers!', error);
            });
    }, []);

    // Hàm tìm kiếm 
    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearch(searchValue);
        setFilteredteachers(teachers.filter(giangvien =>
            giangvien.hond.toLowerCase().includes(searchValue) ||
            giangvien.tennd.toLowerCase().includes(searchValue) ||
            giangvien.email.toLowerCase().includes(searchValue) ||
            giangvien.magiangvien.toLowerCase().includes(searchValue)
        ));
        setCurrentPage(1); // Reset lại trang hiện tại khi tìm kiếm
    };

    // Tính toán  trên trang hiện tại
    const indexOfLastStudent = currentPage * teachersPerPage;
    const indexOfFirstStudent = indexOfLastStudent - teachersPerPage;
    const currentteachers = filteredteachers.slice(indexOfFirstStudent, indexOfLastStudent);

    // Thay đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Tạo danh sách các nút phân trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredteachers.length / teachersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Quản lý giảng viên</h2>

            <div className="row mb-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm giảng viên"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                    <a href="/admin/addTeachers">
                        <button className="btn btn-primary">
                            Thêm Giảng Viên
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
                        <th>Mã giảng viên</th>
                    </tr>
                </thead>
                <tbody>
                    {currentteachers.map(giangvien => {
                        return(
                            <tr key={giangvien.mand}>
                            <td>{giangvien.email}</td>
                            <td>{giangvien.password}</td>
                            <td>{giangvien.hond}</td>
                            <td>{giangvien.tennd}</td>
                            <td>{giangvien.magiangvien}</td>
                            <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {/* Nút Xem */}
                                <button className="btn btn-info btn-sm" onClick={() => console.log(`View Student ${giangvien.mand}`)}>
                                    Xem
                                </button>
                                {/* Nút Sửa */}
                                <button className="btn btn-warning btn-sm" onClick={() => console.log(`Edit Student ${giangvien.mand}`)}>
                                    Sửa
                                </button>
                                {/* Nút Xóa */}
                                <button className="btn btn-danger btn-sm">
                                    Xóa
                                </button>
                            </td>
                            </tr>
                        );
                    })}
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

export default Teachers;