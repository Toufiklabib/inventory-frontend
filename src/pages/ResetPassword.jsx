import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import auth from '../firebase/firebase.config';
import toast from 'react-hot-toast';
import { FiSave } from 'react-icons/fi';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    
    const queryParams = new URLSearchParams(location.search);
    const actionCode = queryParams.get('oobCode');

    const [newPassword, setNewPassword] = useState('');
    const [isValidCode, setIsValidCode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

   
    useEffect(() => {
        if (!actionCode) {
            setError('Invalid password reset link.');
            setLoading(false);
            return;
        }

        verifyPasswordResetCode(auth, actionCode)
            .then((email) => {
                console.log('Code is valid, user email:', email);
                setIsValidCode(true);
                setLoading(false);
            })
            .catch(() => {
                setError('The password reset link is invalid or has expired.');
                toast.error('Invalid or expired link.');
                setLoading(false);
            });
    }, [actionCode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            toast.error('New password must be at least 6 characters long.');
            return;
        }

        confirmPasswordReset(auth, actionCode, newPassword)
            .then(() => {
                toast.success('Password has been reset successfully! Please login.');
                navigate('/login');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    if (loading) {
        return <div className="text-white text-center p-10">Verifying link...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center p-10">{error} <Link to="/login" className="underline">Go to Login</Link></div>;
    }

    return (
        <div>
            <header className="bg-blue-600 shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white text-center">
                        Reset Your Password
                    </h1>
                </div>
            </header>
            <main className="max-w-md mx-auto p-4 sm:p-6 lg:p-8">
                {isValidCode ? (
                    <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-slate-300 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                                    <FiSave className="mr-2" />
                                    Save New Password
                                </button>
                            </div>
                        </form>
                    </div>
                ) : null}
            </main>
        </div>
    );
};

export default ResetPassword;