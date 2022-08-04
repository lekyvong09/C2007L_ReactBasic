
import { useState } from 'react';
import Card from '../UI/Card';
import './Expense.css';
import ExpenseFilter from './ExpenseFilter';
import ExpenseItem from './ExpenseItem';

function Expense(props) {
    const [filterYear, setFilterYear] = useState(2022);

    const getYearFilter = (year) => {
        setFilterYear(year);
    }

    return (
        <Card className='expenses'>
            <ExpenseFilter onGetYearFilter={getYearFilter}></ExpenseFilter>
            {props.expenses.filter(i => i.date.getFullYear() === filterYear).map(item => 
                <ExpenseItem key={item.id} title={item.title} amount={item.amount} date={item.date}></ExpenseItem>
            )}
        </Card>
    );
}

export default Expense;