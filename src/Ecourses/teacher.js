import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "./header.js";
import Footer from "./footer.js";

const Head = () => {
    return(
        <div className="container-fluid page-header" style={{marginBottom: "90px"}}>
        <div className="container">
            <div className="d-flex flex-column justify-content-center" style={{minHeight: "300px"}}>
                <h3 className="display-4 text-white text-uppercase">Giảng viên</h3>
                <div className="d-inline-flex text-white">
                    <p className="m-0 text-uppercase"><a className="text-white" href="/">Trang chủ</a></p>
                    <i className="fa fa-angle-double-right pt-1 px-3"></i>
                    <p className="m-0 text-uppercase">Giảng viên</p>
                </div>
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

const Teacher = () => {
    return(
        <>
            <Header />
            <Head />
            <Team />
            <Footer />
        </>
    );
};

export default Teacher;