import {Status} from "../../enums/Status";
import {Priority} from "../../enums/Priority";

export const createTaskFormStatuses = [
    {
        value:Status.todo,
        label:Status.todo.toUpperCase()
    },
    {
        value:Status.inProgress,
        label:Status.inProgress.toUpperCase()
    },
    {
        value:Status.completed,
        label:Status.completed.toUpperCase()
    }
]
export const createTaskFormPriorities = [
    {
        value: Priority.low,
        label: Priority.low.toUpperCase(),
    },
    {
        value: Priority.normal,
        label: Priority.normal.toUpperCase(),
    },
    {
        value: Priority.high,
        label: Priority.high.toUpperCase(),
    }
]