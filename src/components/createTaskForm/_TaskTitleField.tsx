import React, {FC, ReactElement} from 'react';
import {TextField} from "@mui/material";
import {ITextField} from "./interfaces/ITextField";

export const TaskTitleField:FC<ITextField> = ({disabled=false,onChange= (e) =>console.log(e)}) : ReactElement => {
    return (
        <TextField
        id="title"
        name="title"
        label="Task Title"
        placeholder="Task Title"
        variant="outlined"
        size="small"
        fullWidth
        disabled={disabled ?? false}
        onChange={onChange}
        />
    );
};

