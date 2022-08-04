import { useState } from 'react';
import './App.css';
import Expense from './components/Expense/Expense';
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
      <NewExpense onSaveExpenseHandler={saveExpenseHandler}/>
      <Expense expenses={expenses}></Expense>
    </>
  );
}

export default App;
