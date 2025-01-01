import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenkh: "",
    giakh: "",
    ngaybatdau: "",
    ngayketthuc: "",
    thoigian: "",
    id_gv: "",
    macd: "",
    lop: "",
    anh: "",
  });

  const [giangviens, setGiangviens] = useState([]);
  const [chudes, setChudes] = useState([]);

  // Fetch dữ liệu giảng viên và chủ đề
  useEffect(() => {
    const fetchGiangviens = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/giangvien");
        const data = await response.json();
        setGiangviens(data);
      } catch (error) {
        console.error('Error fetching giangvien:', error);
      }
    };

    const fetchChudes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/chude");
        const data = await response.json();
        setChudes(data);
      } catch (error) {
        console.error('Error fetching chude:', error);
      }
    };

    fetchGiangviens();
    fetchChudes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/khoahoc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Khóa học đã được thêm thành công!");
        navigate('/admin/courses');
        setFormData({
          tenkh: "",
          giakh: "",
          ngaybatdau: "",
          ngayketthuc: "",
          thoigian: "",
          id_gv: "",
          macd: "",
          lop: "",
          anh: "",
        });
      } else {
        alert("Có lỗi xảy ra khi thêm khóa học.");
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
          <h3>Thêm Khóa Học</h3>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-sm-12">
          <div className="x_panel">
            <div className="x_title">
              <h2>Thông Tin Khóa học</h2>
            </div>
            <div className="x_content">
              <form onSubmit={handleSubmit}>
                {/* Tên khóa học */}
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3 label-align">
                    Tên khóa học<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      className="form-control"
                      name="tenkh"
                      value={formData.tenkh}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Giá khóa học */}
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3 label-align">
                    Giá khóa học<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      className="form-control"
                      name="giakh"
                      value={formData.giakh}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Ngày bắt đầu */}
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3 label-align">
                    Ngày bắt đầu<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      name="ngaybatdau"
                      value={formData.ngaybatdau}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Ngày kết thúc */}
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3 label-align">
                    Ngày kết thúc<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      type="date"
                      className="form-control"
                      name="ngayketthuc"
                      value={formData.ngayketthuc}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Thời gian */}
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3 label-align">
                    Thời gian<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      type="time"
                      className="form-control"
                      name="thoigian"
                      value={formData.thoigian}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Giảng viên (id_gv) */}
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3 label-align">
                    Giảng viên<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <select
                      className="form-control"
                      name="id_gv"
                      value={formData.id_gv}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Chọn giảng viên</option>
                      {giangviens.map((gv) => (
                        <option key={gv.id} value={gv.id}>
                          {gv.magiangvien} - {gv.hond} {gv.tennd}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Chủ đề (macd) */}
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3 label-align">
                    Chủ đề<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <select
                      className="form-control"
                      name="macd"
                      value={formData.macd}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Chọn chủ đề</option>
                      {chudes.map((cd) => (
                        <option key={cd.macd} value={cd.macd}>
                          {cd.macd} - {cd.tencd}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Lớp */}
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3 label-align">
                    Lớp<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      className="form-control"
                      name="lop"
                      value={formData.lop}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Ảnh */}
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3 label-align">
                    Ảnh
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      className="form-control"
                      name="anh"
                      value={formData.anh}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Submit và Reset */}
                <div className="ln_solid">
                  <div className="form-group">
                    <div className="col-md-9 offset-md-3">
                      <button type="submit" className="btn btn-primary">
                        Thêm Khóa Học
                      </button>
                      <button
                        type="reset"
                        className="btn btn-success"
                        onClick={() => setFormData({})}
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

export default AddCourse;