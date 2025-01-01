import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDb from './db.js';

const app = express();
const port = 5000;

const generateStudentCode = async (db) => {
    const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
    const yearSuffix = currentYear.toString().slice(-2); // Lấy 2 chữ số cuối của năm

    // Tạo phần ngẫu nhiên gồm 4 chữ số
    let randomCode = Math.floor(1000 + Math.random() * 9000); // Tạo số ngẫu nhiên từ 1000 đến 9999
    let studentCode = `${yearSuffix}0000${randomCode}`;

    let result;
    // Kiểm tra nếu mã sinh viên đã tồn tại trong cơ sở dữ liệu
    do {
        result = await db.query('SELECT * FROM sinhvien WHERE masinhvien = ?', [studentCode]);
        if (result.length === 0) {
            break; // Nếu không có mã trùng, thoát khỏi vòng lặp
        }
        // Nếu có mã trùng, tạo lại mã mới
        randomCode = Math.floor(1000 + Math.random() * 9000); // Tạo lại số ngẫu nhiên
        studentCode = `${yearSuffix}0000${randomCode}`;
    } while (result.length > 0);

    return studentCode; // Trả về mã sinh viên không bị trùng
};

app.use(cors());
app.use(bodyParser.json());

// API lấy danh sách khóa họchọc
app.get('/api/khoahoc', async (req, res) => {
    try {
        const db = await connectDb();
        const query = `
            SELECT k.makh, k.tenkh, k.ngaybatdau, k.ngayketthuc, k.thoigian, k.lop, k.anh, COUNT(dk.id_sv) AS so_luong_sinhvien
            FROM khoahoc k LEFT JOIN dangky_khoahoc dk ON k.makh = dk.id_kh
            GROUP BY k.makh;
        `;
        const [results] = await db.query(query);
        res.json(results);
        db.end();
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).json({ error: err.message });
    }
});

// API thực hiện chức năng thêm khóa họchọc
app.post('/api/khoahoc', async (req, res) => {
    const { tenkh, giakh, ngaybatdau, ngayketthuc, thoigian, id_gv, macd, lop, anh } = req.body;
    try {
        const db = await connectDb();
        const result = await db.query(
            'INSERT INTO khoahoc (tenkh, giakh, ngaybatdau, ngayketthuc, thoigian, id_gv, macd, lop, anh) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [tenkh, giakh, ngaybatdau, ngayketthuc, thoigian, id_gv, macd, lop, anh]
        );
        res.json({
            makh: result.insertId, // Chỉ số ID của người dùng vừa thêm
            tenkh,
            giakh,
            ngaybatdau,
            ngayketthuc,
            thoigian,
            id_gv,
            macd,
            lop,
            anh
        });
        db.end();
    } catch (err) {
        console.error('Error adding course:', err);
        res.status(500).json({ error: err.message });
    }
});

// Hiển thị khóa học theo mãmã
app.get('/api/khoahoc/:macd', async (req, res) => {
    const macd = req.params.macd;
    console.log('Received macd:', macd);
    
    try {
        const db = await connectDb();
        const [results] = await db.query('SELECT * FROM khoahoc WHERE macd = ?', [macd]);

        console.log('Results:', results);  // Kiểm tra kết quả truy vấn
        
        if (results.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy khóa học cho chủ đề này." });
        }
        res.json(results);
        db.end();
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).json({ error: err.message });
    }
});


// API lấy danh sách chủ đềđề
app.get('/api/chude', async (req, res) => {
    try {
        const db = await connectDb();
        const query = `
            SELECT c.macd, c.tencd, c.anhcd, COUNT(k.makh) AS so_luong_mon
            FROM chude c
            LEFT JOIN khoahoc k ON c.macd = k.macd
            GROUP BY c.macd;
        `;
        const [results] = await db.query(query);
        res.json(results);
        db.end();
    } catch (err) {
        console.error('Error fetching topics:', err);
        res.status(500).json({ error: err.message });
    }
});

// API thực hiện chức năng thêm chủ đềđề
app.post('/api/chude', async (req, res) => {
    const { tencd, anhcd} = req.body;
    try {
        const db = await connectDb();
        const result = await db.query(
            'INSERT INTO chude (tencd, anhcd) VALUES (?, ?)',
            [tencd, anhcd]
        );
        res.json({
            macd: result.insertId,
            tencd,
            anhcd
        });
        db.end();
    } catch (err) {
        console.error('Error adding course:', err);
        res.status(500).json({ error: err.message });
    }
});


// API lấy danh sách giảng viên
app.get('/api/giangvien', async (req, res) => {
    try {
        const db = await connectDb();
        const [results] = await db.query('SELECT gv.*, nd.email, nd.password, nd.hond, nd.tennd, nd.anhnd, nd.vaitro FROM giangvien gv JOIN nguoidung nd ON gv.mand = nd.mand');
        res.json(results);
        db.end();
    } catch (err) {
        console.error('Error fetching instructors:', err);
        res.status(500).json({ error: err.message });
    }
});

// API kiểm tra các giảng viên chưa có trong bảng giangvien
app.get('/api/giangvien/available', async (req, res) => {
    try {
      const db = await connectDb();
      const [results] = await db.query(`
        SELECT nd.mand, nd.hond, nd.tennd
        FROM nguoidung nd
        LEFT JOIN giangvien gv ON nd.mand = gv.mand
        WHERE nd.vaitro = 'Giảng viên' AND gv.mand IS NULL
      `);
      res.json(results);
      db.end();
    } catch (err) {
      console.error('Error fetching available teachers:', err);
      res.status(500).json({ error: err.message });
    }
});

// API thực hiện chức năng thêm giảng viên
app.post('/api/giangvien', async (req, res) => {
    const { mand, magiangvien, khoa, anhgv } = req.body;
    
    if (!mand || !magiangvien || !khoa || !anhgv) {
        return res.status(400).json({ message: "Thiếu thông tin giảng viên" });
    }

    try {
        const db = await connectDb();
        
        // Kiểm tra xem giảng viên đã tồn tại chưa
        const [existingTeacher] = await db.query(
            'SELECT * FROM giangvien WHERE mand = ?',
            [mand]
        );

        if (existingTeacher.length > 0) {
            return res.status(400).json({ message: "Giảng viên này đã tồn tại trong hệ thống." });
        }

        // Thêm giảng viên mới
        const result = await db.query(
            'INSERT INTO giangvien (mand, magiangvien, khoa, anhgv) VALUES (?, ?, ?, ?)',
            [mand, magiangvien, khoa, anhgv]
        );
        
        res.json({
            message: 'Giảng viên đã được thêm thành công!',
            data: {
                id: result.insertId,
                mand,
                magiangvien,
                khoa,
                anhgv,
            }
        });

    } catch (err) {
        console.error('Error adding teacher:', err);
        res.status(500).json({ error: err.message });
    }
});


// API lấy danh sách sinh viên
app.get('/api/sinhvien', async (req, res) => {
    try {
        const db = await connectDb();
        const query = `
            SELECT 
                sv.mand, 
                sv.id, 
                sv.masinhvien, 
                COUNT(dk.id_kh) AS so_luong_khoahoc,
                nd.email, 
                nd.password, 
                nd.hond, 
                nd.tennd, 
                nd.anhnd, 
                nd.vaitro
            FROM sinhvien sv
            LEFT JOIN dangky_khoahoc dk ON sv.id = dk.id_sv
            JOIN nguoidung nd ON sv.mand = nd.mand
            GROUP BY sv.id, sv.mand, nd.email, nd.password, nd.hond, nd.tennd, nd.anhnd, nd.vaitro;
        `;
        const [results] = await db.query(query);
        res.json(results);
        db.end();
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: err.message });
    }
});

// API kiểm tra các sinh viên chưa có trong bảng sinhvien
app.get('/api/sinhvien/available', async (req, res) => {
    try {
      const db = await connectDb();
      const [results] = await db.query(`
        SELECT nd.mand, nd.hond, nd.tennd
        FROM nguoidung nd
        LEFT JOIN sinhvien sv ON nd.mand = sv.mand
        WHERE nd.vaitro = 'Sinh viên' AND sv.mand IS NULL
      `);
      res.json(results);
      db.end();
    } catch (err) {
      console.error('Error fetching available students:', err);
      res.status(500).json({ error: err.message });
    }
});

// API thực hiện chức năng thêm sinh viên
app.post('/api/sinhvien', async (req, res) => {
    const { mand, masinhvien } = req.body;
    
    if (!mand || !masinhvien) {
        return res.status(400).json({ message: "Thiếu thông tin sinh viên" });
    }

    try {
        const db = await connectDb();
        
        // Kiểm tra xem sinh viên đã tồn tại chưa
        const [existingStudent] = await db.query(
            'SELECT * FROM sinhvien WHERE mand = ?',
            [mand]
        );

        if (existingStudent.length > 0) {
            return res.status(400).json({ message: "Sinh viên này đã tồn tại trong hệ thống." });
        }

        // Thêm sinh viên mới
        const result = await db.query(
            'INSERT INTO sinhvien (mand, masinhvien) VALUES (?, ?)',
            [mand, masinhvien]
        );
        
        res.json({
            message: 'Sinh viên đã được thêm thành công!',
            data: {
                id: result.insertId,
                mand,
                masinhvien,
            }
        });

    } catch (err) {
        console.error('Error adding student:', err);
        res.status(500).json({ error: err.message });
    }
});


// API đăng ký
app.post('/api/signup', async (req, res) => {
    const { hond, tennd, email, password } = req.body;

    try {
        const db = await connectDb();

        // Kiểm tra xem email đã được đăng ký chưa
        const [existingEmailResult] = await db.query('SELECT * FROM nguoidung WHERE email = ?', [email]);
        if (existingEmailResult.length > 0) {
            return res.status(400).json({ success: false, message: 'Email này đã được đăng ký. Vui lòng chọn email khác.' });
        }

        // Insert người dùng mới vào bảng nguoidung
        const [result] = await db.query('INSERT INTO nguoidung (hond, tennd, email, password) VALUES (?, ?, ?, ?)', [hond, tennd, email, password]);

        // Lấy ID người dùng vừa đăng ký
        // const userId = result.insertId;

        // Tạo mã sinh viên tự động (kiểm tra trùng)
        // const masinhvien = await generateStudentCode(db);

        // Thêm sinh viên vào bảng sinhvien
        // const [insertStudentResult] = await db.query('INSERT INTO sinhvien (mand, masinhvien) VALUES (?, ?)', [userId, masinhvien]);

        // Trả về thông báo thành công
        // res.status(200).json({ success: true, message: 'Đăng ký tài khoản người dùng và sinh viên thành công', userId: userId, masinhvien: masinhvien });
        res.status(200).json({ success: true, message: 'Đăng ký tài khoản người dùng' });

        db.end();
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ success: false, message: 'Xảy ra lỗi trong quá trình đăng ký.' });
    }
});


// API đăng nhập
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await connectDb();

        // Kiểm tra người dùng tồn tại
        const [userResult] = await db.query('SELECT * FROM nguoidung WHERE email = ?', [email]);
        if (userResult.length === 0) {
            return res.status(404).json({ success: false, message: 'Email chưa được đăng ký.' });
        }

        const user = userResult[0];

        // Kiểm tra mật khẩu
        if (password === user.password) {
            // Nếu mật khẩu đúng, kiểm tra vai trò của người dùng
            const role = user.vaitro;  // Vai trò người dùng (ví dụ: 'Quản trị viên', 'Giảng viên', 'Sinh viên')

            // Trả về kết quả đăng nhập và vai trò của người dùng
            return res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công',
                email: user.email,
                tennd: user.tennd,
                vaitro: role  // Thêm vai trò vào phản hồi
            });
        } else {
            return res.status(401).json({ success: false, message: 'Mật khẩu không chính xác' });
        }

        db.end();
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ success: false, message: 'Lỗi hệ thống. Vui lòng thử lại.' });
    }
});


// API hiển thị khóa học theo id sinh viên
app.get('/api/dangky_khoahoc/:id_sv', async (req, res) => {
    const { idSv } = req.params.id_sv;

    try {
        const db = await connectDb();

        // Lây danh sách khóa họ đã đăng ký
        const [registeredCourses] = await db.query(`
            SELECT kh.tenkh, kh.anh, kh.thoigian, kh.ngaybatdau, kh.ngayketthuc
            FROM dangky_khoahoc dk
            JOIN khoahoc kh ON dk.id_kh = kh.makh
            WHERE dk.id_sv = ?`, [idSv]);

        if (registeredCourses.length === 0) {
            return res.status(404).json({ message: 'Sinh viên chưa đăng ký khóa học nào.' });
        }

        res.json(registeredCourses);
        db.end();
    } catch (error) {
        console.error('Error fetching registered courses:', error);
        res.status(500).json({ message: 'Xảy ra lỗi khi lấy danh sách khóa học đã đăng ký.' });
    }
});

// API thực hiện chức năng đăng ký khóa học
app.post('/api/dangky_khoahoc', async (req, res) => {
    const { courseId, email } = req.body;
    console.log('Received data:', { courseId, email });

    if (!email) {
        return res.status(400).json({ message: 'Email là bắt buộc.' });
    }

    try {
        const db = await connectDb();
        // Kiểm tra xem người dùng có tồn tại và là sinh viên không
        const [userResult] = await db.query(`
            SELECT sv.id
            FROM nguoidung nd
            JOIN sinhvien sv ON nd.mand = sv.mand
            WHERE nd.email = ?`, [email]);

        if (userResult.length === 0) {
            return res.status(404).json({ message: 'Sinh viên không tồn tại.' });
        }

        const studentId = userResult[0].id;
        console.log('Student ID:', studentId);

        // Kiểm tra xem sinh viên đã đăng ký khóa học chưa
        const [existingRegistrationResult] = await db.query(
            'SELECT * FROM dangky_khoahoc WHERE id_sv = ? AND id_kh = ?',
            [studentId, courseId]
        );

        if (existingRegistrationResult.length > 0) {
            return res.status(400).json({ message: 'Bạn đã đăng ký khóa học này.' });
        }

        // Đăng ký khóa học
        const [result] = await db.query('INSERT INTO dangky_khoahoc (id_sv, id_kh) VALUES (?, ?)', [studentId, courseId]);
        console.log('Insert result:', result);

        // Trả về danh sách khóa học đã đăng ký
        const [registeredCourses] = await db.query(`
            SELECT kh.tenkh, kh.anh, kh.thoigian, kh.ngaybatdau, kh.ngayketthuc
            FROM dangky_khoahoc dk
            JOIN khoahoc kh ON dk.id_kh = kh.makh
            WHERE dk.id_sv = ?`, [studentId]);

        res.status(200).json({
            message: 'Đăng ký thành công!',
            registeredCourses: registeredCourses
        });
    } catch (error) {
        console.error('Error during course registration:', error);
        res.status(500).json({ message: 'Xảy ra lỗi khi đăng ký khóa học.' });
    }
});


// API lấy danh sách người dùng
app.get('/api/nguoidung', async (req, res) => {
    try {
        const db = await connectDb();
        const [results] = await db.query('SELECT * FROM nguoidung');
        res.json(results);
        db.end();
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: err.message });
    }
});

// API xóa người dùng theo ID
app.delete('/api/nguoidung/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const db = await connectDb();
        
        // Xóa người dùng theo ID
        const [result] = await db.query('DELETE FROM nguoidung WHERE mand = ?', [userId]);
        
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Xóa người dùng thành công' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }

        db.end();
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: err.message });
    }
});

// API thực hiện chức năng thêm người dùng
app.post('/api/nguoidung', async (req, res) => {
    const { email, password, hond, tennd, sodt, diachi, gioitinh, ngaysinh, vaitro, anhnd } = req.body;
    try {
        const db = await connectDb();
        const result = await db.query(
            'INSERT INTO nguoidung (email, password, hond, tennd, sodt, diachi, gioitinh, ngaysinh, vaitro, anhnd) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [email, password, hond, tennd, sodt, diachi, gioitinh, ngaysinh, vaitro, anhnd]
        );
        res.json({
            mand: result.insertId, // Chỉ số ID của người dùng vừa thêm
            email,
            password,
            hond,
            tennd,
            sodt,
            diachi,
            ngaysinh,
            vaitro,
            anhnd
        });
        db.end();
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ error: err.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});