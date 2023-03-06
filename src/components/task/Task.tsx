import React, {FC, ReactElement} from 'react';
import {Box} from "@mui/material";
import {TaskHeader} from "./_TaskHeader";
import {TaskDescription} from "./_TaskDescription";
import {TaskFooter} from "./_TaskFooter";
import {ITask} from "./interfaces/ITask";
import {Priority} from "../../utils/enums/Priority";
import {Status} from "../../utils/enums/Status";
import PropTypes from "prop-types";
import {getPriorityBorderColor} from "../../utils/functions/getPriorityBorderColor";

export const Task: FC<ITask> = ({
                                    title = "Test Title",
                                    date = new Date(),
                                    description = 'Lorem ipsum',
                                    priority = Priority.normal,
                                    status = Status.todo,
                                    onStatusChange = (e) => console.log(e),
                                    onClick = (e) => console.log(e),
                                    id
                                }): ReactElement => {
    return (
        <Box
            display="flex"
            width="100%"
            justifyContent="flex-start"
            flexDirection="column"
            mb={4}
            p={3}
            sx={{
                backgroundColor: "background.paper",
                borderRadius: "8px",
                border: "1px solid",
                borderColor: getPriorityBorderColor(priority)
            }}
        >
            <TaskHeader date={date} title={title}/>
            <TaskDescription description={description}/>
            <TaskFooter
                id={id}
                status={status}
                onClick={onClick}
                onStatusChange={onStatusChange}
             />
        </Box>
    )
};

Task.propTypes = {
    title: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    description: PropTypes.string,
    onStatusChange: PropTypes.func,
    onClick: PropTypes.func,
    priority: PropTypes.string,
    status: PropTypes.string
}