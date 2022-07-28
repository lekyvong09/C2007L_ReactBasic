import './Expense.css';
import ExpenseItem from './ExpenseItem';

function Expense(props) {
    // var expenseList =[];

    // props.expenses.forEach(item => {
    //     expenseList.push(<ExpenseItem key={item.id} title={item.title} amount={item.amount} date={item.date}></ExpenseItem>)
    // });

    var expenseList = props.expenses.map(item => <ExpenseItem key={item.id} title={item.title} amount={item.amount} date={item.date}></ExpenseItem>);

    return (
        <div className='expenses'>
            {expenseList}
        </div>
    );
}

export default Expense;