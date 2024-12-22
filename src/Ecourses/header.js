import React from "react";
const Topbar = () => {
    return (
        <div className="container-fluid d-none d-lg-block">
            <div className="row align-items-center py-4 px-xl-5">
                <div className="col-lg-3">
                    <a href="/" className="text-decoration-none">
                        <h1 className="m-0"><span className="text-primary">E</span>COURSES</h1>
                    </a>
                </div>
                <div className="col-lg-3 text-right">
                    <div className="d-inline-flex align-items-center">
                        <i className="fa fa-2x fa-map-marker-alt text-primary mr-3"></i>
                        <div className="text-left">
                            <h6 className="font-weight-semi-bold mb-1">Our Office</h6>
                            <small>123 Street, New York, USA</small>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 text-right">
                    <div className="d-inline-flex align-items-center">
                        <i className="fa fa-2x fa-envelope text-primary mr-3"></i>
                        <div className="text-left">
                            <h6 className="font-weight-semi-bold mb-1">Email Us</h6>
                            <small>info@example.com</small>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 text-right">
                    <div className="d-inline-flex align-items-center">
                        <i className="fa fa-2x fa-phone text-primary mr-3"></i>
                        <div className="text-left">
                            <h6 className="font-weight-semi-bold mb-1">Call Us</h6>
                            <small>+012 345 6789</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Navbar = () => {
    return (
        <div className="container-fluid">
            <div className="row border-top px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <a
                        className="d-flex align-items-center justify-content-between bg-secondary w-100 text-decoration-none"
                        data-toggle="collapse"
                        href="#navbar-vertical"
                        style={{ height: '67px', padding: '0 30px' }}
                    >
                        <h5 className="text-primary m-0">
                            <i className="fa fa-book-open mr-2"></i>Subjects
                        </h5>
                        <i className="fa fa-angle-down text-primary"></i>
                    </a>
                    <nav
                        className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light"
                        id="navbar-vertical"
                        style={{ width: 'calc(100% - 30px)', zIndex: 9 }}
                    >
                        <div className="navbar-nav w-100">
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link" data-toggle="dropdown">
                                    Web Design <i className="fa fa-angle-down float-right mt-1"></i>
                                </a>
                                <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                    <a href="" className="dropdown-item">HTML</a>
                                    <a href="" className="dropdown-item">CSS</a>
                                    <a href="" className="dropdown-item">jQuery</a>
                                </div>
                            </div>
                            <a href="" className="nav-item nav-link">Apps Design</a>
                            <a href="" className="nav-item nav-link">Marketing</a>
                            <a href="" className="nav-item nav-link">Research</a>
                            <a href="" className="nav-item nav-link">SEO</a>
                        </div>
                    </nav>
                </div>
                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                        <a href="/" className="text-decoration-none d-block d-lg-none">
                            <h1 className="m-0">
                                <span className="text-primary">E</span>COURSES
                            </h1>
                        </a>
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav py-0">
                                <a href="/" className="nav-item nav-link active">Home</a>
                                <a href="/about" className="nav-item nav-link">About</a>
                                <a href="/course" className="nav-item nav-link">Courses</a>
                                <a href="/teacher" className="nav-item nav-link">Teachers</a>
                                <a href="/contact" className="nav-item nav-link">Contact</a>
                            </div>
                            <a className="btn btn-primary py-2 px-4 ml-auto d-none d-lg-block" href="">
                                Join Now
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

const Header = () => {
    return (
        <>
            <Topbar />
            <Navbar />
        </>
    );
};

export default Header;