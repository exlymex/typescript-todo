import {TaskCounterStatusType} from "../../components/taskCounter/interfaces/ITaskCounter";
import {Status} from "../enums/Status";

export const getCorrectBorderColor = (status: TaskCounterStatusType):string => {
    switch (status) {
        case Status.completed :
            return 'success.light'
        case Status.inProgress :
            return 'warning.light';
        case Status.todo :
            return 'error.light'
        default :
            return ''
    }
}