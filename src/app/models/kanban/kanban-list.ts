import { Card } from "./card";

export interface KanbanList
{
    ListId:number;
    DepartmentId?:number;
    ListName:string;
    ListDescription:string;
    Cards:Card[];
}