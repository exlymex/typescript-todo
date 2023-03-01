import React, {FC, ReactElement} from 'react';
import {Box, Typography, Stack} from "@mui/material";
import {TaskDescriptionField} from "./_TaskDescriptionField";
import {TaskTitleField} from "./_TaskTitleField";
import {TaskDateField} from "./_TaskDateField";
import {TaskSelectField} from "./_TaskSelectField";
import {createTaskFormPriorities, createTaskFormStatuses} from "../../utils/options/createTaskForm/options";

export const CreateTaskForm: FC = (): ReactElement => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="100%"
            px={4}
            my={6}
        >
            <Typography mb={2} component="h2" variant="h6">Create A Task</Typography>
            <Stack sx={{width: '100%'}} spacing={2}>
                <TaskTitleField/>
                <TaskDescriptionField/>
                <TaskDateField/>
                <Stack sx={{width: '100%'}} direction="row" spacing={2}>
                    <TaskSelectField label="Status" name="status" items={createTaskFormStatuses}/>
                    <TaskSelectField label="Priority" name="priority" items={createTaskFormPriorities}/>
                </Stack>
            </Stack>
        </Box>
    );
};

