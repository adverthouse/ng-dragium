import { StuffByCard } from "./stuff-by-card";

export interface Card{
 
    CardId:number;
    CardOrder:number;
    CardSummary:string;
    CardDescription:string;

    StuffsByCard:StuffByCard[];
}