import {Priority} from "../enums/Priority";

export const getPriorityBorderColor = (priority:string):string =>{
    switch (priority){
        case Priority.high:
            return 'error.light'
        case Priority.normal:
            return 'grey.900'
        case Priority.low:
            return 'info.light'
        default :
            return 'grey.900'
    }
}