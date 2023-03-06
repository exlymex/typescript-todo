import React, {FC, ReactElement} from 'react';
import {TextField} from "@mui/material";
import {ITextField} from "./interfaces/ITextField";

export const TaskDescriptionField: FC<ITextField> = ({
                                                         disabled = false,
                                                         onChange = (e) => console.log(e)
                                                     }): ReactElement => {
    return (
        <TextField
            id="description"
            name="description"
            label="Description"
            placeholder="Description"
            variant="outlined"
            size="small"
            multiline
            rows={4}
            disabled={disabled ?? false}
            onChange={onChange}
            fullWidth
        />
    );
};

