import React, {FC, ReactElement} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {ISelectField} from "./interfaces/ISelectField";

export const TaskSelectField: FC<ISelectField> = ({
                                                      value = '',
                                                      label = "Select Box",
                                                      name = "selectBox",
                                                      onChange,
                                                      items = [{value: '', label: 'Add Items'}],
                                                      disabled
                                                  }): ReactElement => {
    return (
        <FormControl disabled={disabled ?? false} fullWidth size="small">
            <InputLabel id={`${name}-id`}>{label}</InputLabel>
            <Select
                labelId={`${name}-id`}
                id={`${name}-id-select`}
                value={value!}
                label={label}
                name={name ?? ''}
                onChange={onChange}
            >
                {items?.map(({value, label}, index) => {
                    return <MenuItem value={value} key={value + index}>{label}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
};
