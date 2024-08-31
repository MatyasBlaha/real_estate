// src/context/UserContext.tsx

import React, { createContext, useContext, useState } from 'react';

// Define the user interface (based on your application)
interface User {
    id: string;
    username: string;
    // other fields as needed
}

// Define the context value type
interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
};

// UserContextProvider component
export const UserContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
