import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/NotificationContext/AuthContext';
import toast from 'react-hot-toast';
import { FiLogIn } from 'react-icons/fi';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Login successful!');
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    return (
        <div>
        
            <main className="max-w-md mx-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Sign In</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                                    Password
                                </label>
                                {/* Forgot Password লিঙ্কটি এখানে যোগ করা হয়েছে */}
                              
                            </div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                            >
                                <FiLogIn className="mr-2" />
                                Login
                            </button>
                                  <div className="text-sm mt-1">
                                    <Link to="/forgot" className="font-medium text-blue-400 hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                        </div>
                    </form>
                    <p className="text-center text-slate-400 mt-6">
                        New to this site?{' '}
                        <Link to="/signup" className="font-medium text-blue-400 hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Login;