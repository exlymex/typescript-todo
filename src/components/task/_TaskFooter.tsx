import React, {FC, ReactElement} from 'react';
import PropTypes from 'prop-types';
import {Box, Button, FormControlLabel, Switch} from "@mui/material";
import {ITaskFooter} from "./interfaces/ITaskFooter";
import {Status} from "../../utils/enums/Status";

export const TaskFooter: FC<ITaskFooter> = ({
                                                onClick = (e) => console.log(e),
                                                onStatusChange = (e) => console.log(e),
                                                id,
                                                status
                                            }): ReactElement => {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={4}
        >
            <FormControlLabel control={<Switch
                defaultChecked={status === Status.inProgress}
                onChange={(e) => onStatusChange(e, id)}
                color="warning"/>}
                              label="In Progress"/>
            <Button onClick={(e) => onClick(e, id)} variant="contained" color="success" size="small"
                    sx={{color: '#FFFFFF'}}>
                Mark Complete
            </Button>
        </Box>
    );
};

TaskFooter.propTypes = {
    onStatusChange: PropTypes.func,
    onClick: PropTypes.func,
    id: PropTypes.string.isRequired,
    status: PropTypes.string
};

