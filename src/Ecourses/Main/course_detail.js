// CourseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
  const { courseId } = useParams(); // Lấy mã khóa học từ URL
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Gọi API để lấy chi tiết khóa học dựa vào courseId
    axios.get(`http://localhost:5000/api/khoahoc/${courseId}`)
      .then(response => {
        setCourse(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the course details!', error);
      });
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-6">
          <img className="img-fluid" src={`/img/${course.anh}`} alt={course.tenkh} />
        </div>
        <div className="col-lg-6">
          <h1>{course.tenkh}</h1>
          <p><strong>Price:</strong> {course.giakh} VND</p>
          <p><strong>Start date:</strong> {new Date(course.ngaybatdau).toLocaleDateString()}</p>
          <p><strong>End date:</strong> {new Date(course.ngayketthuc).toLocaleDateString()}</p>
          <button className="btn btn-primary">Register</button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;