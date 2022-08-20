import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./auth-context";

function AuthProvider(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    console.log('token', token);
    const isLoggedIn = token ? true : false;

    const loginHandler = async (username, password) => {
        try {
          const response = await fetch('http://localhost:8080/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
              username: username,
              password: password
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          if (response.ok) {
            console.log(data);
            localStorage.setItem('token', data.token);
            setToken(data.token);
            const origin = location.state?.from?.pathname || '/shop';
            navigate(origin);
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    
      const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/');
      }

    return (
        <AuthContext.Provider value={{
            storeIsLoggedIn: isLoggedIn,
            token: token,
            onLogout: logoutHandler,
            login: loginHandler,
            setToken: setToken
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;