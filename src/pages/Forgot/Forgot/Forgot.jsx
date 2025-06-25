import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/NotificationContext/AuthContext';
import toast from 'react-hot-toast';
import { FiMail } from 'react-icons/fi';

const ForgotPassword = () => {
    const { resetPassword } = useContext(AuthContext);
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email address.');
            return;
        }

        resetPassword(email)
            .then(() => {
                toast.success('Password reset email sent! Please check your inbox.');
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    return (
        <div>
          
            <main className="max-w-md mx-auto p-4 sm:p-6 lg:p-8">
            
                <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-white mb-6">Forgot password </h2>
                    <div className="text-center mb-6">
                        <p className="text-slate-300">Enter your email address and we will send you a link to reset your password.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                            >
                                <FiMail className="mr-2" />
                                Send Reset Email
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-slate-400 mt-6">
                        Remembered your password?{' '}
                        <Link to="/login" className="font-medium text-blue-400 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default ForgotPassword;