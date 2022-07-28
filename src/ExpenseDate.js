import './ExpenseDate.css';

function ExpenseDate(props) {
    var month = props.date.toLocaleString('en-US', {month: 'long'});
    var day = props.date.toLocaleString('en-US', {day: '2-digit'});
    var year = props.date.getFullYear();

    return (
        <div className='expense-date'>
            <div className='expense-date__month'>{month}</div>
            <div className='expense-date__year'>{day}</div>
            <div className='expense-date__day'>{year}</div>
        </div>
    );
}

export default ExpenseDate;