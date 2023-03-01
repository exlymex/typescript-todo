import {TaskCounterStatusType} from "../../components/taskCounter/interfaces/ITaskCounter";
import {Status} from "../enums/Status";

export const getCorrectLabelName = (status: TaskCounterStatusType) :string =>  {
    switch (status) {
        case Status.completed :
            return 'Completed'
        case Status.inProgress :
            return 'In Progress';
        case Status.todo :
            return "Todo's"
        default :
            return ''
    }
}