import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa'; 
import { AuthContext } from '../Context/NotificationContext/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const activeLinkStyle = {
        backgroundColor: '#3b82f6',
        color: 'white',
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Logout successful!');
                navigate('/login');
            })
            .catch(error => toast.error(error.message));
    };

    const handleMobileLogout = () => {
        handleLogout();
        setIsOpen(false);
    };

    // ইউজার লগইন করা থাকলে দেখানোর জন্য কম্পোনেন্ট
    const loggedInUserMenu = (
        <div className="flex items-center space-x-4">
            {/* প্রোফাইল আইকন এবং টুলটিপ */}
            <div className="relative group">
                <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center cursor-pointer ring-2 ring-slate-500 group-hover:ring-blue-500 transition-all">
                    <FaUserCircle className="text-white text-2xl" />
                </div>
                {/* হোভার করলে ইমেইল দেখানোর জন্য টুলটিপ */}
                <div className="absolute top-full right-0 mt-2 w-max bg-slate-700 text-white text-sm rounded-md px-3 py-1 scale-0 group-hover:scale-100 transition-transform origin-top-right z-50">
                    {user?.email}
                </div>
            </div>
            {/* লগআউট বাটন */}
            <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700">
                Logout
            </button>
        </div>
    );

    // লগইন করা না থাকলে দেখানোর জন্য কম্পোনেন্ট
    const loggedOutUserMenu = (
        <NavLink to="/login" className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
            Login
        </NavLink>
    );

    return (
        <nav className="bg-slate-800 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-white">MyApp</Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <NavLink to="/" className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>Home</NavLink>
                            {user && <NavLink to="/allproduct" className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>Products</NavLink>}
                            
                            {/* শর্তসাপেক্ষে মেনু দেখানো হবে */}
                            {user ? loggedInUserMenu : loggedOutUserMenu}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="bg-slate-700 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-600">
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/" className="text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Home</NavLink>
                        {user && <NavLink to="/allproduct" className="text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Products</NavLink>}
                        
                        <div className="border-t border-slate-700 my-2"></div>

                        {user ? (
                            <div className="px-2 py-2">
                                <div className="flex items-center space-x-3 mb-3">
                                    <FaUserCircle className="text-slate-400 text-2xl" />
                                    <span className="text-slate-300 font-medium">{user.email}</span>
                                </div>
                                <button onClick={handleMobileLogout} className="w-full text-left text-red-400 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Logout</button>
                            </div>
                        ) : (
                            <NavLink to="/login" className="text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Login</NavLink>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;