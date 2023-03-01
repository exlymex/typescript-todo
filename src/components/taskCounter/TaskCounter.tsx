import React, {FC, ReactElement} from 'react';
import {Avatar, Box, Typography} from "@mui/material";
import {ITaskCounter} from "./interfaces/ITaskCounter";
import {Status} from "../../utils/enums/Status";
import {getCorrectBorderColor} from "../../utils/functions/getCorrectBorderColor";
import {getCorrectLabelName} from "../../utils/functions/getCorrectLabelName";

export const TaskCounter: FC<ITaskCounter> = ({status= Status.inProgress,count=0}): ReactElement => {
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={2}
            >
                <Avatar
                    sx={{
                        backgroundColor: 'transparent',
                        border: '5px solid',
                        width: '96px',
                        height: '96px',
                        borderColor: getCorrectBorderColor(status!)
                    }}
                >
                    <Typography color="#FFFFFF" variant="h4">{count}</Typography>
                </Avatar>
                <Typography color="#FFFFFF"
                            fontWeight="bold"
                            fontSize="20px"
                            variant="h5"
                >{getCorrectLabelName(status!)}</Typography>
            </Box>
        </>
    );
};

