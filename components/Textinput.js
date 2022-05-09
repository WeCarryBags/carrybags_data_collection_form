import { TextField } from "@mui/material";
import React, {useState} from "react";
import {textStyles} from "./styles";

export const TextInput = (
    {
        label, value,
        type="", onChange=()=>{},
        required=false,
        autoComplete='',
        error=false,
        helperText="",
        width="100%"
    }) => {

    //variables to set validity in case of error
    const [valid, setValid] = useState(false)

    //return element
    return (
            <TextField
                autoComplete={autoComplete}
                label={label}
                type={type}
                required={required}

                value={value}
                onChange={({target}) => onChange(target.value)}
                onBlur={() => setValid(error)}
                error={valid}
                helperText={valid ? helperText : ""}

                sx={{...textStyles, width}}
                fullWidth
            />
    )
}
