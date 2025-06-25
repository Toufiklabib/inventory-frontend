import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/NotificationContext/AuthContext';
import toast from 'react-hot-toast';

const Signup = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(() => {
                toast.success('Signup successful!');
                navigate('/login');
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    return (
     
        <div className="max-w-md mx-auto my-10 bg-slate-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-center text-white mb-6">Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className="mb-4">
                    <label className="block text-slate-300 mb-2">Email</label>
                    <input type="email" name="email" className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white" required />
                </div>
                <div className="mb-6">
                    <label className="block text-slate-300 mb-2">Password</label>
                    <input type="password" name="password" className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white" required />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Sign Up</button>
            </form>
            <p className="text-center text-slate-400 mt-4">
                Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
            </p>
        </div>
    );
};

export default Signup;