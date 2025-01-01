import React, {useEffect, useState} from "react";
import axios from "axios";

const Subjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const subjectPerPage = 5;

    // Lấy dữ liệu từ API khi component mount
    useEffect(() => {
        axios.get('http://localhost:5000/api/chude')
            .then(response => {
                setSubjects(response.data);
                setFilteredSubjects(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the subjects!', error);
            });
    }, []);

    // Hàm tìm kiếm 
    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearch(searchValue);
        setFilteredSubjects(subjects.filter(chude =>
            chude.tencd.toLowerCase().includes(searchValue)
        ));
        setCurrentPage(1); // Reset lại trang hiện tại khi tìm kiếm
    };

    // Tính toán  trên trang hiện tại
    const indexOfLastSubject = currentPage * subjectPerPage;
    const indexOfFirstSubject = indexOfLastSubject - subjectPerPage;
    const currentSubject = filteredSubjects.slice(indexOfFirstSubject, indexOfLastSubject);

    // Thay đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Tạo danh sách các nút phân trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredSubjects.length / subjectPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mt-5">
            <div className="page-title">
                <div className="text-center mb-4">
                    <h2>Quản lý chủ đề</h2>
                </div>
    
                {/* Dòng tìm kiếm và nút thêm */}
                <div className="row mb-4">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm chủ đề"
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <a href="/admin/addSubject">
                            <button className="btn btn-primary">
                                Thêm chủ đề
                            </button>
                        </a>
                    </div>
                </div>
            </div>
    
            <div className="row">
                <div className="col-md-12">
                    <div className="x_panel">
                        <div className="x_content">
                            {/* Bảng danh sách chủ đề */}
                            <table className="table table-striped projects">
                                <thead>
                                    <tr>
                                        <th style={{ width: "20%" }}>Tên chủ đề</th>
                                        <th>Số lượng môn</th>
                                        <th style={{ width: "15%" }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentSubject.map(chude => {
                                        return (
                                            <tr key={chude.makh}>
                                                <td>{chude.tencd}</td>
                                                <td>{chude.so_luong_mon}</td>
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

export default Subjects;