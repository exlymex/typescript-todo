import {ITaskFooter} from "./ITaskFooter";
import {ITaskDescription} from "./ITaskDescription";
import {ITaskHeader} from "./ITaskHeader";

export interface ITask extends ITaskFooter,ITaskDescription,ITaskHeader{
    priority?:string;
}