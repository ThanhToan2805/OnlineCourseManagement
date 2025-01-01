import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    const navigate = useNavigate();
    // State để lưu trữ các giá trị của form
    const [formData, setFormData] = useState({
      mand: "", // Mã người dùng (tài khoản người dùng có vai trò sinh viên)
      masinhvien: "",
    });
  
    // State để lưu trữ danh sách sinh viên chưa có
    const [availableStudents, setAvailableStudents] = useState([]);
  
    // Lấy danh sách sinh viên chưa có
    useEffect(() => {
      const fetchAvailableStudents = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/sinhvien/available");
          const data = await response.json();
          setAvailableStudents(data);
        } catch (error) {
          console.error("Lỗi khi tải danh sách người dùng:", error);
        }
      };
      
      fetchAvailableStudents();
    }, []);
  
    // Hàm xử lý khi người dùng thay đổi giá trị trong form
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    // Hàm gửi dữ liệu đến API khi người dùng nhấn Submit
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch("http://localhost:5000/api/sinhvien", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          alert("Sinh viên đã được thêm thành công!");
          navigate('/admin/students');
          setFormData({
            mand: "",
            masinhvien: "",
          });
        } else {
          alert("Có lỗi xảy ra khi thêm sinh viên.");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      }
    };
  
    return (
      <div className="right_col" role="main">
        <div className="page-title">
          <div className="title_left">
            <h3>Thêm Sinh Viên</h3>
          </div>
        </div>
  
        <div className="row justify-content-center">
          <div className="col-md-8 col-sm-12">
            <div className="x_panel">
              <div className="x_title">
                <h2>Thông Tin Sinh Viên</h2>
              </div>
              <div className="x_content">
                <form onSubmit={handleSubmit}>
                  {/* Mã người dùng */}
                  <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                      Mã Người Dùng<span className="required">*</span>
                    </label>
                    <div className="col-md-9 col-sm-9">
                      <select
                        className="form-control"
                        name="mand"
                        value={formData.mand}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Chọn người dùng</option>
                        {availableStudents.map((student) => (
                          <option key={student.mand} value={student.mand}>
                            {student.mand} - {student.hond} {student.tennd}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
  
                  {/* Mã sinh viên */}
                  <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                      Mã Sinh Viên<span className="required">*</span>
                    </label>
                    <div className="col-md-9 col-sm-9">
                      <input
                        className="form-control"
                        name="masinhvien"
                        value={formData.masinhvien}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
  
                  {/* Submit and Reset */}
                  <div className="ln_solid">
                    <div className="form-group">
                      <div className="col-md-9 offset-md-3">
                        <button type="submit" className="btn btn-primary">
                          Thêm Sinh Viên
                        </button>
                        <button
                          type="reset"
                          className="btn btn-success"
                          onClick={() =>
                            setFormData({
                              mand: "",
                              masinhvien: "",
                            })
                          }
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};  

export default AddStudent;