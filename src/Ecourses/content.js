import React from "react";

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

const Category = () => {
  return (
      <div className="container-fluid py-5">
          <div className="container pt-5 pb-3">
              <div className="text-center mb-5">
                  <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>
                      Subjects
                  </h5>
                  <h1>Explore Top Subjects</h1>
              </div>
              <div className="row">
                  {[
                      { img: "cat-1.jpg", title: "Web Design", courses: 100 },
                      { img: "cat-2.jpg", title: "Development", courses: 100 },
                      { img: "cat-3.jpg", title: "Game Design", courses: 100 },
                      { img: "cat-4.jpg", title: "Apps Design", courses: 100 },
                      { img: "cat-5.jpg", title: "Marketing", courses: 100 },
                      { img: "cat-6.jpg", title: "Research", courses: 100 },
                      { img: "cat-7.jpg", title: "Content Writing", courses: 100 },
                      { img: "cat-8.jpg", title: "SEO", courses: 100 },
                  ].map((category, index) => (
                      <div key={index} className="col-lg-3 col-md-6 mb-4">
                          <div className="cat-item position-relative overflow-hidden rounded mb-2">
                              {/* Dùng đường dẫn tĩnh tới ảnh trong thư mục public */}
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
                                  <span>{category.courses} Courses</span>
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
    return(
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>Courses</h5>
                    <h1>Our Popular Courses</h1>
                </div>
                <div className="row">
                    {[
                        { img: "course-1.jpg", title: "Web design & development courses for beginner", students: 25, time: "01h 30m", rating: 4.5, reviews: 250, price: "$99" },
                        { img: "course-2.jpg", title: "Web design & development courses for beginner", students: 25, time: "01h 30m", rating: 4.5, reviews: 250, price: "$99" },
                        { img: "course-3.jpg", title: "Web design & development courses for beginner", students: 25, time: "01h 30m", rating: 4.5, reviews: 250, price: "$99" },
                        { img: "course-4.jpg", title: "Web design & development courses for beginner", students: 25, time: "01h 30m", rating: 4.5, reviews: 250, price: "$99" },
                        { img: "course-5.jpg", title: "Web design & development courses for beginner", students: 25, time: "01h 30m", rating: 4.5, reviews: 250, price: "$99" },
                        { img: "course-6.jpg", title: "Web design & development courses for beginner", students: 25, time: "01h 30m", rating: 4.5, reviews: 250, price: "$99" },
                    ].map((course, index) => (
                        <div key={index} className="col-lg-4 col-md-6 mb-4">
                            <div className="rounded overflow-hidden mb-2">
                                <img className="img-fluid" src={`/img/${course.img}`} alt="" />
                                <div className="bg-secondary p-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <small className="m-0"><i className="fa fa-users text-primary mr-2"></i>{course.students} Students</small>
                                        <small className="m-0"><i className="far fa-clock text-primary mr-2"></i>{course.time}</small>
                                    </div>
                                    <a className="h5" href="">{course.title}</a>
                                    <div className="border-top mt-4 pt-4">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="m-0"><i className="fa fa-star text-primary mr-2"></i>{course.rating} <small>({course.reviews})</small></h6>
                                            <h5 className="m-0">{course.price}</h5>
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

const Team = () => {
    return (
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-5">
            <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: "5px" }}>
              Teachers
            </h5>
            <h1>Meet Our Teachers</h1>
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