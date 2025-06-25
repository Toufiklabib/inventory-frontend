import React, { createContext } from 'react';
import api from '../../api/api'; 

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    
   
    const addNotification = async (message) => {
        try {
            const notificationData = { message: message };
            
            const response = await api.post('/notifications', notificationData);
            console.log('Notification saved to DB:', response.data);
        } catch (error) {
            console.error("Failed to save notification:", error);
        }
    };

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};