import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [activeTab, setActiveTab] = useState("Home");

    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/") {
            setActiveTab("Home");
        } else if (location.pathname === "/add") {
            setActiveTab("AddUser");
        } else if (location.pathname === "/about") {
            setActiveTab("About");
        }
    }, [location]);

    return (
        <header className="py-4 overflow-hidden text-white bg-gray-800">
            <nav className="container flex items-center justify-between mx-auto">
                <p className="text-lg font-bold">User Management System</p>
                <div className="flex p-3 text-[17px] text-center">
                    <Link to="/">
                        <div className={activeTab === "Home" ? "active mx-32" : "mx-32"} onClick={() => setActiveTab("Home")}>
                            <p>Home</p>
                        </div>
                    </Link>
                    <Link to="/add">
                        <div className={activeTab === "AddUser" ? "active mx-32" : "mx-32"} onClick={() => setActiveTab("AddUser")}>
                            <p>Add User</p>
                        </div>
                    </Link>
                    <Link to="/about">
                        <div className={activeTab === "About" ? "active mx-32" : "mx-32"} onClick={() => setActiveTab("About")}>
                            <p>About</p>
                        </div>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;