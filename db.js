import mysql from 'mysql2/promise';

const connectDb = async () => {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ecourses',
        port: 3306
    });

    return db;
};

export default connectDb;

// db.connect((err) => {
//     if(err) {
//         console.error('Error connecting to the database: ', err);
//         return;
//     }
//     console.log('Connected to MySQL database');
// });

// module.exports = db;