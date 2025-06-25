import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import toast from 'react-hot-toast';
import { FiBell } from 'react-icons/fi';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        
        api.get('/notifications')
            .then(response => {
                setNotifications(response.data);
            })
            .catch(error => {
                console.error("Failed to fetch notifications:", error);
                toast.error("Could not load notifications.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center text-white p-10">Loading Notifications...</div>;
    }

    return (
        <div>
            <header className="bg-purple-600 shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white text-center">
                        Notifications
                    </h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                    {notifications.length === 0 ? (
                        <p className="text-center text-slate-400">You have no new notifications.</p>
                    ) : (
                        <ul className="space-y-4">
                            {notifications.map(notif => (
                                <li key={notif._id} className="bg-slate-700 p-4 rounded-md flex items-start space-x-4">
                                    <FiBell className="text-purple-400 mt-1 flex-shrink-0" size={20} />
                                    <div>
                                        <p className="text-white">{notif.message}</p>
                                        <p className="text-xs text-slate-400 mt-1">{new Date(notif.timestamp).toLocaleString()}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
};

export default NotificationPage;