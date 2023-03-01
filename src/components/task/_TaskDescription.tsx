import React, {FC, ReactElement} from 'react';
import PropTypes from 'prop-types';
import {Box, Typography} from "@mui/material";
import {ITaskDescription} from "./interfaces/ITaskDescription";

export const TaskDescription:FC<ITaskDescription> = ({description="Test"}):ReactElement => {
    return (
        <Box>
            <Typography>{description}</Typography>
        </Box>
    );
};

TaskDescription.propTypes = {
    description:PropTypes.string
};

