import React, {FC, ReactElement, useContext, useEffect, useState} from 'react';
import {Box, Typography, Stack, LinearProgress, Alert, AlertTitle, Button} from "@mui/material";
import {TaskDescriptionField} from "./_TaskDescriptionField";
import {TaskTitleField} from "./_TaskTitleField";
import {TaskDateField} from "./_TaskDateField";
import {TaskSelectField} from "./_TaskSelectField";
import {createTaskFormPriorities, createTaskFormStatuses} from "../../utils/options/createTaskForm/options";
import {Status} from "../../utils/enums/Status";
import {Priority} from "../../utils/enums/Priority";
import {useMutation} from "@tanstack/react-query";
import {sendApiRequest} from "../../utils/sendApiRequest/sendApiRequest";
import {ICreateTask} from "../taskArea/interfaces/ICreateTask";
import {TaskStatusChangedContext} from "../../context";

export const CreateTaskForm: FC = (): ReactElement => {
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [date, setDate] = useState<Date | null>(new Date());
    const [status, setStatus] = useState<string>(Status.todo);
    const [priority, setPriority] = useState<string>(Priority.normal);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const tasksUpdatedContext = useContext(TaskStatusChangedContext)
    const createTaskMutation = useMutation((data: ICreateTask) =>
        sendApiRequest(
            'http://localhost:3200/tasks',
            "POST",
            data
        )
    )
    useEffect(() => {
        if (createTaskMutation.isSuccess) {
            setShowSuccess(true);
            tasksUpdatedContext.toggle()
        }
        const successTimeout = setTimeout(() => {
            setShowSuccess(false)
        }, 4000)
        return () => {
            clearTimeout(successTimeout)
        }
    }, [createTaskMutation.isSuccess])

    function createTaskHandler() {
        if (!title || !date || !description) {
            return
        }

        const task: ICreateTask = {
            title,
            description,
            date: date.toString(),
            status,
            priority
        }

        createTaskMutation.mutate(task)
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="100%"
            px={4}
            my={6}
        >
            {showSuccess && (
                <Alert
                    severity="success"
                    sx={{width: "100%", marginBottom: "16px"}}
                >
                    <AlertTitle>Success</AlertTitle>
                    The task has been created successfully
                </Alert>
            )}
            <Typography mb={2} component="h2" variant="h6">Create A Task</Typography>
            <Stack sx={{width: '100%'}} spacing={2}>
                <TaskTitleField
                    disabled={createTaskMutation.isLoading}
                    onChange={(e) => setTitle(e.target.value)}/>
                <TaskDescriptionField
                    disabled={createTaskMutation.isLoading}
                    onChange={(e) => setDescription(e.target.value)}/>
                <TaskDateField
                    disabled={createTaskMutation.isLoading}
                    value={date}
                    onChange={(e) => setDate(e)}/>
                <Stack sx={{width: '100%'}} direction="row" spacing={2}>
                    <TaskSelectField
                        disabled={createTaskMutation.isLoading}
                        onChange={(e) => setStatus(e.target.value as string)}
                        value={status}
                        label="Status" name="status"
                        items={createTaskFormStatuses}/>
                    <TaskSelectField
                        disabled={createTaskMutation.isLoading}
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as string)}
                        label="Priority" name="priority" items={createTaskFormPriorities}/>
                </Stack>
                {createTaskMutation.isLoading && <LinearProgress/>}
                <Button
                    disabled={
                        !title ||
                        !description ||
                        !date ||
                        !status ||
                        !priority
                    }
                    onClick={createTaskHandler}
                    variant="contained" size="large" fullWidth
                >Create A Task</Button>
            </Stack>
        </Box>
    );
};

