import React, {FC, ReactElement, useContext, useEffect} from 'react';
import {Alert, Box, Grid, LinearProgress} from "@mui/material";
import {format} from "date-fns";
import {TaskCounter} from "../taskCounter/TaskCounter";
import {Status} from "../../utils/enums/Status";
import {Task} from "../task/Task";
import {useMutation, useQuery} from "@tanstack/react-query";
import {sendApiRequest} from "../../utils/sendApiRequest/sendApiRequest";
import {ITaskAPI} from "./interfaces/ITaskAPI";
import {IUpdateTask} from "../task/interfaces/IUpdateTask";
import {countTask} from "./helpers/countTask";
import {TaskStatusChangedContext} from "../../context";

export const TaskArea: FC = (): ReactElement => {
    const tasksUpdatedContext = useContext(TaskStatusChangedContext)
    const {error, isLoading, data, refetch} = useQuery(
        ['tasks'], async () => {
            return await sendApiRequest<ITaskAPI[]>(
                "http://localhost:3200/tasks",
                "GET"
            )
        }
    );
    const updateTaskMutation = useMutation(
        (data: IUpdateTask) => sendApiRequest("http://localhost:3200/tasks",
            "PUT",
            data
        )
    )
    useEffect(()=> {
        refetch()
    },[tasksUpdatedContext.updated])

    useEffect(() => {
        if(updateTaskMutation.isSuccess){
            tasksUpdatedContext.toggle();
        }
    },[updateTaskMutation.isSuccess])
    function onStatusChangeHandler(
        e: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) {
        updateTaskMutation.mutate({
            id,
            status: e.target.checked
                ? Status.inProgress
                : Status.todo
        })
    }
    function markCompleteHandler(e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>,id:string){
        updateTaskMutation.mutate({id,status:Status.completed})
    }
    return (
        <Grid item md={8} px={4}>
            <Box mb={8} px={4}>
                <h2>Status Of Your Task As On{' '}
                    {format(new Date(), 'PPPP')}
                </h2>
            </Box>
            <Grid container display="flex" justifyContent="center">
                <Grid
                    item
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                    alignItems="center"
                    md={10}
                    xs={12}
                    mb={8}
                >
                    <TaskCounter count={data ? countTask(data,Status.todo) : undefined} status={Status.todo}/>
                    <TaskCounter count={data ? countTask(data,Status.inProgress) : undefined} status={Status.inProgress}/>
                    <TaskCounter count={data ? countTask(data,Status.completed) : undefined} status={Status.completed}/>
                </Grid>
                <Grid item display="flex" flexDirection="column" xs={10} md={8}>
                    <>
                        {error &&
                            <Alert severity="error">
                                There was an error fetching your tasks
                            </Alert>
                        }
                        {!error && Array.isArray(data) && data.length === 0 &&
                            <Alert severity="warning">
                                You do not have any tasks created yet. Start by
                                creating some tasks
                            </Alert>
                        }
                        {isLoading ?
                            (<LinearProgress/>)
                            : (
                                Array.isArray(data)
                                && data.length > 0
                                && data.map((each, index) => {
                                    return each.status === Status.todo || each.status === Status.inProgress ? (
                                            <Task id={each.id} status={each.status} date={new Date(each.date)}
                                                  description={each.description} priority={each.priority}
                                                  key={index + each.priority}
                                                  title={each.title} onStatusChange={onStatusChangeHandler}
                                                  onClick={markCompleteHandler}
                                            />
                                        )
                                        : (false)
                                })
                            )}
                    </>
                </Grid>
            </Grid>
        </Grid>
    )
        ;
};

