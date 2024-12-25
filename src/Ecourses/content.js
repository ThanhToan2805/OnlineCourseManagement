import React, {useEffect, useState} from "react";
import axios from "axios";

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
                  {[
                      { img: "cat-1.jpg", title: "Websites", courses: 100 },
                      { img: "cat-3.jpg", title: "Games", courses: 100 },
                      { img: "cat-4.jpg", title: "Apps", courses: 100 },
                      { img: "cat-5.jpg", title: "Marketing", courses: 100 },
                      { img: "cat-6.jpg", title: "Nghiên cứu", courses: 100 },
                      { img: "cat-8.jpg", title: "SEO", courses: 100 },
                  ].map((category, index) => (
                      <div key={index} className="col-lg-4 col-md-6 mb-4">
                          <div className="cat-item position-relative overflow-hidden rounded mb-2">
                              <img
                                  className="img-fluid"
                                  src={`/img/${category.img}`}
                                  alt={category.title}
                              />
                              <a
                                  className="cat-overlay text-white text-decoration-none"
                                  href="#"
                              >
                                  <h4 className="text-white font-weight-medium">
                                      {category.title}
                                  </h4>
                                  <span>{category.courses} Khóa học</span>
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
  
  useEffect(() => {
      axios.get('http://localhost:5000/api/khoahoc').then(response => {
          setCourses(response.data);
      }).catch(error => {
          console.error('There was an error fetching the courses!', error);
      });
  }, []);

  return (
      <div className="container-fluid py-5">
          <div className="container py-5">
              <div className="text-center mb-5">
                  <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>Courses</h5>
                  <h1>Our Popular Courses</h1>
              </div>
              <div className="row">
                  {courses.map((course, index) => (
                      <div key={index} className="col-lg-4 col-md-6 mb-4">
                          <div className="rounded overflow-hidden mb-2">
                              {/* Ensure course.anh contains the correct path */}
                              <img className="img-fluid" src={`/img/${course.anh}`} alt={course.tenkh} />
                              <div className="bg-secondary p-4">
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

const Registration = () => {
    return (
      <div className="container-fluid bg-registration py-5" style={{ margin: "90px 0" }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-5 mb-lg-0">
              <div className="mb-4">
                <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: "5px" }}>
                  Bạn đang cần khóa học nào ?
                </h5>
                <h1 className="text-white">Giảm 30% cho sinh viên mới</h1>
              </div>
              <p className="text-white">
                Hãy gia nhập ngay các khóa học của chúng tôi để nâng cao kỹ năng và kiến thức. Chúng tôi cung cấp nhiều
                chương trình học chất lượng, phù hợp với mọi đối tượng từ người mới bắt đầu cho đến những người đã có kinh
                nghiệm. Đừng bỏ lỡ cơ hội học hỏi từ những chuyên gia trong ngành!
              </p>
              <ul className="list-inline text-white m-0">
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>Cung cấp kiến thức chuyên sâu
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>Hỗ trợ học tập 24/7
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>Cập nhật tài liệu thường xuyên.
                </li>
              </ul>
            </div>
            <div className="col-lg-5">
              <div className="card border-0">
                <div className="card-header bg-light text-center p-4">
                  <h1 className="m-0">Đăng ký ngay</h1>
                </div>
                <div className="card-body rounded-bottom bg-primary p-5">
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control border-0 p-4"
                        placeholder="Họ"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control border-0 p-4"
                        placeholder="Tên"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control border-0 p-4"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control border-0 p-4"
                        placeholder="Mật khẩu"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control border-0 p-4"
                        placeholder="Nhập lại mật khẩu"
                        required
                      />
                    </div>
                    <div>
                      <button className="btn btn-dark btn-block border-0 py-3" type="submit">
                        Đăng ký ngay
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

const Team = () => {
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
            {[...Array(4)].map((_, index) => (
              <div key={index} className="col-md-6 col-lg-3 text-center team mb-4">
                <div className="team-item rounded overflow-hidden mb-2">
                  <div className="team-img position-relative">
                    <img className="img-fluid" src={`/img/team-${index + 1}.jpg`} alt={`Team ${index + 1}`} />
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
                  <div className="bg-secondary p-4">
                    <h5>Jhon Doe</h5>
                    <p className="m-0">Web Designer</p>
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
            <Registration />
            <Team />
        </>
    );
};

export default Content;