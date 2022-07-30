import './App.css';
import Expense from './components/Expense/Expense';



function App() {

  var expenses = [
    {id: 1, title: 'Petrol Gas', amount: 5, date: new Date(2022,7,15)},
    {id: 2, title: 'Cinema', amount: 10, date: new Date(2022,7,18)},
    {id: 3, title: 'Coffee', amount: 5, date: new Date(2022,7,19)},
    {id: 4, title: 'Dinner', amount: 20, date: new Date(2022,7,20)}
  ];

  return (
    <div>
      <h2>Hello World</h2>
      <Expense expenses={expenses}></Expense>
    </div>
  );
}

export default App;
