import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminNavbar from './adminNavbar.js';
import Dashboard from './dashboard.js';
import Users from './users.js';
import AddUser from './addUser.js';

const AdminIndex = () => {
    return (
        <>
            <AdminNavbar />
            <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="" element={<div><h1>Products Management</h1></div>} />
                <Route path="addUser" element={<AddUser />}/>
            </Routes>
        </>
    );
};

export default AdminIndex;