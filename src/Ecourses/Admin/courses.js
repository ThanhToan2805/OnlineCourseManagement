import React, {useEffect, useState} from "react";
import axios from "axios";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursePerPage = 5;

    // Lấy dữ liệu từ API khi component mount
    useEffect(() => {
        axios.get('http://localhost:5000/api/khoahoc')
            .then(response => {
                setCourses(response.data);
                setFilteredCourses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the courses!', error);
            });
    }, []);

    // Hàm tìm kiếm 
    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearch(searchValue);
        setFilteredCourses(courses.filter(khoahoc =>
            khoahoc.tenkh.toLowerCase().includes(searchValue) ||
            khoahoc.lop.toLowerCase().includes(searchValue)
        ));
        setCurrentPage(1); // Reset lại trang hiện tại khi tìm kiếm
    };

    // Tính toán  trên trang hiện tại
    const indexOfLastCourse = currentPage * coursePerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursePerPage;
    const currentCourse = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    // Thay đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Tạo danh sách các nút phân trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredCourses.length / coursePerPage); i++) {
        pageNumbers.push(i);
    }

    // Hàm chuyển đổi thời gian theo yêu cầu
    const formatTime = (time24) => {
        let [hours, minutes] = time24.split(':');
        let period = 'AM';

        hours = parseInt(hours, 10);

        // Nếu giờ lớn hơn hoặc bằng 12, thêm PM
        if (hours >= 12) {
            period = 'PM';
        }

        // Giữ nguyên giờ buổi chiều (từ 12 giờ trưa trở đi)
        return `${hours}:${minutes} ${period}`;
    };

    return (
        <div className="container mt-5">
            <div className="page-title">
                <div className="text-center mb-4">
                    <h2>Quản lý khóa học</h2>
                </div>
    
                {/* Dòng tìm kiếm và nút thêm */}
                <div className="row mb-4">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm khóa học"
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <a href="/admin/addCourse">
                            <button className="btn btn-primary">
                                Thêm khóa học
                            </button>
                        </a>
                    </div>
                </div>
            </div>
    
            <div className="row">
                <div className="col-md-12">
                    <div className="x_panel">
                        <div className="x_content">
                            {/* Bảng danh sách khóa học */}
                            <table className="table table-striped projects">
                                <thead>
                                    <tr>
                                        <th style={{ width: "20%" }}>Tên khóa học</th>
                                        <th>Lớp</th>
                                        <th>Ngày bắt đầu</th>
                                        <th>Ngày kết thúc</th>
                                        <th>Thời gian</th>
                                        <th>Số lượng sinh viên</th>
                                        <th style={{ width: "15%" }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentCourse.map(khoahoc => {
                                        return (
                                            <tr key={khoahoc.makh}>
                                                <td>{khoahoc.tenkh}</td>
                                                <td>{khoahoc.lop}</td>
                                                <td>{new Date(khoahoc.ngaybatdau).toLocaleDateString('vi-VN')}</td>
                                                <td>{new Date(khoahoc.ngayketthuc).toLocaleDateString('vi-VN')}</td>
                                                <td>{formatTime(khoahoc.thoigian)}</td>
                                                <td>{khoahoc.so_luong_sinhvien}</td>
                                                <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    {/* Nút Xem */}
                                                    <button className="btn btn-info btn-sm">
                                                        Xem
                                                    </button>
                                                    {/* Nút Sửa */}
                                                    <button className="btn btn-warning btn-sm">
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
                    </div>
                </div>
            </div>
        </div>
    );    
}

export default Courses;