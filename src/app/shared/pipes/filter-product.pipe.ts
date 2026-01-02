import { Pipe, PipeTransform } from "@angular/core";
import { it } from "node:test";

@Pipe({
    name: 'filterItems',

})
export class  FilterPipe implements PipeTransform {
transform(items: any[], searchText: string, key:string[]): any[] {
    return items.filter((item)=>
        key.some((k)=>item[k].toLowerCase().includes(searchText.toLowerCase()))
    );
}

}       