import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useState } from "react";

function Login (props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

    const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
    }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (username.trim().length === 0) {
            setIsValidUsername(false);
            return;
        }
        if (password.trim().length === 0) {
            setIsValidPassword(false);
            return;
        }
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
                    />
                    <TextField
                        error={!isValidPassword}
                        id="expense-form-password" 
                        label="Password" 
                        variant="outlined" 
                        onChange={passwordChangeHandler}
                        value={password}
                        type='password'
                    />

                </Stack>

                <Box pt={2} display="flex" justifyContent="center" alignItems="center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        margin="dense"
                    >Login</Button>
                </Box>
            </form>
        </Container>
    );
}

export default Login;