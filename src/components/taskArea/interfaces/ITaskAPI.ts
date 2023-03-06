import {Priority} from "../../../utils/enums/Priority";
import {Status} from "../../../utils/enums/Status";

export interface ITaskAPI{
    id:string,
    date:string,
    title:string,
    description:string,
    priority:`${Priority}`,
    status:`${Status}`
}