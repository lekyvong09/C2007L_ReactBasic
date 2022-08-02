import ExpenseForm from "./ExpenseForm";


function NewExpense(props) {

    const saveExpenseDataHandler = (expenseData) => {
        props.onSaveExpenseHandler(expenseData);
    }

    return (
        <div>
            <ExpenseForm onSaveExpense={saveExpenseDataHandler} />
        </div>
    );
}

export default NewExpense;