import React from "react";
import Header from "./header.js";
import Footer from "./footer.js";

const Head = () => {
    return(
        <div className="container-fluid page-header" style={{marginBottom: "90px"}}>
          <div className="container">
              <div className="d-flex flex-column justify-content-center" style={{minHeight: "300px"}}>
                  <h3 className="display-4 text-white text-uppercase">Giới thiệu</h3>
                  <div className="d-inline-flex text-white">
                      <p className="m-0 text-uppercase"><a className="text-white" href="/">Trang chủ</a></p>
                      <i className="fa fa-angle-double-right pt-1 px-3"></i>
                      <p className="m-0 text-uppercase">Giới thiệu</p>
                  </div>
              </div>
          </div>
        </div>
    );
};

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

const About = () => {
    return(
        <>
            <Header />
            <Head />
            <AboutUs />
            <Footer />
        </>
    );
};

export default About;