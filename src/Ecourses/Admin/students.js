import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Students = () => {
    const [students, setstudents] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredstudents, setFilteredstudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 5;

    // Lấy dữ liệu từ API khi component mount
    useEffect(() => {
        axios.get('http://localhost:5000/api/sinhvien')
            .then(response => {
                setstudents(response.data);
                setFilteredstudents(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the students!', error);
            });
    }, []);

    // Hàm tìm kiếm 
    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearch(searchValue);
        setFilteredstudents(students.filter(sinhvien =>
            sinhvien.hond.toLowerCase().includes(searchValue) ||
            sinhvien.tennd.toLowerCase().includes(searchValue) ||
            sinhvien.email.toLowerCase().includes(searchValue) ||
            sinhvien.masinhvien.toLowerCase().includes(searchValue)
        ));
        setCurrentPage(1); // Reset lại trang hiện tại khi tìm kiếm
    };

    // Tính toán  trên trang hiện tại
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentstudents = filteredstudents.slice(indexOfFirstStudent, indexOfLastStudent);

    // Thay đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Tạo danh sách các nút phân trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredstudents.length / studentsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Quản lý sinh viên</h2>

            <div className="row mb-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm sinh viên"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                    <a href="/admin/addStudent">
                        <button className="btn btn-primary">
                            Thêm Sinh Viên
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
                        <th>Mã sinh viên</th>
                        <th>Số lượng khóa học đã đăng ký</th>
                    </tr>
                </thead>
                <tbody>
                    {currentstudents.map(sinhvien => {
                        return(
                            <tr key={sinhvien.mand}>
                            <td>{sinhvien.email}</td>
                            <td>{sinhvien.password}</td>
                            <td>{sinhvien.hond}</td>
                            <td>{sinhvien.tennd}</td>
                            <td>{sinhvien.masinhvien}</td>
                            <td>{sinhvien.so_luong_khoahoc}</td>
                            <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {/* Nút Xem */}
                                <button className="btn btn-info btn-sm" onClick={() => console.log(`View Student ${sinhvien.mand}`)}>
                                    Xem
                                </button>
                                {/* Nút Sửa */}
                                <button className="btn btn-warning btn-sm" onClick={() => console.log(`Edit Student ${sinhvien.mand}`)}>
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

export default Students;