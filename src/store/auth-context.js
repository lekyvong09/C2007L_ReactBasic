import React from 'react';

const AuthContext = React.createContext({
    storeIsLoggedIn: false,
    token: '',
    onLogout: () => {},
    login: (username, password) => {},
    setToken: (token) => {}
});

export default AuthContext;