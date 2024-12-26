const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const bcrypt = require('bcryptjs');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/khoahoc', (req, res) => {
    const sql = 'SELECT * FROM khoahoc';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json(results);
    });
});

app.get('/api/chude', (req, res) => {
    const sql = 'SELECT * FROM chude';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json(results);
    });
});

app.get('/api/giangvien', (req, res) => {
    const sql = 'SELECT gv.*, nd.hond, nd.tennd, nd.anhnd, nd.vaitro FROM giangvien gv JOIN nguoidung nd ON gv.mand = nd.mand';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json(results);
    });
});

app.post('/api/signup', (req, res) => {
    const { hond, tennd, email, password } = req.body;

    const checkEmailQuery = 'SELECT * FROM nguoidung WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, result) => {
        if (err) {
            return res.status(500).json({success: false, message: 'Xảy ra lỗi trong quá trình kiểm tra email'})
        }

        if (result.length > 0) {
            // Nếu email đã được đăng ký
            console.log('Email đã tồn tại:', email);
            return res.status(400).json({success: false, message: 'Email này đã được đăng ký. Vui lòng chọn email khác.'})
        }

        const query = 'INSERT INTO nguoidung (hond, tennd, email, password) VALUES (?, ?, ?, ?)';
        db.query(query, [hond, tennd, email, password], (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Xảy ra lỗi trong quá trình lưu dữ liệu người dùng xuống database' });
            }
            res.status(200).json({ success: true, message: 'Đăng ký tài khoản người dùng thành công' });
        });
    })
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Kiểm tra email đã đăng ký chưa
    const checkEmailQuery = 'SELECT * FROM nguoidung WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, result) => {
        if (err) {
            console.error('Lỗi khi kiểm tra email:', err);
            return res.status(500).json({ success: false, message: 'Lỗi hệ thống. Vui lòng thử lại.' });
        }

        if (result.length === 0) {
            // Nếu email chưa đăng ký
            return res.status(404).json({ success: false, message: 'Email chưa được đăng ký.' });
        }

        const user = result[0];

        // So sánh mật khẩu người dùng nhập với mật khẩu lưu trữ
        if (password === user.password) {
            // Nếu mật khẩu chính xác
            return res.status(200).json({ success: true, message: 'Đăng nhập thành công', email: user.email, tennd: user.tennd });
        } else {
            // Nếu mật khẩu sai
            return res.status(401).json({ success: false, message: 'Mật khẩu không chính xác' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});