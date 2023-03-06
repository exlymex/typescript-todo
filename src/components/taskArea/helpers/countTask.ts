import {ITaskAPI} from "../interfaces/ITaskAPI";
import {TaskCounterStatusType} from "../../taskCounter/interfaces/ITaskCounter";

export const countTask = (tasks:ITaskAPI[],status:TaskCounterStatusType):number =>{
    if(!Array.isArray(tasks)){
        return 0
    }
    const totalTasks = tasks.filter((tasks) => {
        return tasks.status === status
    })
    return totalTasks.length
}