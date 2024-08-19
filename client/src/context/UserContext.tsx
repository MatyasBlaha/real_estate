import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface UserContextType {
    user: string | null;
    setUser: Dispatch<SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
    initialUser: string | null;
}

const UserProvider: React.FC<UserProviderProps> = ({ children, initialUser }) => {
    const [user, setUser] = useState<string | null>(initialUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
