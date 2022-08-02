import './App.css';
import Expense from './components/Expense/Expense';
import NewExpense from './components/NewExpense/NewExpense';



function App() {

  var expenses = [
    {id: 1, title: 'Petrol Gas', amount: 5, date: new Date(2022,7,15)},
    {id: 2, title: 'Cinema', amount: 10, date: new Date(2022,7,18)},
    {id: 3, title: 'Coffee', amount: 5, date: new Date(2022,7,19)},
    {id: 4, title: 'Dinner', amount: 20, date: new Date(2022,7,20)}
  ];

  const saveExpenseHandler = (inputExpense) => {
    const expenseData = {
      ...inputExpense,
      id: Math.random()
    };
    console.log(expenseData);
  }

  return (
    <div>
      <NewExpense onSaveExpenseHandler={saveExpenseHandler}/>
      <Expense expenses={expenses}></Expense>
    </div>
  );
}

export default App;
