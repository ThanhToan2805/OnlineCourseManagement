import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTeacher = () => {
    const navigate = useNavigate();
    // State để lưu trữ các giá trị của form
    const [formData, setFormData] = useState({
      mand: "", // Mã người dùng (tài khoản người dùng có vai trò giảng viên)
      magiangvien: "",
      khoa: "",
      anhgv: "",
    });
  
    // State để lưu trữ danh sách giảng viên chưa có
    const [availableTeachers, setAvailableTeachers] = useState([]);
  
    // Lấy danh sách giảng viên chưa có
    useEffect(() => {
      const fetchAvailableTeachers = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/giangvien/available");
          const data = await response.json();
          setAvailableTeachers(data);
        } catch (error) {
          console.error("Lỗi khi tải danh sách người dùng:", error);
        }
      };
      
      fetchAvailableTeachers();
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
        const response = await fetch("http://localhost:5000/api/giangvien", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          alert("Giảng viên đã được thêm thành công!");
          navigate('/admin/teachers');
          setFormData({
            mand: "",
            magiangvien: "",
            khoa: "",
            anhgv: "",
          });
        } else {
          alert("Có lỗi xảy ra khi thêm giảng viên.");
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
            <h3>Thêm Giảng Viên</h3>
          </div>
        </div>
  
        <div className="row justify-content-center">
          <div className="col-md-8 col-sm-12">
            <div className="x_panel">
              <div className="x_title">
                <h2>Thông Tin Giảng Viên</h2>
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
                        {availableTeachers.map((teacher) => (
                          <option key={teacher.mand} value={teacher.mand}>
                            {teacher.hond} {teacher.tennd}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
  
                  {/* Mã giảng viên */}
                  <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                      Mã Giảng Viên<span className="required">*</span>
                    </label>
                    <div className="col-md-9 col-sm-9">
                      <input
                        className="form-control"
                        name="magiangvien"
                        value={formData.magiangvien}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
  
                  {/* Khoa */}
                  <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                      Khoa<span className="required">*</span>
                    </label>
                    <div className="col-md-9 col-sm-9">
                      <input
                        className="form-control"
                        name="khoa"
                        value={formData.khoa}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
  
                  {/* Ảnh Giảng Viên */}
                  <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                      Ảnh
                    </label>
                    <div className="col-md-9 col-sm-9">
                      <input
                        className="form-control"
                        name="anhgv"
                        value={formData.anhgv}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
  
                  {/* Submit and Reset */}
                  <div className="ln_solid">
                    <div className="form-group">
                      <div className="col-md-9 offset-md-3">
                        <button type="submit" className="btn btn-primary">
                          Thêm Giảng Viên
                        </button>
                        <button
                          type="reset"
                          className="btn btn-success"
                          onClick={() =>
                            setFormData({
                              mand: "",
                              magiangvien: "",
                              khoa: "",
                              anhgv: "",
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

export default AddTeacher;