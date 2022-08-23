import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./auth-context";
import jwt_decode from "jwt-decode";

let logoutTimer;

const validateAndGetTokenFromLocalStorage = () => {
  if (localStorage.getItem('token')) {
    const storedToken = localStorage.getItem('token');
    const decodedToken = jwt_decode(storedToken);
    if ((decodedToken.exp * 1000 - (new Date().getTime())) <=0) {
      localStorage.removeItem('token');
      return null;
    }
    return storedToken;
  }
}

function AuthProvider(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const initialToken = validateAndGetTokenFromLocalStorage();
    const [token, setToken] = useState(initialToken);
    // console.log('token', token);
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

            var decodedToken = jwt_decode(data.token);
            const remainingTime = decodedToken.exp * 1000 - (new Date().getTime());
            logoutTimer = setTimeout(logoutHandler, remainingTime);
            const origin = location.state?.from?.pathname || '/shop';
            navigate(origin);
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    
      const logoutHandler = useCallback(() => {
        setToken(null);
        if (logoutTimer) {
          clearTimeout(logoutTimer);
        }
        localStorage.removeItem('token');
        navigate('/');
      }, [navigate]);

      useEffect(() => {
        if (initialToken) {
          var decodedToken = jwt_decode(initialToken);
          const remainTime = decodedToken.exp * 1000 - (new Date().getTime());
          logoutTimer = setTimeout(logoutHandler, remainTime);
          // console.log('remaining time', remainTime);
        }
      }, [initialToken, logoutHandler]);

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