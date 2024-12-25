import React from "react";
import Header from "./header.js";
import Footer from "./footer.js";

const Head = () => {
    return(
        <div className="container-fluid page-header" style={{marginBottom: "90px"}}>
        <div className="container">
            <div className="d-flex flex-column justify-content-center" style={{minHeight: "300px"}}>
                <h3 className="display-4 text-white text-uppercase">About</h3>
                <div className="d-inline-flex text-white">
                    <p className="m-0 text-uppercase"><a className="text-white" href="">Home</a></p>
                    <i className="fa fa-angle-double-right pt-1 px-3"></i>
                    <p className="m-0 text-uppercase">About</p>
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
                            <h1>Innovative Way To Learn</h1>
                        </div>
                        <p>
                            Aliquyam accusam clita nonumy ipsum sit sea clita ipsum clita, ipsum dolores amet voluptua
                            duo dolores et sit ipsum rebum, sadipscing et erat eirmod diam kasd labore clita est. Diam
                            sanctus gubergren sit rebum clita amet, sea est sea vero sed et. Sadipscing labore tempor at
                            sit dolor clita consetetur diam. Diam ut diam tempor no et, lorem dolore invidunt no nonumy
                            stet ea labore, dolor justo et sit gubergren diam sed sed no ipsum. Sit tempor ut nonumy
                            elitr dolores justo aliquyam ipsum stet
                        </p>
                        <a href="" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">
                            Learn More
                        </a>
                    </div>
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
                  Need Any Courses
                </h5>
                <h1 className="text-white">30% Off For New Students</h1>
              </div>
              <p className="text-white">
                Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo dolor lorem ipsum ut sed eos,
                ipsum et dolor kasd sit ea justo. Erat justo sed sed diam. Ea et erat ut sed diam sea ipsum est
                dolor
              </p>
              <ul className="list-inline text-white m-0">
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>Labore eos amet dolor amet diam
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>Etsea et sit dolor amet ipsum
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3"></i>Diam dolor diam elitripsum vero.
                </li>
              </ul>
            </div>
            <div className="col-lg-5">
              <div className="card border-0">
                <div className="card-header bg-light text-center p-4">
                  <h1 className="m-0">Sign Up Now</h1>
                </div>
                <div className="card-body rounded-bottom bg-primary p-5">
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control border-0 p-4"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control border-0 p-4"
                        placeholder="Your email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <select className="custom-select border-0 px-4" style={{ height: "47px" }}>
                        <option selected>Select a course</option>
                        <option value="1">Course 1</option>
                        <option value="2">Course 2</option>
                        <option value="3">Course 3</option>
                      </select>
                    </div>
                    <div>
                      <button className="btn btn-dark btn-block border-0 py-3" type="submit">
                        Sign Up Now
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

const About = () => {
    return(
        <>
            <Header />
            <Head />
            <AboutUs />
            <Registration />
            <Footer />
        </>
    );
};

export default About;