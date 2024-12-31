import React, { useState } from "react";

const AddUser = () => {
  // State để lưu trữ các giá trị của form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    hond: "",
    tennd: "",
    sodt: "",
    diachi: "",
    gioitinh: "Nam", // Mặc định là Nam
    ngaysinh: "",
    vaitro: "Sinh viên", // Mặc định là Sinh viên
    anhnd: "",
    taovaongay: "", // Không cần gửi trường này
  });

  // State để quản lý việc hiển thị mật khẩu
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);

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

    // Kiểm tra nếu password và repeatPassword khớp
    if (formData.password !== formData.repeatPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    // Gọi API để thêm người dùng
    try {
      const response = await fetch("http://localhost:5000/api/nguoidung", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Người dùng đã được thêm thành công!");
        // Reset form sau khi thêm thành công (nếu cần)
        setFormData({
          email: "",
          password: "",
          repeatPassword: "",
          hond: "",
          tennd: "",
          sodt: "",
          diachi: "",
          gioitinh: "Nam", // Reset lại giới tính mặc định
          ngaysinh: "",
          vaitro: "Sinh viên", // Reset lại vai trò mặc định
          anhnd: "",
          taovaongay: "", // Không cần gửi lại trường này
        });
      } else {
        alert("Có lỗi xảy ra khi thêm người dùng.");
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
            <h3>Thêm Người Dùng</h3>
            </div>
        </div>

        <div className="row justify-content-center">
            <div className="col-md-8 col-sm-12">
            <div className="x_panel">
                <div className="x_title">
                <h2>Thông Tin Cá Nhân</h2>
                <div className="clearfix"></div>
                </div>
                <div className="x_content">
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                        Email<span className="required">*</span>
                    </label>
                    <div className="col-md-9 col-sm-9">
                        <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    </div>

                    {/* Mật khẩu */}
                    <div className="field item form-group position-relative">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                        Mật khẩu<span className="required">*</span>
                    </label>
                    <div className="col-md-9 col-sm-9">
                        <input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        />
                        <i
                        id="togglePassword"
                        className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"} position-absolute`}
                        style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        ></i>
                    </div>
                    </div>

                    {/* Nhập lại mật khẩu */}
                    <div className="field item form-group position-relative">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                        Nhập lại mật khẩu<span className="required">*</span>
                    </label>
                    <div className="col-md-9 col-sm-9">
                        <input
                        id="confirm_password"
                        type={repeatPasswordVisible ? "text" : "password"}
                        className="form-control"
                        name="repeatPassword"
                        value={formData.repeatPassword}
                        onChange={handleChange}
                        required
                        />
                        <i
                        id="toggleRepeatPassword"
                        className={`fa ${repeatPasswordVisible ? "fa-eye-slash" : "fa-eye"} position-absolute`}
                        style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                        onClick={() => setRepeatPasswordVisible(!repeatPasswordVisible)}
                        ></i>
                    </div>
                    </div>

                    {/* Họ */}
                    <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                        Họ và đệm<span className="required">*</span>
                    </label>
                    <div className="col-md-9 col-sm-9">
                        <input
                        className="form-control"
                        name="hond"
                        value={formData.hond}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    </div>

                    {/* Tên */}
                    <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                        Tên<span className="required">*</span>
                    </label>
                    <div className="col-md-9 col-sm-9">
                        <input
                        className="form-control"
                        name="tennd"
                        value={formData.tennd}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    </div>

                    {/* Số điện thoại */}
                    <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                        Số điện thoại
                    </label>
                    <div className="col-md-9 col-sm-9">
                        <input
                        className="form-control"
                        name="sodt"
                        value={formData.sodt}
                        onChange={handleChange}
                        />
                    </div>
                    </div>

                    {/* Địa chỉ */}
                    <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                        Địa chỉ
                    </label>
                    <div className="col-md-9 col-sm-9">
                        <input
                        type="text"
                        className="form-control"
                        name="diachi"
                        value={formData.diachi}
                        onChange={handleChange}
                        />
                    </div>
                    </div>

                    {/* Giới tính */}
                    <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                        Giới Tính
                    </label>
                    <div className="col-md-9 col-sm-9">
                        <select
                        className="form-control"
                        name="gioitinh"
                        value={formData.gioitinh}
                        onChange={handleChange}
                        >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                    </div>

                    {/* Ngày sinh */}
                    <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                        Ngày Sinh
                    </label>
                    <div className="col-md-9 col-sm-9">
                        <input
                        type="date"
                        className="form-control"
                        name="ngaysinh"
                        value={formData.ngaysinh}
                        onChange={handleChange}
                        />
                    </div>
                    </div>

                    {/* Vai trò */}
                    <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                        Vai Trò<span className="required">*</span>
                    </label>
                    <div className="col-md-9 col-sm-9">
                        <select
                        className="form-control"
                        name="vaitro"
                        value={formData.vaitro}
                        onChange={handleChange}
                        required
                        >
                        <option value="Quản trị viên">Quản trị viên</option>
                        <option value="Giảng viên">Giảng viên</option>
                        <option value="Sinh viên">Sinh viên</option>
                        </select>
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
                        name="anhnd"
                        value={formData.anhnd}
                        onChange={handleChange}
                        />
                    </div>
                    </div>

                    {/* Submit and Reset */}
                    <div className="ln_solid">
                        <div className="form-group">
                            <div className="col-md-9 offset-md-3">
                            <button type="submit" className="btn btn-primary">
                                Thêm Người Dùng
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

export default AddUser;