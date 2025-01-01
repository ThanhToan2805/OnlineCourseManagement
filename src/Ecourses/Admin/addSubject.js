import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddSubject = () => {
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
      const response = await fetch("http://localhost:5000/api/chude", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Chủ đề đã được thêm thành công!");
        navigate('/admin/subjects');
        setFormData({
          tencd: "",
          anhcd: "",
        });
      } else {
        alert("Có lỗi xảy ra khi thêm chủ đê.");
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
          <h3>Thêm Chủ Đề</h3>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-sm-12">
          <div className="x_panel">
            <div className="x_title">
              <h2>Thông Tin Chủ đề</h2>
            </div>
            <div className="x_content">
              <form onSubmit={handleSubmit}>
                {/* Tên chủ đề */}
                <div className="field item form-group">
                  <label className="col-form-label col-md-3 col-sm-3 label-align">
                    Tên chủ đề<span className="required">*</span>
                  </label>
                  <div className="col-md-9 col-sm-9">
                    <input
                      className="form-control"
                      name="tencd"
                      value={formData.tencd}
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
                      name="anhcd"
                      value={formData.anhcd}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Submit và Reset */}
                <div className="ln_solid">
                  <div className="form-group">
                    <div className="col-md-9 offset-md-3">
                      <button type="submit" className="btn btn-primary">
                        Thêm Chủ Đề
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

export default AddSubject;