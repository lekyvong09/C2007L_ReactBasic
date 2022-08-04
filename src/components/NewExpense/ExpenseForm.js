import { Send } from "@mui/icons-material";
import { Button, Stack, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from "react";

function ExpenseForm(props) {
    const [inputDate, setInputDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [isValidTitle, setIsValidTitle] = useState(true);
    const [isValidAmount, setIsValidAmount] = useState(true);
    const [isValidDate, setIsValidDate] = useState(true);
    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    }
    const amountChangeHandler = (event) => {
        setAmount(event.target.value);
    }
    const dateChangeHandler = (date) => {
        setInputDate(date);
    }
    const submitHandler = (event) => {
        event.preventDefault();

        if (title.trim().length === 0) {
            setIsValidTitle(false);
            return;
        }
        if (amount.trim().length === 0) {
            setIsValidAmount(false);
            return;
        }
        if (!(inputDate instanceof Date && !isNaN(inputDate))) {
            setIsValidDate(false);
            return;
        }
        var expenseData = {
            title: title,
            amount: amount,
            date: inputDate
        };
        props.onSaveExpense(expenseData);

        setTitle('');
        setAmount('');
        setInputDate(new Date());
    }

    return (
        <Container sx={{width: '50%'}}>
            <form onSubmit={submitHandler}>
                <Stack spacing={2} pt={5} margin="dense">
                    <TextField
                        error={!isValidTitle}
                        id="expense-form-title" 
                        label="Title" 
                        variant="outlined" 
                        onChange={titleChangeHandler}
                        value={title}
                    />
                    <TextField 
                        error= {!isValidAmount}
                        id="expense-form-amount" 
                        label="Amount" 
                        variant="outlined"
                        type="number"
                        inputProps={{min: "0.01", step: "0.01"}}
                        onChange={amountChangeHandler}
                        value={amount}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Date"
                            value={inputDate}
                            minDate={new Date('2022-01-01')}
                            maxDate={new Date('2023-12-31')}
                            onChange={dateChangeHandler}
                            renderInput={(params) => (<TextField 
                                                        {...params} 
                                                        error={!isValidDate}
                                                    />)}
                        />
                    </LocalizationProvider>
                </Stack>
                <Box pt={2} display="flex" justifyContent="center" alignItems="center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        endIcon={<Send />}
                        margin="dense"
                    >Add Expense</Button>
                </Box>
            </form>
        </Container>
    )
}

export default ExpenseForm;