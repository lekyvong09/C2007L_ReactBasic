import React from 'react';

const AuthContext = React.createContext({
    storeIsLoggedIn: false,
    onLogout: () => {}
});

export default AuthContext;