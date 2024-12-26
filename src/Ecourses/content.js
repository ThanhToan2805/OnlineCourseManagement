import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-5">
                        <img className="img-fluid rounded mb-4 mb-lg-0" src="/img/about.jpg" alt="About Us" />
                    </div>
                    <div className="col-lg-7">
                        <div className="text-left mb-4">
                            <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>About Us</h5>
                            <h1>Cách Học Sáng Tạo</h1>
                        </div>
                        <p>
                          Trang web quản lý khóa học online của chúng tôi mang đến một giải pháp học tập linh hoạt và hiệu quả cho
                          sinh viên và giảng viên. Với hệ thống quản lý khóa học dễ sử dụng, sinh viên có thể dễ dàng đăng ký, theo
                          dõi tiến độ học tập và tham gia các khóa học trực tuyến. Các giảng viên cũng có thể dễ dàng quản lý lớp học,
                          giao bài tập, và đánh giá kết quả học tập của sinh viên. Chúng tôi cam kết tạo ra một môi trường học tập trực
                          tuyến hiện đại, tiện lợi và phù hợp với nhu cầu học tập của mọi người.
                        </p>
                        <a href="/about" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">
                            Tìm hiểu thêm
                        </a>
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
      axios.get('http://localhost:5000/api/khoahoc').then(response => {
          setCourses(response.data);
      }).catch(error => {
          console.error('There was an error fetching the courses!', error);
      });
  }, []);
  
  const handleRegister = (courseId) => {
      if (!isLoggedIn) {
          if (window.confirm('Bạn cần đăng nhập để đăng ký khóa học. Bạn có muốn đăng nhập không?')) {
              navigate('/login'); // Chuyển đến trang đăng nhập
          }
      } else {
          console.log('Proceeding to register for course:', courseId);
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
                                      {/* <small className="m-0"><i className="fa fa-users text-primary mr-2"></i>{course.students} Students</small> */}
                                      <small className="m-0"><i className="far fa-clock text-primary mr-2"></i>{course.thoigian}</small>
                                  </div>
                                  <a className="h5" href="">{course.tenkh}</a>
                                  <div className="border-top mt-4 pt-4">
                                      <div className="d-flex justify-content-between">
                                          <h5 className="m-0">
                                              {new Intl.NumberFormat('vi-VN').format(course.giakh)} VND
                                          </h5>
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

const Team = () => {
  const [teachers, setTeachers] = useState([]);
    
  useEffect(() => {
      axios.get('http://localhost:5000/api/giangvien').then(response => {
          setTeachers(response.data);
      }).catch(error => {
          console.error('There was an error fetching the courses!', error);
      });
  }, []);

  return (
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <div className="text-center mb-5">
          <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: "5px" }}>
            Giảng viên
          </h5>
          <h1>Giảng viên của chúng tôi</h1>
        </div>
        <div className="row">
          {teachers.map((teacher, index) => (
            <div key={index} className="col-md-6 col-lg-3 text-center team mb-4">
            <div className="team-item rounded overflow-hidden mb-2">
              <div className="team-img position-relative">
                <img className="img-fluid" src={`/img/${teacher.anhgv}`} />
                <div className="team-social">
                  <a className="btn btn-outline-light btn-square mx-1" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-outline-light btn-square mx-1" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-outline-light btn-square mx-1" href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: '#f5f5f5' }}>
                <h5>{teacher.hond} {teacher.tennd}</h5>
                <p className="m-0">{teacher.vaitro}</p>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Content = () => {
    return(
        <>
            <AboutUs />
            <Category />
            <Courses />
            <Team />
        </>
    );
};

export default Content;