import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
import AuthContext from './store/auth-context';
import NewProduct from './components/NewProduct/NewProduct';
import Product from './components/Product/Product';
import { styled } from '@mui/material';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import ItemList from './Shop/ItemList';

var initialProducts = [
  {id: 1, title: 'Superman: Action Comics Volume 5', amount: 12.99, date: new Date(2022,7,15), imageUrl: "./BOOK-COMIC-1000.jpg", category: 'C'},
  {id: 2, title: 'Batman: The Silver Age Omnibus Vol. 1', amount: 99.99, date: new Date(2022,7,18), imageUrl: "./BOOK-COMIC-1001.jpg", category: 'C'},
  {id: 3, title: 'The Fifth Science', amount: 24.99, date: new Date(2022,7,19), imageUrl: "./BOOK-FICTION-1002.jpg", category: 'F'},
  {id: 4, title: 'The Summer House', amount: 15.00, date: new Date(2022,7,20), imageUrl: "./BOOK-ROMANTIC-1003.jpg", category: 'R'},
  {id: 5, title: 'The Art of Computer Programming', amount: 187.99, date: new Date(2023,7,20), imageUrl: "./BOOK-PROGRAMMING-1004.jpg", category: 'P'}
];

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function App() {
  const [products, setProduct] = useState(initialProducts);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const drawerOpenHandler = (isOpen) => {
    setIsDrawerOpen(isOpen);
  }

  useEffect(() => {
    if (localStorage.getItem('isLoggedInStatue') === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const location = useLocation();

  const loginHandler = (username, password) => {
    console.log(`login with username: ${username} and password: ${password}`);
    
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedInStatue', '1');
      const origin = location.state?.from?.pathname || '/shop';
      navigate(origin);
    } else {
      setIsLoggedIn(false);
    }
  }

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedInStatue');
    setIsLoggedIn(false);
    navigate('/');
  }

  const saveProductHandler = (data) => {
    const productData = {
      ...data,
      id: Math.random()
    };
    setProduct(prevState => {
      return [...prevState, productData];
    });
  }

  return (
    <AuthContext.Provider value={{
      storeIsLoggedIn: isLoggedIn,
      onLogout: logoutHandler
    }}>
      <Navigation onLogin={loginHandler} onDrawerOpen={drawerOpenHandler} isDrawerOpen={isDrawerOpen}> </Navigation>
      
      <Routes>
        <Route path='product' element={
            <ProtectedRoute>
              <Main open={isDrawerOpen}>
                <DrawerHeader />
                <>
                  <NewProduct onSaveProductHandler={saveProductHandler}/>
                  <Product products={products}></Product>
                </>
              </Main>
            </ProtectedRoute>
        } />

        <Route path='shop' element={
          <ProtectedRoute>
            <Main open={isDrawerOpen}>
              <DrawerHeader />
              <ItemList isDrawerOpen={isDrawerOpen} products={initialProducts}/>
            </Main>
          </ProtectedRoute>
        } />

        <Route index element={<Login onLogin={loginHandler}/>} />
        <Route path='login' element={<Login onLogin={loginHandler}/>} />

      </Routes>

    </AuthContext.Provider>
    
  );
}

export default App;
