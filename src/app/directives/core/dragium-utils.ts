export function moveItemInArray<T = any>(array:T[], previousIndex:number,newIndex:number):void 
{
    if (previousIndex == newIndex) return;

    
    const element = array.splice(previousIndex,1)[0];
    array.splice(newIndex,0,element);
}

export function transferArrayItem<T = any>(currentArray:T[],targetArray:T[], currentIndex:number,targetIndex:number)
{
   // check this then
    targetArray.splice(targetIndex,0,currentArray.splice(currentIndex,1)[0]);
}

export function isInsideClientRect(clientRect:ClientRect, x:number,y:number){
     const { left , right, top, bottom } = clientRect;
     return y >= top && y <=bottom && x >= left && x <=right;
}