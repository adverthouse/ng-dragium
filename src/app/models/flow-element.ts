import { connection } from "./connection";

export interface FlowElement{
    id:number,
    type:string,
    positionX?:number,
    positionY?:number,
    connection?:connection
}