import { DropiumDirective } from "../dropium.directive";

export interface dropEvent{
    data:any,
    previousContainer:DropiumDirective,
    container:DropiumDirective,
    previousIndex: number,
    newIndex: number
}