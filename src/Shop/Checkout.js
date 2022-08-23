import { Send } from "@mui/icons-material";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useState } from "react";

function Checkout(props) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [isValidName, setIsValidName] = useState(null);
    const [isValidAddress, setIsValidAddress] = useState(null);
    const [formIsValid, setFormIsValid] = useState(false);

    const nameChangeHandler = (event) => {
        setName(event.target.value);
        setFormIsValid(event.target.value.trim().length !==0 && address.trim().length !== 0);
    }

    const addressChangeHandler = (event) => {
        setAddress(event.target.value);
        setFormIsValid(event.target.value.trim().length !==0 && name.trim().length !== 0);
    }

    const nameValidateHandler = () => {
        setIsValidName(name.trim().length !== 0);
    }

    const addressValidateHandler = () => {
        setIsValidAddress(address.trim().length !== 0);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        props.onCheckout({
            name: name,
            address: address
        });

        setName('');
        setIsValidName(true);
    }

    return (
        <Container sx={{width: '50%'}}>
            <form onSubmit={submitHandler}>
                <Stack spacing={2} pt={5} margin="dense">
                    <TextField
                        error={isValidName === false}
                        id="checkout-form-name" 
                        label="Name" 
                        variant="outlined" 
                        onChange={nameChangeHandler}
                        onBlur={nameValidateHandler}
                        value={name}
                    />
                    <TextField
                        error={isValidAddress === false}
                        id="checkout-form-address" 
                        label="Address" 
                        variant="outlined" 
                        onChange={addressChangeHandler}
                        onBlur={addressValidateHandler}
                        value={address}
                    />
                </Stack>
                
                <Box pt={2} display="flex" justifyContent="center" alignItems="center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        endIcon={<Send />}
                        margin="dense"
                        disabled={!formIsValid}
                    >Confirm Order</Button>
                </Box>

            </form>
        </Container>
    );
}

export default Checkout;