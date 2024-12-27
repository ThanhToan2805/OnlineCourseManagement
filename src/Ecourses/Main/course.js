import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from "./header.js";
import Footer from "./footer.js";


const Head = () => {
    return(
        <div className="container-fluid page-header" style={{marginBottom: "90px"}}>
            <div className="container">
                <div className="d-flex flex-column justify-content-center" style={{minHeight: "300px"}}>
                    <h3 className="display-4 text-white text-uppercase">Khóa học</h3>
                    <div className="d-inline-flex text-white">
                        <p className="m-0 text-uppercase"><a className="text-white" href="/">Trang chủ</a></p>
                        <i className="fa fa-angle-double-right pt-1 px-3"></i>
                        <p className="m-0 text-uppercase">Khóa học</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Category = () => {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:5000/api/chude').then(response => {
            setCategories(response.data);
        }).catch(error => {
            console.error('There was an error fetching the courses!', error);
        });
    }, []);

    return (
        <div className="container-fluid py-5">
            <div className="container pt-5 pb-3">
                <div className="text-center mb-5">
                    <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>
                        Chủ đề
                    </h5>
                    <h1>Khám phá các chủ đề cực hot</h1>
                </div>
                <div className="row">
                    {categories.map((category, index) => (
                        <div key={index} className="col-lg-3 col-md-6 mb-4">
                        <div className="cat-item position-relative overflow-hidden rounded mb-2">
                            <img
                                className="img-fluid"
                                src={`/img/${category.anhcd}`}
                                alt={category.tencd}
                            />
                            <a
                                className="cat-overlay text-white text-decoration-none"
                                href="#"
                            >
                                <h4 className="text-white font-weight-medium">
                                    {category.tencd}
                                </h4>
                                {/* <span>{category.courses} Khóa học</span> */}
                            </a>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
      // Fetch danh sách khóa học từ API
      axios.get('http://localhost:5000/api/khoahoc').then(response => {
          setCourses(response.data);
      }).catch(error => {
          console.error('There was an error fetching the courses!', error);
      });
  
      const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(userLoggedIn);
    }, []);
    
    const handleRegister = async (courseId) => {
      // Lấy dữ liệu người dùng từ localStorage
      const userData = JSON.parse(localStorage.getItem('user'));
  
      // Kiểm tra xem người dùng có đăng nhập hay không
      if (!userData || !userData.email) {
          alert('Bạn cần đăng nhập để đăng ký khóa học.');
          navigate('/login'); // Chuyển hướng người dùng đến trang đăng nhập
          return; // Dừng hàm lại
      }
  
      console.log(courseId, userData.email);
  
      try {
          const response = await axios.post('http://localhost:5000/api/dangky_khoahoc', {
              courseId: courseId,
              email: userData.email // Sử dụng email từ thông tin người dùng
          });
  
          console.log('API Response:', response.data);
  
          if (response.data.message) {
              alert(response.data.message);
          } else {
              alert('Không có thông báo từ server.');
          }
      } catch (error) {
          console.error('Lỗi khi đăng ký khóa học:', error);
          if (error.response) {
              alert(error.response.data.message || 'Xảy ra lỗi khi đăng ký.');
          } else {
              alert('Không thể kết nối đến server.');
          }
      }
  };
  
    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>Khóa học</h5>
                    <h1>Các khóa học phổ biến</h1>
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
                                    <a className="h5" href="">{course.tenkh}</a>
                                    <div className="border-top mt-4 pt-4">
                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-primary" onClick={() => handleRegister(course.makh)}>
                                                Đăng ký
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
    );
};

const Course = () => {
    return(
        <>
            <Header />
            <Head />
            <Category />
            <Courses />
            <Footer />
        </>
    );
};

export default Course;