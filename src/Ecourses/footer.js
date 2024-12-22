import React, {useEffect} from "react";

const Footer = () => {
    return (
      <>
        <div className="container-fluid bg-dark text-white py-5 px-sm-3 px-lg-5" style={{ marginTop: "90px" }}>
          <div className="row pt-5">
            <div className="col-lg-7 col-md-12">
              <div className="row">
                <div className="col-md-6 mb-5">
                  <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: "5px" }}>
                    Get In Touch
                  </h5>
                  <p>
                    <i className="fa fa-map-marker-alt mr-2"></i>123 Street, New York, USA
                  </p>
                  <p>
                    <i className="fa fa-phone-alt mr-2"></i>+012 345 67890
                  </p>
                  <p>
                    <i className="fa fa-envelope mr-2"></i>info@example.com
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
                    Our Courses
                  </h5>
                  <div className="d-flex flex-column justify-content-start">
                    {["Web Design", "Apps Design", "Marketing", "Research", "SEO"].map((course, index) => (
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
                Newsletter
              </h5>
              <p>
                Rebum labore lorem dolores kasd est, et ipsum amet et at kasd, ipsum sea tempor magna tempor.
                Accu kasd sed ea duo ipsum. Dolor duo eirmod sea justo no lorem est diam
              </p>
              <div className="w-100">
                <div className="input-group">
                  <input type="text" className="form-control border-light" style={{ padding: "30px" }} placeholder="Your Email Address" />
                  <div className="input-group-append">
                    <button className="btn btn-primary px-4">Sign Up</button>
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