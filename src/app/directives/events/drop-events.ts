import { DropiumDirective } from "../dropium.directive";

export interface dropEvent{
    previousContainer:DropiumDirective,
    container:DropiumDirective,
    previousIndex: number,
    newIndex: number
}