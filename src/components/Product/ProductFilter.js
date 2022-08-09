import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";


function ProductFilter(props) {
    const [selectedYear, setSelectedYear] = useState(2022);

    const yearChangeHandler = (event) => {
        setSelectedYear(event.target.value);
        props.onGetYearFilter(event.target.value);
    }

    return (
        <Box sx={{display: 'flex', justifyContent: "flex-end"}}>
            <Box sx={{width: 120, backgroundColor:'4b4b4b', borderRadius: '12px' }}>
                <FormControl fullWidth>
                    <InputLabel sx={{color:'white', fontWeight: 'bold'}}>Year</InputLabel>
                    <Select
                        labelId="select-year"
                        value={selectedYear}
                        onChange={yearChangeHandler}
                        sx={{color: 'white'}}
                    >
                        <MenuItem value={2022}>2022</MenuItem>
                        <MenuItem value={2023}>2023</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
}

export default ProductFilter;