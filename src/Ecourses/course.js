import React, {use, useEffect, useState} from "react";
import axios from "axios";
import Header from "./header.js";
import Footer from "./footer.js";


const Head = () => {
    return(
        <div className="container-fluid page-header" style={{marginBottom: "90px"}}>
        <div className="container">
            <div className="d-flex flex-column justify-content-center" style={{minHeight: "300px"}}>
                <h3 className="display-4 text-white text-uppercase">Courses</h3>
                <div className="d-inline-flex text-white">
                    <p className="m-0 text-uppercase"><a className="text-white" href="">Home</a></p>
                    <i className="fa fa-angle-double-right pt-1 px-3"></i>
                    <p className="m-0 text-uppercase">Courses</p>
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