import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function Login (props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        console.log('useEffect validate form');
        setFormIsValid(password.trim().length !== 0 && username.trim().length !== 0);

        return (() => {
            console.log('clean up useEffect');
        });
    }, [password, username]);

    const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
        // setFormIsValid(event.target.value.trim().length !== 0 && password.trim().length !== 0);
    }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
        // setFormIsValid(event.target.value.trim().length !== 0 && username.trim().length !== 0);
    }
    const validateUsernameHandler = () => {
        setIsValidUsername(username.trim().length !== 0);
    }
    const validatePasswordHandler = () => {
        setIsValidPassword(password.trim().length !== 0);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(username, password);

        setUsername('');
        setPassword('');

    }


    return (
        <Container sx={{width: '30%'}}>
            <form onSubmit={submitHandler}>
                <Stack spacing={2} pt={5} margin="dense">
                    <TextField
                        error={!isValidUsername}
                        id="expense-form-username" 
                        label="Username" 
                        variant="outlined" 
                        onChange={usernameChangeHandler}
                        value={username}
                        onBlur={validateUsernameHandler}
                    />
                    <TextField
                        error={!isValidPassword}
                        id="expense-form-password" 
                        label="Password" 
                        variant="outlined" 
                        onChange={passwordChangeHandler}
                        value={password}
                        type='password'
                        onBlur={validatePasswordHandler}
                    />

                </Stack>

                <Box pt={2} display="flex" justifyContent="center" alignItems="center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        margin="dense"
                        disabled={!formIsValid}
                    >Login</Button>
                </Box>
            </form>
        </Container>
    );
}

export default Login;