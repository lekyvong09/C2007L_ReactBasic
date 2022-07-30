function ExpenseForm() {
    return (
        <form>
            <div>
                <label>Title</label>
                <input type='text' />
            </div>
            <div>
                <label>Amount</label>
                <input type='number' min='0.01' step='0.01'/>
            </div>
            <div>
                <label>Date</label>
                <input type='date' min='2022-01-01' max='2023-12-31' />
            </div>
            <button type='submit'>Add Expense</button>
        </form>
    )
}

export default ExpenseForm;