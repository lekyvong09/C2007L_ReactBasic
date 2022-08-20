import { Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useReducer, useState, useContext } from "react";
import AuthContext from "../../store/auth-context";

const usernameReducer = (state , action) => {
    if (action.type === 'USERNAME_INPUT_CHANGE') {
        return { value: action.payload, isValid: action.payload.trim().length !== 0};
    }
    if (action.type === 'USERNAME_INPUT_BLUR') {
        return { value: state.value, isValid: state.value.trim().length !== 0};
    }
    return { value: '', isValid: false};
}

const passwordReducer = (state, action) => {
    if (action.type === 'PASSWORD_INPUT_CHANGE') {
        return { value: action.payload, isValid: action.payload.trim().length !== 0};
    }
    if (action.type === 'PASSWORD_INPUT_BLUR') {
        return { value: state.value, isValid: state.value.trim().length !== 0};
    }
    return { value: '', isValid: false};
}

function Login (props) {
    const authContext = useContext(AuthContext);
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    // const [isValidUsername, setIsValidUsername] = useState(true);
    // const [isValidPassword, setIsValidPassword] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);

    const [usernameState, usernameDispatcher] = useReducer(usernameReducer, {value: '', isValid: null});
    const [passwordState, passwordDispatcher] = useReducer(passwordReducer, {value: '', isValid: null});

    useEffect(() => {
        // console.log('useEffect validate form');
        setFormIsValid(usernameState.isValid && passwordState.isValid);

        return (() => {
            // console.log('clean up useEffect');
        });
    }, [usernameState, passwordState]);

    const usernameChangeHandler = (event) => {
        // setUsername(event.target.value);
        usernameDispatcher({type: 'USERNAME_INPUT_CHANGE', payload: event.target.value});
        // setFormIsValid(event.target.value.trim().length !== 0 && passwordState.isValid);
    }
    const passwordChangeHandler = (event) => {
        // setPassword(event.target.value);
        passwordDispatcher({type: 'PASSWORD_INPUT_CHANGE', payload: event.target.value});
        // setFormIsValid(event.target.value.trim().length !== 0 && usernameState.isValid);
    }
    const validateUsernameHandler = () => {
        // setIsValidUsername(username.trim().length !== 0);
        usernameDispatcher({type: 'USERNAME_INPUT_BLUR'});
    }
    const validatePasswordHandler = () => {
        // setIsValidPassword(password.trim().length !== 0);
        passwordDispatcher({type: 'PASSWORD_INPUT_BLUR'});
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (!authContext.storeIsLoggedIn) {
            authContext.login(usernameState.value, passwordState.value);
        } else {
            props.onAddUser(usernameState.value, passwordState.value);
        }

        // setUsername('');
        // setPassword('');

    }


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Box sx={{width: '30%'}}>
                <h1 style={{textAlign:'center'}}>{!authContext.storeIsLoggedIn ? 'Login' : 'Create new account'}</h1>
                <form onSubmit={submitHandler}>
                    <Stack spacing={2} pt={5} margin="dense">
                        <TextField
                            error={usernameState.isValid === false}
                            id="product-form-username" 
                            label="Username" 
                            variant="outlined" 
                            onChange={usernameChangeHandler}
                            value={usernameState.value}
                            onBlur={validateUsernameHandler}
                        />
                        <TextField
                            error={passwordState.isValid === false}
                            id="product-form-password" 
                            label={!authContext.storeIsLoggedIn ? 'Password' : 'Email'}
                            variant="outlined" 
                            onChange={passwordChangeHandler}
                            value={passwordState.value}
                            type={!authContext.storeIsLoggedIn ? 'password' : 'text'}
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
                        >
                            {!authContext.storeIsLoggedIn ? 'Login' : 'Create account'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default Login;