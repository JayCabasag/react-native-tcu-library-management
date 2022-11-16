import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    
    const login = (idNumber, email, password, type) => {
        setUser({idNumber, email, type})
    }

    const logout = () => {
        setUser(null)
    }
    
    return (
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    );
};