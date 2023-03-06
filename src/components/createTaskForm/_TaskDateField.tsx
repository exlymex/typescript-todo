import React, {FC, ReactElement} from 'react';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import {IDateField} from "./interfaces/IDateField";

export const TaskDateField: FC<IDateField> = ({
                                                  value = new Date(),
                                                  onChange = (date) => console.log(date),
                                                  disabled = false
                                              }): ReactElement => {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    label="Task Date"
                    inputFormat="dd/MM/yyyy"
                    value={value!}
                    disabled={disabled as boolean}
                    onChange={onChange}
                    renderInput={(params) => (
                        <TextField {...params}/>
                    )}/>
            </LocalizationProvider>
        </>
    );
};

