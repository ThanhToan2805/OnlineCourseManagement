import React from 'react';
import Header from '../Main/header.js';
import Footer from '../Main/footer.js';

const LTW = () => {
  const course = {
    tenkh: 'Lập trình web',
    anh: 'course-1.jpg',
    chude: 'Phát triển ứng dụng web',
    ngaybatdau: '2024-09-09',
    ngayketthuc: '2024-12-24',
    thoigian: '07:00:00',
    lop: 'PTUDW100213'
  };

  return (
    <>
        <Header />

        <div className="container-fluid page-header" style={{marginBottom: "90px"}}>
          <div className="container">
              <div className="d-flex flex-column justify-content-center" style={{minHeight: "300px"}}>
                  <h3 className="display-4 text-white text-uppercase">Chi tiết khóa học</h3>
                  <div className="d-inline-flex text-white">
                      <p className="m-0 text-uppercase"><a className="text-white" href="/course">Khóa học</a></p>
                      <i className="fa fa-angle-double-right pt-1 px-3"></i>
                      <p className="m-0 text-uppercase">Chi tiết khóa học</p>
                  </div>
              </div>
          </div>
        </div>

        <div className="row">
            <div className="col-lg-6 mb-4">
            <img className="img-fluid rounded shadow-sm" src={`/img/${course.anh}`} alt={course.tenkh} />
            </div>
            <div className="col-lg-6">
                <div className="card shadow-sm border-light">
                    <div className="card-body">
                    <h1 className="card-title mb-4">{course.tenkh}</h1>
                    <p><strong>Chủ đề:</strong> {course.chude}</p>
                    <div className="mb-3">
                        <small className="m-0">
                        <i className="fa fa-calendar-days text-primary mr-2"></i>
                        <strong>Ngày bắt đầu:</strong> {new Date(course.ngaybatdau).toLocaleDateString('vi-VN')}
                        </small>
                    </div>
                    <div className="mb-3">
                        <small className="m-0">
                        <i className="far fa-calendar-days text-primary mr-2"></i>
                        <strong>Ngày kết thúc:</strong> {new Date(course.ngayketthuc).toLocaleDateString('vi-VN')}
                        </small>
                    </div>
                    <div className="mb-3">
                        <small className="m-0">
                        <i className="fa fa-clock text-primary mr-2"></i>
                        <strong>Thời gian:</strong> {course.thoigian}
                        </small>
                    </div>
                    <div className="mb-3">
                        <small className="m-0">
                        <i className="fa fa-chalkboard-teacher text-primary mr-2"></i>
                        <strong>Lớp học:</strong> {course.lop}
                        </small>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </>
  );
};

export default LTW;