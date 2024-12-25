import React from "react";

const Footer = () => {
    return (
      <>
        <div className="container-fluid bg-dark text-white py-5 px-sm-3 px-lg-5" style={{ marginTop: "90px" }}>
          <div className="row pt-5">
            <div className="col-lg-7 col-md-12">
              <div className="row">
                <div className="col-md-6 mb-5">
                  <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: "5px" }}>
                    Liên hệ
                  </h5>
                  <p>
                    <i className="fa fa-map-marker-alt mr-2"></i>123 Phan Văn Trị, Quận Gò Vấp, thành phố Hồ Chí Minh
                  </p>
                  <p>
                    <i className="fa fa-phone-alt mr-2"></i>0915026830
                  </p>
                  <p>
                    <i className="fa fa-envelope mr-2"></i>ecoursesonl@gmailgmail.com
                  </p>
                  <div className="d-flex justify-content-start mt-4">
                    <a className="btn btn-outline-light btn-square mr-2" href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a className="btn btn-outline-light btn-square mr-2" href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a className="btn btn-outline-light btn-square mr-2" href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a className="btn btn-outline-light btn-square" href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
                <div className="col-md-6 mb-5">
                  <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: "5px" }}>
                    Các chủ đề
                  </h5>
                  <div className="d-flex flex-column justify-content-start">
                    {["Websites", "Games", "Apps", "Marketing", "Research", "SEO"].map((course, index) => (
                      <a key={index} className="text-white mb-2" href="#">
                        <i className="fa fa-angle-right mr-2"></i>{course}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 mb-5">
              <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: "5px" }}>
                Bản tin
              </h5>
              <p>
                Đăng ký nhận bản tin để cập nhật những thông tin mới nhất. Nhận thông báo về các khóa học, chương trình khuyến mãi,
                và nhiều hơn nữa. Đừng bỏ lỡ cơ hội!
              </p>
              <div className="w-100">
                <div className="input-group">
                  <input type="text" className="form-control border-light" style={{ padding: "30px" }} placeholder="Email" />
                  <div className="input-group-append">
                    <button className="btn btn-primary px-4">Đăng ký</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Back to Top Button */}
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
          <i className="fa fa-angle-double-up"></i>
        </a>
      </>
    );
};

export default Footer;