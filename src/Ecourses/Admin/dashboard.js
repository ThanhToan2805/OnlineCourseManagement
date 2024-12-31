import React from 'react';

const Dashboard = () => {
    return (
        <div className="container mt-5">
            <h1>Dashboard</h1>
            <p>Welcome to the admin panel. Here you can manage users, products, and view analytics.</p>

            <div className="row">
                <div className="col-md-4">
                    <div className="card bg-light mb-3">
                        <div className="card-header">Users</div>
                        <div className="card-body">
                            <h5 className="card-title">Manage Users</h5>
                            <p className="card-text">View, edit, or remove users from the platform.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-light mb-3">
                        <div className="card-header">Products</div>
                        <div className="card-body">
                            <h5 className="card-title">Manage Products</h5>
                            <p className="card-text">Add, edit, or remove products in the catalog.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-light mb-3">
                        <div className="card-header">Orders</div>
                        <div className="card-body">
                            <h5 className="card-title">View Orders</h5>
                            <p className="card-text">Track and manage customer orders.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;