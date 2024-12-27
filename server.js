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

app.get('/api/khoahoc', async (req, res) => {
    try {
        const db = await connectDb();  // Establish connection
        const [results] = await db.query('SELECT * FROM khoahoc');
        res.json(results);
        db.end();
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).json({ error: err.message });
    }
});

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

app.get('/api/chude', async (req, res) => {
    try {
        const db = await connectDb();
        const [results] = await db.query('SELECT * FROM chude');
        res.json(results);
        db.end();
    } catch (err) {
        console.error('Error fetching topics:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/giangvien', async (req, res) => {
    try {
        const db = await connectDb();
        const [results] = await db.query('SELECT gv.*, nd.hond, nd.tennd, nd.anhnd, nd.vaitro FROM giangvien gv JOIN nguoidung nd ON gv.mand = nd.mand');
        res.json(results);
        db.end();
    } catch (err) {
        console.error('Error fetching instructors:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/sinhvien', async (req, res) => {
    const { mand, masinhvien } = req.body;

    try {
        // Thêm sinh viên vào bảng sinhvien
        const query = `
            INSERT INTO sinhvien (mand, masinhvien)
            VALUES (?, ?)
        `;
        const [result] = await db.execute(query, [mand, masinhvien]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Thêm sinh viên thành công' });
        } else {
            res.status(400).json({ message: 'Không thể thêm sinh viên' });
        }
    } catch (error) {
        console.error('Lỗi khi thêm sinh viên:', error);
        res.status(500).json({ message: 'Lỗi hệ thống' });
    }
});

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

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await connectDb();

        // Check if user exists
        const [userResult] = await db.query('SELECT * FROM nguoidung WHERE email = ?', [email]);
        if (userResult.length === 0) {
            return res.status(404).json({ success: false, message: 'Email chưa được đăng ký.' });
        }

        const user = userResult[0];

        // Validate password
        if (password === user.password) {
            return res.status(200).json({ success: true, message: 'Đăng nhập thành công', email: user.email, tennd: user.tennd });
        } else {
            return res.status(401).json({ success: false, message: 'Mật khẩu không chính xác' });
        }

        db.end();
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ success: false, message: 'Lỗi hệ thống. Vui lòng thử lại.' });
    }
});

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});