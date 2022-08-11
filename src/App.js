import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
import AuthContext from './store/auth-context';
import NewProduct from './components/NewProduct/NewProduct';
import Product from './components/Product/Product';
import { styled } from '@mui/material';

var initialProducts = [
  {id: 1, title: 'Superman: Action Comics Volume 5', amount: 12.99, date: new Date(2022,7,15)},
  {id: 2, title: 'Batman: The Silver Age Omnibus Vol. 1', amount: 99.99, date: new Date(2022,7,18)},
  {id: 3, title: 'The Fifth Science', amount: 24.99, date: new Date(2022,7,19)},
  {id: 4, title: 'The Summer House', amount: 15.00, date: new Date(2022,7,20)},
  {id: 5, title: 'The Art of Computer Programming', amount: 187.99, date: new Date(2023,7,20)}
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
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
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

  const drawerOpenHandler = (isOpen) => {
    setIsDrawerOpen(isOpen);
  }

  useEffect(() => {
    if (localStorage.getItem('isLoggedInStatue') === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (username, password) => {
    console.log(`login with username: ${username} and password: ${password}`);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedInStatue', '1');
  }

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedInStatue');
    setIsLoggedIn(false);
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
      
      {isLoggedIn && <Main open={isDrawerOpen}>
        <DrawerHeader />
        <>
          <NewProduct onSaveProductHandler={saveProductHandler}/>
          <Product products={products}></Product>
        </>
      </Main>}

      {!isLoggedIn && <Login onLogin={loginHandler}/>}
    </AuthContext.Provider>
    
  );
}

export default App;
