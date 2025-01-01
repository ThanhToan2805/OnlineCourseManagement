import React from 'react';
import {Route, Routes } from 'react-router-dom';
import AdminNavbar from './adminNavbar.js';
import Dashboard from './dashboard.js';
import Users from './users.js';
import AddUser from './addUser.js';
import Courses from './courses.js';
import AddCourse from './addCourse.js';
import Students from './students.js';
import AddStudent from './addStudent.js';
import Teachers from './teachers.js';
import AddTeacher from './addTeacher.js';
import Subjects from './subjects.js';
import AddSubject from './addSubject.js';

const AdminIndex = () => {
    return (
        <>
            <AdminNavbar />
            <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="courses" element={<Courses />} />
                <Route path="addUser" element={<AddUser />}/>
                <Route path="addCourse" element={<AddCourse />}/>
                <Route path="students" element={<Students />}/>
                <Route path="addStudent" element={<AddStudent />}/>
                <Route path="teachers" element={<Teachers />}/>
                <Route path="addTeachers" element={<AddTeacher />}/>
                <Route path="subjects" element={<Subjects />}/>
                <Route path="addSubject" element={<AddSubject />}/>
            </Routes>
        </>
    );
};

export default AdminIndex;