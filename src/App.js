import { useEffect, useState } from 'react';
import './App.css';
import Expense from './components/Expense/Expense';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
import NewExpense from './components/NewExpense/NewExpense';

var initialExpenses = [
  {id: 1, title: 'Petrol Gas', amount: 5, date: new Date(2022,7,15)},
  {id: 2, title: 'Cinema', amount: 10, date: new Date(2022,7,18)},
  {id: 3, title: 'Coffee', amount: 5, date: new Date(2022,7,19)},
  {id: 4, title: 'Dinner', amount: 20, date: new Date(2022,7,20)},
  {id: 5, title: 'Lunch', amount: 30, date: new Date(2023,7,20)}
];

function App() {
  const [expenses, setExpense] = useState(initialExpenses);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const saveExpenseHandler = (inputExpense) => {
    const expenseData = {
      ...inputExpense,
      id: Math.random()
    };
    setExpense(prevState => {
      return [...prevState, expenseData];
    });
  }

  return (
    <>
      {isLoggedIn && <Navigation isLoggedIn={isLoggedIn} onLogin={loginHandler} onLogout={logoutHandler}>
          <NewExpense onSaveExpenseHandler={saveExpenseHandler}/>
          <Expense expenses={expenses}></Expense>
      </Navigation>}

      {!isLoggedIn && <Login onLogin={loginHandler}/>}
    </>
    
  );
}

export default App;
