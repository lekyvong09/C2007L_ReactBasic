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
import CartProvider from './store/CartProvider';

var initialProducts = [];

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  // const fetchDataHandler = () => {
  //   fetch('http://localhost:8080/api/products')
  //     .then(response => response.json())
  //     .then(data => {
  //       const transformedProducts = data.products.map(product => {
  //         return {
  //           id: product.id,
  //           title: product.title,
  //           amount: product.amount,
  //           date: new Date(product.date),
  //           imageUrl: product.imageUrl,
  //           category: product.category
  //         }
  //       });
  //       setProduct(transformedProducts);
  //     });
  // }

  const fetchDataHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/products/return404');
      const data = await response.json();
      const transformedProducts = data.products.map(product => {
        return {
          id: product.id,
          title: product.title,
          amount: product.amount,
          date: new Date(product.date),
          imageUrl: product.imageUrl,
          category: product.category
        }
      }); 
      setProduct(transformedProducts);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      console.log(error.message);
      setError(error.message);
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{
      storeIsLoggedIn: isLoggedIn,
      onLogout: logoutHandler
    }}>
      <CartProvider>
      <Navigation 
        onLogin={loginHandler} 
        onDrawerOpen={drawerOpenHandler} 
        isDrawerOpen={isDrawerOpen}
        onFetchData={fetchDataHandler}
      ></Navigation>
      
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
              {!isLoading && error && <p>{error}</p>}
              {!isLoading && products.length > 0 && <ItemList isDrawerOpen={isDrawerOpen} products={products}/>}
              {!isLoading && products.length === 0 && !error && <p>No products found</p>}
              {isLoading && <p>Loading....</p>}
            </Main>
          </ProtectedRoute>
        } />

        <Route index element={<Login onLogin={loginHandler}/>} />
        <Route path='login' element={<Login onLogin={loginHandler}/>} />

      </Routes>
      </CartProvider>
    </AuthContext.Provider>
    
  );
}

export default App;
